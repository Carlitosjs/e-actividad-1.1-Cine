const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  genero: { type: String, required: true },
  duracion: { type: Number, required: true },
  fechaEstreno: { type: String }
});


module.exports = mongoose.model('Pelicula', peliculaSchema, 'Películas');