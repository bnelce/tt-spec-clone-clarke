"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";
import type { Lead } from "../../hooks/useLeads";
import type { Cliente } from "../../hooks/useClientes";
import type { OportunidadeEtapa } from "../../hooks/useOportunidadeEtapas";

const oportunidadeSchema = z.object({
  leadId: z.string().optional(),
  clienteId: z.string().optional(),
  etapaId: z.string(),
  valorPotencial: z.coerce.number().optional(),
  probabilidade: z.coerce.number().min(0).max(1).optional(),
  observacoes: z.string().optional()
});

type OportunidadeFormValues = z.infer<typeof oportunidadeSchema>;

interface Props {
  leads: Lead[];
  clientes: Cliente[];
  etapas: OportunidadeEtapa[];
}

export function OportunidadeForm({ leads, clientes, etapas }: Props) {
  const queryClient = useQueryClient();
  const form = useForm<OportunidadeFormValues>({
    resolver: zodResolver(oportunidadeSchema),
    defaultValues: {
      leadId: leads[0]?.id,
      clienteId: undefined,
      etapaId: etapas[0]?.id,
      valorPotencial: undefined,
      probabilidade: 0.3,
      observacoes: ""
    }
  });

  const mutation = useMutation({
    mutationFn: (values: OportunidadeFormValues) => api.post("/oportunidades", values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["oportunidades"] });
      form.reset({ ...form.getValues(), observacoes: "" });
    }
  });

  return (
    <form
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-4"
      onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
    >
      <label className="text-sm text-slate-600">
        Etapa *
        <select
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          {...form.register("etapaId")}
        >
          {etapas.map((etapa) => (
            <option key={etapa.id} value={etapa.id}>
              {etapa.nome}
            </option>
          ))}
        </select>
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-600">
          Lead
          <select
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("leadId")}
          >
            <option value="">Nenhum</option>
            {leads.map((lead) => (
              <option key={lead.id} value={lead.id}>
                {lead.nomeFantasia}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm text-slate-600">
          Cliente
          <select
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("clienteId")}
          >
            <option value="">Nenhum</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nomeFantasia}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-600">
          Valor potencial (R$)
          <input
            type="number"
            step="0.01"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("valorPotencial")}
          />
        </label>
        <label className="text-sm text-slate-600">
          Probabilidade (0 a 1)
          <input
            type="number"
            step="0.05"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("probabilidade")}
          />
          {form.formState.errors.probabilidade && (
            <span className="text-xs text-rose-600">
              {form.formState.errors.probabilidade.message}
            </span>
          )}
        </label>
      </div>
      <label className="text-sm text-slate-600">
        Observações
        <textarea
          rows={3}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          {...form.register("observacoes")}
        />
      </label>
      {mutation.isError && (
        <p className="text-sm text-rose-600">Erro ao salvar oportunidade. Tente novamente.</p>
      )}
      <button
        type="submit"
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        disabled={mutation.isPending || etapas.length === 0}
      >
        {mutation.isPending ? "Salvando..." : "Salvar oportunidade"}
      </button>
    </form>
  );
}
