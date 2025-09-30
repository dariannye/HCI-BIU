import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImagenPrincipal from "../assets/ImagenPrincipal.png";
import axios from "axios";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Crear usuario en tabla users
      const userRes = await axios.post("http://localhost:4000/auth/register", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        phone,
        role: "patient",
      });

      const newUser = userRes.data.user;

      // Crear paciente en tabla patients
      await axios.post("http://localhost:4000/patients", {
        user_id: newUser.id,
        birth_date: birthDate,
        address,
        gender,
        marital_status: maritalStatus,
      });

      alert("Registro exitoso 🎉 Ahora puedes iniciar sesión");
      navigate("/login");
    } catch (error) {
      console.error("Error en el registro", error);
      alert("Hubo un error al registrar. Intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl">
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
          <p className="text-gray-500">Crea tu cuenta como paciente</p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleRegister}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Juan"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Apellido */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apellido
            </label>
            <input
              type="text"
              placeholder="Pérez"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Correo */}
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

          {/* Contraseña */}
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

          {/* Estado Civil */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado Civil
            </label>
            <select
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Selecciona</option>
              <option value="soltero">Soltero</option>
              <option value="casado">Casado</option>
              <option value="divorciado">Divorciado</option>
              <option value="viudo">Viudo</option>
            </select>
          </div>

          {/* Género */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Género
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Selecciona</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Dirección */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              placeholder="Calle 123, Ciudad"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              placeholder="+1 809 000 0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Botón de Registro */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Registrarse
            </button>
          </div>
        </form>

        {/* Links extras */}
        <div className="flex justify-center items-center mt-4 text-sm">
          <p className="text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
