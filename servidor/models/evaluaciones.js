const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Evaluacion = new Schema({
  nombre: { type: String, required: true, trim: true, lowercase: true },
  carrera: { type: mongoose.Types.ObjectId, ref: "Carreras" },
  curso: { type: mongoose.Types.ObjectId, ref: "Cursos" },
  preguntas: { type: Array, required: true },
});

module.exports = mongoose.model("Evaluaciones", Evaluacion);
