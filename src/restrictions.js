let registrationRestrictions = {};

const regexUsername = "[\-\'A-Za-z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]+";
const regexPassword = /^(?=.*[a-z+áéíóöőúüű])(?=.*[A-Z+ÁÉÍÓÖŐÚÜŰ])(?=.*\d).+$/;

registrationRestrictions.username = () => {

    const restriction = {
        'presence': {
            allowEmpty: false,
            message: "Kötelező megadni felhasználónevet!"
        },
        'type': 'string',
        'length':{
            'minimum': 10,
            'maximum':32,
            'message': 'A felhasználónév túl rövid vagy túl hosszú! A felhasználónévnek 10 és 32 karakterhossz közöttinek kell lennie!'
        },
        'format': {
            'pattern' : regexUsername,
            'flags' : 'i',
            'message':'A felhasználónévnek a következő sémát kell követnie: Nagybetű A-Z, kisbetű a-z, számok 0-9'
        }
    }

    return restriction;
}

registrationRestrictions.email = () => {

    const restriction = {
        'presence': {
            allowEmpty: false,
            message: "Kötelező megadni jelszót!"
        },
        'type': 'string',
        'email':true
    }

    return restriction;

}

registrationRestrictions.password = () => {
    const restriction = {
        'presence': {
            allowEmpty: false,
            message: "Kötelező megadni jelszót!"
        },
        'type': 'string',
        'length':{
            'minimum': 10,
            message: "A jelszónak legalább 10 karakter hosszúnak kell lennie!"
        },
        'format': {
            'pattern' : regexPassword,
            'flags' : 'i',
            'message': "A jelszónak a következő karaktereket kell tartalmaznia: Kisbetű, nagybetű, szám."
        }
    }

    return restriction;
}

module.exports = registrationRestrictions;