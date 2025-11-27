import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface Proposta {
  id: string;
  clienteId?: string;
  comercializadora: { nome: string };
  tipoContrato?: string;
  precoBase?: number;
  selecionada: boolean;
}

export function usePropostas() {
  return useQuery({
    queryKey: ["propostas"],
    queryFn: () => api.get<Proposta[]>("/propostas")
  });
}
