const Sequelize = require('sequelize');
const connection = new Sequelize('contacts', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

});

connection.authenticate().then(()=>console.log("connected"))
.catch(err=>console.log('error: ', err));

module.exports = connection;