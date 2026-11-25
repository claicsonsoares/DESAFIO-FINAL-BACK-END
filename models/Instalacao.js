// models/Instalacao.js
const mongoose = require('mongoose');

const instalacaoSchema = new mongoose.Schema(
  {
    projetoId: {
      type: String,
      required: [true, 'O ID do projeto é obrigatório'],
      trim: true
    },
    projetoDescricao: {
      type: String,
      required: [true, 'A identificação do projeto ou cliente é obrigatória'],
      trim: true
    },
    responsavelCampo: {
      type: String,
      required: [true, 'O responsável em campo é obrigatório'],
      trim: true
    },
    dataAgendada: {
      type: Date,
      required: [true, 'A data agendada é obrigatória']
    },
    status: {
      type: String,
      required: true,
      enum: ['Em Vistoria', 'Agendada', 'Em Instalação', 'Homologado'],
      default: 'Agendada'
    },
    concluida: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Instalacao', instalacaoSchema);