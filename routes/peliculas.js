// routes/peliculas.js
const express = require('express');
const router = express.Router();
const PeliculaController = require('../controllers/PeliculaController');

// Rutas asociadas a los métodos estáticos del controlador
router.get('/', PeliculaController.getAll);
router.get('/:id', PeliculaController.getById);
router.post('/', PeliculaController.create);
router.put('/:id', PeliculaController.update);
router.delete('/:id', PeliculaController.delete);

module.exports = router;