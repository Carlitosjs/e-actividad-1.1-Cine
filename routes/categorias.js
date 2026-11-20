const express = require('express');
const router = express.Router();
const controller = require('../controllers/CategoriaController');
const { requerirRol } = require('../middleware/authRol');

router.get('/', controller.index);
router.get('/nueva', requerirRol('admin'), controller.createView);
router.post('/nueva', requerirRol('admin'), controller.create);
router.get('/:id/editar', requerirRol('admin'), controller.editView);
router.post('/:id/editar', requerirRol('admin'), controller.update);
router.post('/:id/eliminar', requerirRol('admin'), controller.delete);
router.put('/:id', requerirRol('admin'), controller.update);
router.delete('/:id', requerirRol('admin'), controller.delete);
module.exports = router;