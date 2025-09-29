const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const DoctorAvailability = require("../models/DoctorAvailability");

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

// Crear doctor
router.post("/", async (req, res) => {
  try {
    const { user_id, specialty_id, photo_url, is_active } = req.body;
    if (!user_id || !specialty_id) return res.status(400).json({ error: "user_id y specialty_id son obligatorios" });
    const newD = await Doctor.create({ user_id, specialty_id, photo_url, is_active: !!is_active });
    res.status(201).json(newD);
  } catch (err) { res.status(500).json({ error: err.message }); }
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
