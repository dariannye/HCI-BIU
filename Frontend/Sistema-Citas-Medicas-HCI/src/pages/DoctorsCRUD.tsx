import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Stethoscope,
  LogOut,
  Plus,
  List,
  Timer,
  Pencil,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  specialty_id: number; // usamos el id
  specialty_name?: string; // opcional: lo devuelve el backend con join
  email: string;
  phone: string;
  photo_url: string;
}

interface Specialty {
  id: number;
  name: string;
}

export default function DoctorsDashboard() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    specialty_id: 0,
    photo_url: "",
  });

  const navigate = useNavigate();

  // Cargar doctores
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/doctors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctors(res.data);
      } catch (err) {
        console.error("Error fetching doctors", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Cargar especialidades
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const res = await axios.get("http://localhost:4000/specialties");
        setSpecialties(res.data);
      } catch (err) {
        console.error("Error fetching specialties", err);
      }
    };
    fetchSpecialties();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const openModal = (doctor?: Doctor) => {
    if (doctor) {
      setEditingDoctor(doctor);
      setFormData({
        first_name: doctor.first_name,
        last_name: doctor.last_name,
        specialty_id: doctor.specialty_id,
        email: doctor.email,
        phone: doctor.phone,
        password: "",
        photo_url: doctor.photo_url,
      });
    } else {
      setEditingDoctor(null);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        specialty_id: 0,
        photo_url: "",
      });
    }
    setShowModal(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "specialty_id" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (editingDoctor) {
        await axios.put(
          `http://localhost:4000/doctors/${editingDoctor.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post("http://localhost:4000/doctors", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // Refrescar lista
      const res = await axios.get("http://localhost:4000/doctors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(res.data);
      setShowModal(false);
    } catch (err) {
      console.error("Error guardando doctor", err);
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
          <a
            href="/admin"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-600"
          >
            <Users size={18} /> Usuarios
          </a>
          <a
            href="/admin/doctors"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-800"
          >
            <Stethoscope size={18} /> Doctores
          </a>
          <a
            href="/admin/specialties"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-600"
          >
            <List size={18} /> Especialidades
          </a>
          <a
            href="/admin/doctor-availability"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-600"
          >
            <Timer size={18} /> Disponibilidad
          </a>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-4 hover:bg-blue-600"
        >
          <LogOut size={18} /> Cerrar sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Gestión de Doctores
          </h1>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            <Plus size={18} /> Agregar Doctor
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Cargando doctores...</p>
        ) : (
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Nombre</th>
                  <th className="p-3 text-left">Especialidad</th>
                  <th className="p-3 text-left">Correo</th>
                  <th className="p-3 text-left">Teléfono</th>
                  <th className="p-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {doctors.length > 0 ? (
                  doctors.map((doctor) => (
                    <tr
                      key={doctor.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3">{doctor.id}</td>
                      <td className="p-3">
                        {doctor.first_name} {doctor.last_name}
                      </td>
                      <td className="p-3">
                        {doctor.specialty_name ||
                          specialties.find((s) => s.id === doctor.specialty_id)
                            ?.name ||
                          "Sin especialidad"}
                      </td>
                      <td className="p-3">{doctor.email}</td>
                      <td className="p-3">{doctor.phone}</td>
                      <td className="p-3">
                        <button
                          onClick={() => openModal(doctor)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={16} /> Editar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-6 text-center text-gray-500 italic"
                    >
                      No se encontraron doctores
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
              {editingDoctor ? "Editar Doctor" : "Agregar Doctor"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Nombre"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Apellido"
                className="w-full p-2 border rounded"
              />
              <select
                name="specialty_id"
                value={formData.specialty_id}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value={0}>Seleccione especialidad</option>
                {specialties.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name}
                  </option>
                ))}
              </select>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo"
                className="w-full p-2 border rounded"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Teléfono"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="photo_url"
                value={formData.photo_url}
                onChange={handleChange}
                placeholder="URL Foto"
                className="w-full p-2 border rounded"
              />

              {!editingDoctor && (
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  className="w-full p-2 border rounded col-span-2"
                />
              )}

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
