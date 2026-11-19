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
    const data = {
      nombre: req.body.nombre,
      precio: Number(req.body.precio),
      stock: Number(req.body.stock)
    };
    const actualizado = await ItemVenta.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );
    if (!actualizado) {
      return res.status(404).json({ error: 'Item de venta no encontrado' });
    }
    if (req.method === 'PUT' || req.headers.accept?.includes('application/json')) {
      return res.status(200).json({ mensaje: 'Item de venta actualizado con éxito', data: actualizado });
    }
    res.redirect('/items-venta');
  } catch (error) {
    res.status(400).send(error.message);
  }
},

delete: async (req, res) => {
  try {
    const eliminado = await ItemVenta.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Item de venta no encontrado' });
    }
    if (req.method === 'DELETE' || req.headers.accept?.includes('application/json')) {
      return res.status(200).json({ mensaje: 'Item de venta eliminado con éxito', id: req.params.id });
    }
    res.redirect('/items-venta');
  } catch (error) {
    res.status(500).send(error.message);
  }
}
};

module.exports = ItemVentaController;