import { useQuery } from "@tanstack/react-query";
import { portalApi } from "../lib/api";

interface Relatorio {
  id: string;
  tipo: string;
  competencia?: string;
  url: string;
  criadoEm: string;
}

export function usePortalRelatorios() {
  return useQuery({
    queryKey: ["portal-relatorios"],
    queryFn: () => portalApi.get<Relatorio[]>("/portal/relatorios")
  });
}
