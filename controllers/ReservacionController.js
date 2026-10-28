const Funcion = require('../models/Funcion');
const Ticket = require('../models/Ticket');
const Reservacion = require('../models/Reservacion');

class ReservacionController {

  async index(req, res) {
    try {
      const reservaciones = await Reservacion.find().populate('ticketId');
      res.render('reservaciones/reservaciones', { reservaciones: reservaciones || [] });
    } catch (error) {
      res.status(500).send('Error al obtener las reservaciones: ' + error.message);
    }
  }

  async createView(req, res) {
    try {
      const tickets = await Ticket.find();
      const funciones = await Funcion.find().populate('peliculaId').populate('salaId'); // <--- Añade esto
      res.render('reservaciones/crear-reservacion', { tickets, funciones }); // <--- Pásalo a la vista
    } catch (error) {
      res.status(500).send('Error al cargar el formulario: ' + error.message);
    }
  }

  async create(req, res) {
    try {
      const nuevaReservacion = new Reservacion(req.body);
      await nuevaReservacion.save();
      res.redirect('/reservaciones');
    } catch (error) {
      res.status(500).send('Error al guardar la reservacion: ' + error.message);
    }
  }


  async delete(req, res) {
    try {
      await Reservacion.findByIdAndDelete(req.params.id);
      res.redirect('/reservaciones');
    } catch (error) {
      res.status(500).send('Error al eliminar la reservación: ' + error.message);
    }
  }
}

module.exports = new ReservacionController();