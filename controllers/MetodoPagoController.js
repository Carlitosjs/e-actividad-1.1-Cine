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
      activo:
        req.body.activo === 'on' ||
        req.body.activo === true ||
        req.body.activo === 'true'
    };
    const actualizado = await MetodoPago.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );
    if (!actualizado) {
      return res.status(404).json({ error: 'Método de pago no encontrado' });
    }
    if (req.method === 'PUT' || req.headers.accept?.includes('application/json')) {
      return res.status(200).json({ mensaje: 'Método de pago actualizado con éxito', data: actualizado });
    }
    res.redirect('/metodos-pago');
  } catch (error) {
    res.status(400).send(error.message);
  }
},

delete: async (req, res) => {
  try {
    const eliminado = await MetodoPago.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Método de pago no encontrado' });
    }
    if (req.method === 'DELETE' || req.headers.accept?.includes('application/json')) {
      return res.status(200).json({ mensaje: 'Método de pago eliminado con éxito', id: req.params.id });
    }
    res.redirect('/metodos-pago');
  } catch (error) {
    res.status(500).send(error.message);
  }
}
};

module.exports = MetodoPagoController;