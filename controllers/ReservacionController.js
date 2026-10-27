const Reservacion = require('../models/Reservacion');

class ReservacionController {
  async index(req, res) {
    try {
      const reservaciones = await Reservacion.find().populate({
        path: 'ticketId',
        populate: {
          path: 'funcionId',
          populate: [{ path: 'peliculaId' }, { path: 'salaId' }]
        }
      });
      res.render('reservaciones/reservaciones', { reservaciones: reservaciones || [] });
    } catch (error) {
      res.status(500).send('Error al obtener las reservaciones: ' + error.message);
    }
  }

  createView(req, res) {
    res.render('reservaciones/crear-reservacion');
  }

  async create(req, res) {
    try {
      const nuevaReservacion = new Reservacion(req.body);
      await nuevaReservacion.save();
      res.redirect('/reservaciones');
    } catch (error) {
      res.status(500).send('Error al guardar la reservación: ' + error.message);
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