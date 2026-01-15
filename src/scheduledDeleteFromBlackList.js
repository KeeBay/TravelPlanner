const cron = require('node-cron');
const blacklist = require('./model/blacklistModel');
const { Op } = require('sequelize'); // Sequelize operátorok importálása

// Óránként futó takarítás
var scheduledDelete = cron.schedule('0 * * * *', async () => {
    console.log("Feketelista takarítása indítása...");
    try {
        const deletedCount = await blacklist.destroy({
            where: {
                expiresAt: {
                    [Op.lt]: new Date()
                }
            }
        });

        if (deletedCount > 0) {
            console.log(`${deletedCount} lejárt token sikeresen törölve a feketelistából.`);
        } else {
            console.log("Nem volt törlendő lejárt token.");
        }

    } catch (error) {
        console.error("Hiba a feketelista takarítása közben:", error);
    }
}, {
    scheduled: true,
    timezone: "Europe/Budapest"
});

module.exports = { scheduledDelete };