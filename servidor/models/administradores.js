const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin = new Schema({
  usernameAdmin: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  nombreAdmin: {
    type: String,
    required: true,
  },
  emailInstitucional: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  passwordAdmin: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Administradores", Admin);
