const { reservaciones, funciones, peliculas } = require('../data/db');

class ReservacionController {
  // GET /reservaciones
  static getAll(req, res) {
    res.render('reservaciones/reservaciones', {
      titulo: 'Listado de Reservaciones',
      reservaciones: reservaciones
    });
  }

  // GET /reservaciones/nueva
  static showCreateForm(req, res) {
    const funcionesConDetalle = (funciones || []).map(f => {
      const pelicula = (peliculas || []).find(p => p.id === f.peliculaId);
      return {
        ...f,
        tituloPelicula: pelicula ? pelicula.titulo : `Función #${f.id}`
      };
    });

    res.render('reservaciones/crear-reservacion', {
      titulo: 'Nueva Reservación',
      funciones: funcionesConDetalle
    });
  }

  // POST /reservaciones/nueva
  static create(req, res) {
    const { funcionId, usuario, ticketId, estado } = req.body;

    if ((!funcionId && !ticketId) || !usuario) {
      const funcionesConDetalle = (funciones || []).map(f => {
        const pelicula = (peliculas || []).find(p => p.id === f.peliculaId);
        return {
          ...f,
          tituloPelicula: pelicula ? pelicula.titulo : `Función #${f.id}`
        };
      });

      return res.status(400).render('reservaciones/crear-reservacion', {
        titulo: 'Nueva Reservación',
        funciones: funcionesConDetalle,
        error: 'Debe seleccionar una función/ticket e ingresar el nombre del cliente'
      });
    }

    const nuevaReservacion = {
      id: reservaciones.length > 0 ? reservaciones[reservaciones.length - 1].id + 1 : 1,
      ticketId: ticketId ? parseInt(ticketId) : parseInt(funcionId || 1),
      usuario: usuario,
      estado: estado || 'Pendiente'
    };

    reservaciones.push(nuevaReservacion);
    res.redirect('/reservaciones');
  }
}

module.exports = ReservacionController;