"use client";

import { useOportunidades } from "../../../hooks/useOportunidades";
import { useLeads } from "../../../hooks/useLeads";
import { useClientes } from "../../../hooks/useClientes";
import { useOportunidadeEtapas } from "../../../hooks/useOportunidadeEtapas";
import { OportunidadeForm } from "../../../components/forms/OportunidadeForm";
import { OpportunityBoard } from "../../../components/opportunity-board";

export default function OportunidadesPage() {
  const { data, isLoading, error } = useOportunidades();
  const leadsQuery = useLeads();
  const clientesQuery = useClientes();
  const etapasQuery = useOportunidadeEtapas();

  const leads = leadsQuery.data?.data ?? [];
  const clientes = clientesQuery.data?.data ?? [];
  const etapas = etapasQuery.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Oportunidades</h1>
            <p className="text-sm text-slate-500">Visão rápida das negociações em andamento.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            {isLoading && <p>Carregando...</p>}
            {error && <p className="text-red-600">Erro ao carregar oportunidades.</p>}
            {data && etapas && data.length > 0 ? (
              <OpportunityBoard oportunidades={data} etapas={etapas} />
            ) : (
              !isLoading && <p className="text-sm text-slate-500">Nenhuma oportunidade cadastrada.</p>
            )}
          </div>
        </div>
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Nova oportunidade</h2>
          <OportunidadeForm leads={leads} clientes={clientes} etapas={etapas} />
        </div>
      </div>
    </div>
  );
}
