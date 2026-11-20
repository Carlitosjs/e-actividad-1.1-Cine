const express = require('express');
const router = express.Router();

// Ver rol actual y opciones rápidas para cambiar de rol
router.get('/', (req, res) => {
  const rolActual = req.cookies.rol || 'sin rol';
  res.json({
    rolActual,
    instrucciones: {
      activarAdmin: 'GET /users/rol/admin',
      activarEmpleado: 'GET /users/rol/empleado',
      limpiarRol: 'GET /users/logout'
    }
  });
});

// Asignar rol en cookie ('admin' o 'empleado')
router.get('/rol/:rol', (req, res) => {
  const rol = req.params.rol;
  if (!['admin', 'empleado'].includes(rol)) {
    return res.status(400).json({ error: 'Rol inválido. Usa "admin" o "empleado".' });
  }

  res.cookie('rol', rol, {
    httpOnly: true,
    sameSite: 'lax'
  });

  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.status(200).json({ mensaje: `Rol actualizado a ${rol}`, rol });
  }

  res.redirect('/');
});

// Borrar cookie de rol
router.get('/logout', (req, res) => {
  res.clearCookie('rol');
  res.json({ mensaje: 'Cookie de rol eliminada' });
});

module.exports = router;