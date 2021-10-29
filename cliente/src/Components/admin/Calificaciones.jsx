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
        {calificacionesadmin ? calificacionesadmin[0].nombre : null}
        <table>
          <tbody>
            <tr>
              <th className="item__head">Nombre</th>
              <th className="item__head">Deshonestidad</th>
              <th className="item__head">Puntos menos</th>
              <th className="item__head">Nota Final</th>
            </tr>
            {calificacionesadmin
              ? calificacionesadmin.map((calificacion) => (
                  <tr key={calificacion._id}>
                    <td className="item__registro">
                      {calificacion.nombreEstudiante}
                    </td>
                    <td className="item__registro">
                      {calificacion.deshonestidad}
                    </td>
                    <td className="item__registro">
                      {calificacion.puntosMenos}
                    </td>
                    <td className="item__registro">{calificacion.notaFinal}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Calificaciones;
