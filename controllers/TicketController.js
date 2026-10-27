const Ticket = require('../models/Ticket');

class TicketController {
  // Agrega 'static' a todos los métodos
  static async index(req, res) {
    try {
      const tickets = await Ticket.find().populate({
        path: 'funcionId',
        populate: [{ path: 'peliculaId' }, { path: 'salaId' }]
      });
      res.render('tickets/tickets', { tickets: tickets || [] ,titulo: 'Listado de Tickets'  });
    } catch (error) {
      res.status(500).send('Error al obtener los tickets: ' + error.message);
    }
  }

  static async showCreateForm(req, res) {
    res.render('tickets/crear-ticket');
  }

  static async create(req, res) {
    try {
      const nuevoTicket = new Ticket(req.body);
      await nuevoTicket.save();
      res.redirect('/tickets');
    } catch (error) {
      res.status(500).send('Error al guardar el ticket: ' + error.message);
    }
  }

  static async delete(req, res) {
    try {
      await Ticket.findByIdAndDelete(req.params.id);
      res.redirect('/tickets');
    } catch (error) {
      res.status(500).send('Error al eliminar el ticket: ' + error.message);
    }
  }
}

module.exports = TicketController;