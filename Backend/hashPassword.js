// Importamos bcryptjs
const bcrypt = require("bcryptjs");

async function hashPassword(plainPassword) {
  try {
    // Hasheamos la contraseña con un salt de 10 rondas
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    console.log("Contraseña original:", plainPassword);
    console.log("Contraseña hasheada:", hashedPassword);
  } catch (err) {
    console.error("Error al hashear la contraseña:", err);
  }
}

// Cambia la contraseña aquí para probar
hashPassword("MiSuperClave123");

// Para ejectutar este script, usa el comando:
// node hashPassword.js
