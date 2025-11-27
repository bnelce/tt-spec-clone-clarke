"use client";

import { usePortalDocumentos } from "../../../../hooks/usePortalDocumentos";

export default function PortalDocumentos() {
  const { data, isLoading, error } = usePortalDocumentos();
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Documentos</h1>
          <p className="text-sm text-slate-500">Contratos, laudos e anexos disponíveis.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Nome</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Tipo</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Ações</th>
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
                    Erro ao carregar documentos
                  </td>
                </tr>
              )}
              {data?.map((doc) => (
                <tr key={doc.id}>
                  <td className="px-4 py-3">{doc.nome}</td>
                  <td className="px-4 py-3">{doc.tipo ?? "-"}</td>
                  <td className="px-4 py-3">
                    <a
                      href={doc.url}
                      className="text-sm font-medium text-slate-900 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
