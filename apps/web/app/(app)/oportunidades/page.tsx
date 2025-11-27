"use client";

import { useOportunidades } from "../../../hooks/useOportunidades";

export default function OportunidadesPage() {
  const { data, isLoading, error } = useOportunidades();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Oportunidades</h1>
          <p className="text-sm text-slate-500">Visão rápida das negociações em andamento.</p>
        </div>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Nova oportunidade
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        {isLoading && <p>Carregando...</p>}
        {error && <p className="text-red-600">Erro ao carregar oportunidades.</p>}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((opp) => (
            <div key={opp.id} className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm text-slate-500">{opp.etapa.nome}</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">
                {opp.cliente?.nomeFantasia ?? opp.lead?.nomeFantasia ?? "Sem empresa"}
              </h3>
              <p className="text-sm text-slate-500">
                Valor potencial:{" "}
                {opp.valorPotencial ? `R$ ${opp.valorPotencial.toLocaleString()}` : "—"}
              </p>
            </div>
          ))}
          {!isLoading && data?.length === 0 && (
            <p className="text-sm text-slate-500">Nenhuma oportunidade cadastrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}
