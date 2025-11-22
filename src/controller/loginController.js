const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function loginPostController(req, res) {
    let {email, password} = req.body;
    
    //Data Validation

    let existingUser;
    let isPasswordsMatch;
    try {
        existingUser = await userModel.findOne({where: { email : email}});
         isPasswordsMatch = await bcrypt.compare(password, existingUser.password); 
        }
        catch (error) {
        console.log(error);
        res.status(401).json({
            eror: true,
            status: 500,
            type: "Server",
            message: "Szerver hiba"
        });
        return;
    }
        if (existingUser == null) {
            res.status(401).json({
            eror: true,
            status: 401,
            type: "InvalidEmail",
            message: "Invalid Email"
            });
            return;
        }

        else if (isPasswordsMatch == false ) {
            res.status(401).json({
            eror: true,
            status: 401,
            type: "InvalidPassword",
            message: "Invalid Password"
            });
            return;
        }


        //JWT

        let token;

        try {
            token = jwt.sign({
                userId: existingUser.user_id,
                email: existingUser.email,
                first_name: existingUser.first_name,
                last_name: existingUser.last_name
            },
            "privateKey",
            {algorithm: 'HS256'},
            {expiresIn: "1h"}
        );
        } catch (error) {
             console.log(error);
        res.status(500).json({
            error: true,
            status: 500,
            type: "JWT",
            message: "Server problem (JWT)"
        });
        return;
        }
        res.status(200).json({
        success: true,
        message: "Successful login!",
        data: {
            token: token,
        },
    });
}

module.exports = {loginPostController};