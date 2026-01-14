const express = require('express');
const userController = require('../controller/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const userRouter = express.Router();

userRouter.get("/profile", authMiddleware, userController.getUserData);
userRouter.put("/profile", authMiddleware, userController.updateUserData);
userRouter.delete("/profile", authMiddleware, userController.deleteUserAccount);

module.exports = userRouter;