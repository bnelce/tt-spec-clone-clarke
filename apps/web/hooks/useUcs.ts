import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface UC {
  id: string;
  clienteId: string;
  codigo: string;
  distribuidora?: string;
  cidade?: string;
  estado?: string;
  criadoEm: string;
}

interface Paginated<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
}

export function useUcs(clienteId?: string) {
  return useQuery({
    queryKey: ["ucs", clienteId],
    queryFn: () =>
      api.get<Paginated<UC>>(`/ucs${clienteId ? `?clienteId=${clienteId}` : ""}`),
    enabled: true
  });
}
