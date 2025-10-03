import { useEffect, useState } from "react";
import axios from "axios";
import { Users, Stethoscope, LogOut, List, Plus, Pencil, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const openModal = (user: User | null = null) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const userData = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      role: formData.get("role"),
    };

    try {
      if (editingUser) {
        await axios.put(`http://localhost:4000/users/${editingUser.id}`, userData);
      } else {
        await axios.post("http://localhost:4000/users", userData);
      }
      fetchUsers();
      setShowModal(false);
    } catch (err) {
      console.error("Error saving user", err);
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
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-800"
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
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-600"
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
            Gestión de Usuarios
          </h1>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            <Plus size={18} /> Agregar Usuario
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Cargando usuarios...</p>
        ) : (
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Nombre</th>
                  <th className="p-3 text-left">Correo</th>
                  <th className="p-3 text-left">Teléfono</th>
                  <th className="p-3 text-left">Rol</th>
                  <th className="p-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3">{user.id}</td>
                      <td className="p-3">
                        {user.first_name} {user.last_name}
                      </td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.phone}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            user.role === "admin"
                              ? "bg-red-100 text-red-700"
                              : user.role === "doctor"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => openModal(user)}
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
                      No se encontraron usuarios
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
              {editingUser ? "Editar Usuario" : "Agregar Usuario"}
            </h2>
            <form onSubmit={handleSave} className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="first_name"
                defaultValue={editingUser?.first_name || ""}
                placeholder="Nombre"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="last_name"
                defaultValue={editingUser?.last_name || ""}
                placeholder="Apellido"
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                defaultValue={editingUser?.email || ""}
                placeholder="Correo"
                className="w-full p-2 border rounded"
              />
              <input
                type="tel"
                name="phone"
                defaultValue={editingUser?.phone || ""}
                placeholder="Teléfono"
                className="w-full p-2 border rounded"
              />
              <select
                name="role"
                defaultValue={editingUser?.role || "user"}
                className="w-full p-2 border rounded"
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>

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
