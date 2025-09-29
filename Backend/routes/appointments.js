const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Listar citas
router.get("/", async (req, res) => {
  try {
    const list = await Appointment.getAll();
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Obtener por id
router.get("/:id", async (req, res) => {
  try {
    const a = await Appointment.getById(req.params.id);
    if (!a) return res.status(404).json({ error: "Cita no encontrada" });
    res.json(a);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Citas por paciente
router.get("/patient/:patientId", async (req, res) => {
  try {
    const list = await Appointment.getByPatientId(req.params.patientId);
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Citas por doctor
router.get("/doctor/:doctorId", async (req, res) => {
  try {
    const list = await Appointment.getByDoctorId(req.params.doctorId);
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Crear cita
router.post("/", async (req, res) => {
  try {
    const { patient_id, doctor_id, appointment_date, appointment_time, reason } = req.body;
    if (!patient_id || !doctor_id || !appointment_date || !appointment_time) return res.status(400).json({ error: "Faltan campos obligatorios" });
    const newA = await Appointment.create({ patient_id, doctor_id, appointment_date, appointment_time, reason });
    res.status(201).json(newA);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Actualizar
router.put("/:id", async (req, res) => {
  try {
    const updated = await Appointment.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Eliminar
router.delete("/:id", async (req, res) => {
  try {
    await Appointment.remove(req.params.id);
    res.json({ message: "Cita eliminada" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
