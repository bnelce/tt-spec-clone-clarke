"use client";

import { useClientes } from "../../../hooks/useClientes";
import { ClienteForm } from "../../../components/forms/ClienteForm";
import { UCForm } from "../../../components/forms/UCForm";

export default function ClientesPage() {
  const { data, isLoading, error } = useClientes();
  const clientes = data?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Clientes</h1>
            <p className="text-sm text-slate-500">Empresas atendidas pela gestora.</p>
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
                {clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td className="px-4 py-3">{cliente.nomeFantasia}</td>
                    <td className="px-4 py-3">{cliente.cnpj}</td>
                    <td className="px-4 py-3">{cliente.segmento ?? "-"}</td>
                  </tr>
                ))}
                {!isLoading && clientes.length === 0 && (
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
        <div className="w-full max-w-md space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Novo cliente</h2>
            <ClienteForm />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Nova UC</h2>
            <UCForm clientes={clientes} />
          </div>
        </div>
      </div>
    </div>
  );
}
