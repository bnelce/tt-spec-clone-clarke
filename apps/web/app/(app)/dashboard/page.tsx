export default function DashboardPage() {
  const cards = [
    { label: "Leads ativos", value: "32" },
    { label: "Oportunidades em negociação", value: "12" },
    { label: "Clientes", value: "18" },
    { label: "Alertas", value: "3" }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
