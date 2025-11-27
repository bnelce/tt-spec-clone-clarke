import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  lida: boolean;
  criadoEm: string;
}

export function useNotificacoes() {
  return useQuery({
    queryKey: ["notificacoes"],
    queryFn: () => api.get<Notificacao[]>("/notificacoes")
  });
}
