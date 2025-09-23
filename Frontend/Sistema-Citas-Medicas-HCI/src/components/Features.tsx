export default function Features() {
  const features = [
    {
      title: "Agendar en línea",
      description: "Reserva citas con especialistas en pocos pasos.",
    },
    {
      title: "Recordatorios automáticos",
      description: "Recibe notificaciones para no olvidar tus citas.",
    },
    {
      title: "Historial médico",
      description: "Consulta tus registros y citas anteriores.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <h3 className="text-3xl font-bold text-center text-blue-700 mb-12">
        ¿Por qué elegirnos?
      </h3>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {features.map((f, idx) => (
          <div key={idx} className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-600">{f.title}</h4>
            <p className="mt-2 text-gray-600">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
