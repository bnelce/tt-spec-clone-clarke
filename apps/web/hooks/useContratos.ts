import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface Contrato {
  id: string;
  cliente: { nomeFantasia: string };
  comercializadora: { nome: string };
  vigenciaInicio: string;
  vigenciaFim: string;
  status: string;
}

export function useContratos() {
  return useQuery({
    queryKey: ["contratos"],
    queryFn: () => api.get<Contrato[]>("/contratos-energia")
  });
}
