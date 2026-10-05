// controllers/ReservacionController.js
const { reservaciones } = require('../data/db');

class ReservacionController {
  // GET /reservaciones - Obtener todas las reservaciones
  static getAll(req, res) {
    try {
      res.json(reservaciones);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener reservaciones: " + error.message });
    }
  }

  // GET /reservaciones/:id - Obtener una reservación por ID
  static getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const reservacion = reservaciones.find(r => r.id === id);

      if (!reservacion) {
        return res.status(404).json({ error: "Reservación no encontrada" });
      }

      res.json(reservacion);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la reservación: " + error.message });
    }
  }

  // POST /reservaciones - Crear una nueva reservación
  static create(req, res) {
    try {
      const { ticketId, usuario, estado } = req.body;

      if (!ticketId || !usuario) {
        return res.status(400).json({ error: "Los campos ticketId y usuario son obligatorios" });
      }

      const nuevaReservacion = {
        id: reservaciones.length > 0 ? reservaciones[reservaciones.length - 1].id + 1 : 1,
        ticketId: parseInt(ticketId),
        usuario,
        estado: estado || "Confirmada"
      };

      reservaciones.push(nuevaReservacion);
      res.status(201).json({ mensaje: "Reservación creada con éxito", reservacion: nuevaReservacion });
    } catch (error) {
      res.status(500).json({ error: "Error al crear la reservación: " + error.message });
    }
  }

  // DELETE /reservaciones/:id - Cancelar o eliminar una reservación
  static delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      const index = reservaciones.findIndex(r => r.id === id);

      if (index === -1) {
        return res.status(404).json({ error: "Reservación no encontrada" });
      }

      reservaciones.splice(index, 1);
      res.json({ mensaje: "Reservación eliminada con éxito" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la reservación: " + error.message });
    }
  }
}

module.exports = ReservacionController;