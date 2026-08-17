const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const removeAccents = require('remove-accents');
const prisma = require('../config/db');
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const Schemas = require('../validators/authSchema');

async function passwordHash(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

async function authRegisterPostController (req, res){
    try {
        const registrationData = req.body;

        //letting the data through the authSchema

        const {error, value} = Schemas.registerSchema.validate(registrationData, {abortEarly: false})
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

async function authLoginPostController(req, res) {
    try {

        const loginData = req.body

        //letting the data through the authSchema

        const {error, value } = Schemas.loginSchema.validate(loginData, {abortEarly: true});

        if (error) {
            console.error("Validation Error: ", error.details);
            return res.status(400).json({
                message: "The validation of the given datas failed.",
                details: error.details.map(detail => detail.message)
            });
        }
        console.log('Valid datas: ', value);

        //Checking the username and password

        const userTryLogIn = await prisma.users.findUnique({
            where: {Email : value.email}
        });

        if (!userTryLogIn) {
            return res.status(404).json({
                status: 404,
                message: "There is no user with this email!"
            });
        };

        const passwordCheck = await bcrypt.compare(value.password, userTryLogIn.Password);
        if (!passwordCheck) {
            return res.status(401).json({
                error: true,
                message: "Invalid password!"
            });
        }

        const token = jwt.sign({
            userId: userTryLogIn.UserID, 
            username: userTryLogIn.Username
        }, process.env.JWT_SECRET, 
        { expiresIn: '1h' });

       

        res.status(200).json({
            success: true,
            status: 200,
            token: token,
            message: "Successful Login"
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

async function googleLogin(req, res) {
    try {
        const googleUser = req.verifiedGoogleUser;

        let user = await prisma.users.findUnique({
            where: { Email: googleUser.email }
        });

        if (!user) {
            const generatedUsername = googleUser.email.split('@')[0] + '_' + Math.floor(Math.random() * 10000);

            user = await prisma.users.create({
                data: {
                    Email: googleUser.email,
                    Firstname: googleUser.firstName,
                    Lastname: googleUser.lastName,
                    Username: generatedUsername,
                    Password: null, // Google usernél nincs jelszó!
                }
            });
        }

        const token = jwt.sign(
            { userId: user.UserID, email: user.Email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            success: true,
            message: "Google authentication successful!",
            token: token,
            user: {
                id: user.UserID,
                email: user.Email,
                username: user.Username
            }
        });

    } catch (error) {
        console.error("Google Auth Error:", error);
        return res.status(500).json({ message: "Internal server error during Google authentication." });
    }
}

module.exports = {authRegisterPostController, authLoginPostController, googleLogin}