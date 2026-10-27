const mongoose = require('mongoose');

const funcionSchema = new mongoose.Schema({
  peliculaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pelicula', required: true },
  salaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sala', required: true },
  fechaHora: { type: String, required: true },
  precio: { type: Number, required: true }
});

module.exports = mongoose.model('Funcion', funcionSchema, 'Funciones');