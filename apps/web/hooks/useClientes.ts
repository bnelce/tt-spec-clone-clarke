import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface Cliente {
  id: string;
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  segmento?: string;
  criadoEm: string;
}

interface Paginated<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
}

export function useClientes() {
  return useQuery({
    queryKey: ["clientes"],
    queryFn: () => api.get<Paginated<Cliente>>("/clientes")
  });
}
