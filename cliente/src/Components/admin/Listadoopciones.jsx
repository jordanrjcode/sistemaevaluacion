import React, { useEffect, useContext, useState } from "react";
import AgregarAlumnos from "./AgregarAlumnos";
import AgregarEvaluacion from "./AgregarEvaluacion";
import Calificaciones from "./Calificaciones";
import AuthContext from "../../Context/users/authContext";
import AlertaContext from "../../Context/alerta/alertaContext";
import "./Listadoopciones.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ListadoAlumnos from "./ListadoAlumnos";
const Listadocursos = ({ setOpcion, opcion }) => {
  const authContext = useContext(AuthContext);
  const alertaContext = useContext(AlertaContext);
  const {
    datosexcel,
    cursos,
    carreras,
    mensaje,
    obtenerCarreras,
    obtenerCalificaciones,
    obtenerCursos,
    agregandoAlumnos,
    agregarEvaluacion,
    obtenerListaEstudiantes,
  } = authContext;
  const { alerta, mostrarAlerta } = alertaContext;
  const [carreraSeleccionada, setCarreraSeleccionada] = useState("");
  const [evaluacionSeleccionada, setEvaluacionSeleccionada] = useState("");
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const [titleEvaluacion, setTitleEvaluacion] = useState("");
  useEffect(() => {
    if (!carreras) {
      obtenerCarreras();
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje]);

  let componente;
  switch (opcion) {
    case "agregarEstudiantes":
      componente = <AgregarAlumnos />;
      break;
    case "agregarEvaluacion":
      componente = (
        <AgregarEvaluacion
          preguntas={preguntas}
          setPreguntas={setPreguntas}
          titleEvaluacion={titleEvaluacion}
          setTitleEvaluacion={setTitleEvaluacion}
        />
      );
      break;
    case "calificacionEstudiantes":
      componente = (
        <Calificaciones
          setEvaluacionSeleccionada={setEvaluacionSeleccionada}
          cursoSeleccionado={cursoSeleccionado}
          carreraSeleccionada={carreraSeleccionada}
        />
      );
      break;
    case "listadoEstudiantes":
      componente = <ListadoAlumnos />;
      break;
    default:
      componente = null;
      break;
  }

  const funciones = () => {
    switch (opcion) {
      case "agregarEstudiantes":
        agregarAlumnos();
        break;
      case "agregarEvaluacion":
        agregandoEvaluaciones();
        break;
      case "calificacionEstudiantes":
        obteniendoCalificaciones();
        break;
      case "listadoEstudiantes":
        obtenerListaEstudiantes();
        break;
      default:
        break;
    }
  };

  const seleccionCarrera = (e) => {
    setCarreraSeleccionada(e.target.value);
    obtenerCursos(e.target.value);
  };

  const agregarAlumnos = () => {
    if (!datosexcel) {
      mostrarAlerta("Suba el excel", "alerta__error");
      return;
    }
    if (!carreraSeleccionada.trim()) {
      mostrarAlerta("Escoja una carrera", "alerta__error");
      return;
    }
    if (!cursoSeleccionado.trim()) {
      mostrarAlerta("Escoja un curso", "alerta__error");
      return;
    }
    agregandoAlumnos({ datosexcel, carreraSeleccionada, cursoSeleccionado });
  };

  const agregandoEvaluaciones = () => {
    if (!carreraSeleccionada.trim()) {
      mostrarAlerta("Escoja una carrera", "alerta__error");
      return;
    }
    if (!cursoSeleccionado.trim()) {
      mostrarAlerta("Escoja un curso", "alerta__error");
      return;
    }
    if (preguntas.length < 1) {
      mostrarAlerta("Debe agregar minimo 1 pregunta", "alerta__error");
      return;
    }
    if (!titleEvaluacion.trim()) {
      mostrarAlerta("Ingrese el titulo de la evaluacion", "alerta__error");
      return;
    }
    agregarEvaluacion({
      nombre: titleEvaluacion,
      curso: cursoSeleccionado,
      carrera: carreraSeleccionada,
      preguntas: preguntas,
    });
  };

  const obteniendoCalificaciones = () => {
    if (!carreraSeleccionada.trim()) {
      mostrarAlerta("Escoja una carrera", "alerta__error");
      return;
    }
    if (!cursoSeleccionado.trim()) {
      mostrarAlerta("Escoja un curso", "alerta__error");
      return;
    }
    if (!evaluacionSeleccionada.trim()) {
      mostrarAlerta("Escoja una evaluacion", "alerta__error");
      return;
    }
    obtenerCalificaciones({
      evaluacion: evaluacionSeleccionada,
    });
  };

  return (
    <div className="lista">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
      ) : null}

      <button
        className="lista__back"
        onClick={() => {
          setOpcion("");
        }}
      >
        <ArrowBackIcon fontSize="large" />{" "}
      </button>

      <h2 className="lista__title">Seleccione una carrera !</h2>
      <select
        defaultValue={"DEFAULT"}
        className="lista__cursos"
        name="listaCursos"
        onChange={(e) => {
          seleccionCarrera(e);
        }}
      >
        <option value="DEFAULT" disabled>
          -- Seleccione una carrera --
        </option>
        {carreras
          ? carreras.map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item.nombre.toUpperCase()}
                </option>
              );
            })
          : null}
      </select>

      <h2 className="lista__title">Seleccione un curso !</h2>
      <select
        defaultValue={"DEFAULT"}
        className="lista__cursos"
        name="listaCursos"
        onChange={(e) => {
          setCursoSeleccionado(e.target.value);
        }}
      >
        <option value="DEFAULT" disabled>
          -- Seleccione un curso --
        </option>
        {cursos
          ? cursos.map((curso) => {
              return (
                <option key={curso._id} value={curso._id}>
                  {curso.nombre.toUpperCase()}
                </option>
              );
            })
          : null}
      </select>
      {componente}
      <button
        className="lista__button"
        onClick={() => {
          funciones();
        }}
      >
        Aceptar
      </button>
    </div>
  );
};

export default Listadocursos;
