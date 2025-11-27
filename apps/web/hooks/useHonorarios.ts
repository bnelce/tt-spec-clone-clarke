import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface Honorario {
  id: string;
  cliente: { nomeFantasia: string };
  competencia: string;
  valorHonorario: number;
}

export function useHonorarios() {
  return useQuery({
    queryKey: ["honorarios"],
    queryFn: () => api.get<Honorario[]>("/honorarios")
  });
}
