import React, { useContext, useEffect } from "react";
import AuthContext from "../../Context/users/authContext";
import AlertaContext from "../../Context/alerta/alertaContext";
import "./Adminlogin.css";

const Adminlogin = (props) => {
  const [datos, setDatos] = React.useState({
    usernameAdmin: "",
    passwordAdmin: "",
  });
  const { usernameAdmin, passwordAdmin } = datos;

  const authContext = useContext(AuthContext);
  const alertaContext = useContext(AlertaContext);
  const { admin, autenticado, mensaje, loginAdmin } = authContext;
  const { alerta, mostrarAlerta } = alertaContext;

  useEffect(() => {
    if (autenticado && admin) {
      props.history.push("/admin/home");
    }
    if (mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria);
    // eslint-disable-next-line
  }, [mensaje, autenticado, admin, props.history]);
  const obtenerDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  const enviarDatosAdmin = (e) => {
    e.preventDefault();
    if (!usernameAdmin.trim()) {
      mostrarAlerta("Username es requerido", "alerta__error");
      return;
    }
    if (!passwordAdmin.trim()) {
      mostrarAlerta("Password es requerido", "alerta__error");
      return;
    }

    loginAdmin({ usernameAdmin, passwordAdmin });
  };

  return (
    <form className="admin" onSubmit={enviarDatosAdmin}>
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
      ) : null}
      <h3 className="admin__title">¿Eres Administrador?</h3>
      <input
        className="admin__input"
        type="text"
        name="usernameAdmin"
        placeholder="Nombre de usuario"
        value={usernameAdmin}
        autoComplete="off"
        onChange={(e) => {
          obtenerDatos(e);
        }}
      />
      <input
        className="admin__input"
        type="password"
        name="passwordAdmin"
        value={passwordAdmin}
        autoComplete="off"
        onChange={(e) => {
          obtenerDatos(e);
        }}
        placeholder="Contraseña"
      />
      <button className="admin__button" type="submit">
        Ingrese
      </button>
    </form>
  );
};

export default Adminlogin;
