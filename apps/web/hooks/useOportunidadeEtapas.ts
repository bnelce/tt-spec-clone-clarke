import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface OportunidadeEtapa {
  id: string;
  nome: string;
  ordem: number;
}

export function useOportunidadeEtapas() {
  return useQuery({
    queryKey: ["oportunidades", "etapas"],
    queryFn: () => api.get<OportunidadeEtapa[]>("/oportunidades/etapas")
  });
}
