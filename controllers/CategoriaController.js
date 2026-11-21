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
  res.render('categorias/nueva', { titulo: 'Nueva Categoría', categorias: [] });
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
    const actualizada = await Categoria.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!actualizada) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    if (req.method === 'PUT' || req.headers.accept?.includes('application/json')) {
      return res.status(200).json({ mensaje: 'Categoría actualizada con éxito', data: actualizada });
    }
    res.redirect('/categorias');
  } catch (error) {
    res.status(400).send(error.message);
  }
},

delete: async (req, res) => {
  try {
    const eliminada = await Categoria.findByIdAndDelete(req.params.id);
    if (!eliminada) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    if (req.method === 'DELETE' || req.headers.accept?.includes('application/json')) {
      return res.status(200).json({ mensaje: 'Categoría eliminada con éxito', id: req.params.id });
    }
    res.redirect('/categorias');
  } catch (error) {
    res.status(500).send(error.message);
  }
}
};

module.exports = CategoriaController;