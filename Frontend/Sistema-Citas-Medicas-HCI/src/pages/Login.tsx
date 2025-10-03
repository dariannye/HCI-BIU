import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImagenPrincipal from "../assets/ImagenPrincipal.png";
import { login } from "../services/authApi";
import axios, { AxiosError } from "axios";
import { AuthContext } from "../context/AuthContext";
import type { User } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  if (!authContext)
    throw new Error("AuthContext must be used within AuthProvider");
  const { login: loginContext } = authContext;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(email, password);

      // Guardamos en localStorage el token y el usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user as User));

      // ⚡ Si es paciente, lo guardamos también bajo la clave "patient"
      if (data.user.role === "patient") {
        localStorage.setItem("patient", JSON.stringify(data.user));
      }

      // Guardamos en contexto
      loginContext(data.user as User, data.token);

      // Redirección según el rol
      const role = data.user.role;
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/dashboard"); 
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<{ message: string }>;
        setError(serverError.response?.data?.message || "Error en el login");
      } else {
        setError("Ocurrió un error inesperado");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        {/* Logo / Título */}
        <div className="text-center mb-6">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-3xl font-bold text-blue-600"
          >
            <img
              src={ImagenPrincipal}
              alt="Imagen principal del sistema"
              className="w-8 h-8 rounded-lg shadow-md"
            />
            HOSPITEX
          </Link>
          <p className="text-gray-500">Inicia sesión para continuar</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <p className="text-red-500 text-sm text-center font-medium">
              {error}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Ingresar
          </button>
        </form>

        {/* Links extras */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
          <Link to="/register" className="text-blue-600 hover:underline">
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}
