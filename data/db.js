
const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    // Conexión asíncrona a tu base de datos 'Cine' en MongoDB Atlas
    await mongoose.connect('mongodb+srv://carlosmiguelvallesnavea_db_user:7529818Carlos@cinecluster.eyrm6gh.mongodb.net/Cine?retryWrites=true&w=majority');
    console.log('¡Conectado exitosamente a MongoDB Atlas (Cine)!');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
};

module.exports = conectarDB;