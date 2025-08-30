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



        }



    }



}