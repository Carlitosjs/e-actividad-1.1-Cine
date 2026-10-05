const { peliculas } = require('../data/db');

class PeliculaController {
  // GET /peliculas - Renderizar el listado de películas
  static getAll(req, res) {
  try {
    res.render('peliculas/index', { 
      titulo: 'Listado de Películas', 
      peliculas 
    });
  } catch (error) {
    res.status(500).send("Error al cargar las películas: " + error.message);
  }
}

  // GET /peliculas/nueva - Renderizar el formulario de creación
  static showCreateForm(req, res) {
    try {
      res.render('peliculas/nueva-pelicula');
    } catch (error) {
      res.status(500).send("Error al cargar el formulario: " + error.message);
    }
  }

  // POST /peliculas/nueva - Procesar y guardar la nueva película
  static create(req, res) {
    try {
      const { titulo, genero, duracion, estreno } = req.body;

      // Validación de campos obligatorios
      if (!titulo || !genero || !duracion || !estreno) {
        return res.status(400).send("Todos los campos son obligatorios.");
      }

      // Generar ID autoincrementable
      const nuevoId = peliculas.length > 0 ? peliculas[peliculas.length - 1].id + 1 : 1;

      const nuevaPelicula = {
        id: nuevoId,
        titulo: titulo.trim(),
        genero,
        duracion: parseInt(duracion),
        fechaEstreno:estreno
      };

      // Guardar en el arreglo en memoria
      peliculas.push(nuevaPelicula);

      // Redireccionar al listado principal
      res.redirect('/peliculas');
    } catch (error) {
      res.status(500).send("Error al guardar la película: " + error.message);
    }
  }

  // API JSON - GET /peliculas/api
  static getAllApi(req, res) {
    try {
      res.json(peliculas);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener películas: " + error.message });
    }
  }
}

module.exports = PeliculaController;