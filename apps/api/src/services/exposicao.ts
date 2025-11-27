interface ExposicaoParams {
  volumeContratadoMwh: number;
  volumeMedidoMwh: number;
  riskThresholds?: {
    baixo: number;
    medio: number;
  };
}

export function calcularExposicao({
  volumeContratadoMwh,
  volumeMedidoMwh,
  riskThresholds = { baixo: 0.05, medio: 0.15 }
}: ExposicaoParams) {
  const exposicaoAbsolutaMwh = volumeMedidoMwh - volumeContratadoMwh;
  const exposicaoPercent = volumeContratadoMwh
    ? exposicaoAbsolutaMwh / volumeContratadoMwh
    : 0;

  let risco: "baixo" | "medio" | "alto" = "baixo";
  if (Math.abs(exposicaoPercent) >= riskThresholds.medio) {
    risco = "alto";
  } else if (Math.abs(exposicaoPercent) >= riskThresholds.baixo) {
    risco = "medio";
  }

  return {
    exposicaoAbsolutaMwh,
    exposicaoPercent,
    risco
  };
}
