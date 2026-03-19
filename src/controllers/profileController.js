const prisma = require('../config/db');
const Schema = require('../validators/authSchema');

async function profileGetController(req, res){
    try {
        const userId = req.user.userId;

        const userDatas = await prisma.users.findUnique({
            where: {UserID : userId},
            select: {
                UserID: true,
                Firstname: true,
                Lastname: true,
                Username: true,
                Email: true,
                Birth_date: true,
                Phone_number: true,
                
                visited_countries: {
                    include: {
                        countries: true
                    }
                },
                trips: {
                    select: {
                        TripID: true,
                        TripName: true,
                        StartDate: true,
                        EndDate: true
                    }
                }
            }
        });

        if (!userDatas) {
            return res.status(404).json({
                status: 404,
                message: "There is no user!"
            });
        }

        res.status(200).json({
            status: 200,
            success: true,
            userDatas : userDatas
        })

    }
    catch (error) {
        console.error("Server error: ", error);
        res.status(500).json({
            error: true,
            status: 500,
            message: "Server error."
        });
    }
}

async function profilePatchController(req, res) {
    try{
        //Extracting the data from the body and the id from the req.user
        const incomingData = req.body;
        const userId = req.user.userId;
        //Validating incoming data against the Joi schema
        const {error, value} = Schema.profileSchema.validate(incomingData, {abortEarly: false})
            if (error) {
                console.error("Validation Error: ", error.details);
                return res.status(400).json({
                    message: "The validation of the given data failed.",
                    details: error.details.map(detail => detail.message)
                });
            }
            console.log('Valid data: ', value);

            //Fetching the current data that is on the database
            const currentData = await prisma.users.findUnique({
                where: {UserID : userId}
            });
            
            //If Birth_date is provided, convert it to a Date object for accurate comparison
                if (value.Birth_date) {
                    value.Birth_date = new Date(value.Birth_date);

                    if (currentData.Birth_date && value.Birth_date.getTime() === currentData.Birth_date.getTime()) {
                        delete value.Birth_date;
                    }
                }

            const updateData = {}

            //Iterating through the validated fields to collect only the actual changes
            for (const key of Object.keys(value)) {
                if (value[key] !== currentData[key]) {
                    updateData[key] = value[key];
                }
            }

            console.log(updateData);

            //Early return: if there are no changes, skip the database update to save resources
                if (Object.keys(updateData).length === 0) {
                    return res.status(200).json({
                        success: true,
                        status: 200,
                        message: "There was no data that have been updated, your informations are up to date!"
                    });
                }

                //Conflict check: Ensure the new email or username is not already taken
            if (updateData.Email) {
                const existingEmail = await prisma.users.findFirst({
                where: {Email : updateData.Email}
                });

            
                if (existingEmail) {
                    return res.status(409).json({
                        status: 409,
                        message: "There is already a user with this email!"
                    });
                };
            }

            if(updateData.Username){

                const existingUsername = await prisma.users.findFirst({
                    where: {Username : updateData.Username}
                });

                if (existingUsername) {
                    return res.status(409).json({
                        status: 409,
                        message: "There is already a user with this username!"
                    });
                };  
            }

            //Updating the user record in the database
            const updatedUser = await prisma.users.update({
                 where: {UserID : userId},
                 data: updateData
                 
            });
    
            res.status(200).json({
                success: true,
                status: 200,
                message: "Data updated successfully!",
                updatedUser: updatedUser
            })

    }
    catch(error){
        console.error("Server error: ", error);
        res.status(500).json({
            error: true,
            status: 500,
            message: "Server error."
        });
    }
}

module.exports = {profileGetController, profilePatchController}