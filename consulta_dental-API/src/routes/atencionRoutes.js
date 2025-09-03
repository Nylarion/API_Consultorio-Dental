const express = require('express');
const router = express.Router();
const atencionController = require('../controllers/atencionController');


router.get('/', infomedController.obtenerTodos);
router.get('/:id_Atencion', infomedController.obtenerPorId);
router.post('/', infomedController.crear);
router.put('/:id_Atencion', infomedController.actualizar);
router.delete('/:id_Atencion', infomedController.eliminar);

module.exports = router;