import { Link, useNavigate } from "react-router-dom";
import { useContext  } from "react";
import ImagenPrincipal from "../assets/ImagenPrincipal.png";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
    const authContext = useContext(AuthContext);

  if (!authContext) throw new Error("AuthContext must be used within AuthProvider");
  const { user, logout } = authContext;
  const isLoggedIn = !!user; // true si hay usuario

  const handleAppointmentClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate("/appointments");
    } else {
      navigate("/login");
    }
  }

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Cerrar sesión
      logout();
      navigate("/"); // redirige a home
    } else {
      navigate("/login");
    }
  }

  // Estado simulado de login (puedes cambiarlo con Context o Redux después)
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

 /* const handleAppointmentClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate("/appointments");
    } else {
      navigate("/login");
    }
  };*/

  /*const handleAuthClick = () => {
    if (isLoggedIn) {
      // Aquí iría tu lógica para cerrar sesión (ej: limpiar tokens/localStorage)
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  };*/

  return (
    <nav className="bg-white text-blue-700 px-8 py-4 flex justify-between items-center shadow-md">
      {/* Logo + Título */}
      <Link
        to="/"
        className="flex items-center gap-3 text-2xl font-bold hover:opacity-90 transition"
      >
        <img
          src={ImagenPrincipal}
          alt="Imagen principal del sistema"
          className="w-10 h-10 rounded-xl shadow-md"
        />
        HOSPITEX
      </Link>

      {/* Menú de navegación */}
      <div className="flex justify-center items-center h-12 space-x-8">
        <Link
          to="/doctor-directory"
          className="text-gray-600 font-medium hover:text-blue-600 transition"
        >
          Directorio Médico
        </Link>
        <Link
          to="/services"
          className="text-gray-600 font-medium hover:text-blue-600 transition"
        >
          Servicios
        </Link>
        <a
          href="/appointments"
          onClick={handleAppointmentClick}
          className="text-gray-600 font-medium hover:text-blue-600 transition cursor-pointer"
        >
          Agendar Cita
        </a>
      </div>

      {/* Botón dinámico */}
      <div>
        <button
          onClick={handleAuthClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          {isLoggedIn ? "Cerrar Sesión" : "Iniciar Sesión"}
        </button>
      </div>
    </nav>
  );
}
