import React, { useState, useContext } from "react";
import "./AgregarEvaluacion.css";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import AlertaContext from "../../Context/alerta/alertaContext";
const AgregarEvaluacion = ({
  preguntas,
  setPreguntas,
  titleEvaluacion,
  setTitleEvaluacion,
}) => {
  const alertaContext = useContext(AlertaContext);
  const { mostrarAlerta } = alertaContext;
  const [cantidadPreguntas, setCantidadPreguntas] = useState(1);
  const [dataPreguntas, setDataPreguntas] = useState({
    tituloPregunta: "",
    opciones: "",
    opcionCorrecta: "",
    tituloPreguntaReemplazo: "",
    opcionesPreguntaReemplazo: "",
    opcionCorrectaPreguntaReemplazo: "",
    puntosPregunta: 0,
  });

  const {
    tituloPregunta,
    opciones,
    opcionCorrecta,
    tituloPreguntaReemplazo,
    opcionesPreguntaReemplazo,
    opcionCorrectaPreguntaReemplazo,
    puntosPregunta,
  } = dataPreguntas;

  const enviarDatos = () => {
    if (
      !tituloPregunta.trim() ||
      !opciones.trim() ||
      !opcionCorrecta.trim() ||
      !tituloPreguntaReemplazo.trim() ||
      !opcionesPreguntaReemplazo.trim() ||
      !opcionCorrectaPreguntaReemplazo.trim() ||
      puntosPregunta <= 0
    ) {
      mostrarAlerta("Todos los campos son requeridos", "alerta__error");
      return;
    }
    if (
      opciones.indexOf("|") === -1 &&
      opcionesPreguntaReemplazo.indexOf("|") === -1
    ) {
      mostrarAlerta("Ingrese bien sus opciones por favor", "alerta__error");
      return;
    }
    setCantidadPreguntas(cantidadPreguntas + 1);
    setPreguntas([...preguntas, dataPreguntas]);
    setDataPreguntas({
      tituloPregunta: "",
      opciones: "",
      opcionCorrecta: "",
      tituloPreguntaReemplazo: "",
      opcionesPreguntaReemplazo: "",
      opcionCorrectaPreguntaReemplazo: "",
      puntosPregunta: 0,
    });
    mostrarAlerta("Se agrego la pregunta correctamente", "alerta__ok");
  };

  return (
    <div className="formulario__evaluacion">
      <h2 className="evaluacion__title">Agregar Evaluacion</h2>
      <input
        name="nombre"
        type="text"
        value={titleEvaluacion}
        className="evaluacion__input"
        placeholder="Titulo de la evaluacion"
        onChange={(e) => {
          setTitleEvaluacion(e.target.value);
        }}
      />
      <input
        onChange={(e) => {
          setDataPreguntas({
            ...dataPreguntas,
            [e.target.name]: e.target.value,
          });
        }}
        type="text"
        name="tituloPregunta"
        value={tituloPregunta}
        className="evaluacion__input"
        placeholder={"Pregunta " + cantidadPreguntas}
      />
      <input
        name="opciones"
        value={opciones}
        type="text"
        className="evaluacion__input"
        placeholder="Ingrese las opciones [opcion1|opcion2]"
        onChange={(e) => {
          setDataPreguntas({
            ...dataPreguntas,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <input
        name="opcionCorrecta"
        value={opcionCorrecta}
        type="text"
        className="evaluacion__input"
        placeholder="Ingrese la opcion correcta"
        onChange={(e) => {
          setDataPreguntas({
            ...dataPreguntas,
            [e.target.name]: e.target.value,
          });
        }}
      />

      <input
        name="tituloPreguntaReemplazo"
        value={tituloPreguntaReemplazo}
        type="text"
        placeholder="Pregunta Reemplazo"
        className="evaluacion__input"
        onChange={(e) => {
          setDataPreguntas({
            ...dataPreguntas,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <input
        name="opcionesPreguntaReemplazo"
        value={opcionesPreguntaReemplazo}
        type="text"
        placeholder="Opciones pregunta reemplazo [item1|item2]"
        className="evaluacion__input"
        onChange={(e) => {
          setDataPreguntas({
            ...dataPreguntas,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <input
        name="opcionCorrectaPreguntaReemplazo"
        value={opcionCorrectaPreguntaReemplazo}
        type="text"
        placeholder="Opcion correcta pregunta reemplazo"
        className="evaluacion__input"
        onChange={(e) => {
          setDataPreguntas({
            ...dataPreguntas,
            [e.target.name]: e.target.value,
          });
        }}
      />

      <input
        name="puntosPregunta"
        value={puntosPregunta}
        type="number"
        placeholder="Valor de la pregunta"
        className="evaluacion__input"
        onChange={(e) => {
          setDataPreguntas({
            ...dataPreguntas,
            [e.target.name]: Number(e.target.value),
          });
        }}
      />

      <button
        className="evaluacion__button"
        onClick={() => {
          enviarDatos();
        }}
      >
        Agregar Pregunta{" "}
        <AddCircleRoundedIcon fontSize="large" style={{ marginLeft: "10px" }} />
      </button>
    </div>
  );
};

export default AgregarEvaluacion;
