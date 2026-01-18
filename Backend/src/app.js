const express = require('express');
const sequelize = require('./dbConnection');
const cors = require('cors');

const userModel = require('./model/userModel.js');
const blacklistModel = require('./model/blacklistModel.js');

const registrationRouter = require("./route/registrationRoute");
const loginRouter = require("./route/loginRoute");
const userRouter = require('./route/userRoute');
const hotelRouter = require('./route/hotelRoute')

const { scheduledDelete } = require('./scheduledDeleteFromBlackList')

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.use("/",registrationRouter);
app.use("/", loginRouter);
app.use("/", userRouter);
app.use("/", hotelRouter);

sequelize.authenticate().then(() => {
  console.log('Sikeres kapcsolat az adatbázissal!');

  sequelize.modelManager.addModel(userModel);
  sequelize.modelManager.addModel(blacklistModel);

  sequelize.sync({}).then(() =>{
    app.listen(PORT, () => {
      console.log(`A szerver elindult és elérhető a http://localhost:${PORT} URL-en!`)

      scheduledDelete.start();
    });
  })
}).catch((error) => {
  console.log("Az adatbázissszerverrel való kapcsolat sikertelen")
  console.log(error);})