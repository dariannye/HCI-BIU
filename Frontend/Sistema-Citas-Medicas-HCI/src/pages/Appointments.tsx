import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { doctors} from "../data/Alldoctors"; 
import type { Doctor } from "../data/Alldoctors"; 
import { useNavigate } from "react-router-dom";

export default function Appointment() {
  const [formData, setFormData] = useState({
    especialidad: "",
    doctor: "",
    fecha: "",
    hora: "",
  });

  const navigate = useNavigate();


  /*const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };*/

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let updatedDoctor = formData.doctor;

    // Si cambia la especialidad, buscamos el doctor correspondiente
    if (name === "especialidad") {
      const selectedDoctor = doctors.find((d) => d.specialty === value);
      updatedDoctor = selectedDoctor ? selectedDoctor.name : "";
    }

    setFormData({ ...formData, [name]: value, doctor: updatedDoctor });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Guardar cita en localStorage
    const storedAppointments = localStorage.getItem("appointments");
    const appointments = storedAppointments ? JSON.parse(storedAppointments) : [];

    appointments.push(formData); // agregar la nueva cita
    localStorage.setItem("appointments", JSON.stringify(appointments));
    //console.log("Datos enviados:", formData);
    alert("¡Tu cita ha sido agendada con éxito!");
    //Limpiar el formulario
   setFormData({
      especialidad: "",
      doctor: "", 
      fecha: "",
      hora: "",
   });


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
                {doctors.map((doc: Doctor) => (
                  <option key={doc.id} value={doc.specialty}>
                    {doc.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Doctor
              </label>
              <input
                type="text"
                name="doctor"
                value={formData.doctor}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
              />
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

     <div className="flex justify-end px-8 py-4">
        <button
          type="button"
          onClick={() => navigate("/patient-appointments")}
          className="bg-blue-600 text-white px-10 py-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          Ver Mis Citas
        </button>
      </div>

      <Footer />
    </div>
  );
}
