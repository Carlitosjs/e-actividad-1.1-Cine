const mongoose = require('mongoose');

const reservacionSchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  usuario: { type: String, required: true },
  estado: { type: String, required: true }
});

module.exports = mongoose.model('Reservacion', reservacionSchema, 'Reservaciones');