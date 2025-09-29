const express = require("express");
const router = express.Router();
const Specialty = require("../models/Specialty");

router.get("/", async (req, res) => {
  try {
    const list = await Specialty.getAll();
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/:id", async (req, res) => {
  try {
    const s = await Specialty.getById(req.params.id);
    if (!s) return res.status(404).json({ error: "Especialidad no encontrada" });
    res.json(s);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: "name es obligatorio" });
    const newS = await Specialty.create({ name, description });
    res.status(201).json(newS);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Specialty.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete("/:id", async (req, res) => {
  try {
    await Specialty.remove(req.params.id);
    res.json({ message: "Especialidad eliminada" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
