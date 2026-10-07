// routes/funciones.js
const express = require('express');
const router = express.Router();
const funcionController = require('../controllers/FuncionController');

router.get('/', (req, res) => funcionController.getAll(req, res));
router.get('/nueva', (req, res) => funcionController.showCreateForm(req, res));
router.post('/nueva', (req, res) => funcionController.create(req, res));
router.post('/:id/eliminar', (req, res) => funcionController.delete(req, res));
router.put('/:id', (req, res) => funcionController.update(req, res));

module.exports = router;