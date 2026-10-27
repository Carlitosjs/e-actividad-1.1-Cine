const Ticket = require('../models/Ticket');
const Funcion = require('../models/Funcion');

class TicketController {
  
 static async index(req, res) {
    try {
      const tickets = await Ticket.find().populate({
        path: 'funcionId',
        populate: [
          { path: 'peliculaId' },
          { path: 'salaId' }
        ]
      });
      
      console.log('DATOS DE TICKETS:', tickets);

      return res.render('tickets/tickets', { 
        tickets: tickets || [], 
        titulo: 'Listado de Tickets' 
      });
      
    } catch (error) {
      
      return res.status(500).send('Error al obtener los tickets: ' + error.message);
    }
  }

  static async showCreateForm(req, res) {
    try {
      const funciones = await Funcion.find().populate({
        path: 'peliculaId'
      }).populate({
        path: 'salaId'
      });

      return res.render('tickets/crear-tickets', { 
        funciones: funciones || [],
        titulo: 'Emitir Nuevo Ticket' 
      });
    } catch (error) {
      return res.status(500).send('Error al cargar el formulario: ' + error.message);
    }
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