const Citas = require('../models/Cita');

const citaController = {


    obtenerTodos: async (req, res) => {


        try {


            console.log('Buscando toda la informacón de las citas.');

            const Cita = await Citas.findAll({


                order: [['nro_Cita', 'ASC']]


            });


            console.log(`Se encontraron ${Cita.length} citas.`);

            res.status(200).json({


                mensaje: 'Informacion obtenida exitosamente.',
                cantidad: Cita.length,
                datos: Cita

            });

        } catch (error){


            console.error('Error al obtener informacion de las citas: ', error.message);

            res.status(500).json({

                mensaje: 'Error interno del servidor',
                error: error.message

            });


        }


    },


    obtenerPorId: async (req, res) => {

        try {

            const {id_Cita} = req.params;

            console.log(`Buscando Información de las citas por ID: ${id_Cita}.`);

            const Cita = await Citas.findByPk(id_Cita);
            
            if (!Cita){

                console.log(`Cita con ID ${id_Cita} no encontrada.`);
                return res.status(404).json({

                    mensaje: `Cita con ID ${id_Cita} no encontrado.`

                });

            }

            res.status(200).json({

                mensaje: 'Cita encontrada exitosamente',
                datos: Cita

            });

        } catch (error){

            console.error('Error al objeter información de la cita: ', error.message);

            res.status(500).json({

                mensaje: 'Error interno del servidor',
                error: error.message

            });

        }


    },


    crear: async (req, res) => {

        try {

            const {nro_Cita, fecha_Cita, ultima_Cita, } = req.body;

            console.log('Creando nueva cita: ', {nro_Cita, fecha_Cita, ultima_Cita});


            const nuevaCita = await Citas.create({

                nro_Cita,
                fecha_Cita,
                ultima_Cita

            });

            console.log(`Cita creada con ID: ${nuevaCita.id_Cita}`);

            res.status(201).json({

                mensaje: 'Cita agendada exitosamente',
                datos: nuevaCita

            });

        } catch (error){


            console.error('Error al agendar la citaa: ', error.message);


            if (error.name === 'SequelizeUniqueConstraintError'){

                return res.status(400).json({

                    mensaje:'Esta registrado.',
                    error: 'Datos duplicados.'

                });


            }

            if (error.name === 'SequelizeValidationError'){

                return res.status(400).json({

                    mensaje: 'Datos Invalidos.',
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


            const {id_Cita} = req.params;
            const {nro_Cita, fecha_Cita, ultima_Cita}= req.body;

            console.log(`Actualizando información de la cita con ID: ${id_Cita}`);

            const Cita = await Citas.findByPk(id_Cita);

            if (!Cita){

                console.log(`Cita con ID ${id_Cita} no encontrado.`);
                return res.status(404).json({

                    mensaje: `Cita con ID ${id_Cita} no encontrado.`

                });

            }

            await Cita.update({

                nro_Cita,
                fecha_Cita,
                ultima_Cita

            });


            console.log(`Cita actualizada: ${Cita.id_Cita}`);

            res.status(200).json({

                mensaje: 'Información de la cita actualizada correctamente.',
                datos: Cita

            });



        } catch (error){


            console.error('Error al actualizar la información de la cita: ', error.message);

            if (error.name === 'SequelizeUniqueConstraintError'){

                return res.status(400).json({

                    mensaje: 'Esta registrado.',
                    error: 'Algo duplicado.'

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

            const {id_Cita} = req.params;
            console.log(`Eliminando cita con ID: ${id_Cita}.`);

            const Cita = await Citas.findByPk(id_Cita);

            if (!Cita){


                console.log(`Cita con ID: ${id_Cita} no encontrada.`);
                return res.status(404).json({

                    mensaje: `Cita con ID: ${id_Cita} no encontrada.`

                });

            }

            const fecha_Cita = Cita.fecha_Cita;

            await Cita.destroy();

            console.log(`Cita con ID: ${id_Cita} eliminada.`)

            res.status(200).json({

                mensaje: `Cita con ID: ${id_Cita} eliminada exitosamente.`

            });



        } catch (error){


            console.error('Error al eliminar la cita: ', error.message);

            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({
                mensaje: 'No se puede eliminar la cita agendada.',
                solucion: 'Borre primero al cliente asignado a esta ID de cita.'
            });


        }

        res.status(500).json({

            mensaje: 'Error interno del servidor',
            error: error.message


        });

        }

    }

};


module.exports = citaController;