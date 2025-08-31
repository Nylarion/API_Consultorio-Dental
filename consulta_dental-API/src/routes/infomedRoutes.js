const express = require('express');
const router = express.Router();
const infomedController = require('../controllers/infomedController');


router.get('/', infomedController.obtenerTodos);
router.get('/:id_InfoMedica', infomedController.obtenerPorId);
router.post('/', infomedController.crear);
router.put('/:id_InfoMedica', infomedController.actualizar);
router.delete('/:id_InfoMedica', infomedController.eliminar);

module.exports = router;