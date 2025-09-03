const {Paciente, InfoMedica, Cita} = require('../models');

const pacienteController = {


    obtenerTodos: async (req, res) => {


        try {


            console.log('Buscando toda la informacón de los pacientes.');

            const paciente = await Paciente.findAll({


                order: [['Nombre_p', 'ASC']]


            });


            console.log(`Se encontraron ${paciente.length} pacientes.`);

            res.status(200).json({


                mensaje: 'Informacion obtenida exitosamente',
                cantidad: paciente.length,
                datos: paciente

            });

        } catch (error){


            console.error('Error al obtener informacion de los pacientes: ', error.message);

            res.status(500).json({

                mensaje: 'Error interno del servidor',
                error: error.message

            });


        }


    },


    obtenerPorId: async (req, res) => {

        try {

            const {id_Paciente} = req.params;

            console.log(`Buscando Información Medica por ID: ${id_Paciente}`);

            const paciente = await Paciente.findByPk(id_Paciente); //cambiar
            
            if (!paciente){

                console.log(`Paciente con ID ${id_Paciente} no encontrado`);
                return res.status(404).json({

                    mensaje: `Paciente con ID ${id_Paciente} no encontrado`

                });

            }


            res.status(200).json({

                mensaje: 'Informacion de panciente encontrada exitosamente',
                datos: paciente

            });

        } catch (error){

            console.error('Error al objeter información del paciente: ', error.message);

            res.status(500).json({

                mensaje: 'Error interno del servidor',
                error: error.message

            });

        }


    },


    crear: async (req, res) => {

        try {

            const {Nombre_p, Apellido_Pp, Apellido_Mp, } = req.body;

            console.log('Creando nueva información del paciente: ', {Nombre_p, Apellido_Pp, Apellido_Mp});


            const nuevoPaciente = await Paciente.create({

                Nombre_p,
                Apellido_Pp,
                Apellido_Mp

            });

            console.log(`Informacion del paciente creada con ID: ${nuevoPaciente.id_InfoMedica}`);

            res.status(201).json({

                mensaje: 'Paciente creado exitosamente',
                datos: nuevoPaciente

            });

        } catch (error){


            console.error('Error al crear la información del paciente', error.message);


            if (error.name === 'SequelizeUniqueConstraintError'){

                return res.status(400).json({

                    mensaje:'Hola1',
                    error: 'Hola2'

                });


            }

            if (error.name === 'SequelizeValidationError'){

                return res.status(400).json({

                    mensaje: 'Datos Invalidos',
                    errores: error.errors.map(e => e.message)

                });

            }

            res.status(500).json({

                mensaje: 'Error interno del servidor',
                error: error.message

            });

        }


    },

    actualizar: async (req, res) => {


        try {


            const {id_Paciente } = req.params;
            const {Nombre_p, Apellido_Pp, Apellido_Mp }= req.body;

            console.log(`Actualizando información del paciente con ID: ${id_Paciente}`);

            const paciente = await Paciente.findByPk(id_Paciente); //cambiar

            if (!paciente){

                console.log(`Paciente con ID ${id_Paciente} no encontrado`);
                return res.status(404).json({

                    mensaje: `Paciente con ID ${id_Paciente} no encontrado`

                });

            }

            await paciente.update({

                Nombre_p,
                Apellido_Pp,
                Apellido_Mp

            });


            console.log(`Información del paciente actualizada: ${paciente.id_Paciente}`);

            res.status(200).json({

                mensaje: 'Información del paciente actualizada correctamente',
                datos: paciente

            });



        } catch (error){


            console.error('Error al actualizar la información del cliente: ', error.message);

            if (error.name === 'SequelizeUniqueConstraintError'){

                return res.status(400).json({

                    mensaje: 'Esta registrado (No tomar en cuenta en infomed)',
                    error: 'Algo duplicado'

                });


            }

            res.status(500).json({

                mensaje: 'Error interno del servidor',
                error: error.message

            });

        }


    },



    eliminar: async (req, res) => {


        try {

            const {id_Paciente} = req.params;
            console.log(`Eliminando información del paciente con ID: ${id_Paciente}`);

            const Paciente = await Pacientes.findByPk(id_Paciente); //cambiar

            if (!Paciente){


                console.log(`Paciente con ID: ${id_Paciente} no encontrado`);
                return res.status(404).json({

                    mensaje: `Paciente con ID: ${id_Paciente} no encontrado`

                });

            }

            const nombrePaciente = Paciente.Nombre_p;

            await Paciente.destroy();

            console.log(`Paciente con ID: ${id_Paciente} eliminado.`)

            res.status(200).json({

                mensaje: `Información del paciente con ID: ${id_Paciente} eliminada exitosamente`

            });



        } catch (error){


            console.error('Error al eliminar la información del paciente: ', error.message);

            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({
                mensaje: 'No se puede eliminar la información del paciente.',
                solucion: 'Por definir'
            });


        }

        res.status(500).json({

            mensaje: 'Error interno del servidor',
            error: error.message


        });

        }

    }

};


module.exports = pacienteController;