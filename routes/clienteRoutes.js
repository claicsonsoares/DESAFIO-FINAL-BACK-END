// routes/clienteRoutes.js
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.listar);
router.get('/novo', clienteController.formNovo);
router.post('/', clienteController.criar);
router.get('/:id', clienteController.detalhe);
router.get('/:id/editar', clienteController.formEditar);
router.put('/:id', clienteController.atualizar);
router.delete('/:id', clienteController.excluir);

module.exports = router;