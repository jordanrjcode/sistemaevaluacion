const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Calificacion = new Schema({
  estudiante: { type: mongoose.Types.ObjectId, ref: "Usuarios" },
  nombreEstudiante: { type: String, required: true, trim: true },
  evaluacion: { type: mongoose.Types.ObjectId, ref: "Evaluaciones" },
  nombreEvaluacion: { type: String, required: true, trim: true },
  notaFinal: { type: Number, required: true },
  respuestas: { type: Array, required: true },
  deshonestidad: { type: Number, required: true },
  puntosMenos: { type: Number, required: true },
});

module.exports = mongoose.model("Calificaciones", Calificacion);
