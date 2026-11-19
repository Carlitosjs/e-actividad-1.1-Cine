const Categoria = require('../models/Categoria');

const CategoriaController = {
  index: async (req, res) => {
    try {
      const categorias = await Categoria.find();
      res.render('categorias/index', { categorias, titulo: 'Categorías' });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  createView: (req, res) => {
    res.render('categorias/nueva', { titulo: 'Categorías' });
  },

  create: async (req, res) => {
    try {
      const nueva = new Categoria(req.body);
      await nueva.save();
      res.redirect('/categorias');
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  editView: async (req, res) => {
    try {
      const categoria = await Categoria.findById(req.params.id);
      if (!categoria) return res.status(404).send('Categoría no encontrada');
      res.render('categorias/editar', { categoria ,titulo: 'Categorías' });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  update: async (req, res) => {
    try {
      await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.redirect('/categorias');
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  delete: async (req, res) => {
    try {
      await Categoria.findByIdAndDelete(req.params.id);
      res.redirect('/categorias');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

module.exports = CategoriaController;