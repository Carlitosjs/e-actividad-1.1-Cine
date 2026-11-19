const MetodoPago = require('../models/MetodoPago');

const MetodoPagoController = {
  index: async (req, res) => {
    try {
      const metodos = await MetodoPago.find();
      res.render('metodos-pago/index', { metodos, titulo: 'Métodos de Pago' });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  createView: (req, res) => {
    res.render('metodos-pago/nueva', { titulo: 'Métodos de Pago' });
  },

  create: async (req, res) => {
    try {
      const data = {
        tipo: req.body.tipo,
        activo: req.body.activo === 'on' || req.body.activo === true || req.body.activo === 'true'
      };
      const nuevo = new MetodoPago(data);
      await nuevo.save();
      res.redirect('/metodos-pago');
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  editView: async (req, res) => {
    try {
      const metodo = await MetodoPago.findById(req.params.id);
      if (!metodo) return res.status(404).send('Método de pago no encontrado');
      res.render('metodos-pago/editar', { metodo, titulo: 'Métodos de Pago' });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  update: async (req, res) => {
    try {
      const data = {
        tipo: req.body.tipo,
        activo: req.body.activo === 'on' || req.body.activo === true || req.body.activo === 'true'
      };
      await MetodoPago.findByIdAndUpdate(req.params.id, data, { new: true });
      res.redirect('/metodos-pago');
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  delete: async (req, res) => {
    try {
      await MetodoPago.findByIdAndDelete(req.params.id);
      res.redirect('/metodos-pago');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

module.exports = MetodoPagoController;