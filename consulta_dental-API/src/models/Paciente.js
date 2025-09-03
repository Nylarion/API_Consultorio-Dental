const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Paciente = sequelize.define('Paciente',{

    id_Paciente:{

        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false

    },

    Nombre_p:{

        type: DataTypes.STRING(20),
        allowNull: false,
        validate:{

            notEmpty:{

                msg: 'El nombre es obligatorio.'

            },
            len:{

                args: [2, 20],
                msg: 'El nombre debe tener entre 2 y 20 caracteres.'

            }
        }
    },

    Apellido_Pp:{

        type: DataTypes.STRING(20),
        allowNull: false,
        validate:{

            notEmpty:{

                msg: 'El apellido paterno es obligatorio.'

            },
            
            len:{

                args: [2, 20],
                msg: 'El apellido debe de tener entre 2 y 20 caracteres.'

            }
        }
    },

    Apellido_Mp:{

        type: DataTypes.STRING(20),
        allowNull: false,
        validate:{

            notEmpty:{

                msg: 'El apellido materno es obligatorio.'

            },

            len:{

                args: [2, 20],
                msg: 'El apellido debe tener entre 2 y 20 caracteres.'

            }
        }
    }    
},

{

    tableName: 'cd_paciente',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci'

});

module.exports = Paciente;


//Telefono:{

    //type: DataTypes.STRING(25),
    //allowNull: true

//},