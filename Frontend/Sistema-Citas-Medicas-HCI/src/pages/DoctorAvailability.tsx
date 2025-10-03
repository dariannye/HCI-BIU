import { useEffect, useState } from "react";
import axios from "axios";
import { LogOut, Plus, List, Timer, Stethoscope, Users, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Availability {
  id: number;
  doctor_id: number;
  weekday: string;
  start_time: string;
  end_time: string;
}

interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
}

export default function AvailabilityDashboard() {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAvailability, setEditingAvailability] = useState<Availability | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [formData, setFormData] = useState({
    doctor_id: "",
    weekday: "",
    start_time: "",
    end_time: "",
  });

  const navigate = useNavigate();

  // Obtener disponibilidades
  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/availability", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAvailabilities(res.data);
      } catch (err) {
        console.error("Error fetching availabilities", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailabilities();
  }, []);

  // Obtener doctores
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:4000/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.error("Error fetching doctors", err);
      }
    };
    fetchDoctors();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const openModal = (availability?: Availability) => {
    if (availability) {
      setEditingAvailability(availability);
      setFormData({
        doctor_id: availability.doctor_id.toString(),
        weekday: availability.weekday,
        start_time: availability.start_time,
        end_time: availability.end_time,
      });
    } else {
      setEditingAvailability(null);
      setFormData({
        doctor_id: "",
        weekday: "",
        start_time: "",
        end_time: "",
      });
    }
    setShowModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (editingAvailability) {
        await axios.put(
          `http://localhost:4000/availability/${editingAvailability.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post("http://localhost:4000/availability", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // Refrescar lista
      const res = await axios.get("http://localhost:4000/availability", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvailabilities(res.data);

      setShowModal(false);
    } catch (err) {
      console.error("Error guardando disponibilidad", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-blue-600">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-3">
          <a href="/admin" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-600">
            <Users size={18} /> Usuarios
          </a>
          <a href="/admin/doctors" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-600">
            <Stethoscope size={18} /> Doctores
          </a>
          <a href="/admin/specialties" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-600">
            <List size={18} /> Especialidades
          </a>
          <a
            href="/admin/doctor-availability"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-800"
          >
            <Timer size={18} /> Disponibilidad
          </a>
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-2 p-4 hover:bg-blue-600">
          <LogOut size={18} /> Cerrar sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Disponibilidad</h1>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            <Plus size={18} /> Agregar Disponibilidad
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Cargando disponibilidades...</p>
        ) : (
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Doctor</th>
                  <th className="p-3 text-left">Día</th>
                  <th className="p-3 text-left">Hora Inicio</th>
                  <th className="p-3 text-left">Hora Fin</th>
                  <th className="p-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {availabilities.length > 0 ? (
                  availabilities.map((a) => (
                    <tr key={a.id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-3">{a.id}</td>
                      <td className="p-3">
                        {doctors.find((d) => d.id === a.doctor_id)?.first_name}{" "}
                        {doctors.find((d) => d.id === a.doctor_id)?.last_name}
                      </td>
                      <td className="p-3">{a.weekday}</td>
                      <td className="p-3">{a.start_time}</td>
                      <td className="p-3">{a.end_time}</td>
                      <td className="p-3">
                        <button
                          onClick={() => openModal(a)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={16} /> Editar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-gray-500 italic">
                      No se encontraron disponibilidades
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg w-[600px] p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingAvailability ? "Editar Disponibilidad" : "Agregar Disponibilidad"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <select
                name="doctor_id"
                value={formData.doctor_id}
                onChange={handleChange}
                className="w-full p-2 border rounded col-span-2"
              >
                <option value="">Seleccione doctor</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.first_name} {d.last_name}
                  </option>
                ))}
              </select>
              <select
                name="weekday"
                value={formData.weekday}
                onChange={handleChange}
                className="w-full p-2 border rounded col-span-2"
              >
                <option value="">Seleccione día</option>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sábado">Sábado</option>
                <option value="Domingo">Domingo</option>
              </select>
              <input
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <div className="col-span-2 flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
