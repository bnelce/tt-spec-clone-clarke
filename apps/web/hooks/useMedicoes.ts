import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface Medicao {
  id: string;
  cliente: { nomeFantasia: string };
  uc: { codigo: string };
  competencia: string;
  energiaKwh: number;
  demandaKw?: number;
  pontaKwh?: number;
  foraPontaKwh?: number;
}

export function useMedicoes() {
  return useQuery({
    queryKey: ["medicoes"],
    queryFn: () => api.get<Medicao[]>("/medicoes")
  });
}
