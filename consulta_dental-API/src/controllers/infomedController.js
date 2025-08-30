const {InfoMedica} = require('../models');

const infomedController = {


    obtenerTodos: async (req, res) => {


        try {


            console.log('Searching All Medical Information');

            const InfoMed = await InfoMedica.findAll({


                order: [['diagnostico', 'ASC']]


            });


            console.log(`Se encontraron ${InfoMed.length} Informaciones medicas`);

            res.status(200),json({


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

            const InfoMed = await InfoMedica.findByPK(id_InfoMedica);
            
            if (!InfoMed){

                console.log(`Información medica con ID ${id_InfoMedica} no encontrado`);
                return res.status(404).json({

                    mensaje: `Información medica con ID ${id_InfoMedica} no encontrado`

                });

            }

            console.log(`Información medica encontrada: ${InfoMed.diagnostico}`)


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

            const { diagnostico, tratamiento}




        }


    }



}