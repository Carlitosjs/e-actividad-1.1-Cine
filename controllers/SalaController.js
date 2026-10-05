const { salas } = require('../data/db');

class SalaController {

  static getAll(req, res) {
    try {
      res.render('salas', { salas });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las salas: " + error.message });
    }
  }

  static getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const sala = salas.find(s => s.id === id);

      if (!sala) return res.status(404).json({ error: "Sala no encontrada" });
      res.json(sala);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la sala: " + error.message });
    }
  }


  static create(req, res) {
    try {
      const { nombre, capacidad } = req.body;
      if (!nombre || !capacidad) return res.status(400).json({ error: "Nombre y capacidad son requeridos" });

      const nuevaSala = {
        id: salas.length > 0 ? salas[salas.length - 1].id + 1 : 1,
        nombre,
        capacidad: parseInt(capacidad)
      };

      salas.push(nuevaSala);
      res.status(201).json({ mensaje: "Sala creada con éxito", sala: nuevaSala });
    } catch (error) {
      res.status(500).json({ error: "Error al crear la sala: " + error.message });
    }
  }
}

module.exports = SalaController;