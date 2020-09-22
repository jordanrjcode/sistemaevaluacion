const Usuario = require("../models/usuarios");
const Admin = require("../models/administradores");
const Calificacion = require("../models/calificaciones");
const Evaluacion = require("../models/evaluaciones");
const Curso = require("../models/cursos");
const Carrera = require("../models/carreras");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const XLSX = require("xlsx");
const path = require("path");

exports.agregarCarrera = async (req, res) => {
  //Extraer datos del body
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  //validando si la carrera ya existe
  try {
    let carreraNueva = await Carrera.findOne({ nombre: req.body.nombre });
    if (carreraNueva) {
      return res.status(400).json({ msg: "Esta carrera ya existe" });
    }
    //Agregar la carrera a la base de datos
    carreraNueva = new Carrera(req.body);
    await carreraNueva.save();
    res.json({ msg: "Agregando Carrera" });
  } catch (error) {
    res.send(500).json({ msg: "Hubo un error" });
  }
};

exports.obtenerCarreras = async (req, res) => {
  try {
    const carreras = await Carrera.find();
    if (carreras.length < 1)
      return res.status(404).json({ msg: "No hay carreras aun" });
    res.status(200).json({ carreras });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.agregarCurso = async (req, res) => {
  //Extraer datos del body
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  try {
    //Validar si la carrera existe
    const carrera = await Carrera.findById(req.body.carrera);
    if (!carrera) return res.status(400).json({ msg: "La carrera no existe" });

    //Validar si el curso existe
    let curso = await Curso.findOne({
      $and: [{ nombre: req.body.nombre }, { carrera: req.body.carrera }],
    });

    if (curso) {
      return res.status(400).json({ msg: "Este curso ya existe" });
    }

    //Agregar el curso a la base de datos
    curso = new Curso(req.body);
    await curso.save();

    res.json({ msg: "Agregando curso" });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.agregarEvaluacion = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty())
    return res.status(400).json({ errores: errores.array() });
  const { nombre, carrera, curso, preguntas } = req.body;
  try {
    const carreraDb = await Carrera.findById(carrera);
    if (!carreraDb)
      return res.status(404).json({ msg: "Carrera no encontrada" });
    const cursoDb = await Curso.findById(curso);
    if (!cursoDb) return res.status(404).json({ msg: "Este curso no existe" });
    if (cursoDb.carrera.toString() !== carrera) {
      return res
        .status(404)
        .json({ msg: "Este curso no existe en esta carrera" });
    }
    const evaluacion = new Evaluacion(req.body);
    await evaluacion.save();
    res.status(200).json({ msg: "La evaluacion se ha creado" });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.obtenerEvaluaciones = async (req, res) => {
  const { curso, carrera } = req.params;
  try {
    let evaluaciones = await Evaluacion.find({
      $and: [{ curso }, { carrera }],
    });
    if (!evaluaciones) {
      return res.status(404).json({ msg: "No hay evaluaciones" });
    }
    res.status(200).json({ evaluaciones });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.obtenerCalificaciones = async (req, res) => {
  const { curso, carrera } = req.params;
  try {
    let calificaciones = await Calificacion.find({
      $and: [{ curso }, { carrera }],
    });

    if (!calificaciones) {
      return res
        .status(404)
        .json({ msg: "Nadie ha realizado esta evaluacion" });
    }
    res.status(200).json({ calificaciones });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.obtenerCursos = async (req, res) => {
  try {
    const cursos = await Curso.find({ carrera: req.params.id });
    if (!cursos || cursos.length < 1)
      return res.status(404).json({ msg: "Sin cursos, agrega uno" });
    res.status(200).json({ cursos });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.agregarEstudiante = async (req, res) => {
  //Extraer datos del body
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.errors[0] });
  }
  const { datosexcel, carreraSeleccionada, cursoSeleccionado } = req.body;
  const estudiantes = [];
  datosexcel.datos.map((item) => {
    item.carrera = carreraSeleccionada;
    item.curso = cursoSeleccionado;
    estudiantes.push(item);
  });
  try {
    let lista = await Usuario.find();
    if (lista) {
      lista.forEach((item) => {
        estudiantes.forEach((estudiante) => {
          if (
            item.cedula === estudiante.cedula ||
            item.emailPersonal === estudiante.emailPersonal ||
            item.emailInstitucional === estudiante.emailInstitucional
          ) {
            let texto = `Los datos del usuario ${estudiante.nombre}, reviselos por favor`;
            return res.status(401).json({
              msg: texto,
            });
          }
        });
      });
    }

    lista = await Usuario.insertMany(estudiantes);
    //Validar los datos que vienen del body
    //Agreagar al estudiante a la base de datos
    res.status(200).json({ msg: "Exito" });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.iniciarSesion = async (req, res) => {
  //Validar los datos que vienen en el body
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      msg: errores.errors[0].msg,
    });
  }
  const { usernameAdmin, passwordAdmin } = req.body;
  //Consultar si el usuario existe en la base de datos
  try {
    const adminUser = await Admin.findOne({ usernameAdmin: usernameAdmin });
    if (!adminUser)
      return res.status(404).json({ msg: "El usuario no existe" });

    //Validar el password
    const passwordCorrecto = await bcryptjs.compare(
      passwordAdmin,
      adminUser.passwordAdmin
    );
    if (!passwordCorrecto) {
      return res.status(400).json({ msg: "Password Incorrecto" });
    }
    //Enviar el token al cliente
    const payload = {
      usuario: { id: adminUser.id },
    };

    //Firmar el token
    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      { expiresIn: 3600 },
      (error, token) => {
        if (error) throw error;
        res.status(200).json({ token });
      }
    );
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.crearAdmin = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty())
    return res.status(400).json({ errores: errores.array() });

  const { usernameAdmin, passwordAdmin, emailInstitucional } = req.body;
  try {
    let adminUser = await Admin.findOne({ usernameAdmin });
    if (adminUser) {
      return res
        .status(400)
        .json({ msg: "Este username ya ha sido registrado" });
    }
    adminUser = await Admin.findOne({ emailInstitucional });
    if (adminUser) {
      return res.status(400).json({ msg: "Este email ya ha sido registrado" });
    }

    adminUser = new Admin(req.body);
    const salt = await bcryptjs.genSalt(10);
    adminUser.passwordAdmin = await bcryptjs.hash(passwordAdmin, salt);

    await adminUser.save();

    // Crear y firmar el JWT
    const payload = {
      usuario: {
        id: adminUser.id,
      },
    };

    // firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      {
        expiresIn: 3600, // 1 hora
      },
      (error, token) => {
        if (error) throw error;

        // Mensaje de confirmación
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(400).json({ msg: "Hubo un error" });
  }
};

exports.obtenerAdmin = async (req, res) => {
  try {
    const usuario = await Admin.findById(req.usuario.id).select(
      "-passwordAdmin"
    );
    if (!usuario) return res.status(404).json({ msg: "Admin no encontrado" });
    res.status(200).json({ usuario });
  } catch (error) {
    res.status(500).json("Hubo un error");
  }
};

exports.leerArchivo = (req, res) => {
  const excel = XLSX.readFile(
    path.resolve(__dirname + "/../uploads/lista.xlsx")
  );
  let nombreHoja = excel.SheetNames;
  let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
  res.status(200).json({ datos });
};
