import React, { useEffect, useContext, useState } from "react";
import ConfirmarEvaluacion from "./ConfirmacionEvaluacion";
import AuthContext from "../../Context/users/authContext";
import "./Evaluacion.css";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import EvaluacionActiva from "./EvaluacionActiva";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    margin: "0 auto",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "30px",
    borderRadius: "8px",
  },
}));

const Evaluacion = () => {
  const authContext = useContext(AuthContext);
  const { evaluaciones, usuario, obtenerEvaluaciones } = authContext;
  const [evaluacionSeleccionada, setEvaluacionSeleccionada] = useState({});
  const [listo, setListo] = useState(false);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <ConfirmarEvaluacion
        title={evaluacionSeleccionada ? evaluacionSeleccionada.nombre : null}
        handleClose={handleClose}
        setListo={setListo}
      />
    </div>
  );

  useEffect(() => {
    if (usuario) {
      obtenerEvaluaciones({ curso: usuario.curso, carrera: usuario.carrera });
    }
    //eslint-disable-next-line
  }, [usuario]);
  return listo ? (
    <EvaluacionActiva evaluacionSeleccionada={evaluacionSeleccionada} />
  ) : (
    <>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>

      {evaluaciones ? (
        <h2 className="evaluacion__title">Evaluaciones</h2>
      ) : null}

      <div className="evaluacion">
        {evaluaciones !== null
          ? evaluaciones.evaluaciones.map((item) => (
              <div className="evaluacion__item" key={item._id}>
                <p className="item__name">{item.nombre}</p>
                <button
                  className="item__button"
                  onClick={() => {
                    setEvaluacionSeleccionada(item);
                    handleOpen();
                  }}
                >
                  Entrar
                </button>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default Evaluacion;
