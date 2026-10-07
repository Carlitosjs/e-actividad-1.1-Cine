const express = require('express');
const router = express.Router();
const FuncionController = require('../controllers/FuncionController');

router.get('/', FuncionController.getAll);
router.get('/nueva', FuncionController.showCreateForm);
router.post('/nueva', FuncionController.create);
router.post('/:id/eliminar', FuncionController.delete);
router.put('/:id', (req, res) => funcionController.update(req, res));
module.exports = router;