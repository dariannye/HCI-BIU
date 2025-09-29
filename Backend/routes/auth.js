const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, phone, role, password } = req.body;

    // Verificar si ya existe el usuario
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Crear usuario
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      phone,
      role,
      password_hash,
    });

    res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
  } catch (err) {
    console.error("Error en registro:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Login de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Datos recibidos en login:", { email, password });

    // Buscar usuario por email
    const user = await User.findByEmail(email);
    console.log("Usuario encontrado:", user);

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password_hash);
    console.log("Comparación de contraseña:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

module.exports = router;
