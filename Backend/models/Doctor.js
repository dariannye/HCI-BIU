const db = require("../config/db");

class Doctor {
  static async getAll() {
    const [rows] = await db.query(
      `SELECT d.*, u.first_name, u.last_name, u.email, u.phone, s.name AS specialty
       FROM doctors d
       JOIN users u ON d.user_id = u.id
       JOIN specialties s ON d.specialty_id = s.id
       ORDER BY d.id`
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query(
      `SELECT d.*, u.first_name, u.last_name, u.email, u.phone, s.name AS specialty
       FROM doctors d
       JOIN users u ON d.user_id = u.id
       JOIN specialties s ON d.specialty_id = s.id
       WHERE d.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async findByUserId(user_id) {
    const [rows] = await db.query("SELECT * FROM doctors WHERE user_id = ?", [user_id]);
    return rows[0];
  }

  static async create({ user_id, specialty_id, photo_url, is_active }) {
    const [result] = await db.query(
      "INSERT INTO doctors (user_id, specialty_id, photo_url, is_active) VALUES (?, ?, ?, ?)",
      [user_id, specialty_id, photo_url, is_active]
    );
    return { id: result.insertId, user_id, specialty_id, photo_url, is_active };
  }

  static async update(id, data) {
    const fields = [];
    const values = [];
    for (const key of ["user_id", "specialty_id", "photo_url", "is_active"]) {
      if (data[key] !== undefined) { fields.push(`${key} = ?`); values.push(data[key]); }
    }
    if (fields.length === 0) return this.getById(id);
    values.push(id);
    await db.query(`UPDATE doctors SET ${fields.join(", ")} WHERE id = ?`, values);
    return this.getById(id);
  }

  static async remove(id) {
    await db.query("DELETE FROM doctors WHERE id = ?", [id]);
    return true;
  }
}

module.exports = Doctor;
