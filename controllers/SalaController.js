const Sala = require('../models/Sala');

class SalaController {
  async index(req, res) {
    try {
      const salas = await Sala.find();
      res.render('salas/index', { salas: salas || [],titulo: 'Listado de Salas' });
    } catch (error) {
      res.status(500).send('Error al obtener las salas: ' + error.message);
    }
  }

  createView(req, res) {
    res.render('salas/crear-salas',{ titulo: 'Crear Nueva Sala' });
  }

 async create(req, res) {
    try {
      console.log('DATOS RECIBIDOS EN REQ.BODY:', req.body); // 👈 Para ver si llegan los datos del formulario
      const nuevaSala = new Sala(req.body);
      await nuevaSala.save();
      return res.redirect('/salas');
    } catch (error) {
      console.log('ERROR DETALLADO:', error); // 👈 Para ver el error real en la terminal
      return res.status(500).send('Error al guardar la sala: ' + (error.message || error));
    }
  }

  async editView(req, res) {
    try {
      const sala = await Sala.findById(req.params.id);
      res.render('salas/editar-salas', { sala , titulo:'Editar Sala'});
    } catch (error) {
      res.status(500).send('Error al buscar la sala: ' + error.message);
    }
  }

  async update(req, res) {
    try {
      await Sala.findByIdAndUpdate(req.params.id, req.body);
      res.redirect('/salas');
    } catch (error) {
      res.status(500).send('Error al actualizar la sala: ' + error.message);
    }
  }

  async delete(req, res) {
    try {
      await Sala.findByIdAndDelete(req.params.id);
      res.redirect('/salas');
    } catch (error) {
      res.status(500).send('Error al eliminar la sala: ' + error.message);
    }
  }
}

module.exports = new SalaController();