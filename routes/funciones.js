const express = require('express');
const router = express.Router();
const FuncionController = require('../controllers/FuncionController');

router.get('/', FuncionController.getAll);
router.post('/', FuncionController.create);

module.exports = router;