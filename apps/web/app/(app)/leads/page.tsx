"use client";

import { useLeads } from "../../../hooks/useLeads";

export default function LeadsPage() {
  const { data, isLoading, error } = useLeads();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Leads</h1>
          <p className="text-sm text-slate-500">Listagem e status do funil de prospecção.</p>
        </div>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Novo lead
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Empresa</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">CNPJ</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Contato</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Status</th>
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
            {error && !isLoading && (
              <tr>
                <td className="px-4 py-4 text-red-600" colSpan={4}>
                  Erro ao carregar leads
                </td>
              </tr>
            )}
            {data?.data.map((lead) => (
              <tr key={lead.id}>
                <td className="px-4 py-3">{lead.nomeFantasia}</td>
                <td className="px-4 py-3">{lead.cnpj}</td>
                <td className="px-4 py-3">{lead.contatoNome ?? "-"}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    {lead.status}
                  </span>
                </td>
              </tr>
            ))}
            {!isLoading && data?.data.length === 0 && (
              <tr>
                <td className="px-4 py-4 text-slate-500" colSpan={4}>
                  Nenhum lead cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
