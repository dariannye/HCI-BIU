import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-20 text-center">
      <h2 className="text-4xl font-extrabold text-blue-700">
        Bienvenido al Sistema de Gestión de Citas Médicas
      </h2>
      <p className="mt-4 text-lg text-gray-700">
        Agenda tus citas médicas de forma rápida, sencilla y segura.
      </p>
      <div className="mt-6">
        <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
          Agendar Cita
        </Link>
      </div>
    </section>
  );
}
