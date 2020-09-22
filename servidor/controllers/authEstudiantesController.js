const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuarios");
const Evaluacion = require("../models/evaluaciones");
const Calificacion = require("../models/calificaciones");
const { validationResult } = require("express-validator");

exports.iniciarSesion = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      msg: errores.errors[0].msg,
    });
  }
  try {
    //Validar el correo de la base de datos si existe
    const user = await Usuario.findOne({
      emailInstitucional: req.body.emailInstitucional,
    });
    if (!user) {
      return res.status(401).json({ msg: "Usuario no encontrado" });
    }

    let payload = {
      usuario: {
        id: user.id,
      },
    };
    //Dar un token
    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        // Mensaje de confirmación
        res.json({ token });
      }
    );

    //Enviarlo como respuesta al cliente
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.obtenerUsuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id);
    if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });
    res.status(200).json({ usuario });
  } catch (error) {
    res.status(500).json("Hubo un error");
  }
};
exports.obtenerUsuarios = async (req, res) => {
  try {
    let estudiantes = await Usuario.find().select([
      "-cedula",
      "-celular",
      "-emailPersonal",
      "-fechaCreacion",
      "-nombre",
      "-curso",
    ]);
    res.status(200).json({ estudiantes });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.obtenerEvaluaciones = async (req, res) => {
  try {
    const evaluaciones = await Evaluacion.find({
      $and: [{ curso: req.params.curso }, { carrera: req.params.carrera }],
    });

    if (!evaluaciones)
      return res.status(400).json({ msg: "No hay evaluaciones" });

    let calificaciones = await Calificacion.find({
      estudiante: req.usuario.id,
    });
    if (calificaciones.length > 0) {
      let listaEvaluaciones = [];
      evaluaciones.map((evaluacion) => {
        let repite = false;
        calificaciones.map((calificacion) => {
          if (
            calificacion.evaluacion.toString() === evaluacion._id.toString()
          ) {
            repite = true;
          }
        });
        if (!repite) {
          listaEvaluaciones.push(evaluacion);
        }
      });
      return res.status(200).json({ evaluaciones: listaEvaluaciones });
    }

    res.status(200).json({ evaluaciones });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.finalizarEvaluacion = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ msg: errores.errors[0].msg });
  }
  const {
    deshonestidad,
    estudiante,
    nombreEstudiante,
    respuestas,
    evaluacion,
    nombreEvaluacion,
  } = req.body;
  try {
    const estudianteDB = await Usuario.findById(estudiante);
    if (!estudianteDB)
      return res
        .status(401)
        .json({ msg: "Este estudiante no consta en nuestra base de datos" });
    const evaluacionDB = await Evaluacion.findById(evaluacion);
    if (!evaluacionDB) {
      return res
        .status(401)
        .json({ msg: "Esta evaluacion no consta en nuestra base de datos" });
    }
    //Calificacion
    let calificacion = 0;
    let calificacionTotal;
    evaluacionDB.preguntas.map((item) => {
      respuestas.map((item2) => {
        if (
          item.opcionCorrecta.toLowerCase().trim() ===
            item2.respuesta.toLowerCase().trim() ||
          item.opcionCorrectaPreguntaReemplazo.toLowerCase().trim() ===
            item2.respuesta.toLowerCase().trim()
        ) {
          calificacion += Number(item.puntosPregunta);
        }
      });
    });

    let copias = Math.floor(deshonestidad / 2);
    calificacionTotal = calificacion - copias;

    let newCalificacion = await Calificacion({
      estudiante,
      nombreEstudiante,
      evaluacion,
      nombreEvaluacion,
      notaFinal: calificacionTotal,
      respuestas,
      deshonestidad,
      puntosMenos: copias,
    });

    await newCalificacion.save();
    res.status(200).json({ msg: "Se ha enviado sus respuestas" });
  } catch (error) {
    res.status(500).json({ msg: "hubo un error" });
  }
};
