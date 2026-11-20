const ROLES_VALIDOS = ['admin', 'empleado'];

function obtenerRol(req) {
  return req.cookies && req.cookies.rol ? req.cookies.rol : null;
}

function requerirRol(...rolesPermitidos) {
  return (req, res, next) => {
    const rol = obtenerRol(req);
    const esperaJson =
      req.method === 'PUT' ||
      req.method === 'DELETE' ||
      (req.headers.accept && req.headers.accept.includes('application/json'));

    if (!rol) {
      if (esperaJson) {
        return res.status(401).json({
          error: 'No autenticado: asigna un rol en cookie (admin o empleado) en /users/rol/:rol'
        });
      }
      return res.status(401).send('Acceso denegado: no hay rol activo. Visita /users para seleccionar un rol.');
    }

    if (!ROLES_VALIDOS.includes(rol) || !rolesPermitidos.includes(rol)) {
      if (esperaJson) {
        return res.status(403).json({
          error: `Acceso denegado: tu rol actual (${rol}) no tiene permiso para esta acción.`
        });
      }
      return res.status(403).send(`Acceso denegado: tu rol (${rol}) no tiene permiso para realizar esta acción.`);
    }

    req.rolUsuario = rol;
    next();
  };
}

module.exports = { requerirRol };