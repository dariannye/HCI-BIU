const db = require("../config/db");

class Patient {
  static async getAll() {
    const [rows] = await db.query(
      `SELECT p.*, u.first_name, u.last_name, u.email, u.phone
       FROM patients p
       JOIN users u ON p.user_id = u.id
       ORDER BY p.id`
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query(
      `SELECT p.*, u.first_name, u.last_name, u.email, u.phone
       FROM patients p JOIN users u ON p.user_id = u.id WHERE p.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async findByUserId(user_id) {
    const [rows] = await db.query("SELECT * FROM patients WHERE user_id = ?", [user_id]);
    return rows[0];
  }

  static async create({ user_id, birth_date, address, gender, marital_status }) {
    const [result] = await db.query(
      `INSERT INTO patients (user_id, birth_date, address, gender, marital_status)
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, birth_date, address, gender, marital_status]
    );
    return { id: result.insertId, user_id, birth_date, address, gender, marital_status };
  }

  static async update(id, data) {
    const fields = [];
    const values = [];
    for (const key of ["birth_date", "address", "gender", "marital_status", "user_id"]) {
      if (data[key] !== undefined) { fields.push(`${key} = ?`); values.push(data[key]); }
    }
    if (fields.length === 0) return this.getById(id);
    values.push(id);
    await db.query(`UPDATE patients SET ${fields.join(", ")} WHERE id = ?`, values);
    return this.getById(id);
  }

  static async remove(id) {
    await db.query("DELETE FROM patients WHERE id = ?", [id]);
    return true;
  }
}

module.exports = Patient;
