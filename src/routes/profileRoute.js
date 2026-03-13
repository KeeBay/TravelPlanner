const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const profileRouter = express.Router();

const profileController = require('../controllers/profileController');

profileRouter.get("/profile", authMiddleware, profileController.profileGetController);

module.exports = profileRouter;