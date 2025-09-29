const express = require("express");
const cors = require("cors");

// Importar rutas
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patients");
const doctorRoutes = require("./routes/doctors");
const appointmentRoutes = require("./routes/appointments");
const specialtyRoutes = require("./routes/specialties");

const app = express();

// ===== Middlewares =====
app.use(cors()); // permitir peticiones desde el frontend
app.use(express.json()); // parsea JSON en requests

// ===== Rutas base =====
app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

// Conectar rutas
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/specialties", specialtyRoutes);

// ===== Puerto =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
