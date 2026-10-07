// routes/peliculas.js
const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/PeliculaController');

//   Rutas específicas GET para vistas HTML web
router.get('/', (req, res) => peliculaController.index(req, res));
router.get('/nueva', (req, res) => peliculaController.createView(req, res));
router.get('/ultimas', (req, res) => peliculaController.getUltimosCinco(req, res));

//  Rutas dinámicas GET para acciones web 
router.get('/:id/editar', (req, res) => peliculaController.editView(req, res));
router.post('/:id/eliminar', (req, res) => peliculaController.delete(req, res));
router.get('/:id/eliminar', (req, res) => peliculaController.delete(req, res)); 
router.get('/:id', (req, res) => peliculaController.getById(req, res));

// Métodos HTTP para formulario y Thunder Client 
router.post('/nueva', (req, res) => peliculaController.create(req, res));
router.post('/:id/editar', (req, res) => peliculaController.update(req, res));
router.put('/:id', (req, res) => peliculaController.update(req, res));
router.delete('/:id', (req, res) => peliculaController.delete(req, res));

module.exports = router;