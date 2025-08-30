const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({

    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'P@ssw0rd',
    database: 'Consultorio_Dental',


    logging: console.log,
    timezone: '-3:00',

    pool:{

        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,


    }


});

module.exports = sequelize;