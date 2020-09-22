const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const adminController = require("../controllers/adminController");
const auth = require("../middleware/auth");
const path = require("path");
const multer = require("multer");
//Multer
let storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, "lista" + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

//Endpoint api/admin/estudent
router.post(
  "/estudent",
  auth,
  [
    check("datosexcel", "El archivo excel es requerido").not().isEmpty(),
    check("carreraSeleccionada", "La carrera es requerida").not().isEmpty(),
    check("cursoSeleccionado", "El curso es requerido").not().isEmpty(),
  ],
  adminController.agregarEstudiante
);

//Ruta para iniciar sesion como admin
router.post(
  "/login",
  [
    check("usernameAdmin", "El username es requerido").not().isEmpty(),
    check(
      "passwordAdmin",
      "El password debe ser de al menos 6 caracteres"
    ).isLength({ min: 6 }),
  ],
  adminController.iniciarSesion
);

router.get("/", auth, adminController.obtenerAdmin);

router.post(
  "/register",
  [
    check("usernameAdmin", "El username es requerido").not().isEmpty(),
    check("nombreAdmin", "Los nombre completo es requeridos").not().isEmpty(),
    check("emailInstitucional", "Ingrese un email valido").isEmail(),
    check(
      "passwordAdmin",
      "El password debe ser de al menos 6 caracteres"
    ).isLength({ min: 6 }),
  ],
  adminController.crearAdmin
);

//Endpoint api/admin/upload
router.post("/upload", auth, upload.single("file"), (req, res) => {
  res.status(200).json({ msg: "archivo subido " });
});

router.get("/upload", auth, adminController.leerArchivo);

//Endpoint api/admin/carrera
router.post(
  "/carrera",
  auth,
  [check("nombre", "El nombre de la carrera es requerido").not().isEmpty()],
  adminController.agregarCarrera
);

router.get("/carrera", adminController.obtenerCarreras);

//Endpoint api/admin/curso
router.post(
  "/curso",
  auth,
  [
    check("nombre", "El nombre del curso es requerido").not().isEmpty(),
    check("jornada", "La jornada es requerida").not().isEmpty(),
  ],
  adminController.agregarCurso
);

router.get("/curso/:id", auth, adminController.obtenerCursos);

//Endpoint api/admin/evaluacion
router.post(
  "/evaluacion",
  auth,
  [
    check("nombre", "El nombre de la evaluacion es requerido").not().isEmpty(),
    check("carrera", "La carrera es requerida").not().isEmpty(),
    check("curso", "El curso es requerido").not().isEmpty(),
    check("preguntas", "Minimo agregue una pregunta por favor").isArray({
      min: 1,
    }),
  ],
  adminController.agregarEvaluacion
);

router.get(
  "/evaluaciones/:curso/:carrera",
  auth,
  adminController.obtenerEvaluaciones
);

router.get(
  "calificaciones/:curso/:carrera",
  auth,
  adminController.obtenerCalificaciones
);

module.exports = router;
