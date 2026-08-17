const Joi = require('joi');

const registerSchema = Joi.object({

first_name: Joi.string()
    .pattern(new RegExp('^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+$'))
    .required()
    .messages({
        'string.pattern.base': 'The first name can only contain letters!',
        'any.required': 'A first name is required.'
    }),

last_name: Joi.string()
    .pattern(new RegExp('^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+$'))
    .required()
    .messages({
        'string.pattern.base': 'The last name can only contain letters!',
        'any.required': 'A last name is required.'
    }),

username:Joi.string()
    .pattern(new RegExp('/^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ0-9._-]+$/'))
    .min(6)
    .max(30)
    .optional(),

email: Joi.string()
    .email({minDomainSegments: 2})
    .required()
    .messages({
        'any.required': 'A valid email is required.'
    }),

password: Joi.string()
    .pattern(new RegExp('^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ0-9!@#$%^&*()_+{}\\[\\]:;<>,.?~\\-]{8,}$'))
    .required()
    .messages({
        'string.pattern.base': 'The password must be a minimum of 8 characters!',
        'any.required': 'A password is required.'
    }),

passwordAgain: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
        'any.only': 'The two password is not identical',
        'any.required': 'Please confirm your password.'
    }),

phone_number:Joi.string()
    .pattern(new RegExp('^\\+?[0-9]{10,15}$'))
    .optional(),

birth_date: Joi.string()
    .isoDate()
    .optional()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const profileSchema = Joi.object({
    
    Firstname: Joi.string()
    .pattern(new RegExp('/^[a-zA-ZÁÉÍÓÖŐÚÜŰáéíóöőúüű\s\-]+$/'))
    .optional()
    .messages({
        'string.pattern.base': 'The first name can only contain letters!',
        'any.required': 'A first name is required.'
    }),

Lastname: Joi.string()
    .pattern(new RegExp('/^[a-zA-ZÁÉÍÓÖŐÚÜŰáéíóöőúüű\s\-]+$/'))
    .optional()
    .messages({
        'string.pattern.base': 'The last name can only contain letters!',
        'any.required': 'A last name is required.'
    }),

Username:Joi.string()
    .pattern(new RegExp(/^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ0-9._-]+$/))
    .min(6)
    .max(30)
    .optional(),

Email: Joi.string()
    .email({minDomainSegments: 2})
    .optional()
    .messages({
        'any.required': 'A valid email is required.'
    }),

Phone_number:Joi.string()
    .pattern(new RegExp('^\\+?[0-9]{10,15}$'))
    .optional(),

Birth_date: Joi.string()
    .isoDate()
    .optional()
})

module.exports = { registerSchema, loginSchema, profileSchema };