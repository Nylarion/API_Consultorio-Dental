const express = require('express');
const router = express.Router();
const infomedController = require('../controllers/infomedController');


router.get('/', infomedController.obtenerTodos);
router.get('/:id', infomedController.obtenerPorId);
router.post('/', infomedController.crear);
router.put('/:id', infomedController.actualizar);
router.delete('/:id', infomedController.eliminar);

module.exports = router;