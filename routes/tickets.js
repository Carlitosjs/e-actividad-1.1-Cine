const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/TicketController');

router.get('/', TicketController.getAll);
router.post('/', TicketController.create);

module.exports = router;