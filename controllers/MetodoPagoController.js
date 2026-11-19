const MetodoPago = require('../models/MetodoPago');

const MetodoPagoController = {
  index: async (req, res) => {
    try {
      const metodos = await MetodoPago.find();
      res.json(metodos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const nuevo = new MetodoPago(req.body);
      await nuevo.save();
      res.json({ mensaje: "Método de pago creado con éxito", data: nuevo });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const actualizado = await MetodoPago.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ mensaje: "Método de pago actualizado con éxito", data: actualizado });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      await MetodoPago.findByIdAndDelete(req.params.id);
      res.json({ mensaje: "Método de pago eliminado con éxito" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = MetodoPagoController;