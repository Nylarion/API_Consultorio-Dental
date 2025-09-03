const {DataTypes} = require('sequilize');
const sequilize = require('../config/database');

const Atencion = sequilize.define('Atencion',{

    id_Atencion:{

        type: DataTypes.INTERGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false

    },
  
},

{

    tableName: 'cd_Atencion',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci'

});

module.exports = Atencion;