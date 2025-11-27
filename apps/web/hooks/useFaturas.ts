import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface Fatura {
  id: string;
  cliente: { nomeFantasia: string };
  uc: { codigo: string };
  competencia: string;
  tipo: "cativa" | "livre";
  valorTotal: number;
}

export function useFaturas() {
  return useQuery({
    queryKey: ["faturas"],
    queryFn: () => api.get<Fatura[]>("/faturas")
  });
}
