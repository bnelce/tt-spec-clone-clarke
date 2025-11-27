"use client";

import { useMigracoes } from "../../../hooks/useMigracoes";

export default function MigracoesPage() {
  const { data, isLoading, error } = useMigracoes();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Migrações ao ACL</h1>
          <p className="text-sm text-slate-500">Acompanhe etapas e pendências por UC.</p>
        </div>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Nova migração
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        {isLoading && <p>Carregando...</p>}
        {error && <p className="text-red-600">Erro ao carregar migrações.</p>}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {data?.map((mig) => (
            <div key={mig.id} className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm text-slate-500">
                {mig.cliente.nomeFantasia} — UC {mig.uc.codigo}
              </p>
              <p className="text-base font-semibold text-slate-900">{mig.status}</p>
              <ul className="mt-3 space-y-1 text-sm text-slate-600">
                {mig.etapas.slice(0, 3).map((etapa) => (
                  <li key={etapa.id}>
                    {etapa.nome} — <span className="font-medium">{etapa.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {!isLoading && data?.length === 0 && (
            <p className="text-sm text-slate-500">Nenhuma migração cadastrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}
