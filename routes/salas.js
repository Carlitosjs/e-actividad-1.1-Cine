const express = require('express');
const router = express.Router();
const SalaController = require('../controllers/SalaController');

router.get('/', SalaController.getAll);
router.get('/:id', SalaController.getById);
router.post('/', SalaController.create);

module.exports = router;