const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan'); 

// 1. IMPORTACIÓN DE RUTAS
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const peliculasRouter = require('./routes/peliculas');
const salasRouter = require('./routes/salas');
const funcionesRouter = require('./routes/funciones');
const ticketsRouter = require('./routes/tickets');
const reservacionesRouter = require('./routes/reservacion'); // O rutas/reservaciones según el nombre de tu archivo

const app = express();

// 2. CONFIGURACIÓN DEL MOTOR DE VISTAS (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 3. MIDDLEWARES PRINCIPALES 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 4. REGISTRO DE RUTAS DE LA APLICACIÓN
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/peliculas', peliculasRouter);
app.use('/salas', salasRouter);
app.use('/funciones', funcionesRouter);
app.use('/tickets', ticketsRouter);
app.use('/reservaciones', reservacionesRouter);

// 5. MANEJO DE ERRORES (404 Not Found y Error Handler)
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;