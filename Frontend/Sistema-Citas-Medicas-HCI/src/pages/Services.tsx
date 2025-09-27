import { Link } from "react-router-dom";

export default function Servicios() {
  const services = [
    {
      id: 1,
      title: "Emergencias",
      description: "Atención inmediata las 24 horas con personal especializado. Si está enfermo, gravemente herido o necesita ayuda inmediata, debe utilizar los servicios médicos de urgencia.",
      icon: "🚑",
    },
    {
      id: 2,
      title: "Consultas",
      description: "Consultas médicas en diferentes especialidades.",
      icon: "🩺",
    },
    {
      id: 3,
      title: "Cirugía",
      description: "Procedimientos quirúrgicos con equipos modernos y personal calificado.",
      icon: "⚕️",
    },
    {
      id: 4,
      title: "Análisis",
      description: "Laboratorio clínico completo para todo tipo de pruebas médicas.",
      icon: "🔬",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-6">
      {/* Encabezado */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700">Servicios Médicos</h1>
        <p className="text-gray-600 mt-2">
          Conoce los servicios que ofrecemos en nuestra clínica
        </p>
      </div>

      {/* Grid de servicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow-xl rounded-2xl p-6 text-center hover:shadow-2xl transition"
          >
            <div className="text-5xl mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              {service.title}
            </h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Botón de volver */}
      <div className="text-center mt-12">
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
