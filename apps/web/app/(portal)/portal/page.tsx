"use client";

import { usePortalDashboard } from "../../../hooks/usePortalDashboard";

export default function PortalDashboard() {
  const { data, isLoading, error } = usePortalDashboard();

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Portal do Cliente</h1>
          <p className="text-sm text-slate-500">Resultados atualizados das suas operações ACL.</p>
        </div>
        {isLoading && <p>Carregando...</p>}
        {error && <p className="text-red-600">Erro ao carregar dashboard.</p>}
        {data && (
          <>
            <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-500">Economia acumulada</p>
                <p className="mt-2 text-2xl font-semibold text-emerald-600">
                  R$ {data.economiaAcumulada.toFixed(2)}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-500">Custo médio</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  R$ {data.custoMedio.toFixed(2)}/MWh
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-500">Contratos vigentes</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {data.contratosVigentes.length}
                </p>
              </div>
            </section>
            <section className="rounded-xl border border-slate-200 bg-white p-4">
              <h2 className="text-lg font-semibold text-slate-900">Economia mensal</h2>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                {data.economiaMensal.map((item) => (
                  <div key={item.competencia} className="flex justify-between">
                    <span>{item.competencia}</span>
                    <span>R$ {item.economia.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
