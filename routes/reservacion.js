const express = require('express');
const router = express.Router();
const ReservacionController = require('../controllers/ReservacionController');

// Rutas de reservaciones
router.get('/', ReservacionController.getAll);
router.get('/nueva', ReservacionController.showCreateForm);
router.post('/nueva', ReservacionController.create);

module.exports = router;