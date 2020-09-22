import React from "react";
import "./EvaluacionActiva.css";
import AlertContext from "../../Context/alerta/alertaContext";
import ModalPersonalizada from "../layout/ModalPersonalizada";

const EvaluacionActiva = ({ evaluacionSeleccionada }) => {
  const alertaContext = React.useContext(AlertContext);
  const { alerta, mostrarAlerta } = alertaContext;
  const [open, setOpen] = React.useState(false);
  const [preguntasFiltradas, setPreguntasFiltradas] = React.useState(
    evaluacionSeleccionada.preguntas
  );
  const [preguntaSeleccionada, setPreguntaSeleccionada] = React.useState({});
  const [preguntaAlterna, setPreguntaAlterna] = React.useState("");
  const [respuesta, setRespuesta] = React.useState("");
  const [respuestaFinal, setRespuestaFinal] = React.useState([]);
  const [seconds, setSeconds] = React.useState(30);
  const [isActive, setIsActive] = React.useState(false);
  const [finalizar, SetFinalizar] = React.useState(false);
  const [deshonestidad, setDeshonestidad] = React.useState(0);

  React.useEffect(() => {
    // Detetcta si el usuario sale de la pestaña
    const revisarHonestidad = () => {
      mostrarAlerta(
        "Por cada 2 veces que salgas de esta pestaña se te restara un punto",
        "alerta__error"
      );

      setDeshonestidad(deshonestidad + 1);
    };
    window.addEventListener("focus", revisarHonestidad);
    return () => {
      window.removeEventListener("focus", revisarHonestidad);
    };
  });

  const pararTimer = () => {
    setSeconds(30);
    setIsActive(false);
  };

  const iniciarTimer = () => {
    setIsActive(true);
  };

  const seleccionarPregunta = (pregunta) => {
    setPreguntaSeleccionada({
      nombre: pregunta.tituloPregunta,
      opciones: pregunta.opciones.split("|"),
    });
    setPreguntaAlterna({
      nombre: pregunta.tituloPreguntaReemplazo,
      opciones: pregunta.opcionesPreguntaReemplazo.split("|"),
    });
    handleOpen();
    iniciarTimer();
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    pararTimer();
    setOpen(false);
  };
  //Validacion si tiene respuesta o ya no tiene pregunta alterna
  if (seconds === 0) {
    if (respuesta !== "" || preguntaAlterna === "") {
      let filtrar = preguntasFiltradas.filter((item) => {
        if (
          item.tituloPregunta !== preguntaSeleccionada.nombre &&
          item.tituloPreguntaReemplazo !== preguntaSeleccionada.nombre
        ) {
          return true;
        } else {
          return false;
        }
      });
      setPreguntasFiltradas(filtrar);
      pararTimer();
      handleClose();
      setRespuestaFinal([
        ...respuestaFinal,
        { pregunta: preguntaSeleccionada.nombre, respuesta: respuesta },
      ]);
      setPreguntaSeleccionada({});
      setRespuesta("");
      setPreguntaAlterna("");
    } else {
      setPreguntaSeleccionada(preguntaAlterna);
      setPreguntaAlterna("");
      pararTimer();
      iniciarTimer();
    }
  }

  return (
    <>
      <ModalPersonalizada
        finalizar={finalizar}
        open={open}
        preguntaSeleccionada={preguntaSeleccionada}
        evaluacionSeleccionada={evaluacionSeleccionada}
        respuestaFinal={respuestaFinal}
        deshonestidad={deshonestidad}
        SetFinalizar={SetFinalizar}
        handleClose={handleClose}
        setRespuesta={setRespuesta}
        seconds={seconds}
        setSeconds={setSeconds}
        isActive={isActive}
      />
      <h2 className="evaactiva__title">{evaluacionSeleccionada.nombre}</h2>
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
      ) : null}
      <div className="evaactiva__grid">
        {preguntasFiltradas.map((pregunta, index) => (
          <div className="pregunta__item" key={index}>
            <p className="pregunta__name">Pregunta {index + 1}</p>
            <button
              className="pregunta__button"
              onClick={() => {
                seleccionarPregunta(pregunta);
              }}
            >
              Mostrar
            </button>
          </div>
        ))}
      </div>
      <button
        className="pregunta__button finalizar"
        onClick={() => {
          SetFinalizar(true);
          handleOpen();
        }}
      >
        Finalizar Evaluacion
      </button>
    </>
  );
};
export default EvaluacionActiva;
