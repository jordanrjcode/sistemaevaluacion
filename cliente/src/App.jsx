import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/layout/Navbar";
import Landing from "./Components/layout/Landing";
import Login from "./Components/auth/Login";
import Home from "./Components/users/Home";
import Adminlogin from "./Components/auth/Adminlogin";
import Administracion from "./Components/admin/Administracion";
import RutaPrivada from "./Components/rutas/RutaPrivada";
import RutaAdmin from "./Components/rutas/RutaAdmin";
import tokenAuht from "./config/token";
import AuthContext from "./Context/users/authContext";
import Spinner from "./Components/layout/Spinner";
const token = localStorage.getItem("token");
if (token) {
  tokenAuht(token);
}

function App() {
  const authContext = useContext(AuthContext);
  const { admin, cargando, adminAutenticado, usuarioAutenticado } = authContext;
  useEffect(() => {
    adminAutenticado();
    if (!admin) {
      usuarioAutenticado();
    }
    // eslint-disable-next-line
  }, []);
  return cargando ? (
    <Spinner />
  ) : (
    <Router>
      <Navbar />
      <Switch>
        <Route component={Landing} path="/" exact />
        <Route component={Login} path="/login" exact />
        <RutaPrivada component={Home} path="/home" exact />
        <Route component={Adminlogin} path="/admin/login" exact />
        <RutaAdmin component={Administracion} path="/admin/home" exact />
      </Switch>
    </Router>
  );
}

export default App;
