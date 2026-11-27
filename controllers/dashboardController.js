
const Cliente = require('../models/Cliente');
const Projeto = require('../models/Projeto');
const Instalacao = require('../models/Instalacao');

exports.index = async (req, res) => {
  try {
    
    const [totalClientes, totalProjetos, totalInstalacoes, projetos] = await Promise.all([
      Cliente.countDocuments(),
      Projeto.countDocuments(),
      Instalacao.countDocuments(),
      Projeto.find()
    ]);

    const potenciaTotalKWp = projetos.reduce((acc, p) => acc + (p.potenciaKWp || 0), 0);
    const valorTotalContratos = projetos.reduce((acc, p) => acc + (p.valorContrato || 0), 0);

    res.render('dashboard', {
      titulo: 'Dashboard - SolarTrack Admin',
      paginaAtiva: 'dashboard',
      stats: {
        totalClientes,
        totalProjetos,
        totalInstalacoes,
        potenciaTotalKWp: potenciaTotalKWp.toFixed(2),
        valorTotalContratos
      }
    });
  } catch (error) {
    console.error('Erro no dashboard:', error);
    res.status(500).send('Erro ao carregar o dashboard');
  }
};