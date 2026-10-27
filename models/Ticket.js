const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  funcionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Funcion', required: true },
  asiento: { type: String, required: true },
  precio: { type: Number, required: true },
  cliente: { type: String, required: true }
});

module.exports = mongoose.model('Ticket', ticketSchema, 'Tickets');