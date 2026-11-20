const mongoose = require('mongoose');


const itemVentaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true }
});

module.exports = mongoose.model('ItemVenta', itemVentaSchema);