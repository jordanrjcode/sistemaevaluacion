const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Curso = new Schema({
  nombre: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  jornada: { type: String, required: true, lowercase: true, trim: true },
  carrera: { type: mongoose.Types.ObjectId, ref: "Carreras", required: true },
  fechaCreacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Cursos", Curso);
