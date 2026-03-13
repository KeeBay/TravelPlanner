const prisma = require('../config/db');

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

module.exports = {profileGetController}