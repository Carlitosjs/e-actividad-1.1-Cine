const mongoose = require('mongoose');

const metodoPagoSchema = new mongoose.Schema({
  tipo: { type: String, required: true }, // Ej: Tarjeta, Efectivo, Pago Móvil, Binance USDT
  activo: { type: Boolean, default: true }
});

module.exports = mongoose.model('MetodoPago', metodoPagoSchema);