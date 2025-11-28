"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";
import type { Cliente } from "../../hooks/useClientes";

const ucSchema = z.object({
  clienteId: z.string().min(1),
  codigo: z.string().min(3),
  distribuidora: z.string().optional(),
  submercado: z.string().optional(),
  modalidadeTarifaria: z.string().optional(),
  tensao: z.string().optional(),
  demandaContratadaKw: z.coerce.number().optional(),
  consumoMedioKwhMes: z.coerce.number().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional()
});

type UCFormValues = z.infer<typeof ucSchema>;

interface Props {
  clientes: Cliente[];
}

export function UCForm({ clientes }: Props) {
  const queryClient = useQueryClient();
  const form = useForm<UCFormValues>({
    resolver: zodResolver(ucSchema),
    defaultValues: {
      clienteId: clientes[0]?.id ?? "",
      codigo: "",
      distribuidora: "",
      submercado: "",
      modalidadeTarifaria: "",
      tensao: "",
      demandaContratadaKw: undefined,
      consumoMedioKwhMes: undefined,
      cidade: "",
      estado: ""
    }
  });

  const mutation = useMutation({
    mutationFn: (values: UCFormValues) => api.post("/ucs", values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ucs"] });
      form.reset({ ...form.getValues(), codigo: "" });
    }
  });

  return (
    <form
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-4"
      onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
    >
      <label className="text-sm text-slate-600">
        Cliente *
        <select
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          {...form.register("clienteId")}
        >
          <option value="">Selecione</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nomeFantasia}
            </option>
          ))}
        </select>
        {form.formState.errors.clienteId && (
          <span className="text-xs text-rose-600">
            {form.formState.errors.clienteId.message}
          </span>
        )}
      </label>
      <label className="text-sm text-slate-600">
        Código da UC *
        <input
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          {...form.register("codigo")}
        />
        {form.formState.errors.codigo && (
          <span className="text-xs text-rose-600">{form.formState.errors.codigo.message}</span>
        )}
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-600">
          Distribuidora
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("distribuidora")}
          />
        </label>
        <label className="text-sm text-slate-600">
          Submercado
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("submercado")}
          />
        </label>
        <label className="text-sm text-slate-600">
          Modalidade tarifária
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("modalidadeTarifaria")}
          />
        </label>
        <label className="text-sm text-slate-600">
          Tensão
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("tensao")}
          />
        </label>
        <label className="text-sm text-slate-600">
          Demanda contratada (kW)
          <input
            type="number"
            step="0.01"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("demandaContratadaKw")}
          />
        </label>
        <label className="text-sm text-slate-600">
          Consumo médio (kWh/mês)
          <input
            type="number"
            step="0.01"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("consumoMedioKwhMes")}
          />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-600">
          Cidade
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("cidade")}
          />
        </label>
        <label className="text-sm text-slate-600">
          Estado
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("estado")}
          />
        </label>
      </div>
      {mutation.isError && (
        <p className="text-sm text-rose-600">Erro ao salvar UC. Tente novamente.</p>
      )}
      <button
        type="submit"
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        disabled={mutation.isPending || clientes.length === 0}
      >
        {mutation.isPending ? "Salvando..." : "Salvar UC"}
      </button>
    </form>
  );
}
