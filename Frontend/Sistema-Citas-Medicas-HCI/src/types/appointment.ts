export interface Appointment {
  id: number;
  patient_id: number;
  doctor_id: number;
  date: string;
  status: "pending" | "confirmed" | "cancelled";
}
