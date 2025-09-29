const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

// Listar todos los pacientes (con info usuario)
router.get("/", async (req, res) => {
  try {
    const list = await Patient.getAll();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener paciente por id
router.get("/:id", async (req, res) => {
  try {
    const p = await Patient.getById(req.params.id);
    if (!p) return res.status(404).json({ error: "Paciente no encontrado" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear paciente (requiere user_id)
router.post("/", async (req, res) => {
  try {
    const { user_id, birth_date, address, gender, marital_status } = req.body;
    if (!user_id) return res.status(400).json({ error: "user_id es obligatorio" });
    const newP = await Patient.create({ user_id, birth_date, address, gender, marital_status });
    res.status(201).json(newP);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar
router.put("/:id", async (req, res) => {
  try {
    const updated = await Patient.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar
router.delete("/:id", async (req, res) => {
  try {
    await Patient.remove(req.params.id);
    res.json({ message: "Paciente eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
