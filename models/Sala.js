const mongoose = require('mongoose');

const salaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  capacidad: { type: Number, required: true },
  tipo: { type: String, required: true }
});

module.exports = mongoose.model('Sala', salaSchema, 'Salas');