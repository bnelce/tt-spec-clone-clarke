import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface Exposicao {
  id: string;
  cliente: { nomeFantasia: string };
  uc: { codigo: string };
  competencia: string;
  volumeContratadoMwh: number;
  volumeMedidoMwh: number;
  exposicaoAbsolutaMwh: number;
  exposicaoPercent: number;
  risco: "baixo" | "medio" | "alto";
}

export function useExposicoes() {
  return useQuery({
    queryKey: ["exposicoes"],
    queryFn: () => api.get<Exposicao[]>("/exposicoes")
  });
}
