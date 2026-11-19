const express = require('express');
const router = express.Router();
const controller = require('../controllers/MetodoPagoController');

router.get('/', controller.index);
router.post('/nueva', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;