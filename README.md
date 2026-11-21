 CineApp - Sistema de Gestión de Cine



Aplicación web integral para la administración de un complejo cinematográfico, ampliada con gestión comercial (categorías, métodos de pago e items de venta) y control de acceso basado en roles.



========================================================================

CARACTERÍSTICAS PRINCIPALES

========================================================================

- Arquitectura MVC (Modelo-Vista-Controlador): Separación clara de responsabilidades entre modelos de datos, lógica de negocio, rutas, middlewares y vistas.

- Programación Orientada a Objetos (POO) y Modularización: Controladores estructurados con ES6 para cada módulo del sistema.

- Persistencia en MongoDB Atlas: Modelado de esquemas y relaciones mediante Mongoose (uso de .populate() para consultas relacionales).

- Control de Acceso Basado en Roles (RBAC): Restricción de operaciones de escritura (POST, PUT, DELETE y vistas de creación/edición) mediante cookie-parser y el middleware middleware/authRol.js, diferenciando permisos entre admin (acceso total) y empleado (solo lectura).

- Manejo Asíncrono: Uso de Promesas y sintaxis async/await en todas las operaciones de base de datos.

- Interfaces Dinámicas: Vistas renderizadas en el servidor con EJS (Embedded JavaScript) y estilizadas con Bootstrap 5.



========================================================================

ENLACES DEL PROYECTO

========================================================================

- Repositorio GitHub: https://github.com/Carlitosjs/e-actividad-1.1-Cine.git

- Video Demostrativo (YouTube): [Pegar aquí el enlace del video en YouTube]



========================================================================

MANUAL DE USUARIO E INSTRUCCIONES DE INSTALACIÓN Y ARRANQUE

========================================================================

1. Requisitos previos:

   - Tener instalado Node.js (v18 o superior) y npm.

   - Tener instalado Git y acceso a Internet para conectar con MongoDB Atlas.



2. Clonar el repositorio:

   git clone https://github.com/Carlitosjs/e-actividad-1.1-Cine.git

   cd cine-app



3. Instalar las dependencias del proyecto:

   npm install



4. Archivos de configuración necesarios:

   Para ejecutar el sistema correctamente, verifica o crea los siguientes archivos que gestionan la conexión y credenciales:

   - data/db.js: Contiene la cadena de conexión (URI) hacia la base de datos Cine en MongoDB Atlas.

   - Archivo .env (opcional / recomendado para despliegue seguro y fuera del repositorio): Si se utiliza manejo de variables de entorno con dotenv, debe crearse en la raíz de cine-app/ (y mantenerse en .gitignore) con la siguiente estructura:

     PORT=3000

     MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/Cine

     JWT_SECRET=<tu_frase_secreta>



5. Iniciar el servidor:

   - En modo desarrollo (con recarga automática vía nodemon):

     npm run dev

   - En modo estándar:

     npm start



6. Acceder y operar el sistema:

   - Abra su navegador e ingrese a: http://localhost:3000 (redirige automáticamente al listado principal /peliculas).

   - Para probar rutas protegidas de creación, edición o eliminación desde el navegador o Thunder Client, active primero un rol:

     * Rol Administrador (acceso completo): http://localhost:3000/users/rol/admin

     * Rol Empleado (solo lectura, bloquea escritura con 403): http://localhost:3000/users/rol/empleado

     * Cerrar / limpiar rol activo (devuelve 401 en rutas protegidas): http://localhost:3000/users/logout



========================================================================

TECNOLOGÍAS UTILIZADAS

========================================================================

- Runtime: Node.js

- Framework Web: Express.js

- Base de Datos: MongoDB Atlas (con Mongoose)

- Gestión de Sesiones/Roles: cookie-parser y middleware personalizado (authRol.js)

- Motor de Plantillas: EJS (Embedded JavaScript)

- Diseño & UI: Bootstrap 5

- Pruebas de API: Thunder Client

- Control de Versiones: Git & GitHub



========================================================================

ESTRUCTURA DEL PROYECTO

========================================================================

cine-app/

├── bin/

│   └── www                      # Arranque del servidor HTTP

├── controllers/                 # Controladores de cada módulo

│   ├── CategoriaController.js

│   ├── FuncionController.js

│   ├── ItemVentaController.js

│   ├── MetodoPagoController.js

│   ├── PeliculaController.js

│   ├── ReservacionController.js

│   ├── SalaController.js

│   └── TicketController.js

├── data/

│   └── db.js                    # Configuración de conexión a MongoDB Atlas

├── middleware/

│   └── authRol.js               # Middleware de validación de roles (admin / empleado)

├── models/                      # Esquemas y modelos de Mongoose

│   ├── Categoria.js

│   ├── Funcion.js

│   ├── ItemVenta.js

│   ├── MetodoPago.js

│   ├── Pelicula.js

│   ├── Reservacion.js

│   ├── Sala.js

│   └── Ticket.js

├── public/                      # Archivos estáticos (CSS, JS, imágenes)

├── routes/                      # Manejadores de rutas de la aplicación

│   ├── categorias.js

│   ├── funciones.js

│   ├── index.js

│   ├── itemsVenta.js

│   ├── metodosPago.js

│   ├── peliculas.js

│   ├── reservacion.js

│   ├── salas.js

│   ├── tickets.js

│   └── users.js                 # Gestión de cambio y cierre de rol (/users/rol/:rol)

├── views/                       # Vistas en motor EJS

│   ├── partials/                # Componentes reutilizables (navbar, footer)

│   ├── categorias/

│   ├── funciones/

│   ├── itemsVenta/

│   ├── metodosPago/

│   ├── peliculas/

│   ├── reservaciones/

│   ├── salas/

│   └── tickets/

├── app.js                       # Punto de entrada y configuración de Express

└── package.json                 # Dependencias y scripts del proyecto



========================================================================

LISTADO DE ENDPOINTS PRINCIPALES Y CONTROL DE ROLES

========================================================================

Control de Roles (Usuarios):

- GET /users                     - Consultar el rol activo en la cookie actual.

- GET /users/rol/:rol            - Asignar rol activo (admin o empleado).

- GET /users/logout              - Eliminar la cookie de rol activo.



Endpoints de Operaciones Base (12 Endpoints RESTful):

Peticiones GET (Acceso libre):

1. GET  /peliculas               - Listar todas las películas.

2. GET  /peliculas/ultimas       - Consultar las últimas 5 películas registradas.

3. GET  /peliculas/:id           - Obtener el detalle de una película por ID.



Peticiones POST:

4. POST /peliculas/nueva         - Crear una nueva película.

5. POST /funciones/nueva         - Crear una nueva función de cine.

6. POST /reservaciones/nueva     - Crear una nueva reservación.



Peticiones PUT:

7. PUT  /peliculas/:id/editar    - Actualizar los datos de una película.

8. PUT  /salas/:id/editar        - Actualizar los datos de una sala.

9. PUT  /reservaciones/:id       - Actualizar una reservación existente.



Peticiones DELETE / Eliminación:

10. POST /salas/:id/eliminar     - Eliminar una sala (o DELETE /salas/:id).

11. POST /funciones/:id/eliminar - Eliminar una función (o DELETE /funciones/:id).

12. POST /reservaciones/eliminar/:id - Eliminar una reservación del sistema.



Endpoints de Nuevos Módulos (Protegidos por Rol admin en escritura):

- Categorías:      GET /categorias, GET /categorias/nueva, POST /categorias/nueva, PUT /categorias/:id/editar, DELETE /categorias/:id

- Métodos de Pago: GET /metodos-pago, GET /metodos-pago/nueva, POST /metodos-pago/nueva, GET /metodos-pago/:id/editar, PUT /metodos-pago/:id/editar, DELETE /metodos-pago/:id

- Items de Venta:  GET /items-venta, GET /items-venta/nueva, POST /items-venta/nueva, PUT /items-venta/:id/editar, DELETE /items-venta/:id



========================================================================

AUTOR

========================================================================

- Carlos Miguel Valles Navea — https://github.com/Carlitosjs