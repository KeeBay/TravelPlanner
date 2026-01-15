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


async function updateUserData(req, res) {
    try {
        const userId = req.user.userId;
        const { first_name, last_name, phone_number, birth } = req.body;

        const user = await userModel.findOne({ where: { user_id: userId } });

        if (!user) {
            return res.status(404).json({ error: true, message: "Felhasználó nem található." });
        }


        user.first_name = first_name || user.first_name;
        user.last_name = last_name || user.last_name;
        user.phone_number = phone_number || user.phone_number;
        user.birth = birth || user.birth;

        await user.save();

        res.status(200).json({ success: true, message: "Adatok sikeresen frissítve!" });

    } catch (error) {
        console.error("Profil frissítési hiba:", error);
        res.status(500).json({ error: true, message: "Szerver hiba." });
    }
}

async function deleteUserAccount(req, res) {
    try {
        const userId = req.user.userId;

        const deletedCount = await userModel.destroy({ where: { user_id: userId } });

        if (deletedCount > 0) {
            res.status(200).json({ success: true, message: "Fiók sikeresen törölve." });
        } else {
            res.status(404).json({ error: true, message: "Felhasználó nem található." });
        }

    } catch (error) {
        console.error("Fiók törlési hiba:", error);
        res.status(500).json({ error: true, message: "Szerver hiba." });
    }
}

module.exports = { getUserData, updateUserData, deleteUserAccount };