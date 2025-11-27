"use client";

import { usePropostas } from "../../../hooks/usePropostas";

export default function PropostasPage() {
  const { data, isLoading, error } = usePropostas();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Propostas de Energia</h1>
          <p className="text-sm text-slate-500">Comparativo rápido entre comercializadoras.</p>
        </div>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Nova proposta
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Comercializadora</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Tipo</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Preço base</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Selecionada</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading && (
              <tr>
                <td className="px-4 py-4" colSpan={4}>
                  Carregando...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td className="px-4 py-4 text-red-600" colSpan={4}>
                  Erro ao carregar propostas.
                </td>
              </tr>
            )}
            {data?.map((proposta) => (
              <tr key={proposta.id}>
                <td className="px-4 py-3">{proposta.comercializadora.nome}</td>
                <td className="px-4 py-3">{proposta.tipoContrato ?? "-"}</td>
                <td className="px-4 py-3">
                  {proposta.precoBase ? `R$ ${proposta.precoBase.toFixed(2)}` : "-"}
                </td>
                <td className="px-4 py-3">
                  {proposta.selecionada ? (
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
                      Selecionada
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                      Em análise
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
