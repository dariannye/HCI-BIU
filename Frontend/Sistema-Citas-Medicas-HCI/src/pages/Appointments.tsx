import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axiosClient";

interface Specialty {
  id: number;
  name: string;
  description?: string;
}

interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  specialty_id: number;
}

export default function Appointment() {
  // 🔹 Obtenemos usuario logueado
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [formData, setFormData] = useState({
    user_id: user?.id ?? null,   // ✅ cambiamos patient_id → user_id
    doctor_id: "",
    appointment_date: "",
    appointment_time: "",
    reason: "",
  });

  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [specRes, docRes] = await Promise.all([
          api.get<Specialty[]>("/specialties"),
          api.get<Doctor[]>("/doctors"),
        ]);
        setSpecialties(specRes.data);
        setDoctors(docRes.data);
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedSpecialty) {
      const spec = specialties.find((s) => s.id === Number(selectedSpecialty));
      if (spec) {
        setFilteredDoctors(doctors.filter((d) => d.specialty_id === spec.id));
      } else {
        setFilteredDoctors([]);
      }
    } else {
      setFilteredDoctors([]);
    }
  }, [selectedSpecialty, specialties, doctors]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialty(e.target.value);
    setFormData((prev) => ({ ...prev, doctor_id: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.user_id) {
      alert("Error: no se encontró el usuario logueado.");
      return;
    }

    try {
      const timeFormatted = formData.appointment_time.includes(":")
        ? formData.appointment_time + ":00"
        : formData.appointment_time;

      const appointmentData = {
        user_id: formData.user_id, // ✅ enviamos user_id
        doctor_id: Number(formData.doctor_id),
        appointment_date: formData.appointment_date,
        appointment_time: timeFormatted,
        reason: formData.reason,
      };

      await api.post("/appointments", appointmentData);

      alert("✅ ¡Tu cita ha sido agendada con éxito!");

      setFormData({
        user_id: user?.id ?? null,
        doctor_id: "",
        appointment_date: "",
        appointment_time: "",
        reason: "",
      });
      setSelectedSpecialty("");

      navigate("/patient-appointments");
    } catch (err) {
      console.error("Error al guardar la cita:", err);
      alert("❌ Hubo un problema al agendar la cita. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

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
                value={selectedSpecialty}
                onChange={handleSpecialtyChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Selecciona una especialidad</option>
                {specialties.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Doctor
              </label>
              <select
                name="doctor_id"
                value={formData.doctor_id}
                onChange={handleChange}
                required
                disabled={!selectedSpecialty}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
              >
                <option value="">Selecciona un doctor</option>
                {filteredDoctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.first_name} {doc.last_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Fecha */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Fecha
              </label>
              <input
                type="date"
                name="appointment_date"
                value={formData.appointment_date}
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
                name="appointment_time"
                value={formData.appointment_time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Motivo */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Motivo de la cita
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Describe el motivo de la consulta"
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
