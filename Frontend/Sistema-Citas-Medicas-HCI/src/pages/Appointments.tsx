import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Appointment() {
  const [formData, setFormData] = useState({
    especialidad: "",
    fecha: "",
    hora: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    alert("¡Tu cita ha sido agendada con éxito!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Contenido principal */}
      <main className="flex-grow flex justify-center items-center py-10 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
          <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            Agendar Cita Médica
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Especialidad */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Especialidad
              </label>
              <select
                name="especialidad"
                value={formData.especialidad}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Selecciona una especialidad</option>
                <option value="cardiologia">Cardiología</option>
                <option value="dermatologia">Dermatología</option>
                <option value="ginecologia">Ginecología</option>
                <option value="neumologia">Neumología</option>
                <option value="nutricion">Nutrición</option>
                <option value="oftalmologia">Oftalmología</option>
                <option value="ortopedia">Ortopedia</option>
                <option value="pediatria">Pediatría</option>
                <option value="urologia">Urología</option>
              </select>
            </div>

            {/* Fecha */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Fecha
              </label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Hora */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Hora
              </label>
              <input
                type="time"
                name="hora"
                value={formData.hora}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Agendar Cita
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
