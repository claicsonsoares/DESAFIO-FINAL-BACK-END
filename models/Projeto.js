// models/Projeto.js
const mongoose = require('mongoose');

const projetoSchema = new mongoose.Schema(
  {
    clienteId: {
      type: String,
      required: [true, 'O ID do cliente é obrigatório'],
      trim: true
    },
    clienteNome: {
      type: String,
      required: [true, 'O nome do cliente é obrigatório'],
      trim: true
    },
    potenciaKWp: {
      type: Number,
      required: [true, 'A potência (kWp) é obrigatória'],
      min: [0.1, 'A potência deve ser maior que zero']
    },
    quantidadePlacas: {
      type: Number,
      required: [true, 'A quantidade de placas é obrigatória'],
      min: [1, 'Informe pelo menos 1 placa']
    },
    valorContrato: {
      type: Number,
      required: [true, 'O valor do contrato é obrigatório'],
      min: [0, 'O valor não pode ser negativo']
    },
    dataContrato: {
      type: Date,
      required: [true, 'A data do contrato é obrigatória'],
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Projeto', projetoSchema);