const validate = (schema, property) => {
    return (req, res, next) => {
            const data = req[property];
            const {error, value} = schema.validate(data, {abortEarly:false});
            if (error){
                console.error("Validation error: ", error.details);
            
            return res.status(400).json({
                error: true,
                status: 400,
                message: "The validation of the given data failed.",
                        details: error.details.map(detail => detail.message)
            })
        }
        req[property] = value;
        next();
    }   
}

module.exports={ validate };