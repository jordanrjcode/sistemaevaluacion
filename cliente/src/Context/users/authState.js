import React, { useReducer } from "react";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import {
  INICIAR_SESION_ADMIN_EXITO,
  INICIAR_SESION_USUARIO_ERROR,
  INICIAR_SESION_USUARIO_EXITO,
  OBTENER_CARRERAS_ERROR,
  OBTENER_CARRERAS_EXITO,
  OBTENER_CURSOS_EXITO,
  OBTENER_CURSOS_ERROR,
  OBTENER_ADMIN,
  OBTENER_ADMIN_ERROR,
  OBTENER_USUARIO,
  OBTENER_USUARIO_ERROR,
  OBTENER_EXCEL_ERROR,
  OBTENER_EXCEL_EXITO,
  CERRAR_SESION_ADMIN,
  AGREGAR_USUARIOS_ERROR,
  AGREGAR_USUARIOS_EXITO,
  AGREGAR_EVALUACION_EXITO,
  OBTENER_EVALUACIONES_EXITO,
  OBTENER_LISTA_USUARIOS_ERROR,
  OBTENER_LISTA_USUARIOS_EXITO,
  OBTENER_ADMIN_EVALUACIONES_EXITO,
  OBTENER_ADMIN_CALIFICACIONES_EXITO,
  ENVIAR_EVALUACION,
  CARGANDO,
} from "../../Types/index";
const AuthState = (props) => {
  const stateInicial = {
    token: localStorage.getItem("token"),
    evaluaciones: null,
    admin: false,
    autenticado: null,
    usuario: null,
    mensaje: null,
    carreras: null,
    datosexcel: null,
    cursos: null,
    cargando: false,
    listausuarios: null,
    evaluacionesadmin: null,
    calificacionesadmin: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, stateInicial);

  //funciones estudiantes
  const finalizarEvaluacion = async (data) => {
    dispatch({
      type: CARGANDO,
    });
    try {
      const respuesta = await clienteAxios.post("api/auth/finalizar", data);
      let alerta = {
        msg: respuesta.data.msg,
        categoria: "alerta__ok",
      };
      dispatch({
        type: ENVIAR_EVALUACION,
        payload: alerta,
      });
    } catch (error) {
      dispatch({
        type: OBTENER_CARRERAS_ERROR,
      });
    }
  };
  const obtenerEvaluaciones = async (data) => {
    try {
      const respuesta = await clienteAxios.get(
        `/api/auth/evaluacion/${data.curso}/${data.carrera}`
      );

      dispatch({ type: OBTENER_EVALUACIONES_EXITO, payload: respuesta.data });
    } catch (error) {
      dispatch({ type: OBTENER_CARRERAS_ERROR });
    }
  };

  const obtenerListaUsuarios = async () => {
    try {
      const respuesta = await clienteAxios.get("/api/auth");
      dispatch({
        type: OBTENER_LISTA_USUARIOS_EXITO,
        payload: respuesta.data,
      });
    } catch (error) {
      dispatch({
        type: OBTENER_LISTA_USUARIOS_ERROR,
      });
    }
  };

  const usuarioAutenticado = async () => {
    dispatch({ type: CARGANDO });
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/api/auth/user");
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data,
      });
    } catch (error) {
      dispatch({
        type: OBTENER_USUARIO_ERROR,
      });
    }
  };

  const cerrarUsuario = () => {
    dispatch({
      type: CERRAR_SESION_ADMIN,
    });
  };

  const loginUsuario = async (data) => {
    cerrarAdmin();
    try {
      const respuesta = await clienteAxios.post("/api/auth", data);
      dispatch({
        type: INICIAR_SESION_USUARIO_EXITO,
        payload: respuesta.data,
      });
      usuarioAutenticado();
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta__error",
      };
      dispatch({
        type: INICIAR_SESION_USUARIO_ERROR,
        payload: alerta,
      });
    }
  };

  //Funciones admin
  const obtenerCalificaciones = async (data) => {
    const { evaluacion } = data;

    try {
      const respuesta = await clienteAxios.get(
        `/api/admin/calificaciones/${evaluacion}`
      );
      dispatch({
        type: OBTENER_ADMIN_CALIFICACIONES_EXITO,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: OBTENER_CURSOS_ERROR,
      });
    }
  };

  const obtenerEvaluacionesAdmin = async (data) => {
    const { curso, carrera } = data;
    try {
      const respuesta = await clienteAxios.get(
        `/api/admin/evaluaciones/${curso}/${carrera}`
      );
      dispatch({
        type: OBTENER_ADMIN_EVALUACIONES_EXITO,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: OBTENER_CARRERAS_ERROR,
      });
    }
  };

  const adminAutenticado = async () => {
    dispatch({ type: CARGANDO });

    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/api/admin");
      dispatch({
        type: OBTENER_ADMIN,
        payload: respuesta.data,
      });
    } catch (error) {
      dispatch({
        type: OBTENER_ADMIN_ERROR,
      });
    }
  };

  const loginAdmin = async (data) => {
    cerrarUsuario();
    try {
      const respuesta = await clienteAxios.post("/api/admin/login", data);
      dispatch({
        type: INICIAR_SESION_ADMIN_EXITO,
        payload: respuesta.data,
      });
      adminAutenticado();
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta__error",
      };
      dispatch({
        type: INICIAR_SESION_USUARIO_ERROR,
        payload: alerta,
      });
    }
  };

  const cerrarAdmin = () => {
    dispatch({
      type: CERRAR_SESION_ADMIN,
    });
  };

  const obtenerCarreras = async () => {
    try {
      const respuesta = await clienteAxios.get("/api/admin/carrera");
      dispatch({
        type: OBTENER_CARRERAS_EXITO,
        payload: respuesta.data,
      });
    } catch (error) {
      dispatch({
        type: OBTENER_CARRERAS_ERROR,
      });
    }
  };

  const obtenerCursos = async (id) => {
    try {
      const respuesta = await clienteAxios.get(`/api/admin/curso/${id}`);
      dispatch({
        type: OBTENER_CURSOS_EXITO,
        payload: respuesta.data,
      });
    } catch (error) {
      dispatch({
        type: OBTENER_CURSOS_ERROR,
      });
    }
  };

  const obtenerDatosExcel = async (file) => {
    try {
      let formData = new FormData();
      formData.append("file", file);
      const respuesta = await clienteAxios.post("/api/admin/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      let alerta = {
        msg: respuesta.data.msg,
        categoria: "alerta__ok",
      };
      const archivos = await clienteAxios.get("/api/admin/upload");
      dispatch({
        type: OBTENER_EXCEL_EXITO,
        payload: {
          mensaje: alerta,
          datosexcel: archivos.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OBTENER_EXCEL_ERROR,
      });
    }
  };

  const agregandoAlumnos = async (alumnos) => {
    if (!alumnos) return;
    try {
      const respuesta = await clienteAxios.post("/api/admin/estudent", alumnos);
      const alerta = {
        msg: respuesta.data.msg,
        categoria: "alerta__ok",
      };
      dispatch({
        type: AGREGAR_USUARIOS_EXITO,
        payload: alerta,
      });
    } catch (error) {
      dispatch({
        type: AGREGAR_USUARIOS_ERROR,
      });
    }
  };

  const agregarEvaluacion = async (data) => {
    dispatch({
      type: CARGANDO,
    });
    try {
      const respuesta = await clienteAxios.post("/api/admin/evaluacion", data);
      const alerta = {
        msg: respuesta.data,
        categoria: "alerta__ok",
      };
      dispatch({
        type: AGREGAR_EVALUACION_EXITO,
        payload: {
          mensaje: alerta,
        },
      });
    } catch (error) {
      dispatch({
        type: OBTENER_CARRERAS_ERROR,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        evaluaciones: state.evaluaciones,
        usuario: state.usuario,
        carreras: state.carreras,
        cursos: state.cursos,
        mensaje: state.mensaje,
        cargando: state.cargando,
        datosexcel: state.datosexcel,
        admin: state.admin,
        listausuarios: state.listausuarios,
        evaluacionesadmin: state.evaluacionesadmin,
        calificacionesadmin: state.calificacionesadmin,
        loginUsuario,
        loginAdmin,
        obtenerListaUsuarios,
        obtenerCarreras,
        obtenerCursos,
        usuarioAutenticado,
        adminAutenticado,
        cerrarAdmin,
        cerrarUsuario,
        obtenerDatosExcel,
        agregandoAlumnos,
        agregarEvaluacion,
        obtenerEvaluaciones,
        finalizarEvaluacion,
        obtenerCalificaciones,
        obtenerEvaluacionesAdmin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
