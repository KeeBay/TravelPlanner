//Package és db importálása
const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnection');

//Model definiálása
const blacklist = sequelize.define('Blacklist', {
    token: {
        type: DataTypes.STRING(500),
        allowNull: false
    },

    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
},

{
    timestamps: false
});


module.exports = blacklist;