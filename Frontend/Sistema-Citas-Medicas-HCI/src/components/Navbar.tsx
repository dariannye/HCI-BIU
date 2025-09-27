import { Link } from "react-router-dom";
import ImagenPrincipal from "../assets/ImagenPrincipal.png";

export default function Navbar() {
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
        <Link
          to="/services"
          className="text-gray-600 font-medium hover:text-blue-600 transition"
        >
          Agendar Cita
        </Link>
      </div>

      {/* Botón Login */}
      <div>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Iniciar Sesión
        </Link>
      </div>
    </nav>
  );
}
