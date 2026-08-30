const express = require('express');
const placesRouter = express.Router();

const placesController = require('../controllers/placesController');

const { validate } = require('../middleware/validationMiddleware');

const placeSchema = require('../validators/placeSchema');

placesRouter.get("/suggest", validate(placeSchema.suggestQuerySchema, 'query'), placesController.placesGETController);
placesRouter.post("/places", validate(placeSchema.retrieveSchema, 'body'), placesController.placesPOSTController);

module.exports = placesRouter;