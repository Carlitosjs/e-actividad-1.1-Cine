 CineApp - Sistema de Gestión de Cine

Características principales:

- Arquitectura MVC (Modelo-Vista-Controlador) para una separación clara 
  de responsabilidades.

- Programación Orientada a Objetos (POO) utilizando clases de ES6 para 
  todos los controladores de la aplicación.

- Persistencia de datos mediante MongoDB Atlas utilizando Mongoose para 
  el modelado de esquemas y relaciones (uso de .populate()).

- Manejo de procesos asíncronos mediante Promesas y sintaxis async/await.
- Interfaces dinámicas desarrolladas en EJS (Embedded JavaScript) 
  estilizadas con Bootstrap 5.

-- MANUAL DE USUARIO E INSTRUCCIONES DE INSTALACIÓN Y ARRANQUE


1. Clonar el repositorio:
   ```bash
   git clone <https://github.com/Carlitosjs/e-actividad-1.1-Cine.git>
   cd cine-app


2.Instalar las dependencias del proyecto:
   npm install

3. Iniciar el servidor en modo desarrollo:
   npm run dev
   (O en su defecto: npm start)

4. Acceder al sistema:
   Abra su navegador e ingrese a la dirección: http://localhost:3000
   Desde allí podrá interactuar con las interfaces gráficas creadas para 
   registrar, consultar, editar y eliminar información.
  Tecnologías Utilizadas

- Runtime: Node.js
- Framework Web:Express.js
- Base de datos:MongoDB Atlas (con Mongoose)
- Motor de Plantillas: EJS (Embedded JavaScript)
- Diseño & UI: Bootstrap 5
- Control de Versiones: Git & GitHub

---
 Estructura del Proyecto

cine-app/
├── controllers/          Controladores POO para cada módulo
│   ├── FuncionController.js
│   ├── PeliculaController.js
│   ├── ReservacionController.js
│   ├── SalaController.js
│   └── TicketController.js
├── models/               Esquemas y modelos de Mongoose
│   ├── Funcion.js
│   ├── Pelicula.js
│   ├── Reservacion.js
│   ├── Sala.js
│   └── Ticket.js
├── routes/               Manejadores de rutas de la aplicación
│   ├── funciones.js
│   ├── index.js
│   ├── peliculas.js
│   ├── reservacion.js
│   ├── salas.js
│   └── tickets.js
├── views/                Vistas en motor EJS
│   ├── partials/         Componentes reutilizables (navbar, footer)
│   ├── funciones/
│   ├── peliculas/
│   ├── reservaciones/
│   ├── salas/
│   └── tickets/
├── app.js                Punto de entrada de la aplicación
└── package.json          Dependencias y scripts del proyecto

---

LISTADO DE ENDPOINTS RESTful (12 Endpoints)
------------------------------------------------------------------------
El servidor expone los siguientes 12 endpoints para pruebas mediante 
clientes REST Thunder Client:

Peticiones GET:
1. GET  /peliculas              - Listar todas las películas.
2. GET  /peliculas/ultimas      - Consultar las últimas 5 películas registradas.
3. GET  /peliculas/:id          - Obtener el detalle de una película por ID.

Peticiones POST:
4. POST /peliculas/nueva        - Crear una nueva película.
5. POST /funciones/nueva        - Crear una nueva función de cine.
6. POST /reservaciones/nueva    - Crear una nueva reservación.

Peticiones PUT:
7. PUT  /peliculas/:id/editar   - Actualizar los datos de una película.
8. PUT  /salas/:id/editar       - Actualizar los datos de una sala.
9. PUT  /reservaciones/:id      - Actualizar una reservación existente.

Peticiones DELETE:
10. POST /salas/:id/eliminar    - Eliminar una sala (o DELETE /salas/:id).
11. POST /funciones/:id/eliminar - Eliminar una función (o DELETE /funciones/:id).
12. POST /reservaciones/eliminar/:id - Eliminar una reservación del sistema.
