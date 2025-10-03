import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/axiosClient";

// Tipo para los doctores
interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  specialty_id: number;
  specialty?: string;
  email: string;
  phone: string;
  photo_url: string;
}

export default function DoctorDirectory() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.get<Doctor[]>("/doctors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctors(data);
      } catch (error) {
        console.error("Error cargando doctores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-blue-700 text-lg">Cargando doctores...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-700 text-center mb-10">
            Directorio Médico
          </h1>
          <h2 className="text-2xl font-semibold text-blue-600 text-center mb-10">
            ¡Estos son nuestros especialistas!
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.length === 0 ? (
              <p className="text-center text-gray-600 col-span-3">
                No hay doctores registrados en este momento.
              </p>
            ) : (
              doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition"
                >
                  <img
                    src={doctor.photo_url || "https://via.placeholder.com/150"}
                    alt={`${doctor.first_name} ${doctor.last_name}`}
                    className="w-28 h-28 mx-auto rounded-full object-cover border-2 border-blue-200 mb-4"
                  />
                  <h2 className="text-xl font-semibold text-blue-700">
                    {doctor.first_name} {doctor.last_name}
                  </h2>
                  <p className="text-gray-700">
                    <span className="font-medium">Especialidad:</span>{" "}
                    {doctor.specialty || "Sin especialidad"}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Correo:</span> {doctor.email}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Teléfono:</span> {doctor.phone}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
