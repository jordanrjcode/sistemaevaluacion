import React, { useContext } from "react";
import AuthContext from "../../Context/users/authContext";
import "./AgregarAlumnos.css";
import BackupIcon from "@material-ui/icons/Backup";
const AgregarAlumnos = () => {
  const authContext = useContext(AuthContext);
  const { datosexcel, obtenerDatosExcel } = authContext;

  const enviarExcel = async (e) => {
    e.preventDefault();
    obtenerDatosExcel(e.target.files[0]);
  };
  return (
    <div className="file__container">
      <div className="archivo__preview">
        {datosexcel
          ? datosexcel.datos.map((dato) => (
              <p className="preview__item" key={dato.cedula}>
                {dato.nombre} - {dato.emailInstitucional}
              </p>
            ))
          : null}
      </div>
      <label htmlFor="file" className="file__label">
        Elegir Archivo excel{" "}
        <BackupIcon fontSize="large" style={{ marginLeft: "10px" }} />
      </label>
      <input
        type="file"
        name="file"
        id="file"
        onChange={(e) => {
          enviarExcel(e);
        }}
      />
    </div>
  );
};

export default AgregarAlumnos;
