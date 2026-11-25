// controllers/projetoController.js
const Projeto = require('../models/Projeto');
const Cliente = require('../models/Cliente');

// READ + FILTRO: lista projetos e filtra por cliente e/ou potência mínima
exports.listar = async (req, res) => {
  try {
    const { cliente, potenciaMin } = req.query;
    const filtro = {};

    if (cliente && cliente.trim() !== '') {
      filtro.clienteNome = { $regex: cliente.trim(), $options: 'i' };
    }
    if (potenciaMin !== undefined && potenciaMin !== '' && !isNaN(Number(potenciaMin))) {
      filtro.potenciaKWp = { $gte: Number(potenciaMin) };
    }

    const projetos = await Projeto.find(filtro).sort({ createdAt: -1 });
    res.render('projetos/index', {
      titulo: 'Projetos Fotovoltaicos - SolarTrack Admin',
      paginaAtiva: 'projetos',
      projetos,
      filtros: { cliente: cliente || '', potenciaMin: potenciaMin || '' }
    });
  } catch (error) {
    console.error('Erro ao listar projetos:', error);
    res.status(500).send('Erro ao listar projetos');
  }
};

// Exibe formulário de novo projeto (carrega clientes para ajudar no preenchimento)
exports.formNovo = async (req, res) => {
  const clientes = await Cliente.find().sort({ nome: 1 });
  res.render('projetos/form', {
    titulo: 'Novo Projeto - SolarTrack Admin',
    paginaAtiva: 'projetos',
    projeto: {},
    clientes,
    acao: '/projetos',
    metodo: 'POST'
  });
};

// CREATE: cria novo projeto no MongoDB
exports.criar = async (req, res) => {
  try {
    await Projeto.create({
      clienteId: req.body.clienteId,
      clienteNome: req.body.clienteNome,
      potenciaKWp: Number(req.body.potenciaKWp),
      quantidadePlacas: Number(req.body.quantidadePlacas),
      valorContrato: Number(req.body.valorContrato),
      dataContrato: req.body.dataContrato
    });
    res.redirect('/projetos');
  } catch (error) {
    res.status(400).send('Erro ao cadastrar projeto: ' + error.message);
  }
};

// READ (detalhe)
exports.detalhe = async (req, res) => {
  try {
    const projeto = await Projeto.findById(req.params.id);
    if (!projeto) return res.status(404).send('Projeto não encontrado');

    res.render('projetos/detalhe', {
      titulo: 'Detalhes do Projeto - SolarTrack Admin',
      paginaAtiva: 'projetos',
      projeto
    });
  } catch (error) {
    res.status(400).send('ID de projeto inválido');
  }
};

// Exibe formulário de edição
exports.formEditar = async (req, res) => {
  try {
    const [projeto, clientes] = await Promise.all([
      Projeto.findById(req.params.id),
      Cliente.find().sort({ nome: 1 })
    ]);
    if (!projeto) return res.status(404).send('Projeto não encontrado');

    res.render('projetos/form', {
      titulo: 'Editar Projeto - SolarTrack Admin',
      paginaAtiva: 'projetos',
      projeto,
      clientes,
      acao: `/projetos/${projeto._id}?_method=PUT`,
      metodo: 'POST'
    });
  } catch (error) {
    res.status(400).send('ID de projeto inválido');
  }
};

// UPDATE: atualiza projeto no MongoDB
exports.atualizar = async (req, res) => {
  try {
    await Projeto.findByIdAndUpdate(
      req.params.id,
      {
        clienteId: req.body.clienteId,
        clienteNome: req.body.clienteNome,
        potenciaKWp: Number(req.body.potenciaKWp),
        quantidadePlacas: Number(req.body.quantidadePlacas),
        valorContrato: Number(req.body.valorContrato),
        dataContrato: req.body.dataContrato
      },
      { runValidators: true }
    );
    res.redirect('/projetos');
  } catch (error) {
    res.status(400).send('Erro ao atualizar projeto: ' + error.message);
  }
};

// DELETE: remove projeto do MongoDB
exports.excluir = async (req, res) => {
  try {
    await Projeto.findByIdAndDelete(req.params.id);
    res.redirect('/projetos');
  } catch (error) {
    res.status(400).send('Erro ao excluir projeto');
  }
};