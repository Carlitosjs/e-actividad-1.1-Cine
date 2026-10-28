const express = require('express');
const router = express.Router();
const SalaController = require('../controllers/SalaController');

// Rutas estáticas
router.get('/', SalaController.index);       
router.get('/nueva', SalaController.createView); 
router.post('/nueva', SalaController.create);

// Rutas dinámicas
router.get('/:id/editar', SalaController.editView);
router.post('/:id/editar', SalaController.update);
router.post('/:id/eliminar', SalaController.delete);

module.exports = router;