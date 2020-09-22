import {
  INICIAR_SESION_USUARIO_ERROR,
  INICIAR_SESION_USUARIO_EXITO,
  INICIAR_SESION_ADMIN_EXITO,
  OBTENER_CARRERAS_ERROR,
  OBTENER_CARRERAS_EXITO,
  OBTENER_CURSOS_ERROR,
  AGREGAR_USUARIOS_ERROR,
  AGREGAR_USUARIOS_EXITO,
  AGREGAR_EVALUACION_EXITO,
  OBTENER_CURSOS_EXITO,
  OBTENER_EXCEL_ERROR,
  OBTENER_EXCEL_EXITO,
  OBTENER_ADMIN,
  OBTENER_ADMIN_ERROR,
  ENVIAR_EVALUACION,
  OBTENER_USUARIO,
  OBTENER_USUARIO_ERROR,
  CERRAR_SESION_ADMIN,
  OBTENER_LISTA_USUARIOS_EXITO,
  OBTENER_LISTA_USUARIOS_ERROR,
  CARGANDO,
  OBTENER_EVALUACIONES_EXITO,
} from "../../Types/index";
export default (state, action) => {
  switch (action.type) {
    case INICIAR_SESION_USUARIO_EXITO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        cargando: false,
        admin: false,
      };
    case INICIAR_SESION_ADMIN_EXITO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        cargando: false,
        admin: true,
      };
    case CERRAR_SESION_ADMIN:
    case INICIAR_SESION_USUARIO_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        admin: false,
        token: null,
        usuario: null,
        autenticado: null,
        mensaje: action.payload,
        cargando: false,
        carreras: null,
      };
    case OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        admin: false,
        usuario: action.payload.usuario,
        cargando: false,
      };
    case ENVIAR_EVALUACION:
      return { ...state, cargando: false, mensaje: action.payload };
    case OBTENER_ADMIN:
      return {
        ...state,
        usuario: action.payload.usuario,
        admin: true,
        autenticado: true,
        cargando: false,
      };
    case OBTENER_EVALUACIONES_EXITO:
      return { ...state, evaluaciones: action.payload };
    case AGREGAR_EVALUACION_EXITO:
      return { ...state, mensaje: action.payload.mensaje, cargando: false };
    case OBTENER_CARRERAS_EXITO:
      return { ...state, carreras: action.payload.carreras, cargando: false };
    case OBTENER_CURSOS_EXITO:
      return { ...state, cursos: action.payload.cursos, cargando: false };
    case OBTENER_EXCEL_EXITO:
      return {
        ...state,
        datosexcel: action.payload.datosexcel,
        mensaje: action.payload.mensaje,
        cargando: false,
      };
    case AGREGAR_USUARIOS_EXITO:
      return { ...state, mensaje: action.payload, cargando: false };
    case OBTENER_LISTA_USUARIOS_EXITO:
      return {
        ...state,
        listausuarios: action.payload.estudiantes,
        cargando: false,
      };
    case CARGANDO:
      return { ...state, cargando: true };
    case OBTENER_EXCEL_ERROR:
    case OBTENER_LISTA_USUARIOS_ERROR:
    case AGREGAR_USUARIOS_ERROR:
    case OBTENER_CARRERAS_ERROR:
    case OBTENER_CURSOS_ERROR:
    case OBTENER_ADMIN_ERROR:
    case OBTENER_USUARIO_ERROR:
    default:
      return { ...state, cargando: false };
  }
};
