const Paciente = require('./Paciente');
const Infomedica = require('./InfoMedica');
const Cita = require('./Cita');

// Relaciones Paciente -> InfoMedica (1:1)
Paciente.hasOne(Infomedica, {
    foreignKey: 'id_InfoMedica',   // FK de la tabla padre
    sourceKey: 'id_InfoMedica',    // columna de Paciente que referencia
    as: 'infomedica'
});
Infomedica.belongsTo(Paciente, {
    foreignKey: 'id_InfoMedica',
    targetKey: 'id_InfoMedica',    // apunta a la columna de Paciente
    as: 'paciente'
});

// Relaciones Paciente -> Cita (1:1)
Paciente.hasOne(Cita, {
    foreignKey: 'id_Cita',         // FK de la tabla padre
    sourceKey: 'id_Cita',          // columna de Paciente que referencia
    as: 'cita'
});
Cita.belongsTo(Paciente, {
    foreignKey: 'id_Cita',
    targetKey: 'id_Cita',          // apunta a la columna de Paciente
    as: 'paciente'
});

module.exports = {
    Paciente,
    Infomedica,
    Cita
};
