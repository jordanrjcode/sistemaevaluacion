import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../Context/users/authContext";

const RutaAdmin = ({ component: Component, ...props }) => {
  const authContext = useContext(AuthContext);
  const { autenticado, admin } = authContext;
  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !admin ? (
          <Redirect to="/admin/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RutaAdmin;
