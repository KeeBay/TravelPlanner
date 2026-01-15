const Joi = require('joi');
const schema = Joi.object({
    
    first_name: Joi.string()
    .pattern(new RegExp('^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+$'))
    .required(),

    last_name: Joi.string()
    .pattern(new RegExp('^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+$'))
    .required(),

    password: Joi.string()
    .pattern(new RegExp('^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ0-9!@#$%^&*()_+{}\\[\\]:;<>,.?~\\-]{8,}$'))
    .required(),

    passwordAgain: Joi.ref('password'),

    email: Joi.string()
    .email({minDomainSegments: 2}),

    date: Joi.string().isoDate().required(),

    phone_number: Joi.string()
    .pattern(new RegExp('^\\+?[0-9]{10,15}$'))
    .optional()
})
.with('password', 'passwordAgain');

module.exports = schema;