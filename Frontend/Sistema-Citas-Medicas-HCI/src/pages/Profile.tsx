import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  birth_date: string;
  address: string;
  gender: string;
  marital_status: string;
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar usuario desde localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Si no hay usuario, redirigir a login
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Contenido del perfil */}
      <main className="flex-grow p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">👤 Mi Perfil</h1>

        <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
          <div>
            <p className="text-gray-500 text-sm">Nombre</p>
            <p className="font-semibold text-lg">
              {user.first_name} {user.last_name}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Correo</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Teléfono</p>
            <p className="font-medium">{user.phone}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Dirección</p>
            <p className="font-medium">{user.address}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Fecha de nacimiento</p>
              <p className="font-medium">{user.birth_date}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Género</p>
              <p className="font-medium capitalize">{user.gender}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Estado Civil</p>
            <p className="font-medium capitalize">{user.marital_status}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Rol</p>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
              {user.role}
            </span>
          </div>
        </div>

        {/* Botón editar perfil */}
        <div className="mt-6 text-right">
          <button
            onClick={() => alert("Función editar próximamente...")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Editar Perfil
          </button>
        </div>
      </main>
    </div>
  );
}

