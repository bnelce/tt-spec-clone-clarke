import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface Migracao {
  id: string;
  cliente: { nomeFantasia: string };
  uc: { codigo: string };
  status: string;
  etapas: { id: string; nome: string; status: string }[];
}

export function useMigracoes() {
  return useQuery({
    queryKey: ["migracoes"],
    queryFn: () => api.get<Migracao[]>("/migracoes")
  });
}
