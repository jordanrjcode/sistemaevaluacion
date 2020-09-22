import React from "react";
import "./Spinner.css";
const Spinner = () => {
  return (
    <div className="contenedor__spinner">
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </div>
  );
};

export default Spinner;
