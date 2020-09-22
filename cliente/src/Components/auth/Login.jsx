import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/users/authContext";
import AlertaContext from "../../Context/alerta/alertaContext";
import "./Login.css";
import ForwardIcon from "@material-ui/icons/Forward";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [lista, setLista] = useState([]);

  const alertaContext = useContext(AlertaContext);
  const authContext = useContext(AuthContext);
  const { alerta, mostrarAlerta } = alertaContext;
  const {
    admin,
    autenticado,
    mensaje,
    listausuarios,
    loginUsuario,
    obtenerListaUsuarios,
  } = authContext;

  useEffect(() => {
    if (autenticado && !admin) {
      props.history.push("/home");
    } else if (autenticado === null) {
      obtenerListaUsuarios();
    }

    if (mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria);
    // eslint-disable-next-line
  }, [mensaje, autenticado, admin, props.history]);

  const enviarDatos = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      mostrarAlerta("El email es requerido", "alerta__error");
      return;
    }
    loginUsuario({ emailInstitucional: email });
  };

  const autocompletarEstudiantes = (e) => {
    //Nuevo algoritmo
    if (listausuarios) {
      let matches = listausuarios.filter((item) => {
        const regex = new RegExp(`^${e.target.value}`, "gi");
        return item.emailInstitucional.match(regex);
      });
      if (e.target.value.length < 2) matches = [];
      setLista(matches);
    }
  };

  return (
    <form className="login">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
      ) : null}

      <h2 className="login__title">Iniciar Sesion</h2>
      <div className="login__bar">
        <input
          className="login__input"
          type="email"
          name="emailInstitucional"
          autoComplete="off"
          value={email}
          placeholder="Ingrese su correo institucional"
          onChange={(e) => {
            setEmail(e.target.value);
            autocompletarEstudiantes(e);
          }}
        />
        <button
          type="submit"
          className="login__button"
          onClick={(e) => {
            enviarDatos(e);
          }}
        >
          <ForwardIcon fontSize="large" />
        </button>
      </div>
      <div className="login__correos">
        {lista.length > 0
          ? lista.map((item) => (
              <p
                className="correos__ayuda"
                key={item._id}
                id={item.emailInstitucional}
                onClick={(e) => {
                  setEmail(e.target.id);
                  setLista([]);
                }}
              >
                {item.emailInstitucional}
              </p>
            ))
          : null}
      </div>
      <img
        src="/loguito.svg"
        className="login__image"
        alt="Logo System-Itsgg"
      />
    </form>
  );
};

export default Login;
