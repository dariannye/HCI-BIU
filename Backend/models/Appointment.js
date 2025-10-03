const db = require("../config/db");

class Appointment {
  static async getAll() {
    const [rows] = await db.query(
      `SELECT a.id, a.appointment_date, a.appointment_time, a.reason,
              s.name AS specialty_name,
              p.id AS patient_id, u.first_name AS patient_first_name, u.last_name AS patient_last_name,
              d.id AS doctor_id, ud.first_name AS doctor_first_name, ud.last_name AS doctor_last_name
       FROM appointments a
       JOIN patients p ON a.patient_id = p.id
       JOIN users u ON p.user_id = u.id
       JOIN doctors d ON a.doctor_id = d.id
       JOIN users ud ON d.user_id = ud.id
       JOIN specialties s ON d.specialty_id = s.id
       ORDER BY a.appointment_date, a.appointment_time`
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query(
      `SELECT a.id, a.appointment_date, a.appointment_time, a.reason,
              s.name AS specialty_name,
              p.id AS patient_id, u.first_name AS patient_first_name, u.last_name AS patient_last_name,
              d.id AS doctor_id, ud.first_name AS doctor_first_name, ud.last_name AS doctor_last_name
       FROM appointments a
       JOIN patients p ON a.patient_id = p.id
       JOIN users u ON p.user_id = u.id
       JOIN doctors d ON a.doctor_id = d.id
       JOIN users ud ON d.user_id = ud.id
       JOIN specialties s ON d.specialty_id = s.id
       WHERE a.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async getByPatientId(patient_id) {
    const [rows] = await db.query(
      `SELECT a.id, a.appointment_date, a.appointment_time, a.reason,
              s.name AS specialty_name,
              p.id AS patient_id, u.first_name AS patient_first_name, u.last_name AS patient_last_name,
              d.id AS doctor_id, ud.first_name AS doctor_first_name, ud.last_name AS doctor_last_name
       FROM appointments a
       JOIN patients p ON a.patient_id = p.id
       JOIN users u ON p.user_id = u.id
       JOIN doctors d ON a.doctor_id = d.id
       JOIN users ud ON d.user_id = ud.id
       JOIN specialties s ON d.specialty_id = s.id
       WHERE a.patient_id = ?
       ORDER BY a.appointment_date, a.appointment_time`,
      [patient_id]
    );
    return rows;
  }

  static async getByDoctorId(doctor_id) {
    const [rows] = await db.query(
      `SELECT a.id, a.appointment_date, a.appointment_time, a.reason,
              s.name AS specialty_name,
              p.id AS patient_id, u.first_name AS patient_first_name, u.last_name AS patient_last_name,
              d.id AS doctor_id, ud.first_name AS doctor_first_name, ud.last_name AS doctor_last_name
       FROM appointments a
       JOIN patients p ON a.patient_id = p.id
       JOIN users u ON p.user_id = u.id
       JOIN doctors d ON a.doctor_id = d.id
       JOIN users ud ON d.user_id = ud.id
       JOIN specialties s ON d.specialty_id = s.id
       WHERE a.doctor_id = ?
       ORDER BY a.appointment_date, a.appointment_time`,
      [doctor_id]
    );
    return rows;
  }

  static async create({ patient_id, doctor_id, appointment_date, appointment_time, reason }) {
    const [result] = await db.query(
      `INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, reason)
       VALUES (?, ?, ?, ?, ?)`,
      [patient_id, doctor_id, appointment_date, appointment_time, reason]
    );
    return { id: result.insertId, patient_id, doctor_id, appointment_date, appointment_time, reason };
  }

  static async update(id, data) {
    const fields = [];
    const values = [];
    for (const key of ["patient_id", "doctor_id", "appointment_date", "appointment_time", "reason"]) {
      if (data[key] !== undefined) { fields.push(`${key} = ?`); values.push(data[key]); }
    }
    if (fields.length === 0) return this.getById(id);
    values.push(id);
    await db.query(`UPDATE appointments SET ${fields.join(", ")} WHERE id = ?`, values);
    return this.getById(id);
  }

  static async remove(id) {
    await db.query("DELETE FROM appointments WHERE id = ?", [id]);
    return true;
  }
}

module.exports = Appointment;
