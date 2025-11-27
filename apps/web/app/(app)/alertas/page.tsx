"use client";

import { useNotificacoes } from "../../../hooks/useNotificacoes";

export default function AlertasPage() {
  const { data, isLoading, error } = useNotificacoes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Alertas e Notificações</h1>
        <p className="text-sm text-slate-500">
          Monitoramento de contratos, migrações e exposição crítica.
        </p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Título</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Mensagem</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Status</th>
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
                  Erro ao carregar notificações.
                </td>
              </tr>
            )}
            {data?.map((notificacao) => (
              <tr key={notificacao.id}>
                <td className="px-4 py-3">{notificacao.titulo}</td>
                <td className="px-4 py-3">{notificacao.mensagem}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      notificacao.lida
                        ? "bg-slate-100 text-slate-600"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {notificacao.lida ? "Lida" : "Pendente"}
                  </span>
                </td>
              </tr>
            ))}
            {!isLoading && data?.length === 0 && (
              <tr>
                <td className="px-4 py-4 text-slate-500" colSpan={3}>
                  Nenhum alerta aberto.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
