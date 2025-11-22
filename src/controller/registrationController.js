const userModel = require('../model/userModel')


const { v4: uuidv4 } = require('uuid');
const restrictions = require('../restrictions')
const bcrypt = require('bcrypt');


async function passwordHash(password){
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

async function registrationPUTController (req, res){

    try{
    const userData = req.body;

    const { error, value } = restrictions.validate(userData, { abortEarly: false });
    if (error) {
        console.error('Validation Error:', error.details);
        return res.status(400).json({
            message: 'Validation failed',
            details: error.details.map(detail => detail.message)
        });
    }
    console.log('Valid adatok:', value);


    user = await userModel.build({
        user_id: uuidv4(),
        first_name: value.first_name,
        last_name: value.last_name,
        email: value.email,
        password: await passwordHash(value.password),
        birth: value.date,
        phone_number: value.phone_number
    })

    await user.save();


    res.status(201).json({user, success: true});
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: true,
            status: 500,
            message: "Szerver hiba."
        })
    }
};

module.exports= {
     registrationPUTController
}