const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');



const pacienteRoutes = require('./routes/pacienteRoutes');
const infomedicaRoutes = require('./routes/infomedRoutes');
const citaRoutes = require('./routes/citaRoutes');
const { Infomedica } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {


    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();

});


app.get('/', (req, res) => {

    res.json({

        mensaje: '¡Bienvenido a API REST!',
        version: '0.0.1',
        endpoints: {

            Paciente: '/api/pacientes',
            Infomedica: '/api/infomedica',
            Cita: '/api/cita'
        },

        documentacion: 'Consulta la guía para ver todos los endpoints disponibles'


    });

});

app.use('/api/pacientes', pacienteRoutes); //CAMBIAR SEGUN MODELO
app.use('/api/infomedica', infomedicaRoutes); 
app.use('/api/cita', citaRoutes); 

app.use((req, res) => {

    res.status(404).json({

        mensaje: 'Ruta no encontrada',
        ruta_solicitada: req.originalUrl,
        metodo: req.method,
        sugerencia: 'Verifica la URL y el metodo HTTP'

    });


});

app.use((error, req, res, next) =>{


    console.error('Error no manejado: ', error);


    res.status(500).json({

        mensaje: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message: 'Algo salió mal'

    });



});


async function iniciarServidor(){

    try {

        console.log('Conectando a la base de datos...');
        await sequelize.authenticate();
        console.log('Conexión a MySQL exitosa');


        app.listen(PORT, () => {

            console.log('Servidor iniciado exitosamente');
            console.log(`URL: http://localhost:${PORT}`);
            console.log(`API Base: http://localhost:${PORT}/api`);
            console.log('Endpoints disponibles:');
            console.log(' - GET /api/infomedica');
            console.log(' - POST /api/infomedica');
            console.log(' - GET /api/...');
            console.log(' - POST /api/...');
            console.log(' - GET /api/...');
            console.log(' - POST /api/...');
            console.log(' - GET /api/...');
            console.log(' - POST /api/...');
            console.log('');
            console.log('Para detener el servidor: Ctrl + C');

        });

    } catch (error){

        console.error('Error al iniciar el servidor: ', error.message);
        process.exit(1);

    }

}

iniciarServidor();
module.exports = app;