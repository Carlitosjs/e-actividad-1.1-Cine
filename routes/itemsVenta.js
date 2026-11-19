const express = require('express');
const router = express.Router();
const controller = require('../controllers/ItemVentaController');

router.get('/', controller.index);
router.get('/nueva', controller.createView);
router.post('/nueva', controller.create);
router.get('/:id/editar', controller.editView);
router.post('/:id/editar', controller.update);
router.post('/:id/eliminar', controller.delete);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;