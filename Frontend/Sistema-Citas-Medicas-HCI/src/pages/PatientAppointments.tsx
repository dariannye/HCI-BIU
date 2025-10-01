import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Appointment {
  especialidad: string;
  doctor: string;
  fecha: string;
  hora: string;
}

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">📅 Mis Citas</h1>

        {appointments.length === 0 ? (
          <p className="text-gray-700">No tienes citas agendadas.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appt, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h2 className="text-xl font-semibold text-blue-600">{appt.especialidad}</h2>
                <p className="text-gray-700"><span className="font-medium">Doctor:</span> {appt.doctor}</p>
                <p className="text-gray-700"><span className="font-medium">Fecha:</span> {appt.fecha}</p>
                <p className="text-gray-700"><span className="font-medium">Hora:</span> {appt.hora}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
