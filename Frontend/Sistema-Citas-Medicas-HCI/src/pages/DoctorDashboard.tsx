import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  ClipboardList,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Appointment {
  id: number;
  paciente: string;
  fecha: string;
  hora: string;
  motivo: string;
}

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctorName, setDoctorName] = useState("Doctor");
  const [loading, setLoading] = useState(true);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        // 🔹 Obtener doctor usando el userId del usuario logueado
        const doctorRes = await fetch(
          `http://localhost:4000/doctors/by-user/${user.id}`
        );
        if (!doctorRes.ok) throw new Error("No se encontró el doctor");

        const doctorData = await doctorRes.json();

        // ✅ Guardamos el nombre completo del doctor
        setDoctorName(
          `${doctorData.first_name ?? ""} ${doctorData.last_name ?? ""}`.trim()
        );

        // 🔹 Ahora usamos el doctor_id real para traer sus citas
        const apptRes = await fetch(
          `http://localhost:4000/appointments/doctor/${doctorData.doctor_id}`
        );
        if (!apptRes.ok) throw new Error("No se pudieron cargar las citas");

        const apptData = await apptRes.json();

        type RawAppointment = {
          id: number;
          patient_first_name: string;
          patient_last_name: string;
          appointment_date: string;
          appointment_time: string;
          reason?: string;
        };

        const mapped = (apptData as RawAppointment[]).map((a) => ({
          id: a.id,
          paciente: `${a.patient_first_name} ${a.patient_last_name}`,
          fecha: new Date(a.appointment_date).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          hora: a.appointment_time.slice(0, 5),
          motivo: a.reason || "No especificado",
        }));

        setAppointments(mapped);
      } catch (err) {
        console.error("Error cargando dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.id]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-blue-100">
      <Navbar />

      <main className="flex-grow p-8">
        {/* 👨‍⚕️ Bienvenida */}
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          👨‍⚕️ Bienvenido, {doctorName}
        </h1>

        {/* 📊 Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Users className="mx-auto text-blue-600" size={28} />
            <p className="text-lg font-semibold mt-2">{appointments.length}</p>
            <p className="text-gray-500">Pacientes atendidos</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Calendar className="mx-auto text-green-600" size={28} />
            <p className="text-lg font-semibold mt-2">
              {
                appointments.filter(
                  (a) =>
                    new Date(a.fecha).toDateString() ===
                    new Date().toDateString()
                ).length
              }
            </p>
            <p className="text-gray-500">Citas hoy</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <ClipboardList className="mx-auto text-yellow-600" size={28} />
            <p className="text-lg font-semibold mt-2">
              {appointments.filter((a) => !a.motivo.includes("Completada")).length}
            </p>
            <p className="text-gray-500">Pendientes</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <CheckCircle className="mx-auto text-indigo-600" size={28} />
            <p className="text-lg font-semibold mt-2">
              {appointments.filter((a) => a.motivo.includes("Completada")).length}
            </p>
            <p className="text-gray-500">Completadas</p>
          </div>
        </div>

        {/* 📅 Próximas citas */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">
            📅 Próximas Citas
          </h2>
          {loading ? (
            <p className="text-gray-600">Cargando citas...</p>
          ) : appointments.length === 0 ? (
            <p className="text-gray-500">No tienes citas próximas.</p>
          ) : (
            <ul className="space-y-4">
              {appointments.slice(0, 5).map((appt) => (
                <li
                  key={appt.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition"
                >
                  <p className="font-medium text-blue-700">{appt.paciente}</p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Calendar size={16} /> {appt.fecha}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Clock size={16} /> {appt.hora}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Motivo:</span> {appt.motivo}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
