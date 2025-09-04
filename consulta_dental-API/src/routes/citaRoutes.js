const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');


router.get('/', citaController.obtenerTodos);
router.get('/:id_Cita', citaController.obtenerPorId);
router.post('/', citaController.crear);
router.put('/:id_Cita', citaController.actualizar);
router.delete('/:id_Cita', citaController.eliminar);

module.exports = router;