const { tickets, funciones, peliculas, salas } = require('../data/db');

class TicketController {
  // GET /tickets - Listar tickets con detalle de función, película y sala
  static getAll(req, res) {
    const ticketsConDetalle = tickets.map(t => {
      const funcion = funciones.find(f => f.id == t.funcionId) || {};
      const pelicula = peliculas.find(p => p.id == funcion.peliculaId);
      const sala = salas.find(s => s.id == funcion.salaId);

      return {
        ...t,
        peliculaNombre: pelicula ? pelicula.titulo : 'N/A',
        salaNombre: sala ? sala.nombre : 'N/A',
        fechaHora: funcion.fechaHora || 'N/A'
      };
    });

    res.render('tickets/tickets', {
      titulo: 'Listado de Tickets',
      tickets: ticketsConDetalle
    });
  }

  // GET /tickets/nuevo - Formulario para emitir nuevo ticket
  static showCreateForm(req, res) {
    const funcionesConDetalle = funciones.map(f => {
      const pelicula = peliculas.find(p => p.id == f.peliculaId);
      return {
        ...f,
        peliculaNombre: pelicula ? pelicula.titulo : 'Película'
      };
    });

    res.render('tickets/crear-tickets', {
      titulo: 'Nuevo Ticket',
      funciones: funcionesConDetalle
    });
  }

  // POST /tickets/nuevo - Guardar ticket
  static create(req, res) {
    const { funcionId, cliente, asiento, precio } = req.body;
    const nuevoId = tickets.length ? tickets[tickets.length - 1].id + 1 : 1;

    const nuevoTicket = {
      id: nuevoId,
      funcionId: Number(funcionId),
      cliente,
      asiento,
      precio: Number(precio) || 0
    };

    tickets.push(nuevoTicket);
    res.redirect('/tickets');
  }

  // POST /tickets/:id/eliminar - Cancelar/Eliminar ticket
  static delete(req, res) {
    const { id } = req.params;
    const index = tickets.findIndex(t => t.id == id);

    if (index !== -1) {
      tickets.splice(index, 1);
    }

    res.redirect('/tickets');
  }
}

module.exports = TicketController;