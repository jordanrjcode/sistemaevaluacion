import React, { useEffect, useContext } from "react";
import "./Calificaciones.css";
import AuthContext from "../../Context/users/authContext";
const Calificaciones = ({
  carreraSeleccionada,
  cursoSeleccionado,
  setEvaluacionSeleccionada,
}) => {
  const authContext = useContext(AuthContext);
  const {
    calificacionesadmin,
    evaluacionesadmin,
    obtenerEvaluacionesAdmin,
  } = authContext;
  useEffect(() => {
    if (carreraSeleccionada !== "" && cursoSeleccionado !== "") {
      obtenerEvaluacionesAdmin({
        curso: cursoSeleccionado,
        carrera: carreraSeleccionada,
      });
    }
    //eslint-disable-next-line
  }, [carreraSeleccionada, cursoSeleccionado]);
  return (
    <>
      <h2 className="calificacion__title">Seleccione una evaluacion!</h2>
      <select
        className="calificacion__select"
        name="calificaciones"
        defaultValue={"DEFAULT"}
        onChange={(e) => {
          setEvaluacionSeleccionada(e.target.value);
        }}
      >
        <option value="DEFAULT" disabled>
          -- Seleccione una evaluacion --
        </option>
        {evaluacionesadmin
          ? evaluacionesadmin.map((evaluacion) => {
              return (
                <option key={evaluacion._id} value={evaluacion._id}>
                  {evaluacion.nombre.toUpperCase()}
                </option>
              );
            })
          : null}
      </select>

      <div className="calificaciones__grid">
        <div className="grid__item"></div>
      </div>
    </>
  );
};

export default Calificaciones;
