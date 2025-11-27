"use client";

import { useState } from "react";
import { useClientes } from "../../../hooks/useClientes";
import { useUcs } from "../../../hooks/useUcs";

export default function UCsPage() {
  const { data: clientes } = useClientes();
  const [clienteId, setClienteId] = useState<string | undefined>();
  const { data, isLoading } = useUcs(clienteId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Unidades Consumidoras</h1>
          <p className="text-sm text-slate-500">Filtro por cliente e visão operacional.</p>
        </div>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Nova UC
        </button>
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4">
        <label className="text-sm text-slate-600">
          Cliente
          <select
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            value={clienteId ?? ""}
            onChange={(e) => setClienteId(e.target.value || undefined)}
          >
            <option value="">Todos</option>
            {clientes?.data.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nomeFantasia}
              </option>
            ))}
          </select>
        </label>
        <div className="rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Código</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Cliente</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Distribuidora</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Local</th>
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
              {data?.data.map((uc) => {
                const cliente = clientes?.data.find((c) => c.id === uc.clienteId);
                return (
                  <tr key={uc.id}>
                    <td className="px-4 py-3">{uc.codigo}</td>
                    <td className="px-4 py-3">{cliente?.nomeFantasia ?? "-"}</td>
                    <td className="px-4 py-3">{uc.distribuidora ?? "-"}</td>
                    <td className="px-4 py-3">
                      {uc.cidade ?? "-"} / {uc.estado ?? "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
