"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

const clienteSchema = z.object({
  razaoSocial: z.string().min(3),
  nomeFantasia: z.string().min(3),
  cnpj: z.string().min(11),
  segmento: z.string().optional(),
  endereco: z.string().optional(),
  contatoNome: z.string().optional(),
  contatoEmail: z.string().email().optional(),
  contatoTelefone: z.string().optional()
});

type ClienteFormValues = z.infer<typeof clienteSchema>;

export function ClienteForm() {
  const queryClient = useQueryClient();
  const form = useForm<ClienteFormValues>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      razaoSocial: "",
      nomeFantasia: "",
      cnpj: "",
      segmento: "",
      endereco: "",
      contatoNome: "",
      contatoEmail: "",
      contatoTelefone: ""
    }
  });

  const mutation = useMutation({
    mutationFn: (values: ClienteFormValues) => api.post("/clientes", values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      form.reset();
    }
  });

  return (
    <form
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-4"
      onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
    >
      <div className="grid gap-4">
        <label className="text-sm text-slate-600">
          Razão social *
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("razaoSocial")}
          />
          {form.formState.errors.razaoSocial && (
            <span className="text-xs text-rose-600">
              {form.formState.errors.razaoSocial.message}
            </span>
          )}
        </label>
        <label className="text-sm text-slate-600">
          Nome fantasia *
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("nomeFantasia")}
          />
          {form.formState.errors.nomeFantasia && (
            <span className="text-xs text-rose-600">
              {form.formState.errors.nomeFantasia.message}
            </span>
          )}
        </label>
        <label className="text-sm text-slate-600">
          CNPJ *
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("cnpj")}
          />
          {form.formState.errors.cnpj && (
            <span className="text-xs text-rose-600">{form.formState.errors.cnpj.message}</span>
          )}
        </label>
        <label className="text-sm text-slate-600">
          Segmento
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("segmento")}
          />
        </label>
        <label className="text-sm text-slate-600">
          Endereço
          <textarea
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            rows={2}
            {...form.register("endereco")}
          />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-600">
            Contato
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              {...form.register("contatoNome")}
            />
          </label>
          <label className="text-sm text-slate-600">
            Telefone
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              {...form.register("contatoTelefone")}
            />
          </label>
          <label className="text-sm text-slate-600 md:col-span-2">
            E-mail
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              type="email"
              {...form.register("contatoEmail")}
            />
            {form.formState.errors.contatoEmail && (
              <span className="text-xs text-rose-600">
                {form.formState.errors.contatoEmail.message}
              </span>
            )}
          </label>
        </div>
      </div>
      {mutation.isError && (
        <p className="text-sm text-rose-600">Erro ao salvar cliente. Tente novamente.</p>
      )}
      <button
        type="submit"
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Salvando..." : "Salvar cliente"}
      </button>
    </form>
  );
}
