import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Hero() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error("AuthContext must be used within AuthProvider");

  const { user } = authContext;

  const handleClick = () => {
    if (user) {
      // Redirigir según rol
      if (user.role === "patient") {
        navigate("/dashboard"); // dashboard del paciente
      }
    } else {
      navigate("/login"); // usuario no logeado
    }
  };
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-20 text-center">
      <h2 className="text-4xl font-extrabold text-blue-700">
        Bienvenido al Sistema de Gestión de Citas Médicas
      </h2>
      <p className="mt-4 text-lg text-gray-700">
        Agenda tus citas médicas de forma rápida, sencilla y segura.
      </p>
      <div className="mt-6">
         <button
          onClick={handleClick}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
        >
          Mis consultas
        </button>
      </div>
    </section>
  );
}
