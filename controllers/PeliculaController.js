// controllers/PeliculaController.js
const { peliculas } = require('../data/db');

class PeliculaController {
  // GET /peliculas - Listar todas las películas
  static getAll(req, res) {
    try {
      res.render('peliculas/index', { peliculas, titulo: 'Listado de Películas' });
    } catch (error) {
      res.status(500).send("Error al obtener las películas: " + error.message);
    }
  }

  // GET /peliculas/:id - Obtener una película por ID 
  static getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const pelicula = peliculas.find(p => p.id === id);

      if (!pelicula) {
        return res.status(404).send("Película no encontrada");
      }

      res.render('peliculas/detail', { pelicula, titulo: pelicula.titulo });
    } catch (error) {
      res.status(500).send("Error al obtener la película: " + error.message);
    }
  }

  // POST /peliculas - Crear una nueva película
  static create(req, res) {
    try {
      const { titulo, genero, duracion, fechaEstreno } = req.body;

      if (!titulo || !genero || !duracion || !fechaEstreno) {
        return res.status(400).send("Todos los campos son obligatorios");
      }

      const nuevaPelicula = {
        id: peliculas.length > 0 ? peliculas[peliculas.length - 1].id + 1 : 1,
        titulo,
        genero,
        duracion: parseInt(duracion),
        fechaEstreno
      };

      peliculas.push(nuevaPelicula);
      res.redirect('/peliculas');
    } catch (error) {
      res.status(500).send("Error al crear la película: " + error.message);
    }
  }

  // PUT /peliculas/:id - Actualizar una pelicula existente
  static update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const index = peliculas.findIndex(p => p.id === id);

      if (index === -1) {
        return res.status(404).json({ error: "Película no encontrada" });
      }

      const { titulo, genero, duracion, fechaEstreno } = req.body;

      peliculas[index] = {
        ...peliculas[index],
        titulo: titulo || peliculas[index].titulo,
        genero: genero || peliculas[index].genero,
        duracion: duracion ? parseInt(duracion) : peliculas[index].duracion,
        fechaEstreno: fechaEstreno || peliculas[index].fechaEstreno
      };

      res.json({ mensaje: "Película actualizada con éxito", pelicula: peliculas[index] });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la película: " + error.message });
    }
  }

  // DELETE /peliculas/:id - Eliminar una pelicula
  static delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      const index = peliculas.findIndex(p => p.id === id);

      if (index === -1) {
        return res.status(404).json({ error: "Película no encontrada" });
      }

      peliculas.splice(index, 1);
      res.json({ mensaje: "Película eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la película: " + error.message });
    }
  }
}

module.exports = PeliculaController;