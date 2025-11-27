interface HonorarioParams {
  modelo: "fixo" | "percentualEconomia" | "hibrido" | "taxaUnica";
  valorFixo?: number;
  percentualEconomia?: number; // 0.1 = 10%
  taxaUnica?: number;
  economia?: number;
}

export function calcularHonorario({
  modelo,
  valorFixo = 0,
  percentualEconomia = 0,
  taxaUnica = 0,
  economia = 0
}: HonorarioParams) {
  let valor = 0;
  switch (modelo) {
    case "fixo":
      valor = valorFixo;
      break;
    case "percentualEconomia":
      valor = (percentualEconomia ?? 0) * economia;
      break;
    case "hibrido":
      valor = valorFixo + (percentualEconomia ?? 0) * economia;
      break;
    case "taxaUnica":
      valor = taxaUnica;
      break;
  }
  return Math.max(valor, 0);
}
