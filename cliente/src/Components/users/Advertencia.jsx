import React, { useContext } from "react";
import "./Advertencia.css";
import AuthContext from "../../Context/users/authContext";
const Advertencia = ({ handleClose }) => {
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;
  return (
    <div className="advertencia">
      <h2 className="advertencia__title">
        Bienvenido {usuario ? usuario.nombre : null} !
      </h2>
      <div className="advertencia__atencion">
        <h3 className="atencion__title">¡¡ATENCIÓN!!</h3>
        <p className="atencion__message">
          Este sistema de evaluación comprende de un examen con tiempo límite de
          10 minutos, donde cada estudiante deberá responder solamente 8
          preguntas de selección múltiple. Cada pregunta tiene un tiempo
          establecido de 1 minuto para responderla, al pasar el minuto
          automáticamente pasará de forma aleatoria a una siguiente pregunta, al
          culminar las 8 preguntas establecidas se le mostrará en formato
          resumen las preguntas contestadas y las que no, con la opción a
          responder o modificar las respuestas. POR CIERTO, si tu intención es
          copiar inténtalo, todo lo que harás será monitoreado por el profesor y
          te saltarán alertas, que si las sigues incumpliendo simplemente se te
          cerrará el examen y no podrás continuar con el mismo. <br /> <br />{" "}
          <span className="message__bold">SUERTE !!</span>
        </p>
        <button
          className="atencion__button"
          onClick={() => {
            handleClose();
          }}
        >
          ESTOY LISTO
        </button>
      </div>
    </div>
  );
};

export default Advertencia;
