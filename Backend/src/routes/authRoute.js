const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/authController');

const { validate } = require('../middleware/validationMiddleware');

const authMiddleware = require('../middleware/authMiddleware');
const googleMiddleware = require('../middleware/googleTokenMiddleware');

const authSchemas = require('../validators/authSchema');

authRouter.post("/registration", validate(authSchemas.registerSchema, 'body'), authController.authRegisterPostController);
authRouter.post("/login", validate(authSchemas.loginSchema, 'body'), authController.authLoginPostController);
authRouter.post('/logout', authMiddleware, authController.authLogoutPostController);
authRouter.post("/google", googleMiddleware, authController.googleLogin);
module.exports = authRouter;
