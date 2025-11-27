import { useQuery } from "@tanstack/react-query";
import { portalApi } from "../lib/api";

interface PortalDashboard {
  economiaAcumulada: number;
  economiaMensal: { competencia: string; economia: number }[];
  custoMedio: number;
  consumoHistorico: { competencia: string; energiaKwh: number }[];
  exposicaoSimplificada: { competencia: string; exposicaoPercent: number }[];
  contratosVigentes: { id: string; tipoContrato?: string }[];
}

export function usePortalDashboard() {
  return useQuery({
    queryKey: ["portal-dashboard"],
    queryFn: () => portalApi.get<PortalDashboard>("/portal/dashboard")
  });
}
