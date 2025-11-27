"use client";

import { useClientes } from "../../../hooks/useClientes";

export default function ClientesPage() {
  const { data, isLoading, error } = useClientes();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Clientes</h1>
          <p className="text-sm text-slate-500">Empresas atendidas pela gestora.</p>
        </div>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Novo cliente
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Nome</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">CNPJ</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Segmento</th>
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
            {error && !isLoading && (
              <tr>
                <td className="px-4 py-4 text-red-600" colSpan={3}>
                  Erro ao carregar clientes
                </td>
              </tr>
            )}
            {data?.data.map((cliente) => (
              <tr key={cliente.id}>
                <td className="px-4 py-3">{cliente.nomeFantasia}</td>
                <td className="px-4 py-3">{cliente.cnpj}</td>
                <td className="px-4 py-3">{cliente.segmento ?? "-"}</td>
              </tr>
            ))}
            {!isLoading && data?.data.length === 0 && (
              <tr>
                <td className="px-4 py-4 text-slate-500" colSpan={3}>
                  Nenhum cliente cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
