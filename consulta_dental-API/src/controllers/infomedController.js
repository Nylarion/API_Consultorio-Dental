const InfoMedica = require('../models/InfoMedica');

const infomedController = {


    obtenerTodos: async (req, res) => {


        try {


            console.log('Buscando toda la información médica.');

            const InfoMed = await InfoMedica.findAll({


                order: [['diagnostico', 'ASC']]


            });


            console.log(`Se encontraron ${InfoMed.length} Informaciones medicas`);

            res.status(200).json({


                mensaje: 'Información obtenida exitosamente',
                cantidad: InfoMed.length,
                datos: InfoMed

            });

        } catch (error){


            console.error('Error al obtener informacion medica: ', error.message);

            res.status(500).json({

                mensaje: 'Error interno del servidor',
                error: error.message

            });


        }


    },


    obtenerPorId: async (req, res) => {

        try {

            const {id_InfoMedica} = req.params;

            console.log(`Buscando información médica por ID: ${id_InfoMedica}`);

            const InfoMed = await InfoMedica.findByPk(id_InfoMedica);
            
            if (!InfoMed){

                console.log(`Información médica con ID ${id_InfoMedica} no encontrada.`);
                return res.status(404).json({

                    mensaje: `Información médica con ID ${id_InfoMedica} no encontrada.`

                });

            }


            res.status(200).json({

                mensaje: 'Información médica encontrada exitosamente',
                datos: InfoMed

            });

        } catch (error){

            console.error('Error al objeter información medica: ', error.message);

            res.status(500).json({

                mensaje: 'Error interno del servidor',
                error: error.message

            });

        }


    },


    crear: async (req, res) => {

        try {

            const {diagnostico, tratamiento} = req.body;

            console.log('Creando nueva información médica: ', {diagnostico, tratamiento});


            const nuevaInfoMed = await InfoMedica.create({

                diagnostico,
                tratamiento

            });

            console.log(`Información médica creada con ID: ${nuevaInfoMed.id_InfoMedica}`);

            res.status(201).json({

                mensaje: 'Información médica creada exitosamente',
                datos: nuevaInfoMed

            });

        } catch (error){


            console.error('Error al crear la info medica', error.message);


            if (error.name === 'SequelizeUniqueConstraintError'){

                return res.status(400).json({

                    mensaje:'Información invalida.',
                    error: 'Ingrese información valida.'

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


            const {id_InfoMedica } = req.params;
            const { diagnostico, tratamiento }= req.body;

            console.log(`Actualizando la información médica ID ${id_InfoMedica}`);

            const InfoMed = await InfoMedica.findByPk(id_InfoMedica);

            if (!InfoMed){

                console.log(`Información médica con ID ${id_InfoMedica} no encontrada.`);
                return res.status(404).json({

                    mensaje: `Información médica con ID ${id_InfoMedica} no encontrada.`

                });

            }

            await InfoMed.update({

                diagnostico,
                tratamiento

            });


            console.log(`Información médica actualizada: ${InfoMed.id_InfoMedica}`);

            res.status(200).json({

                mensaje: 'Información médica actualizada correctamente',
                datos: InfoMed

            });



        } catch (error){


            console.error('Error al actualizar información médica: ', error.message);

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

            const {id_InfoMedica} = req.params;
            console.log(`Eliminando información médica ID: ${id_InfoMedica}`);

            const InfoMed = await InfoMedica.findByPk(id_InfoMedica);

            if (!InfoMed){


                console.log(`Información médica con ID: ${id_InfoMedica} no encontrado`);
                return res.status(404).json({

                    mensaje: `Información médica con ID: ${id_InfoMedica} no encontrado`

                });

            }

            const diagnosticoPaciente = InfoMed.diagnostico;

            await InfoMed.destroy();

            console.log(`Información médica eliminada: ${id_InfoMedica}`)

            res.status(200).json({

                mensaje: `Información médica ${id_InfoMedica} eliminada exitosamente`

            });



        } catch (error){


            console.error('Error al eliminar infomed: ', error.message);

            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({
                mensaje: 'No se puede eliminar la información médica',
                solucion: 'Borre primero al cliente asignado a esta ID de información medica.'
            });


        }

        res.status(500).json({

            mensaje: 'Error interno del servidor',
            error: error.message


        });

        }

    }

};


module.exports = infomedController;