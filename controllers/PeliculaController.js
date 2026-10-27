const Pelicula = require('../models/Pelicula.js');

class PeliculaController {
  // 1. Mostrar listado de películas (GET)
  async index(req, res) {
    try {
      const peliculas = await Pelicula.find();
      res.render('peliculas', { peliculas });
    } catch (error) {
      res.status(500).send('Error al obtener las películas: ' + error.message);
    }
  }

  // 2. Mostrar formulario para CREAR (GET)
  createView(req, res) {
    res.render('peliculas/crear-pelicula', {
      titulo: 'Nueva Película'
    });
  }

  // 3. Guardar nueva película en MongoDB (POST)
  async create(req, res) {
    try {
      const nuevaPelicula = new Pelicula(req.body);
      await nuevaPelicula.save();
      res.redirect('/peliculas');
    } catch (error) {
      res.status(500).send('Error al guardar la película: ' + error.message);
    }
  }

  // 4. Mostrar formulario para EDITAR (GET)
  async editView(req, res) {
    try {
      const { id } = req.params;
      const pelicula = await Pelicula.findById(id);
      res.render('peliculas/editar-pelicula', { pelicula });
    } catch (error) {
      res.status(500).send('Error al buscar la película: ' + error.message);
    }
  }

  // 5. Actualizar registro (POST / PUT)
  async update(req, res) {
    try {
      const { id } = req.params;
      await Pelicula.findByIdAndUpdate(id, req.body);
      res.redirect('/peliculas');
    } catch (error) {
      res.status(500).send('Error al actualizar la película: ' + error.message);
    }
  }

  // 6. Eliminar registro (POST / DELETE)
  async delete(req, res) {
    try {
      const { id } = req.params;
      await Pelicula.findByIdAndDelete(id);
      res.redirect('/peliculas');
    } catch (error) {
      res.status(500).send('Error al eliminar la película: ' + error.message);
    }
  }

  // 7. Buscar por ID (GET)
  async getById(req, res) {
    try {
      const { id } = req.params;
      const pelicula = await Pelicula.findById(id);
      res.render('peliculas/detalle', { pelicula });
    } catch (error) {
      res.status(500).send('Error al obtener la película: ' + error.message);
    }
  }

  // 8. Obtener los últimos registros (GET)
  async getUltimosCinco(req, res) {
    try {
      const peliculas = await Pelicula.find().sort({ _id: -1 }).limit(5);
      res.render('peliculas', { peliculas });
    } catch (error) {
      res.status(500).send('Error al obtener las últimas películas: ' + error.message);
    }
  }
}

module.exports = new PeliculaController();