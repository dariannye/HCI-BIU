const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Listar todos
router.get("/", async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener por id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear (registro)
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, phone, role, password } = req.body;
    if (!first_name || !last_name || !email || !password || !role) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const existing = await User.findByEmail(email);
    if (existing) return res.status(409).json({ error: "Email ya registrado" });

    const newUser = await User.create({ first_name, last_name, email, phone, role, password });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar
router.put("/:id", async (req, res) => {
  try {
    const updated = await User.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar
router.delete("/:id", async (req, res) => {
  try {
    await User.remove(req.params.id);
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
