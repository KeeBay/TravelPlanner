const { DataTypes } = require('sequelize');
const sequelize = require("../dbConnection");


const User = sequelize.define('Users', {

    user_id: {
        type:DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },

     first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true

    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    birth: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    phone_number: {
        type: DataTypes.STRING(12),
        allowNull: true,
        defaultValue: "",
        unique: true
    },


},
{
    tableName:"Users"

});


module.exports = User;