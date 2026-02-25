const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const removeAccents = require('remove-accents');
const prisma = require('../config/db');

const { registerSchema } = require('../validators/authSchema');

async function passwordHash(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

async function authRegisterPostController (req, res){
    try {
        const registrationData = req.body;

        //letting the data through the authSchema

        const {error, value} = registerSchema.validate(registrationData, {abortEarly: false})
        if (error) {
            console.error("Validation Error: ", error.details);
            return res.status(400).json({
                message: "The validation of the given datas failed.",
                details: error.details.map(detail => detail.message)
            });
        }
        console.log('Valid datas: ', value);

        //Check if there is a user with this email

        const existingEmail = await prisma.users.findUnique({
            where: {Email : value.email}
        });

        if (existingEmail) {
            return res.status(409).json({
                status: 409,
                message: "There is already a user with this email!"
            });
        };

        //Counting the users for the default username

        const userCount = await prisma.users.count();

        //Creating the default username

        const defaultUsername = `${removeAccents(value.first_name)}.${removeAccents(value.last_name.slice(0,1))}.${userCount + 1}`;

        //Creating the new user on the db

        const newUser = await prisma.users.create({
            data: {
                Firstname: value.first_name,
                Lastname: value.last_name,
                Username: defaultUsername,
                Password: await passwordHash(value.password),
                Birth_date: value.birth_date ? new Date(value.birth_date) : null,
                Phone_number: value.phone_number || null,
                Email: value.email
            },
        });

        res.status(201).json({
            status: 201,
            message: "User created successfully!",
            user: newUser
        })
    } catch (error) {
        console.error("Server error: ", error);
        res.status(500).json({
            error: true,
            status: 500,
            message: "Server error."
        });
    }
}

module.exports = {authRegisterPostController}