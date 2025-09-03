const {DataTypes} = require('sequelize');
const sequilize = require('../config/database');

const Citas = sequilize.define('Citas',{

    id_Cita:{

        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false

    },

    nro_Cita:{

        type: DataTypes.INTEGER,

    },

    fecha_Cita:{

        type: DataTypes.STRING(15),
        validate:{

            notEmpty:{

                msg: 'La fecha de la cita es obgatoria.'

            },
            
            len:{

                args: [2, 20],
                msg: 'El apellido debe de tener entre 2 y 20 caracteres.'

            }
        }
    },

    ultima_Cita:{

        type: DataTypes.STRING(15),
        validate:{

            notEmpty:{

                msg: 'La ultima cita es obligatoria.'

            },

            len:{

                args: [2, 20],
                msg: 'El apellido debe tener entre 2 y 20 caracteres.'

            }
        }
    }    
},

{

    tableName: 'cd_citas',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci'

});

module.exports = Citas;