const Paciente = require('./Paciente')
const Infomedica = require('./InfoMedica')
const Cita = require('./Cita')

Paciente.hasMany(Infomedica, {

    foreignKey: 'id_Paciente',
    as: 'infomedicas'
})

Infomedica.belongsTo(Paciente,{

    foreignKey: 'id_Paciente',    
    as: 'paciente'

})

Paciente.hasMany(Cita, {

    foreignKey: 'id_Paciente',
    as: 'citas'
})

Cita.belongsTo(Paciente, {

    foreignKey: 'id_Paciente',
    as: 'paciente'

});

module.exports = {

    Paciente,
    Infomedica,
    Cita

};