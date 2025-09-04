const InfoMedica = require('../models/InfoMedica');

const infomedController = {


    obtenerTodos: async (req, res) => {


        try {


            console.log('Buscando toda la informacion medica.');

            const InfoMed = await InfoMedica.findAll({


                order: [['diagnostico', 'ASC']]


            });


            console.log(`Se encontraron ${InfoMed.length} Informaciones medicas`);

            res.status(200).json({


                mensaje: 'Informacion obtenida exitosamente',
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

            console.log(`Buscando Información Medica por ID: ${id_InfoMedica}`);

            const InfoMed = await InfoMedica.findByPk(id_InfoMedica); //cambiar
            
            if (!InfoMed){

                console.log(`Información medica con ID ${id_InfoMedica} no encontrado`);
                return res.status(404).json({

                    mensaje: `Información medica con ID ${id_InfoMedica} no encontrado`

                });

            }


            res.status(200).json({

                mensaje: 'Informacion medica encontrada exitosamente',
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

            console.log('Creando nueva información medica: ', {diagnostico, tratamiento});


            const nuevaInfoMed = await InfoMedica.create({

                diagnostico,
                tratamiento

            });

            console.log(`Informacion medica creada con ID: ${nuevaInfoMed.id_InfoMedica}`);

            res.status(201).json({

                mensaje: 'Info medica creada exitosamente',
                datos: nuevaInfoMed

            });

        } catch (error){


            console.error('Error al crear la info medica', error.message);


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


            const {id_InfoMedica } = req.params;
            const { diagnostico, tratamiento }= req.body;

            console.log(`Actualizando info med ID ${id_InfoMedica}`);

            const InfoMed = await InfoMedica.findByPk(id_InfoMedica); //cambiar

            if (!InfoMed){

                console.log(`Infomedica con ID ${id_InfoMedica} no encontrado`);
                return res.status(404).json({

                    mensaje: `Cliente con ID ${id_InfoMedica} no encontrado`

                });

            }

            await InfoMed.update({

                diagnostico,
                tratamiento

            });


            console.log(`Info med actualizada: ${InfoMed.id_InfoMedica}`);

            res.status(200).json({

                mensaje: 'Info med actualizada correctamente',
                datos: InfoMed

            });



        } catch (error){


            console.error('Error al actualizar infomed: ', error.message);

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

            const {id_InfoMedica} = req.params;
            console.log(`Eliminando infomed ID: ${id_InfoMedica}`);

            const InfoMed = await InfoMedica.findByPk(id_InfoMedica); //cambiar

            if (!InfoMed){


                console.log(`Infomed con ID: ${id_InfoMedica} no encontrado`);
                return res.status(404).json({

                    mensaje: `Infomed con ID: ${id_InfoMedica} no encontrado`

                });

            }

            const diagnosticoPaciente = InfoMed.diagnostico;

            await InfoMed.destroy();

            console.log(`InfoMedica eliminada: ${id_InfoMedica}`)

            res.status(200).json({

                mensaje: `Infomed ${id_InfoMedica} eliminada exitosamente`

            });



        } catch (error){


            console.error('Error al eliminar infomed: ', error.message);

            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({
                mensaje: 'No se puede eliminar la infomed',
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