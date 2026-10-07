CineApp - Sistema de Gestión de Cine 

Proyecto backend desarrollado con Node.js, Express.js y EJS para la gestión de un complejo de cine. Incluye administración de Películas, Salas, Funciones, Tickets y Reservaciones mediante una arquitectura MVC y Programación Orientada a Objetos (POO).

Tecnologías Utilizadas

- Runtime: Node.js
- Framework Web: Express.js
- Motor de Plantillas: EJS (Embedded JavaScript)
- Diseño & UI: Bootstrap 5
- Control de Versiones: Git & GitHub

 Estructura del Proyecto


cine-app/
├── controllers/           Controladores POO para cada modulo
│   ├── FuncionController.js
│   ├── PeliculaController.js
│   ├── ReservacionController.js
│   ├── SalaController.js
│   └── TicketController.js
├── data/                  Base de datos simulada en memoria
│   └── db.js
├── routes/                Manejadores de rutas de la aplicación
│   ├── funciones.js
│   ├── index.js
│   ├── peliculas.js
│   ├── reservacion.js
│   ├── salas.js
│   └── tickets.js
├── views/                 Vistas en motor EJS
│   ├── partials/          Componentes reutilizables (barra de navegacion , footer)
│   ├── peliculas/
│   ├── reservaciones/
│   ├── salas/
│   └── tickets/
├── app.js                 Punto de entrada de la aplicación
└── package.json