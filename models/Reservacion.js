const mongoose = require('mongoose');

const reservacionSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    required: true
  },
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  funcionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Funcion',
    required: true
  }
});

module.exports = mongoose.model('Reservacion', reservacionSchema);