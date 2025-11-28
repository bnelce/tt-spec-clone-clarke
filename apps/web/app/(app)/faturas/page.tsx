"use client";

import { useMemo, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useFaturas } from "../../../hooks/useFaturas";
import { useClientes } from "../../../hooks/useClientes";
import { FaturaForm } from "../../../components/forms/FaturaForm";

type TipoFiltro = "todas" | "cativa" | "livre";

export default function FaturasPage() {
  const { data, isLoading, error } = useFaturas();
  const clientesQuery = useClientes();
  const [tipo, setTipo] = useState<TipoFiltro>("todas");

  const filtradas = useMemo(() => {
    if (!data) return [];
    return data.filter((f) => (tipo === "todas" ? true : f.tipo === tipo));
  }, [data, tipo]);

  const chartData = useMemo(() => {
    return filtradas
      .slice()
      .sort((a, b) => a.competencia.localeCompare(b.competencia))
      .map((item) => ({
        competencia: item.competencia,
        valor: item.valorTotal,
        tipo: item.tipo
      }));
  }, [filtradas]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Faturas</h1>
          <p className="text-sm text-slate-500">Registro pós-migração (cativa e livre).</p>
        </div>
        {clientesQuery.data?.data && clientesQuery.data.data.length > 0 && (
          <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500">
            {clientesQuery.data.data.length} clientes disponíveis
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {(["todas", "cativa", "livre"] as TipoFiltro[]).map((filtro) => (
          <button
            key={filtro}
            onClick={() => setTipo(filtro)}
            className={`rounded-full border px-3 py-1 text-sm ${
              tipo === filtro
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {filtro === "todas" ? "Todas" : filtro.charAt(0).toUpperCase() + filtro.slice(1)}
          </button>
        ))}
      </div>

      {chartData.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-900">Valor mensal</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="competencia" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="valor" fill="#0f172a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 rounded-xl border border-slate-200 bg-white">
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
              {filtradas.map((fatura) => (
                <tr key={fatura.id}>
                  <td className="px-4 py-3">{fatura.cliente.nomeFantasia}</td>
                  <td className="px-4 py-3">{fatura.uc.codigo}</td>
                  <td className="px-4 py-3">{fatura.competencia}</td>
                  <td className="px-4 py-3">{fatura.tipo}</td>
                  <td className="px-4 py-3">R$ {fatura.valorTotal.toFixed(2)}</td>
                </tr>
              ))}
              {!isLoading && filtradas.length === 0 && (
                <tr>
                  <td className="px-4 py-4 text-slate-500" colSpan={5}>
                    Nenhuma fatura encontrada para o filtro selecionado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {clientesQuery.data?.data && clientesQuery.data.data.length > 0 && (
          <div className="w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Registrar nova fatura</h2>
            <FaturaForm clientes={clientesQuery.data.data} />
          </div>
        )}
      </div>
    </div>
  );
}
