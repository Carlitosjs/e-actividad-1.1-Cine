// controllers/FuncionController.js
const { funciones, peliculas, salas } = require('../data/db');

class FuncionController {
  static getAll(req, res) {
    try {
      const funcionesDetalladas = funciones.map(f => {
        const pelicula = peliculas.find(p => p.id === f.peliculaId);
        const sala = salas.find(s => s.id === f.salaId);
        return {
          ...f,
          pelicula: pelicula ? pelicula.titulo : "Desconocida",
          sala: sala ? sala.nombre : "Desconocida"
        };
      });
      res.json(funcionesDetalladas);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las funciones: " + error.message });
    }
  }

  static create(req, res) {
    try {
      const { peliculaId, salaId, fechaHora } = req.body;
      if (!peliculaId || !salaId || !fechaHora) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
      }

      const nuevaFuncion = {
        id: funciones.length > 0 ? funciones[funciones.length - 1].id + 1 : 1,
        peliculaId: parseInt(peliculaId),
        salaId: parseInt(salaId),
        fechaHora
      };

      funciones.push(nuevaFuncion);
      res.status(201).json({ mensaje: "Función programada con éxito", funcion: nuevaFuncion });
    } catch (error) {
      res.status(500).json({ error: "Error al crear la función: " + error.message });
    }
  }


static getAll(req, res) {
  const funcionesDetalladas = funciones.map(f => {
    const pelicula = peliculas.find(p => p.id === f.peliculaId);
    const sala = salas.find(s => s.id === f.salaId);
    return {
      ...f,
      pelicula: pelicula ? pelicula.titulo : "Desconocida",
      sala: sala ? sala.nombre : "Desconocida"
    };
  });
  res.render('funciones', { funciones: funcionesDetalladas });
}


}

module.exports = FuncionController;