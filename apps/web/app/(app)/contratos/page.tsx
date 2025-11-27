"use client";

import { useContratos } from "../../../hooks/useContratos";

export default function ContratosPage() {
  const { data, isLoading, error } = useContratos();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Contratos de Energia</h1>
          <p className="text-sm text-slate-500">Monitoramento de vigências e status.</p>
        </div>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Novo contrato
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Cliente</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Comercializadora</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Vigência</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading && (
              <tr>
                <td colSpan={4} className="px-4 py-4">
                  Carregando...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-red-600">
                  Erro ao carregar contratos.
                </td>
              </tr>
            )}
            {data?.map((contrato) => (
              <tr key={contrato.id}>
                <td className="px-4 py-3">{contrato.cliente.nomeFantasia}</td>
                <td className="px-4 py-3">{contrato.comercializadora.nome}</td>
                <td className="px-4 py-3">
                  {new Date(contrato.vigenciaInicio).toLocaleDateString()} -{" "}
                  {new Date(contrato.vigenciaFim).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">{contrato.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
