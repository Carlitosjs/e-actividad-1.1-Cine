const Categoria = require('../models/Categoria');

const CategoriaController = {
  index: async (req, res) => {
    try {
      const categorias = await Categoria.find();
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const nueva = new Categoria(req.body);
      await nueva.save();
      res.json({ mensaje: "Categoría creada con éxito", data: nueva });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const actualizada = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ mensaje: "Categoría actualizada con éxito", data: actualizada });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      await Categoria.findByIdAndDelete(req.params.id);
      res.json({ mensaje: "Categoría eliminada con éxito" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = CategoriaController;