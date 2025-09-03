const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');


router.get('/', infomedController.obtenerTodos);
router.get('/:id_Cita', infomedController.obtenerPorId);
router.post('/', infomedController.crear);
router.put('/:id_Cita', infomedController.actualizar);
router.delete('/:id_Cita', infomedController.eliminar);

module.exports = router;