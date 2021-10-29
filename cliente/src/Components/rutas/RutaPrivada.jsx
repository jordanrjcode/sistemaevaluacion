import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../Context/users/authContext";
const RutaPrivada = ({ component: Component, ...props }) => {
  const authContext = useContext(AuthContext);
  const { autenticado } = authContext;
  return (
    <Route
      {...props}
      render={(props) =>
        autenticado !== true ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RutaPrivada;
