// controllers/instalacaoController.js
const Instalacao = require('../models/Instalacao');
const Projeto = require('../models/Projeto');

// READ + FILTRO: lista instalações e filtra por status e/ou responsável em campo
exports.listar = async (req, res) => {
  try {
    const { status, responsavel } = req.query;
    const filtro = {};

    if (status && status.trim() !== '') {
      filtro.status = status.trim();
    }
    if (responsavel && responsavel.trim() !== '') {
      filtro.responsavelCampo = { $regex: responsavel.trim(), $options: 'i' };
    }

    const instalacoes = await Instalacao.find(filtro).sort({ dataAgendada: 1 });
    res.render('instalacoes/index', {
      titulo: 'Instalações - SolarTrack Admin',
      paginaAtiva: 'instalacoes',
      instalacoes,
      filtros: { status: status || '', responsavel: responsavel || '' }
    });
  } catch (error) {
    console.error('Erro ao listar instalações:', error);
    res.status(500).send('Erro ao listar instalações');
  }
};

// Exibe formulário de nova instalação
exports.formNovo = async (req, res) => {
  const projetos = await Projeto.find().sort({ createdAt: -1 });
  res.render('instalacoes/form', {
    titulo: 'Nova Instalação - SolarTrack Admin',
    paginaAtiva: 'instalacoes',
    instalacao: {},
    projetos,
    acao: '/instalacoes',
    metodo: 'POST'
  });
};

// CREATE: cria nova instalação no MongoDB
exports.criar = async (req, res) => {
  try {
    await Instalacao.create({
      projetoId: req.body.projetoId,
      projetoDescricao: req.body.projetoDescricao,
      responsavelCampo: req.body.responsavelCampo,
      dataAgendada: req.body.dataAgendada,
      status: req.body.status,
      concluida: req.body.concluida === 'on' || req.body.concluida === 'true'
    });
    res.redirect('/instalacoes');
  } catch (error) {
    res.status(400).send('Erro ao cadastrar instalação: ' + error.message);
  }
};

// READ (detalhe)
exports.detalhe = async (req, res) => {
  try {
    const instalacao = await Instalacao.findById(req.params.id);
    if (!instalacao) return res.status(404).send('Instalação não encontrada');

    res.render('instalacoes/detalhe', {
      titulo: 'Detalhes da Instalação - SolarTrack Admin',
      paginaAtiva: 'instalacoes',
      instalacao
    });
  } catch (error) {
    res.status(400).send('ID de instalação inválido');
  }
};

// Exibe formulário de edição
exports.formEditar = async (req, res) => {
  try {
    const [instalacao, projetos] = await Promise.all([
      Instalacao.findById(req.params.id),
      Projeto.find().sort({ createdAt: -1 })
    ]);
    if (!instalacao) return res.status(404).send('Instalação não encontrada');

    res.render('instalacoes/form', {
      titulo: 'Editar Instalação - SolarTrack Admin',
      paginaAtiva: 'instalacoes',
      instalacao,
      projetos,
      acao: `/instalacoes/${instalacao._id}?_method=PUT`,
      metodo: 'POST'
    });
  } catch (error) {
    res.status(400).send('ID de instalação inválido');
  }
};

// UPDATE: atualiza instalação no MongoDB
exports.atualizar = async (req, res) => {
  try {
    await Instalacao.findByIdAndUpdate(
      req.params.id,
      {
        projetoId: req.body.projetoId,
        projetoDescricao: req.body.projetoDescricao,
        responsavelCampo: req.body.responsavelCampo,
        dataAgendada: req.body.dataAgendada,
        status: req.body.status,
        concluida: req.body.concluida === 'on' || req.body.concluida === 'true'
      },
      { runValidators: true }
    );
    res.redirect('/instalacoes');
  } catch (error) {
    res.status(400).send('Erro ao atualizar instalação: ' + error.message);
  }
};

// DELETE: remove instalação do MongoDB
exports.excluir = async (req, res) => {
  try {
    await Instalacao.findByIdAndDelete(req.params.id);
    res.redirect('/instalacoes');
  } catch (error) {
    res.status(400).send('Erro ao excluir instalação');
  }
};