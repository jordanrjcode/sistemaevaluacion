import React, { useEffect, useContext } from "react";
import "./Calificaciones.css";
import AuthContext from "../../Context/users/authContext";
const Calificaciones = ({ carreraSeleccionada, cursoSeleccionado }) => {
  const authContext = useContext(AuthContext);
  const { obtenerEvaluacionesAdmin } = authContext;
  useEffect(() => {
    if (carreraSeleccionada !== "" && cursoSeleccionado !== "") {
      obtenerEvaluacionesAdmin({
        curso: cursoSeleccionado,
        carrera: carreraSeleccionada,
      });
    }
  }, [carreraSeleccionada, cursoSeleccionado]);
  return (
    <>
      <h2 className="calificacion__title">Seleccione una evaluacion!</h2>
      <select
        className="calificacion__select"
        name="calificaciones"
        defaultValue={"DEFAULT"}
      >
        <option value="DEFAULT" disabled>
          -- Seleccione una evaluacion --
        </option>
      </select>
    </>
  );
};

export default Calificaciones;
