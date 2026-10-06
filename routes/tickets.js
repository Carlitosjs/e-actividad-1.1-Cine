const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/TicketController');

router.get('/', TicketController.getAll);
router.get('/nuevo', TicketController.showCreateForm);
router.post('/nuevo', TicketController.create);
router.post('/:id/eliminar', TicketController.delete);

module.exports = router;