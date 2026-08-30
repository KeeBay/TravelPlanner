const Joi = require('joi');

const retrieveSchema = Joi.object({
    externalID: Joi.string()
        .max(255)
        .required()
        .messages({
            'string.base': 'The external ID must be a string.',
            'string.max': 'The external ID cannot exceed 255 characters.',
            'any.required': 'The external ID is required.'
        }),

    session_token: Joi.string()
        .required()
        .messages({
            'string.base': 'The session token must be a string.',
            'any.required': 'The session token is required.'
        })
});



const suggestQuerySchema = Joi.object({
    q: Joi.string().min(3).required().messages({
        'string.base': 'The search query must be a string.',
        'string.empty': 'The search query cannot be empty.',
        'string.min': 'The search query must be at least 3 characters long.',
        'any.required': 'The search query (q) is required.'
    }),
    session_token: Joi.string().required().messages({
        'string.base': 'The session token must be a string.',
        'string.empty': 'The session token cannot be empty.',
        'any.required': 'The session token is a required parameter.'
    })
});

module.exports = { retrieveSchema, suggestQuerySchema };