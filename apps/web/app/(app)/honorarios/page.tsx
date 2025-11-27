"use client";

import { useHonorarios } from "../../../hooks/useHonorarios";

export default function HonorariosPage() {
  const { data, isLoading, error } = useHonorarios();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Honorários</h1>
          <p className="text-sm text-slate-500">Valores calculados por cliente/competência.</p>
        </div>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Calcular honorário
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Cliente</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Competência</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading && (
              <tr>
                <td className="px-4 py-4" colSpan={3}>
                  Carregando...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td className="px-4 py-4 text-red-600" colSpan={3}>
                  Erro ao carregar honorários.
                </td>
              </tr>
            )}
            {data?.map((honorario) => (
              <tr key={honorario.id}>
                <td className="px-4 py-3">{honorario.cliente.nomeFantasia}</td>
                <td className="px-4 py-3">{honorario.competencia}</td>
                <td className="px-4 py-3">R$ {honorario.valorHonorario.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
