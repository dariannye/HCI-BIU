import { useEffect, useState } from "react";
import { Calendar, Clock, User, Stethoscope, FileText } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Appointment {
  id: number;
  especialidad: string;
  doctor: string;
  fecha: string;
  hora: string;
  paciente: string;
  motivo: string;
}

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?.id) {
        setError("No estás logueado");
        setLoading(false);
        return;
      }

      try {
        const patientRes = await fetch(
          `http://localhost:4000/patients/by-user/${user.id}`
        );
        if (!patientRes.ok) throw new Error("Paciente no encontrado");

        const patientData = await patientRes.json();

        const apptRes = await fetch(
          `http://localhost:4000/appointments/patient/${patientData.id}`
        );
        if (!apptRes.ok) throw new Error("Error al cargar las citas");

        const apptData = await apptRes.json();

        interface BackendAppointment {
          id: number;
          specialty_name?: string;
          doctor_first_name?: string;
          doctor_last_name?: string;
          doctor_name?: string;
          patient_first_name?: string;
          patient_last_name?: string;
          patient_name?: string;
          appointment_date: string;
          appointment_time: string;
          reason?: string;
        }

        const mappedAppointments: Appointment[] = (
          apptData as BackendAppointment[]
        ).map((a) => {
          const fechaFormateada = new Date(a.appointment_date).toLocaleDateString(
            "es-ES",
            { year: "numeric", month: "long", day: "numeric" }
          );

          const horaFormateada = a.appointment_time
            ? a.appointment_time.slice(0, 5)
            : "";

          return {
            id: a.id,
            especialidad: a.specialty_name || "General",
            doctor:
              `${a.doctor_first_name ?? a.doctor_name ?? ""} ${
                a.doctor_last_name ?? ""
              }`.trim() || "Sin asignar",
            paciente:
              `${a.patient_first_name ?? a.patient_name ?? ""} ${
                a.patient_last_name ?? ""
              }`.trim() || "No disponible",
            fecha: fechaFormateada,
            hora: horaFormateada,
            motivo: a.reason || "No especificado",
          };
        });

        setAppointments(mappedAppointments);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error cargando citas");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user?.id]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-8 flex items-center gap-2">
          📅 Mis Citas Médicas
        </h1>

        {loading ? (
          <p className="text-gray-700">Cargando citas...</p>
        ) : error ? (
          <p className="text-red-600 font-medium">{error}</p>
        ) : appointments.length === 0 ? (
          <div className="bg-white shadow rounded-xl p-6 text-center">
            <p className="text-gray-600">No tienes citas agendadas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <h2 className="text-xl font-semibold text-indigo-700 flex items-center gap-2 mb-4">
                  <Stethoscope size={20} /> {appt.especialidad}
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center gap-2">
                    <User size={18} className="text-blue-600" />
                    <span className="font-medium">Doctor:</span> {appt.doctor}
                  </p>
                  <p className="flex items-center gap-2">
                    <User size={18} className="text-green-600" />
                    <span className="font-medium">Paciente:</span> {appt.paciente}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar size={18} className="text-purple-600" />
                    <span className="font-medium">Fecha:</span> {appt.fecha}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={18} className="text-orange-600" />
                    <span className="font-medium">Hora:</span> {appt.hora}
                  </p>
                  <p className="flex items-center gap-2">
                    <FileText size={18} className="text-pink-600" />
                    <span className="font-medium">Motivo:</span> {appt.motivo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
