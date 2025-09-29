require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

// Rutas
app.use("/auth", require("./routes/auth")); 
app.use("/users", require("./routes/users"));
app.use("/patients", require("./routes/patients"));
app.use("/doctors", require("./routes/doctors"));
app.use("/specialties", require("./routes/specialties"));
app.use("/availability", require("./routes/availability"));
app.use("/appointments", require("./routes/appointments"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server escuchando en http://localhost:${PORT}`));
