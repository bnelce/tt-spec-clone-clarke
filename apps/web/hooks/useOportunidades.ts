import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface Oportunidade {
  id: string;
  etapaId: string;
  etapa: { nome: string };
  lead?: { nomeFantasia: string } | null;
  cliente?: { nomeFantasia: string } | null;
  valorPotencial?: number;
  motivoPerda?: string;
}

export function useOportunidades() {
  return useQuery({
    queryKey: ["oportunidades"],
    queryFn: () => api.get<Oportunidade[]>("/oportunidades")
  });
}
