// controle Cliente
const Cliente = require('../models/Cliente');

// READ + FILTRO
exports.listar = async (req, res) => {
  try {
    const { busca, cidade } = req.query;
    const filtro = {};

    if (busca && busca.trim() !== '') {
      filtro.nome = { $regex: busca.trim(), $options: 'i' };
    }
    if (cidade && cidade.trim() !== '') {
      filtro.cidade = { $regex: cidade.trim(), $options: 'i' };
    }

    const clientes = await Cliente.find(filtro).sort({ createdAt: -1 });
    res.render('clientes/index', {
      titulo: 'Clientes - SolarTrack Admin',
      paginaAtiva: 'clientes',
      clientes,
      filtros: { busca: busca || '', cidade: cidade || '' }
    });
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    res.status(500).send('Erro ao listar clientes');
  }
};

// Exibe formulário de cadastro
exports.formNovo = (req, res) => {
  res.render('clientes/form', {
    titulo: 'Novo Cliente - SolarTrack Admin',
    paginaAtiva: 'clientes',
    cliente: {},
    acao: '/clientes',
    metodo: 'POST'
  });
};

// salva  o novo cliente no MongoDB
exports.criar = async (req, res) => {
  try {
    await Cliente.create({
      nome: req.body.nome,
      telefone: req.body.telefone,
      cidade: req.body.cidade,
      endereco: req.body.endereco,
      ativo: req.body.ativo === 'on' || req.body.ativo === 'true'
    });
    res.redirect('/clientes');
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(400).send('Erro ao cadastrar cliente: ' + error.message);
  }
};

//  exibe dados completos de um cliente
exports.detalhe = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).send('Cliente não encontrado');

    res.render('clientes/detalhe', {
      titulo: 'Detalhes do Cliente - SolarTrack Admin',
      paginaAtiva: 'clientes',
      cliente
    });
  } catch (error) {
    res.status(400).send('ID de cliente inválido');
  }
};

// Exibe formulário de edição preenchido
exports.formEditar = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).send('Cliente não encontrado');

    res.render('clientes/form', {
      titulo: 'Editar Cliente - SolarTrack Admin',
      paginaAtiva: 'clientes',
      cliente,
      acao: `/clientes/${cliente._id}?_method=PUT`,
      metodo: 'POST'
    });
  } catch (error) {
    res.status(400).send('ID de cliente inválido');
  }
};

// atualiza cliente no MongoDB
exports.atualizar = async (req, res) => {
  try {
    await Cliente.findByIdAndUpdate(
      req.params.id,
      {
        nome: req.body.nome,
        telefone: req.body.telefone,
        cidade: req.body.cidade,
        endereco: req.body.endereco,
        ativo: req.body.ativo === 'on' || req.body.ativo === 'true'
      },
      { runValidators: true }
    );
    res.redirect('/clientes');
  } catch (error) {
    res.status(400).send('Erro ao atualizar cliente: ' + error.message);
  }
};

// remove cliente do MongoDB
exports.excluir = async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.redirect('/clientes');
  } catch (error) {
    res.status(400).send('Erro ao excluir cliente');
  }
};