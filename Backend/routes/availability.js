const express = require("express");
const router = express.Router();
const DoctorAvailability = require("../models/DoctorAvailability");

// Listar todas las disponibilidades
router.get("/", async (req, res) => {
  try {
    const list = await DoctorAvailability.getAll();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener por id
router.get("/:id", async (req, res) => {
  try {
    const a = await DoctorAvailability.getById(req.params.id);
    if (!a) return res.status(404).json({ error: "No encontrado" });
    res.json(a);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Crear
router.post("/", async (req, res) => {
  try {
    const { doctor_id, weekday, start_time, end_time } = req.body;
    if (!doctor_id || !weekday || !start_time || !end_time) return res.status(400).json({ error: "Faltan campos" });
    const newA = await DoctorAvailability.create({ doctor_id, weekday, start_time, end_time });
    res.status(201).json(newA);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Actualizar
router.put("/:id", async (req, res) => {
  try {
    const updated = await DoctorAvailability.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Eliminar
router.delete("/:id", async (req, res) => {
  try {
    await DoctorAvailability.remove(req.params.id);
    res.json({ message: "Disponibilidad eliminada" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
