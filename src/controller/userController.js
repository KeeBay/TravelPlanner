// controller/userController.js
const userModel = require('../model/userModel');

async function getUserData(req, res) {
    try {
        const userId = req.user.userId; 

        const user = await userModel.findOne({ where: { user_id: userId } });

        if (!user) {
            return res.status(404).json({ error: true, message: "Felhasználó nem található." });
        }
        const { password, ...userData } = user.toJSON();

        res.status(200).json({ success: true, user: userData });

    } catch (error) {
        console.error("Profil lekérési hiba:", error);
        res.status(500).json({ error: true, message: "Szerver hiba." });
    }
}

module.exports = { getUserData};