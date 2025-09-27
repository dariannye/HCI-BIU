import { Link } from "react-router-dom";
import ImagenPrincipal from "../assets/ImagenPrincipal.png";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:text-gray-200">
        <img 
        src={ImagenPrincipal} 
        alt="Imagen principal del sistema" 
        className="w-6 h-6 rounded-2xl shadow-md text-white" 
      />
        HOSPITEX
      </Link>

      <div className="space-x-6">
        <Link to="/login" className="hover:text-gray-200">
          Iniciar Sesión
        </Link>
      </div>
    </nav>
  );
}
