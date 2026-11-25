// app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const connectDB = require('./config/db');

const indexRoutes = require('./routes/indexRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const projetoRoutes = require('./routes/projetoRoutes');
const instalacaoRoutes = require('./routes/instalacaoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Conecta ao MongoDB
connectDB();

// Configura EJS como motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares para ler dados de formulários, JSON, PUT/DELETE e arquivos estáticos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas principais
app.use('/', indexRoutes);
app.use('/clientes', clienteRoutes);
app.use('/projetos', projetoRoutes);
app.use('/instalacoes', instalacaoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});