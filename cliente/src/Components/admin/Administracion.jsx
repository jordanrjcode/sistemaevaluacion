import React, { useState } from "react";
import Listadoopciones from "./Listadoopciones";
import "./Administracion.css";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
const Administracion = () => {
  const [opcion, setOpcion] = useState("");

  const click = (name) => {
    setOpcion(name);
  };

  return (
    <div className="administracion">
      {opcion === "" ? (
        <>
          <button
            className="administracion__button"
            name="agregarEvaluacion"
            onClick={(e) => {
              click(e.target.name);
            }}
          >
            Crear Evaluacion <AssignmentIcon fontSize="large" />
          </button>
          <button
            className="administracion__button"
            name="agregarEstudiantes"
            onClick={(e) => {
              click(e.target.name);
            }}
          >
            Agregar estudiantes <GroupAddIcon fontSize="large" />
          </button>
          <button
            className="administracion__button"
            name="calificacionEstudiantes"
            onClick={(e) => {
              click(e.target.name);
            }}
          >
            Calificaciones <AssignmentIndIcon fontSize="large" />
          </button>
        </>
      ) : (
        <Listadoopciones setOpcion={setOpcion} opcion={opcion} />
      )}
    </div>
  );
};

export default Administracion;
