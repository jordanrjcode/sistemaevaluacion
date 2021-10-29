const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Carrera = new Schema({
  nombre: { type: String, required: true },
});

module.exports = mongoose.model("Carreras", Carrera);
