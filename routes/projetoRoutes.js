// routes/projetoRoutes.js
const express = require('express');
const router = express.Router();
const projetoController = require('../controllers/projetoController');

router.get('/', projetoController.listar);
router.get('/novo', projetoController.formNovo);
router.post('/', projetoController.criar);
router.get('/:id', projetoController.detalhe);
router.get('/:id/editar', projetoController.formEditar);
router.put('/:id', projetoController.atualizar);
router.delete('/:id', projetoController.excluir);

module.exports = router;