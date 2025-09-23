import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="hover:text-gray-200 text-2xl font-bold">Sistema Médico</Link>
      <div className="space-x-6">
        <Link to="/appointments" className="hover:text-gray-200">Citas</Link>
        <Link to="/services" className="hover:text-gray-200">Servicios</Link>
        <Link to="/contacto" className="hover:text-gray-200">Contacto</Link>
      </div>
    </nav>
  );
}
