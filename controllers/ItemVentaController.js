const ItemVenta = require('../models/ItemVenta');

const ItemVentaController = {
  index: async (req, res) => {
    try {
      const items = await ItemVenta.find();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const nuevo = new ItemVenta(req.body);
      await nuevo.save();
      res.json({ mensaje: "Item de venta creado con éxito", data: nuevo });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const actualizado = await ItemVenta.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ mensaje: "Item de venta actualizado con éxito", data: actualizado });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      await ItemVenta.findByIdAndDelete(req.params.id);
      res.json({ mensaje: "Item de venta eliminado con éxito" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ItemVentaController;