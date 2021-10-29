const express = require("express");
const cors = require("cors");
const conectarDB = require("./database");
const app = express();
conectarDB();
// habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({ extended: true }));

const port = process.env.PORT || 4000;
//Usando las rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));
//Poniendo el server en modo de espera
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor en el puerto ${port}`);
});
