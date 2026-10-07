// controllers/PeliculaController.js
const db = require('../data/db');

class PeliculaController {
  // 1. Mostrar vista HTML con la lista
  index(req, res) {
    res.render('peliculas', { peliculas: db.peliculas });
  }

  // 2. Mostrar formulario para CREAR
  createView(req, res) {
  res.render('peliculas/crear-pelicula', { 
    titulo: 'Nueva Película' 
  });
  }

  // 3. Mostrar formulario para EDITAR
 editView(req, res) {
  const { id } = req.params;
  const pelicula = db.peliculas.find(p => p.id == id);

  if (!pelicula) {
    return res.status(404).send('Película no encontrada');
  }

  // Pasamos el objeto pelicula y también la variable titulo de forma explícita
  res.render('peliculas/editar-pelicula', { 
    pelicula,
    titulo: pelicula.titulo 
  });
}

  // 4. API / Procesar GET por ID
  getById(req, res) {
    const { id } = req.params;
    const pelicula = db.peliculas.find(p => p.id == id);
    if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' });
    res.json(pelicula);
  }

  // 5. API / Procesar GET Últimas 5
  getUltimosCinco(req, res) {
    const ultimas = db.peliculas.slice(-5).reverse();
    res.json(ultimas);
  }

  // 6. Procesar CREACIÓN (POST)
 create(req, res) {
  const { titulo, genero, duracion, fechaEstreno, fecha } = req.body;

  const nuevoId = db.peliculas.length > 0 
    ? Math.max(...db.peliculas.map(p => Number(p.id))) + 1 
    : 1;

  const nuevaPelicula = {
    id: nuevoId,
    titulo: titulo || 'Sin título',
    genero: genero || 'Sin género',
    duracion: duracion ? Number(duracion) : 0,
    // Aseguramos que guarde la fecha en la propiedad fechaEstreno
    fechaEstreno: fechaEstreno || fecha || new Date().toISOString().split('T')[0]
  };

  db.peliculas.push(nuevaPelicula);

  if (req.headers['content-type'] && req.headers['content-type'].includes('application/x-www-form-urlencoded')) {
    return res.redirect('/peliculas');
  }

  return res.status(201).json({
    mensaje: 'Película creada con éxito',
    pelicula: nuevaPelicula
  });
}
  // 7. Procesar EDICIÓN (PUT / POST)
  update(req, res) {
    const { id } = req.params;
    const index = db.peliculas.findIndex(p => p.id == id);
    if (index === -1) return res.status(404).json({ error: 'Película no encontrada' });

    db.peliculas[index] = { ...db.peliculas[index], ...req.body };

    if (req.headers['content-type'] && req.headers['content-type'].includes('application/x-www-form-urlencoded')) {
      return res.redirect('/peliculas');
    }
    res.json({ mensaje: 'Película actualizada', pelicula: db.peliculas[index] });
  }

  // 8. Procesar ELIMINACIÓN (DELETE / GET para botón web)
delete(req, res) {
  
  const { id } = req.params;
  const index = db.peliculas.findIndex(p => p.id == id);

  if (index !== -1) {
    db.peliculas.splice(index, 1);
  }

  // Redirige al listado principal si la petición viene del navegador
  if (req.headers['content-type']?.includes('application/x-www-form-urlencoded') || req.method === 'POST' || req.method === 'GET') {
    return res.redirect('/peliculas');
  }

  return res.json({ mensaje: 'Película eliminada correctamente' });
}
}

module.exports = new PeliculaController();