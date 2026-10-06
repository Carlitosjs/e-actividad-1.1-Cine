

const peliculas = [
  { id: 1, titulo: "Titanic", genero: "Romance", duracion: 195, fechaEstreno: "1997-12-19" },
  { id: 2, titulo: "Shrek", genero: "Animación", duracion: 90, fechaEstreno: "2001-05-18" },
  { id: 3, titulo: "Spider-Man", genero: "Acción", duracion: 121, fechaEstreno: "2002-05-03" },
  { id: 4, titulo: "Toy Story", genero: "Animación", duracion: 81, fechaEstreno: "1995-11-22" },
  { id: 5, titulo: "Avengers: Endgame", genero: "Acción", duracion: 181, fechaEstreno: "2019-04-26" },
  { id: 6, titulo: "Harry Potter y la piedra filosofal", genero: "Fantasía", duracion: 152, fechaEstreno: "2001-11-16" }
];

const salas = [
  { id: 1, nombre: "Sala 3D VIP", capacidad: 50 , tipo:'3D' },
  { id: 2, nombre: "Sala IMAX", capacidad: 120 , tipo:'IMAX' },
  { id: 3, nombre: 'Sala IMAX', capacidad: 200, tipo: 'IMAX' }
];

const funciones = [
  { id: 1, peliculaId: 1, salaId: 1, fechaHora: "2026-10-10T18:00:00" },
  { id: 2, peliculaId: 2, salaId: 2, fechaHora: "2026-10-10T21:00:00" },
  { id: 3, peliculaId: 3, salaId: 1, fechaHora: "2026-10-11T15:00:00" },
  { id: 4, peliculaId: 4, salaId: 2, fechaHora: "2026-10-12T19:00:00" },
  { id: 5, peliculaId: 5, salaId: 1, fechaHora: "2026-10-13T17:00:00" },
  { id: 6, peliculaId: 6, salaId: 2, fechaHora: "2026-10-14T20:00:00" }
];

const tickets = [
  { id: 1, funcionId: 1, cliente: 'Carlos Valles', asiento: "A1", precio: 8.50 },
  { id: 2, funcionId: 1, cliente: 'Angelo Huzz', asiento: "A2", precio: 8.50 }
];

const reservaciones = [
  { id: 1, ticketId: 1, usuario: "Carlos Valles", estado: "Confirmada" },
  { id: 2, ticketId: 2, usuario: "Ana Martinez", estado: "Pendiente" }
];

module.exports = { peliculas, salas, funciones, tickets, reservaciones };