const db = require("../config/db");

class DoctorAvailability {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM doctor_availability ORDER BY id");
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query("SELECT * FROM doctor_availability WHERE id = ?", [id]);
    return rows[0];
  }

  static async getByDoctorId(doctor_id) {
    const [rows] = await db.query("SELECT * FROM doctor_availability WHERE doctor_id = ? ORDER BY weekday, start_time", [doctor_id]);
    return rows;
  }

  static async create({ doctor_id, weekday, start_time, end_time }) {
    const [result] = await db.query(
      "INSERT INTO doctor_availability (doctor_id, weekday, start_time, end_time) VALUES (?, ?, ?, ?)",
      [doctor_id, weekday, start_time, end_time]
    );
    return { id: result.insertId, doctor_id, weekday, start_time, end_time };
  }

  static async update(id, data) {
    const fields = [];
    const values = [];
    for (const key of ["doctor_id", "weekday", "start_time", "end_time"]) {
      if (data[key] !== undefined) { fields.push(`${key} = ?`); values.push(data[key]); }
    }
    if (fields.length === 0) return this.getById(id);
    values.push(id);
    await db.query(`UPDATE doctor_availability SET ${fields.join(", ")} WHERE id = ?`, values);
    return this.getById(id);
  }

  static async remove(id) {
    await db.query("DELETE FROM doctor_availability WHERE id = ?", [id]);
    return true;
  }
}

module.exports = DoctorAvailability;
