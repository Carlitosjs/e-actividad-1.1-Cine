const express = require('express');
const router = express.Router();
const ReservacionController = require('../controllers/ReservacionController');

router.get('/', ReservacionController.getAll);
router.post('/', ReservacionController.create);

module.exports = router;