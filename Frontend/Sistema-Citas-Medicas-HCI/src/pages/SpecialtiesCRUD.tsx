import { useEffect, useState } from "react";
import axios from "axios";
import { Users, Stethoscope, LogOut, Plus, List, Pencil, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Specialty {
  id: number;
  name: string;
  description: string;
}

export default function SpecialtysDashboard() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(
    null
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/specialties", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSpecialties(res.data);
      } catch (err) {
        console.error("Error fetching specialties", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (editingSpecialty) {
        // Editar
        const res = await axios.put(
          `http://localhost:4000/specialties/${editingSpecialty.id}`,
          { name, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSpecialties(
          specialties.map((s) =>
            s.id === editingSpecialty.id ? res.data : s
          )
        );
      } else {
        // Crear
        const res = await axios.post(
          "http://localhost:4000/specialties",
          { name, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSpecialties([...specialties, res.data]);
      }

      setName("");
      setDescription("");
      setEditingSpecialty(null);
      setShowModal(false);
    } catch (err) {
      console.error("Error saving specialty", err);
    }
  };

  const openEditModal = (specialty: Specialty) => {
    setEditingSpecialty(specialty);
    setName(specialty.name);
    setDescription(specialty.description);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingSpecialty(null);
    setName("");
    setDescription("");
    setShowModal(true);
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
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-600"
          >
            <Stethoscope size={18} /> Doctores
          </a>
          <a
            href="/admin/specialties"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-800"
          >
            <List size={18} /> Especialidades
          </a>
          <a
            href="/admin/doctor-availability"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-600"
          >
            <Timer size={18} /> Disponiblidad
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
            Gestión de Especialidades
          </h1>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            <Plus size={18} /> Agregar Especialidad
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Cargando especialidades...</p>
        ) : (
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Nombre</th>
                  <th className="p-3 text-left">Descripción</th>
                  <th className="p-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {specialties.length > 0 ? (
                  specialties.map((s) => (
                    <tr
                      key={s.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3">{s.id}</td>
                      <td className="p-3">{s.name}</td>
                      <td className="p-3">{s.description}</td>
                      <td className="p-3">
                        <button
                          onClick={() => openEditModal(s)}
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
                      colSpan={4}
                      className="p-6 text-center text-gray-500 italic"
                    >
                      No se encontraron especialidades
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
          <div className="bg-white rounded-xl shadow-lg w-[500px] p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingSpecialty ? "Editar Especialidad" : "Agregar Especialidad"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full p-2 border rounded resize-none"
              />
              <div className="flex justify-end gap-2 mt-4">
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
                  {editingSpecialty ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
