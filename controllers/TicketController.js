// controllers/TicketController.js
const { tickets, funciones } = require('../data/db');

class TicketController {




 static getAll(req, res) {
  try {
    res.render('tickets', { tickets });
  } catch (error) {
    res.status(500).send("Error al cargar tickets: " + error.message);
  }
}


  // GET /tickets/:id - Obtener un ticket por ID
  static getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const ticket = tickets.find(t => t.id === id);

      if (!ticket) {
        return res.status(404).json({ error: "Ticket no encontrado" });
      }

      res.json(ticket);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el ticket: " + error.message });
    }
  }

  // POST /tickets - Generar un nuevo ticket
  static create(req, res) {
    try {
      const { funcionId, asiento, precio } = req.body;

      if (!funcionId || !asiento || !precio) {
        return res.status(400).json({ error: "Los campos funcionId, asiento y precio son obligatorios" });
      }

      const nuevoTicket = {
        id: tickets.length > 0 ? tickets[tickets.length - 1].id + 1 : 1,
        funcionId: parseInt(funcionId),
        asiento,
        precio: parseFloat(precio)
      };

      tickets.push(nuevoTicket);
      res.status(201).json({ mensaje: "Ticket generado con éxito", ticket: nuevoTicket });
    } catch (error) {
      res.status(500).json({ error: "Error al generar el ticket: " + error.message });
    }
  }

  // DELETE /tickets/:id - Eliminar un ticket
  static delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      const index = tickets.findIndex(t => t.id === id);

      if (index === -1) {
        return res.status(404).json({ error: "Ticket no encontrado" });
      }

      tickets.splice(index, 1);
      res.json({ mensaje: "Ticket eliminado con éxito" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el ticket: " + error.message });
    }
  }
}

module.exports = TicketController;
