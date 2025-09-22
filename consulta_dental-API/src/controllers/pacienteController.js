const {Paciente, Infomedica, Cita} = require('../models');

const pacienteController = {


    obtenerTodos: async (req, res) => {


        try {


            console.log('Buscando toda la informacón de los pacientes.');

            const paciente = await Paciente.findAll({

                include: [

                    {
                        model: Infomedica,
                        as: 'infomedica',
                        attributes: ['id_InfoMedica', 'diagnostico', 'tratamiento']
                    },

                    {
                        model: Cita,
                        as: 'cita',
                        attributes: ['id_Cita', 'nro_Cita', 'fecha_Cita', 'ultima_Cita']
                    }
                ],

                order: [['Nombre_p', 'ASC']]

            });


            console.log(`Se encontraron ${paciente.length} pacientes.`);

            res.status(200).json({


                mensaje: 'Informacion obtenida exitosamente',
                cantidad: paciente.length,
                datos: paciente

            });

        } catch (error){


            console.error('Error al obtener información de los pacientes: ', error.message);

            res.status(500).json({

                mensaje: 'Error interno del servidor',
                error: error.message

            });


        }


    },


    obtenerPorId: async (req, res) => {

        try {

            const {id_Paciente} = req.params;

            console.log(`Buscando información del cliente por ID: ${id_Paciente}`);

            const paciente = await Paciente.findByPk(id_Paciente, {

                include: [

                    {
                        model: Infomedica,
                        as: 'infomedica',
                        attributes: ['id_InfoMedica', 'diagnostico', 'tratamiento']
                    },

                    {
                        model: Cita,
                        as: 'cita',
                        attributes: ['id_Cita', 'nro_Cita', 'fecha_Cita', 'ultima_Cita']
                    }
                ],

            });
            
            if (!paciente){

                console.log(`Paciente con ID ${id_Paciente} no encontrado.`);
                return res.status(404).json({

                    mensaje: `Paciente con ID ${id_Paciente} no encontrado.`

                });

            }


            res.status(200).json({

                mensaje: 'Información de panciente encontrada exitosamente.',
                datos: paciente

            });

        } catch (error){

            console.error('Error al objeter información del paciente: ', error.message);

            res.status(500).json({

                mensaje: 'Error interno del servidor.',
                error: error.message

            });

        }


    },


    crear: async (req, res) => {

        try {

            const {Nombre_p, Apellido_Pp, Apellido_Mp, id_InfoMedica, id_Cita} = req.body;

            console.log('Creando nueva información del paciente: ', {Nombre_p, Apellido_Pp, Apellido_Mp});


            const nuevoPaciente = await Paciente.create({

                Nombre_p,
                Apellido_Pp,
                Apellido_Mp,
                id_InfoMedica,
                id_Cita
            });

            console.log(`Informacion del paciente creada con ID: ${nuevoPaciente.id_InfoMedica}`);

            res.status(201).json({

                mensaje: 'Paciente creado exitosamente',
                datos: nuevoPaciente

            });

        } catch (error){


            console.error('Error al crear la información del paciente:', error.message);


            if (error.name === 'SequelizeUniqueConstraintError'){

                return res.status(400).json({

                    mensaje:'Ingrese información valida',
                    error: 'Información invalida'

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
            const {Nombre_p, Apellido_Pp, Apellido_Mp, id_InfoMedica, id_Cita}= req.body;

            console.log(`Actualizando información del paciente con ID: ${id_Paciente}`);

            const paciente = await Paciente.findByPk(id_Paciente);

            if (!paciente){

                console.log(`Paciente con ID ${id_Paciente} no encontrado.`);
                return res.status(404).json({

                    mensaje: `Paciente con ID ${id_Paciente} no encontrado.`

                });

            }

            await paciente.update({

                Nombre_p,
                Apellido_Pp,
                Apellido_Mp,
                id_InfoMedica,
                id_Cita

            });


            console.log(`Información del paciente actualizada: ${paciente.id_Paciente}`);

            res.status(200).json({

                mensaje: 'Información del paciente actualizada correctamente.',
                datos: paciente

            });



        } catch (error){


            console.error('Error al actualizar la información del paciente: ', error.message);

            if (error.name === 'SequelizeUniqueConstraintError'){

                return res.status(400).json({

                    mensaje: 'Esta registrado.',
                    error: 'Datos duplicados.'

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

            const paciente = await Paciente.findByPk(id_Paciente); //cambiar

            if (!paciente){


                console.log(`Paciente con ID: ${id_Paciente} no encontrado.`);
                return res.status(404).json({

                    mensaje: `Paciente con ID: ${id_Paciente} no encontrado.`

                });

            }

            const nombrePaciente = paciente.Nombre_p;

            await paciente.destroy();

            console.log(`Paciente con ID: ${id_Paciente} eliminado.`)

            res.status(200).json({

                mensaje: `Información del paciente con ID: ${id_Paciente} eliminada exitosamente.`

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