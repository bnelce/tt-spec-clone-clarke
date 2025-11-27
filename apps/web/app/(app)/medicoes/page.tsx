"use client";

import { useMedicoes } from "../../../hooks/useMedicoes";

export default function MedicoesPage() {
  const { data, isLoading, error } = useMedicoes();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Medições</h1>
          <p className="text-sm text-slate-500">
            Energia medida por UC (ponta/fora ponta) para análise operacional.
          </p>
        </div>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Registrar medição
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Cliente</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">UC</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Competência</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Energia (kWh)</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Demanda (kW)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading && (
              <tr>
                <td className="px-4 py-4" colSpan={5}>
                  Carregando...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td className="px-4 py-4 text-red-600" colSpan={5}>
                  Erro ao carregar medições.
                </td>
              </tr>
            )}
            {data?.map((medicao) => (
              <tr key={medicao.id}>
                <td className="px-4 py-3">{medicao.cliente.nomeFantasia}</td>
                <td className="px-4 py-3">{medicao.uc.codigo}</td>
                <td className="px-4 py-3">{medicao.competencia}</td>
                <td className="px-4 py-3">{medicao.energiaKwh.toLocaleString()}</td>
                <td className="px-4 py-3">{medicao.demandaKw ?? "-"}</td>
              </tr>
            ))}
            {!isLoading && data?.length === 0 && (
              <tr>
                <td className="px-4 py-4 text-slate-500" colSpan={5}>
                  Nenhuma medição registrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
