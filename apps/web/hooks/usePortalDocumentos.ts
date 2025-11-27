import { useQuery } from "@tanstack/react-query";
import { portalApi } from "../lib/api";

interface DocumentoPortal {
  id: string;
  nome: string;
  url: string;
  tipo?: string;
  criadoEm: string;
}

export function usePortalDocumentos() {
  return useQuery({
    queryKey: ["portal-documentos"],
    queryFn: () => portalApi.get<DocumentoPortal[]>("/portal/documentos")
  });
}
