const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');


router.get('/', pacienteController.obtenerTodos);
router.get('/:id_Paciente', pacienteController.obtenerPorId);
router.post('/', pacienteController.crear);
router.put('/:id_Paciente', pacienteController.actualizar);
router.delete('/:id_Paciente', pacienteController.eliminar);

module.exports = router;