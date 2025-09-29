const db = require("../config/db");
const bcrypt = require("bcryptjs");

class User {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM users ORDER BY id");
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  }

  static async create({ first_name, last_name, email, phone, role, password }) {
    const password_hash = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      `INSERT INTO users (first_name, last_name, email, phone, role, password_hash)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, email, phone, role, password_hash]
    );
    return { id: result.insertId, first_name, last_name, email, phone, role };
  }

  static async update(id, { first_name, last_name, email, phone, role, password }) {
    const fields = [];
    const values = [];

    if (first_name !== undefined) { fields.push("first_name = ?"); values.push(first_name); }
    if (last_name !== undefined)  { fields.push("last_name = ?"); values.push(last_name); }
    if (email !== undefined)      { fields.push("email = ?"); values.push(email); }
    if (phone !== undefined)      { fields.push("phone = ?"); values.push(phone); }
    if (role !== undefined)       { fields.push("role = ?"); values.push(role); }
    if (password !== undefined) {
      const password_hash = await bcrypt.hash(password, 10);
      fields.push("password_hash = ?");
      values.push(password_hash);
    }

    if (fields.length === 0) return this.getById(id);

    values.push(id);
    await db.query(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, values);
    return this.getById(id);
  }

  static async remove(id) {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    return true;
  }
}

module.exports = User;
