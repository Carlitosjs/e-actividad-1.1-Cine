const ItemVenta = require('../models/ItemVenta');

const ItemVentaController = {
  index: async (req, res) => {
    try {
      const items = await ItemVenta.find();
      res.render('items-venta/index', { items, titulo: 'Items de Venta' });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  createView: (req, res) => {
    res.render('items-venta/nueva', { titulo: 'Items de Venta' });
  },

  create: async (req, res) => {
    try {
      const nuevo = new ItemVenta({
        nombre: req.body.nombre,
        precio: Number(req.body.precio),
        stock: Number(req.body.stock)
      });
      await nuevo.save();
      res.redirect('/items-venta');
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  editView: async (req, res) => {
    try {
      const item = await ItemVenta.findById(req.params.id);
      if (!item) return res.status(404).send('Item de venta no encontrado');
      res.render('items-venta/editar', { item, titulo: 'Items de Venta' });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  update: async (req, res) => {
    try {
      await ItemVenta.findByIdAndUpdate(
        req.params.id,
        {
          nombre: req.body.nombre,
          precio: Number(req.body.precio),
          stock: Number(req.body.stock)
        },
        { new: true }
      );
      res.redirect('/items-venta');
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  delete: async (req, res) => {
    try {
      await ItemVenta.findByIdAndDelete(req.params.id);
      res.redirect('/items-venta');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

module.exports = ItemVentaController;