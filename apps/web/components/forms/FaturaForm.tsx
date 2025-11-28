"use client";

import { useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { useUcs } from "../../hooks/useUcs";
import type { Cliente } from "../../hooks/useClientes";

const schema = z.object({
  clienteId: z.string().min(1),
  ucId: z.string().min(1),
  tipo: z.enum(["cativa", "livre"]),
  competencia: z.string().min(7),
  consumoKwh: z.coerce.number().positive(),
  valorTotal: z.coerce.number().positive()
});

type FormValues = z.infer<typeof schema>;

interface Props {
  clientes: Cliente[];
}

export function FaturaForm({ clientes }: Props) {
  const [clienteId, setClienteId] = useState(clientes[0]?.id ?? "");
  const { data: ucsData } = useUcs(clienteId || undefined);
  const ucs = useMemo(() => ucsData?.data ?? [], [ucsData]);

  const queryClient = useQueryClient();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      clienteId: clienteId,
      ucId: "",
      tipo: "livre",
      competencia: "",
      consumoKwh: 0,
      valorTotal: 0
    }
  });

  const mutation = useMutation({
    mutationFn: (values: FormValues) =>
      api.post("/faturas", {
        clienteId: values.clienteId,
        ucId: values.ucId,
        tipo: values.tipo,
        competencia: values.competencia,
        consumoKwh: values.consumoKwh,
        valorTotal: values.valorTotal
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faturas"] });
      form.reset({
        clienteId,
        ucId: "",
        tipo: "livre",
        competencia: "",
        consumoKwh: 0,
        valorTotal: 0
      });
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
          value={clienteId}
          onChange={(e) => {
            setClienteId(e.target.value);
            form.setValue("clienteId", e.target.value);
            form.setValue("ucId", "");
          }}
        >
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nomeFantasia}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm text-slate-600">
        Unidade Consumidora *
        <select
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          {...form.register("ucId")}
        >
          <option value="">Selecione</option>
          {ucs.map((uc) => (
            <option key={uc.id} value={uc.id}>
              {uc.codigo} - {uc.distribuidora ?? "s/ dist"}
            </option>
          ))}
        </select>
        {form.formState.errors.ucId && (
          <span className="text-xs text-rose-600">{form.formState.errors.ucId.message}</span>
        )}
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-600">
          Tipo
          <select
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("tipo")}
          >
            <option value="livre">Livre</option>
            <option value="cativa">Cativa</option>
          </select>
        </label>
        <label className="text-sm text-slate-600">
          Competência (YYYY-MM) *
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="2024-01"
            {...form.register("competencia")}
          />
          {form.formState.errors.competencia && (
            <span className="text-xs text-rose-600">
              {form.formState.errors.competencia.message}
            </span>
          )}
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-600">
          Consumo (kWh) *
          <input
            type="number"
            step="0.01"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("consumoKwh", { valueAsNumber: true })}
          />
          {form.formState.errors.consumoKwh && (
            <span className="text-xs text-rose-600">
              {form.formState.errors.consumoKwh.message}
            </span>
          )}
        </label>

        <label className="text-sm text-slate-600">
          Valor total (R$) *
          <input
            type="number"
            step="0.01"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("valorTotal", { valueAsNumber: true })}
          />
          {form.formState.errors.valorTotal && (
            <span className="text-xs text-rose-600">
              {form.formState.errors.valorTotal.message}
            </span>
          )}
        </label>
      </div>

      {mutation.isError && (
        <p className="text-sm text-rose-600">Erro ao registrar fatura. Tente novamente.</p>
      )}

      <button
        type="submit"
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Salvando..." : "Registrar fatura"}
      </button>
    </form>
  );
}
