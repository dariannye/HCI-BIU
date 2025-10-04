import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImagenPrincipal from "../assets/ImagenPrincipal.png";

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
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
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

  const initials = `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Logo */}
      <header className="flex items-center justify-between p-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-xl font-bold text-blue-700 hover:opacity-80 transition"
        >
          <img
            src={ImagenPrincipal}
            alt="Logo"
            className="w-10 h-10 rounded-lg shadow-md"
          />
          HOSPITEX
        </button>
      </header>

      {/* Perfil */}
      <main className="flex-grow flex flex-col items-center p-6">
        {/* Avatar */}
        <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-600 text-white text-4xl font-bold shadow-lg mb-4">
          {initials}
        </div>

        {/* Nombre */}
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          {user.first_name} {user.last_name}
        </h1>

        {/* Tarjeta de datos */}
        <div className="bg-white shadow-xl rounded-2xl p-8 w- max-w-xl">
          <div className="grid grid-cols-2 justify-center gap-8">
            {/* Columna izquierda */}
            <div className="space-y-6 px-4">
              <div>
                <p className="text-gray-500 text-sm">📧 Correo</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">📱 Teléfono</p>
                <p className="font-medium">{user.phone}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">📍 Dirección</p>
                <p className="font-medium">{user.address}</p>
              </div>
            </div>

            {/* Columna derecha */}
            <div className="space-y-6 px-4">
              <div>
                <p className="text-gray-500 text-sm">🎂 Fecha de Nacimiento</p>
                <p className="font-medium">{user.birth_date}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">⚧ Género</p>
                <p className="font-medium capitalize">{user.gender}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">❤️ Estado Civil</p>
                <p className="font-medium capitalize">{user.marital_status}</p>
              </div>
            </div>
          </div>

          {/* Rol centrado abajo */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">👤 Rol</p>
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
              {user.role}
            </span>
          </div>
        </div>

        {/* Botón Mis Citas */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate("/patient-appointments")}
            className="bg-blue-700 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-200 transition"
          >
            Mis Citas
          </button>
        </div>
      </main>
    </div>
  );
}
