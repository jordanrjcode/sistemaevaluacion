import React, { useContext } from "react";
import Modal from "@material-ui/core/Modal";

import AuthContext from "../../Context/users/authContext";
import AlertaContext from "../../Context/alerta/alertaContext";
import { makeStyles } from "@material-ui/core/styles";
export function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
export const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "300px",
    margin: "0 auto",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "30px",
    borderRadius: "8px",
  },
  title: {
    maginBottom: "25px",
    fontSize: "1.5rem",
    textAlign: "center",
  },
  inputs: {
    display: "flex",
    justifyContent: "center",
    marginTop: "25px",
    maginBottom: "25px",
    alignItems: "center",
    fontSize: "1.5rem",
  },
  button_yes: {
    padding: "10px",
    background: "dodgerblue",
    color: "white",
    display: "block",
    margin: "15px auto",
    border: "none",
    outline: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  button_no: {
    padding: "10px",
    background: "tomato",
    color: "white",
    display: "block",
    margin: "15px auto",
    border: "none",
    outline: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  parrafo: {
    marginTop: "25px",
    fontSize: "1.5rem",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "space-between",
  },
}));
const ModalPersonalizada = ({
  finalizar,
  open,
  preguntaSeleccionada,
  evaluacionSeleccionada,
  respuestaFinal,
  deshonestidad,
  SetFinalizar,
  handleClose,
  setRespuesta,
  seconds,
  isActive,
  setSeconds,
}) => {
  const authContext = useContext(AuthContext);
  const alertaContext = useContext(AlertaContext);
  const { finalizarEvaluacion, usuario } = authContext;
  const { mostrarAlerta } = alertaContext;
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  React.useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 30) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
    //eslint-disable-next-line
  }, [seconds, isActive]);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <>
        <p className={classes.title}>{preguntaSeleccionada.nombre}</p>
        {preguntaSeleccionada.opciones
          ? preguntaSeleccionada.opciones.map((opcion, index) => (
              <div className={classes.inputs} key={index}>
                <input
                  type="radio"
                  name="opciones"
                  onChange={(e) => {
                    setRespuesta(e.target.value);
                  }}
                  value={opcion}
                  id={opcion}
                />{" "}
                <label htmlFor={opcion}>{opcion}</label>{" "}
              </div>
            ))
          : null}
        <p className={classes.parrafo}>
          Tienes {seconds} segundos, tomate tu tiempo
        </p>
      </>
    </div>
  );
  const body2 = (
    <div style={modalStyle} className={classes.paper}>
      <p className={classes.title}>¿ Desea Finalizar la evaluacion ? </p>
      <div className={classes.buttons}>
        <button
          className={classes.button_yes}
          onClick={() => {
            if (
              respuestaFinal.length !== evaluacionSeleccionada.preguntas.length
            ) {
              mostrarAlerta(
                "Te faltan revisar algunas preguntas",
                "alerta__error"
              );
              SetFinalizar(false);
              handleClose();
              return;
            }
            finalizarEvaluacion({
              respuestas: respuestaFinal,
              deshonestidad: deshonestidad,
              evaluacion: evaluacionSeleccionada._id,
              nombreEstudiante: usuario.nombre,
              estudiante: usuario._id,
              nombreEvaluacion: evaluacionSeleccionada.nombre,
            });
            handleClose();
          }}
        >
          Si
        </button>
        <button
          className={classes.button_no}
          onClick={() => {
            SetFinalizar(false);
            handleClose();
          }}
        >
          No
        </button>
      </div>
    </div>
  );
  return (
    <Modal
      open={open}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {finalizar ? body2 : body}
    </Modal>
  );
};
export default ModalPersonalizada;
