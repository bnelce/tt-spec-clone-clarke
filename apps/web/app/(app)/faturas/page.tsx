"use client";

import { useFaturas } from "../../../hooks/useFaturas";

export default function FaturasPage() {
  const { data, isLoading, error } = useFaturas();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Faturas</h1>
          <p className="text-sm text-slate-500">Registro pós-migração (cativa e livre).</p>
        </div>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Registrar fatura
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Cliente</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">UC</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Competência</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Tipo</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Valor</th>
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
                  Erro ao carregar faturas.
                </td>
              </tr>
            )}
            {data?.map((fatura) => (
              <tr key={fatura.id}>
                <td className="px-4 py-3">{fatura.cliente.nomeFantasia}</td>
                <td className="px-4 py-3">{fatura.uc.codigo}</td>
                <td className="px-4 py-3">{fatura.competencia}</td>
                <td className="px-4 py-3">{fatura.tipo}</td>
                <td className="px-4 py-3">R$ {fatura.valorTotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
