import React from "react";
import "./ConfirmacionEvaluacion.css";
const ConfirmacionEvaluacion = ({ title, handleClose, setListo }) => {
  return (
    <>
      <h2 className="confirmar__title">{title}</h2>
      <p className="confirmar__msg">
        ¿Seguro que desea ingresar a esta evaluacion?
      </p>
      <div className="confirmar__buttons">
        <button
          className="confirmar__button button__yes"
          onClick={() => {
            setListo(true);
            handleClose();
          }}
        >
          Si
        </button>
        <button
          className="confirmar__button button__no"
          onClick={() => {
            handleClose();
          }}
        >
          No
        </button>
      </div>
    </>
  );
};

export default ConfirmacionEvaluacion;
