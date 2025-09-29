const db = require("../config/db");

class Specialty {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM specialties ORDER BY id");
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query("SELECT * FROM specialties WHERE id = ?", [id]);
    return rows[0];
  }

  static async create({ name, description }) {
    const [result] = await db.query(
      "INSERT INTO specialties (name, description) VALUES (?, ?)",
      [name, description]
    );
    return { id: result.insertId, name, description };
  }

  static async update(id, { name, description }) {
    await db.query("UPDATE specialties SET name = ?, description = ? WHERE id = ?", [name, description, id]);
    return this.getById(id);
  }

  static async remove(id) {
    await db.query("DELETE FROM specialties WHERE id = ?", [id]);
    return true;
  }
}

module.exports = Specialty;
