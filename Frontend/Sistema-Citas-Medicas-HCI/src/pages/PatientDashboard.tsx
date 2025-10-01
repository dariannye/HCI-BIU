import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImagenPrincipal from "../assets/ImagenPrincipal.png";

export default function PatientDashboard() {
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    // Intentar obtener el usuario guardado en localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        // Puedes ajustar según tu backend: user.first_name + user.last_name
        setPatientName(`${user.first_name} ${user.last_name}`);
      } catch (err) {
        console.error("Error leyendo usuario:", err);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white text-blue-700 px-8 py-4 flex justify-between items-center shadow-md">
        {/* Logo + Título */}
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-bold hover:opacity-90 transition"
        >
          <img
            src={ImagenPrincipal}
            alt="Imagen principal del sistema"
            className="w-10 h-10 rounded-xl shadow-md"
          />
          HOSPITEX
        </Link>

        {/* Menú simple */}
        <div className="space-x-6 font-medium">
          <Link to="/appointments" className="hover:text-blue-500">
            Mis Citas
          </Link>
          <Link to="/services" className="hover:text-blue-500">
            Servicios
          </Link>
          <Link to="/profile" className="hover:text-blue-500">
            Perfil
          </Link>
        </div>
      </nav>

      {/* Header del panel */}
      <header className="bg-blue-600 text-white py-6 px-8 shadow-md">
        <h1 className="text-3xl font-bold">Dashboard del Paciente</h1>
      </header>

      {/* 🔹 Contenido */}
      <main className="flex-grow p-8">
        <h2 className="text-2xl font-semibold mb-4">
          Bienvenido,{" "}
          <span className="text-blue-600">
            {patientName || "Paciente"}
          </span>
        </h2>
        <p className="mb-6 text-gray-700">
          Aquí puedes ver y gestionar tus citas médicas.
        </p>

        {/* Tarjetas de opciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
             <Link to="/patient-appointments" className="text-lg font-bold text-blue-600 mb-2">
              📅 Próximas Citas
            </Link>
            <p className="text-gray-600">Consulta tus citas agendadas.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Link to="/appointments" className="text-lg font-bold text-blue-600 mb-2">
              ➕ Nueva Cita
            </Link>
            <p className="text-gray-600">Agenda una nueva cita con tu médico.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Link to="/doctor-directory" className="text-lg font-bold text-blue-600 mb-2">
              🧑‍⚕️ Directorio Médico
            </Link>
            <p className="text-gray-600">Encuentra médicos disponibles.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
