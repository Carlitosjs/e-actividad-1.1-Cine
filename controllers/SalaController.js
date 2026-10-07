const { salas } = require('../data/db');

class SalaController {
  // GET /salas - Listar todas las salas
  static getAll(req, res) {
    res.render('salas/index', {
      titulo: 'Listado de Salas',
      salas
    });
  }

  // GET /salas/nueva - Mostrar formulario para crear sala
  static showCreateForm(req, res) {
    res.render('salas/crear-salas', {
      titulo: 'Nueva Sala'
    });
  }

  // POST /salas/nueva - Crear nueva sala
  static create(req, res) {
    const { nombre, capacidad, tipo } = req.body;

    // Generar ID autoincremental
    const nuevoId = salas.length ? salas[salas.length - 1].id + 1 : 1;

    const nuevaSala = {
      id: nuevoId,
      nombre,
      capacidad: Number(capacidad),
      tipo
    };

    salas.push(nuevaSala);
    res.redirect('/salas');
  }

  // GET /salas/:id/editar - Mostrar formulario para editar sala
  static showEditForm(req, res) {
    const { id } = req.params;
    const sala = salas.find(s => s.id == id);

    if (!sala) return res.redirect('/salas');

    res.render('salas/editar-salas', {
      titulo: 'Editar Sala',
      sala
    });
  }

  // POST /salas/:id/editar - Actualizar sala existente
  static update(req, res) {
    const { id } = req.params;
    const { nombre, capacidad, tipo } = req.body;

    const sala = salas.find(s => s.id == id);
    if (sala) {
      sala.nombre = nombre;
      sala.capacidad = Number(capacidad);
      sala.tipo = tipo;
    }

    res.redirect('/salas');
  }

  // POST /salas/:id/eliminar - Eliminar sala
  static delete(req, res) {
    const { id } = req.params;
    const index = salas.findIndex(s => s.id == id);

    if (index !== -1) {
      salas.splice(index, 1);
    }

    res.redirect('/salas');
  }
}

module.exports = SalaController;