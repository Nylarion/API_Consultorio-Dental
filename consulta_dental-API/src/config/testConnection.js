const sequelize = require('./database');

async function testConnection(){

    try{


        await sequelize.authenticate();
        console.log('Connection Works!');

        console.log(`DATABASE: ${sequelize.config.database}`);
        console.log(`HOST: ${sequelize.config.host}: ${sequelize.config.port}`);

    } catch (error){


        console.error('Error: Can´t connect to MYSQL: ', error.message);
        if (error.message.includes('ECONNREFUSED')){

                
            console.log('Solution: Verify if MYSQL is working');


        }

        if (error.message.includes('Access Denied')){


            console.log('Solution: Verify your user and password');


        }
            

    } 


}

testConnection();