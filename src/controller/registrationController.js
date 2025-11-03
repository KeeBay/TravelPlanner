const userModel = require('../model/userModel')

const validate = require('validate');
const { v4: uuidv4 } = require('uuid');
const restrictions = require('../restrictions')
const bcrypt = require('bcrypt');

async function passwordHash(password){
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

async function registrationPUTController (req, res){

    try{
    const { username, first_name, last_name, email, password, passwordAgain, birth, phone_number } = req.body;

    //Felhasználónév lekezelése

    if (username === '') {
        res.status(400).json({
            code:400,
            type: "Nincsfnev",
            message:"Nem lett megadva felhasználónév!"
        })
        return;
    }

    else{
        let msg = validate.single(username, restrictions.username);

        if (msg) {
            res.status(400).json({
                code: 400,
                type: "Nemjofnev",
                message: msg
            })
            return;
        }
    }

    const existingUsername = await userModel.findOne({ where: { Username: username } });
    if (existingUsername !== null) {
        res.status(400).json({
            code:400,
            type: "Vanilyenfnev",
            message:"Már létezik felhasználó ilyen felhasználónévvel!"
        })
        return;
    }

if (first_name === '') {
        res.status(400).json({
            code:400,
            type: "NincsKeresztNev",
            message:"Nem lett megadva keresztnév!"
        })
        return;
    }

    if (last_name === '') {
        res.status(400).json({
            code:400,
            type: "NincsVezetekNev",
            message:"Nem lett megadva vezetéknév!"
        })
        return;
    }

    //Email lekezelése

    if (email === '') {
        res.status(400).json({
            code:400,
            message:"Nem lett megadva email cím!"
        })
        return;
    }

    else{
        let msg = validate.single(email, restrictions.email);

        if (msg) {
            res.status(400).json({
                code: 400,
                type: "Rosszemail",
                message: msg
            })
            return;
        }
    }

    const existingEmail = await userModel.findOne({ where: { Email: email } });
    if (existingEmail !== null) {
        res.status(400).json({
            code:400,
            type: 'Vanmaremail',
            message:"Már létezik felhasználó ilyen email címmel!"
        })
        return;
    }

    //jelszó lekezelése

    if (password === '') {
        res.status(400).json({
            code:400,
            type: 'Nincsjelszo',
            message:"Nem lett megadva jelszó!"
        })
        return;
    }
    else if(password !== passwordAgain) {
        res.status(400).json({
            code:400,
            type: 'Nemegyezojelszavak',
            message:"A két jelszó nem egyezik!"
        })
        return;
    }

    else{
        let msg = validate.single(password, restrictions.password);

        if (msg) {
            res.status(400).json({
                code: 400,
                type: "Nemjojelszo",
                message: msg
            })
            return;
        }
    }


    user = await userModel.build({
        User_id: uuidv4(),
        username: username,
        first_name: first_name,
        last_name, last_name,
        email: email,
        password: await passwordHash(password),
        birth: birth,
        phone_number: phone_number
    })




    await user.save();


    res.status(201).json({felhasznalo, success: true});
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