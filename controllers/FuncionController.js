const Funcion = require('../models/Funcion');

class FuncionController {
  
  async getAll(req, res) {
    try {
      const funciones = await Funcion.find().populate('peliculaId').populate('salaId');
      res.render('funciones/funciones', { 
        funciones: funciones || [], 
        titulo: 'Listado de Funciones' // <--- Añade esto
      });
    } catch (error) {
      res.status(500).send('Error al obtener las funciones: ' + error.message);
    }
  }

  createView(req, res) {
    res.render('funciones/crear-funcion');
  }

  async create(req, res) {
    try {
      const nuevaFuncion = new Funcion(req.body);
      await nuevaFuncion.save();
      res.redirect('/funciones');
    } catch (error) {
      res.status(500).send('Error al guardar la función: ' + error.message);
    }
  }

  async delete(req, res) {
    try {
      await Funcion.findByIdAndDelete(req.params.id);
      res.redirect('/funciones');
    } catch (error) {
      res.status(500).send('Error al eliminar la función: ' + error.message);
    }
  }
}

module.exports = new FuncionController();