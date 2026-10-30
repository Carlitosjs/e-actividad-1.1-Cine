const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Funcion = require('../models/Funcion');
const Reservacion = require('../models/Reservacion');
const reservacionController = require('../controllers/ReservacionController');
const db = require('../data/db');

//  Vista principal en el navegador (Renderiza EJS)
router.get('/', async (req, res) => {
    try {
        const reservaciones = await Reservacion.find().populate('ticketId').populate('funcionId');
        res.render('reservaciones/reservaciones', { reservaciones: reservaciones || [] });
    } catch (error) {
        res.status(500).send('Error al obtener las reservaciones: ' + error.message);
    }
});

//  Vista del formulario de creación en el navegador (Renderiza EJS)
router.get('/nueva', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        const funciones = await Funcion.find().populate('peliculaId').populate('salaId'); // Buscamos las funciones con sus relaciones
        res.render('reservaciones/crear-reservacion', { tickets, funciones }); // Pasamos ambas variables a la vista
    } catch (error) {
        res.status(500).send('Error al cargar el formulario: ' + error.message);
    }
});
//Endpoints para API / Thunder Client 
router.get('/ultimas', (req, res) => reservacionController.getUltimasCinco(req, res));
router.get('/rango', (req, res) => reservacionController.getByRangoFecha(req, res));

router.post('/nueva', (req, res) => reservacionController.create(req, res));
router.put('/:id', (req, res) => reservacionController.update(req, res));
router.post('/eliminar/:id', async (req, res) => {
    try {
        await Reservacion.findByIdAndDelete(req.params.id);
        res.redirect('/reservaciones');
    } catch (error) {
        res.status(500).send('Error al eliminar la reservación: ' + error.message);
    }
});

module.exports = router;