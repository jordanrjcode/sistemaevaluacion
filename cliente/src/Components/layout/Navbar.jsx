import React, { useContext } from "react";
import AuthContext from "../../Context/users/authContext";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { admin, autenticado, cerrarAdmin, cerrarUsuario } = authContext;

  const cerrarSesion = () => {
    if (admin) {
      cerrarAdmin();
    } else {
      cerrarUsuario();
    }
  };
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        SYSTEM-ITSGG
      </Link>
      <div className="navbar__list">
        {autenticado !== null ? (
          <button
            className="list__item"
            onClick={() => {
              cerrarSesion();
            }}
          >
            Cerrar Sesion
          </button>
        ) : (
          <NavLink
            to="/login"
            activeClassName="list__item__active"
            className="list__item"
          >
            Iniciar Sesion
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
