// controllers/FuncionController.js
const db = require('../data/db');
const { funciones, peliculas, salas } = db;

class FuncionController {


 static getAll(req, res) {
    const funcionesConDetalle = funciones.map(funcion => {
      const pelicula = peliculas.find(p => p.id == funcion.peliculaId);
      const sala = salas.find(s => s.id == funcion.salaId);
      return {
        ...funcion,
        peliculaNombre: pelicula ? pelicula.titulo : (funcion.pelicula || 'N/A'),
        salaNombre: sala ? sala.nombre : (funcion.sala || 'N/A')
      };
    });

    res.render('funciones/funciones', {
      titulo: 'Listado de Funciones',
      funciones: funcionesConDetalle
    });
  }

  // GET /funciones/nueva - Formulario para crear función
  static showCreateForm(req, res) {
    res.render('funciones/crear-funcion', {
      titulo: 'Nueva Función',
      peliculas,
      salas
    });
  }


  update(req, res) {
    const { id } = req.params;
    
    // Buscamos la función por ID en tu array de datos
    const index = db.funciones.findIndex(f => f.id == id);

    if (index === -1) {
      return res.status(404).json({ error: 'Función no encontrada' });
    }

    // Actualizamos los datos (peliculaId, salaId, horario, precio, etc.)
    db.funciones[index] = { 
      ...db.funciones[index], 
      ...req.body 
    };

    return res.status(200).json({
      mensaje: 'Función actualizada con éxito',
      funcion: db.funciones[index]
    });
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

      res.redirect('/funciones');

      res.status(201).json({ mensaje: "Función programada con éxito", funcion: nuevaFuncion });
    } catch (error) {
      res.status(500).json({ error: "Error al crear la función: " + error.message });
    }
  }

// POST /funciones/:id/eliminar - Eliminar función
  static delete(req, res) {
    const { id } = req.params;
    const index = funciones.findIndex(f => f.id == id);

    if (index !== -1) {
      funciones.splice(index, 1);
    }

    res.redirect('/funciones');
  }

}




module.exports = new FuncionController ();