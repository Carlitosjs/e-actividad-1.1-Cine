// routes/peliculas.js
const express = require('express');
const router = express.Router();
const PeliculaController = require('../controllers/PeliculaController');

router.get('/', PeliculaController.getAll);
router.get('/nueva', PeliculaController.showCreateForm);
router.post('/nueva', PeliculaController.create);

module.exports = router;