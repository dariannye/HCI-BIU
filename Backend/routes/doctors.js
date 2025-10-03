const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Doctor = require("../models/Doctor");
const DoctorAvailability = require("../models/DoctorAvailability");
const User = require("../models/User");

// Listar todos los doctores (con specialty y user)
router.get("/", async (req, res) => {
  try {
    const list = await Doctor.getAll();
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Obtener doctor por id
router.get("/:id", async (req, res) => {
  try {
    const d = await Doctor.getById(req.params.id);
    if (!d) return res.status(404).json({ error: "Doctor no encontrado" });
    res.json(d);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/doctor/:doctor_id", async (req, res) => {
  try {
    const list = await DoctorAvailability.getByDoctorId(req.params.doctor_id);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear doctor
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, phone, password, specialty_id, photo_url, is_active } = req.body;

    if (!first_name || !last_name || !email || !password || !specialty_id) {
      return res.status(400).json({ error: "Campos obligatorios faltantes" });
    }

    // Crear usuario
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      phone,
      password,
      role: "doctor", 
      is_active: true,
    });

    // Crear doctor asociado al usuario
    const newDoctor = await Doctor.create({
      user_id: newUser.id,
      specialty_id,
      photo_url,
      is_active: is_active ?? true,
    });

    res.status(201).json({
      message: "Doctor y usuario creados correctamente",
      doctor: newDoctor,
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar doctor
router.put("/:id", async (req, res) => {
  try {
    const updated = await Doctor.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Eliminar doctor
router.delete("/:id", async (req, res) => {
  try {
    await Doctor.remove(req.params.id);
    res.json({ message: "Doctor eliminado" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Disponibilidad del doctor (list)
router.get("/:id/availability", async (req, res) => {
  try {
    const avail = await DoctorAvailability.getByDoctorId(req.params.id);
    res.json(avail);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
