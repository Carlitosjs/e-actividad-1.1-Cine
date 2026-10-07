const express = require('express');
const router = express.Router();
const reservacionController = require('../controllers/ReservacionController');
const db = require('../data/db');

// 1. Vista principal en el navegador (Renderiza EJS)
router.get('/', (req, res) => {
  res.render('reservaciones/reservaciones', { reservaciones: db.reservaciones });
});

// 2. Vista del formulario de creación en el navegador (Renderiza EJS)
router.get('/nueva', (req, res) => {
  res.render('reservaciones/crear-reservacion');
});

// 3. Endpoints para API / Thunder Client (Filtros y Métodos HTTP)
router.get('/ultimas', (req, res) => reservacionController.getUltimasCinco(req, res));
router.get('/rango', (req, res) => reservacionController.getByRangoFecha(req, res));

router.post('/nueva', (req, res) => reservacionController.create(req, res));
router.put('/:id', (req, res) => reservacionController.update(req, res));
router.delete('/:id', (req, res) => reservacionController.delete(req, res));

module.exports = router;