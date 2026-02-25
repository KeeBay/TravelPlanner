const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

dotenv.config();

const PORT = process.env.PORT || 4000

const authRoutes = require('./routes/authRoute')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/', authRoutes);

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