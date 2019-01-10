const Sequelize = require('sequelize');
const db = require('../sequelize/db');
const User = require('./user.model');

const Phone = db.define('phone',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    number: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});
Phone.belongsTo(User, {foreignKey: 'id', target: 'user_id'});

module.exports = Phone;