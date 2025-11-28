"use client";

import { useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useExposicoes } from "../../../hooks/useExposicoes";

const riscoBadge: Record<string, string> = {
  baixo: "bg-emerald-100 text-emerald-700",
  medio: "bg-amber-100 text-amber-700",
  alto: "bg-rose-100 text-rose-700"
};

export default function ExposicoesPage() {
  const { data, isLoading, error } = useExposicoes();

  const chartData = useMemo(() => {
    if (!data) return [];
    return data
      .slice()
      .sort((a, b) => a.competencia.localeCompare(b.competencia))
      .map((item) => ({
        competencia: item.competencia,
        contratado: item.volumeContratadoMwh,
        medido: item.volumeMedidoMwh
      }));
  }, [data]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Exposição Contratual</h1>
          <p className="text-sm text-slate-500">
            Comparativo entre volumes contratados x medidos para risco de sobre/subcontratação.
          </p>
        </div>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Calcular exposição
        </button>
      </div>

      {chartData.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-900">Tendência mensal</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="competencia" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="contratado" stroke="#0f172a" strokeWidth={2} />
                <Line type="monotone" dataKey="medido" stroke="#0ea5e9" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Cliente</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">UC</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Competência</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Contratado (MWh)</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Medido (MWh)</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Exposição</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Risco</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading && (
              <tr>
                <td className="px-4 py-4" colSpan={7}>
                  Carregando...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td className="px-4 py-4 text-red-600" colSpan={7}>
                  Erro ao carregar exposições.
                </td>
              </tr>
            )}
            {data?.map((exp) => (
              <tr key={exp.id}>
                <td className="px-4 py-3">{exp.cliente.nomeFantasia}</td>
                <td className="px-4 py-3">{exp.uc.codigo}</td>
                <td className="px-4 py-3">{exp.competencia}</td>
                <td className="px-4 py-3">{exp.volumeContratadoMwh.toFixed(2)}</td>
                <td className="px-4 py-3">{exp.volumeMedidoMwh.toFixed(2)}</td>
                <td className="px-4 py-3">
                  {exp.exposicaoAbsolutaMwh.toFixed(2)} MWh (
                  {(exp.exposicaoPercent * 100).toFixed(1)}%)
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      riscoBadge[exp.risco] ?? "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {exp.risco}
                  </span>
                </td>
              </tr>
            ))}
            {!isLoading && data?.length === 0 && (
              <tr>
                <td className="px-4 py-4 text-slate-500" colSpan={7}>
                  Nenhum cálculo de exposição disponível.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
