const express = require('express');
//const cors = require('cors');
const sequelize = require('./dbConnection');

const userModel = require('./model/userModel.js');
const blacklistModel = require('./model/blacklistModel.js');

const registrationRouter = require("./route/registrationRoute");
const loginRouter = require("./route/loginRoute");

const { scheduledDelete } = require('./scheduledDeleteFromBlackList')

const app = express();
app.use(express.json());

const PORT = 3000;

app.use("/",registrationRouter);
app.use("/", loginRouter);

sequelize.authenticate().then(() => {
  console.log('Sikeres kapcsolat az adatbázissal!');

  sequelize.modelManager.addModel(userModel);
  sequelize.modelManager.addModel(blacklistModel);

  sequelize.sync({force : true}).then(() =>{
    app.listen(PORT, () => {
      console.log(`A szerver elindult és elérhető a http://localhost:${PORT} URL-en!`)

      scheduledDelete.start();
    });
  })
}).catch((error) => {
  console.log("Az adatbázissszerverrel való kapcsolat sikertelen")
  console.log(error);})
  