const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");
const authEstudiantesController = require("../controllers/authEstudiantesController");
//Endpoint /api/auth
router.post(
  "/",
  [check("emailInstitucional", "Ingrese un email valido").isEmail()],
  authEstudiantesController.iniciarSesion
);

router.get(
  "/evaluacion/:curso/:carrera",
  auth,
  authEstudiantesController.obtenerEvaluaciones
);

router.get("/user", auth, authEstudiantesController.obtenerUsuarioAutenticado);
router.get("/", authEstudiantesController.obtenerUsuarios);

router.post(
  "/finalizar",
  auth,
  [
    check("respuestas", "Las respuestas son requeridas").isArray({ min: 1 }),
    check("deshonestidad", "Ey pillo no te pases").not().isEmpty(),
    check("evaluacion", "La evaluacion es requerida").not().isEmpty(),
    check("nombreEstudiante", "El nombre del alumno es requerido")
      .not()
      .isEmpty(),
    check("estudiante", "El identificador del alumno es requerido")
      .not()
      .isEmpty(),
    check("nombreEvaluacion", "El nombre de la evaluacion es requerida")
      .not()
      .isEmpty(),
  ],
  authEstudiantesController.finalizarEvaluacion
);

module.exports = router;
