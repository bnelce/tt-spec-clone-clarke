import { describe, it, expect } from "vitest";
import { calcularExposicao } from "../../src/services/exposicao";

describe("calcularExposicao", () => {
  it("classifica risco baixo quando diferença é pequena", () => {
    const result = calcularExposicao({
      volumeContratadoMwh: 100,
      volumeMedidoMwh: 104,
      riskThresholds: { baixo: 0.05, medio: 0.15 }
    });

    expect(result.exposicaoAbsolutaMwh).toBeCloseTo(4);
    expect(result.risco).toBe("baixo");
  });

  it("classifica risco alto quando diferença ultrapassa limite", () => {
    const result = calcularExposicao({
      volumeContratadoMwh: 100,
      volumeMedidoMwh: 130,
      riskThresholds: { baixo: 0.05, medio: 0.15 }
    });

    expect(result.risco).toBe("alto");
    expect(result.exposicaoPercent).toBeCloseTo(0.3);
  });
});
