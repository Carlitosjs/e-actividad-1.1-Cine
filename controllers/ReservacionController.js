// controllers/ReservacionController.js
const db = require('../data/db');

class ReservacionController {
  // GET: Listar todas
  getAll(req, res) {
    res.render('reservaciones/reservaciones', { 
  reservaciones: db.reservaciones 
});
  }

  // GET: Obtener los últimos 5 elementos
  getUltimasCinco(req, res) {
    const ultimas = db.reservaciones.slice(-5).reverse();
    res.json(ultimas);
  }

  // GET: Filtrar en un rango de fecha (Requisito de la pauta)
  getByRangoFecha(req, res) {
    const { desde, hasta } = req.query;
    // Filtro simple por rango de fecha
    const filtradas = db.reservaciones.filter(r => r.fecha >= desde && r.fecha <= hasta);
    res.json(filtradas);
  }

  // POST: Crear
  create(req, res) {
  // 1. Extraemos los campos enviadas desde el formulario o Thunder Client
  const { peliculaId, ticketId, usuario, cliente, estado } = req.body;

  // 2. Calculamos el ID secuencial limpia (1, 2, 3...)
  const nuevoId = db.reservaciones.length > 0 
    ? Math.max(...db.reservaciones.map(r => Number(r.id))) + 1 
    : 1;

  // 3. Obtenemos el ID del ticket/película asegurando que no quede undefined
  const idTicketFinal = peliculaId || ticketId || 1;

  // 4. Creamos el nuevo objeto
  const nuevaReservacion = {
    id: nuevoId,
    ticketId: Number(idTicketFinal),
    usuario: usuario || cliente || 'Usuario Anónimo',
    estado: estado || 'Confirmada'
  };

  db.reservaciones.push(nuevaReservacion);

  // 5. Si es desde un formulario web HTML, redirigimos a la vista
  if (req.headers['content-type'] && req.headers['content-type'].includes('application/x-www-form-urlencoded')) {
    return res.redirect('/reservaciones');
  }

  // 6. Si es desde Thunder Client, enviamos respuesta JSON
  return res.status(201).json({
    mensaje: 'Reservación creada con éxito',
    reservacion: nuevaReservacion
  });
}
  // PUT: Editar/Actualizar estado
  update(req, res) {
    const { id } = req.params;
    const index = db.reservaciones.findIndex(r => r.id == id);
    if (index === -1) return res.status(404).json({ error: 'Reservación no encontrada' });

    db.reservaciones[index] = { ...db.reservaciones[index], ...req.body };
    res.json({ mensaje: 'Reservación modificada', reservacion: db.reservaciones[index] });
  }

  // DELETE: Eliminar / Cancelar relación
  delete(req, res) {
    const { id } = req.params;
    const index = db.reservaciones.findIndex(r => r.id == id);
    if (index === -1) return res.status(404).json({ error: 'Reservación no encontrada' });

    db.reservaciones.splice(index, 1);
    res.json({ mensaje: 'Reservación y relación eliminadas con éxito' });
  }
}

module.exports = new ReservacionController();