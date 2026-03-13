const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const PORT = process.env.PORT || 4000

const authRoutes = require('./routes/authRoute');
const profileRoutes = require('./routes/profileRoute');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/', authRoutes);
app.use('/api/', profileRoutes);

app.use((req, res) =>{
            res.status(404).json({error: "Not found"});
        })
try {
    app.listen(PORT, () => {
        console.log(`Az szerver fut a http://localhost:${PORT} címen!`);
    })
} catch (error) {
    console.error("Hiba a db connectionnél.", error)
}