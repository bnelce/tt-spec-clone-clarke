"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

const leadSchema = z.object({
  nomeFantasia: z.string().min(3),
  cnpj: z.string().min(11),
  contatoNome: z.string().optional(),
  email: z.string().email().optional(),
  telefone: z.string().optional(),
  origem: z.string().optional()
});

type LeadFormValues = z.infer<typeof leadSchema>;

export function LeadForm() {
  const queryClient = useQueryClient();
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      nomeFantasia: "",
      cnpj: "",
      contatoNome: "",
      email: "",
      telefone: "",
      origem: ""
    }
  });

  const mutation = useMutation({
    mutationFn: (data: LeadFormValues) => api.post("/leads", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      form.reset();
    }
  });

  return (
    <form
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-4"
      onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-600">
          Empresa *
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
          Contato
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("contatoNome")}
          />
        </label>
        <label className="text-sm text-slate-600">
          E-mail
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            type="email"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <span className="text-xs text-rose-600">{form.formState.errors.email.message}</span>
          )}
        </label>
        <label className="text-sm text-slate-600">
          Telefone
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...form.register("telefone")}
          />
        </label>
        <label className="text-sm text-slate-600">
          Origem
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Evento, indicação..."
            {...form.register("origem")}
          />
        </label>
      </div>
      {mutation.isError && (
        <p className="text-sm text-rose-600">Erro ao salvar lead. Tente novamente.</p>
      )}
      <button
        type="submit"
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Salvando..." : "Salvar lead"}
      </button>
    </form>
  );
}
