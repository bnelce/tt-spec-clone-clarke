import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface Lead {
  id: string;
  nomeFantasia: string;
  cnpj: string;
  contatoNome?: string;
  email?: string;
  status: string;
  criadoEm: string;
}

interface Paginated<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
}

export function useLeads() {
  return useQuery({
    queryKey: ["leads"],
    queryFn: () => api.get<Paginated<Lead>>("/leads")
  });
}
