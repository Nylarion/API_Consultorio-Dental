const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const InfoMedica = sequelize.define('Infomedica', {

    id_InfoMedica: {

        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false

    },

    diagnostico: {

        type: DataTypes.STRING(200)
        
    },

    tratamiento: {

        type: DataTypes.STRING(100)

    }
},
{

 tableName: 'cd_infomedica',
 timestamps: false,
 charset: 'utf8mb4',
 collate: 'utf8mb4_0900_ai_ci'

});

module.exports = InfoMedica;