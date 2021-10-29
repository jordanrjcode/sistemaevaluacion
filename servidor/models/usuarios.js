const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Usuario = new Schema({
  nombre: {
    type: String,
    require: true,
    uppercase: true,
    trim: true,
  },
  cedula: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  emailInstitucional: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  emailPersonal: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  celular: {
    type: String,
    trim: true,
    required: true,
  },
  curso: {
    type: mongoose.Types.ObjectId,
    ref: "Cursos",
    require: true,
    trim: true,
  },
  carrera: {
    type: mongoose.Types.ObjectId,
    ref: "Carreras",
    required: true,
    trim: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Usuarios", Usuario);
