// models/Cliente.js
const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'O nome do cliente é obrigatório'],
      trim: true
    },
    telefone: {
      type: String,
      required: [true, 'O telefone é obrigatório'],
      trim: true
    },
    cidade: {
      type: String,
      required: [true, 'A cidade é obrigatória'],
      trim: true
    },
    endereco: {
      type: String,
      required: [true, 'O endereço é obrigatório'],
      trim: true
    },
    ativo: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cliente', clienteSchema);