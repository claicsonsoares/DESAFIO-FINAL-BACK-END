// routes/instalacaoRoutes.js
const express = require('express');
const router = express.Router();
const instalacaoController = require('../controllers/instalacaoController');

router.get('/', instalacaoController.listar);
router.get('/novo', instalacaoController.formNovo);
router.post('/', instalacaoController.criar);
router.get('/:id', instalacaoController.detalhe);
router.get('/:id/editar', instalacaoController.formEditar);
router.put('/:id', instalacaoController.atualizar);
router.delete('/:id', instalacaoController.excluir);

module.exports = router;