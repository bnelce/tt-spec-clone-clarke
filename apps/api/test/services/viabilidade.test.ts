import { describe, it, expect } from "vitest";
import { calcularViabilidade } from "../../src/services/viabilidade";

describe("calcularViabilidade", () => {
  it("calcula economia comparando cenários cativo e livre", () => {
    const meses = [
      { mesRef: "2024-01", consumoKwh: 1000, demandaKw: 100, tarifaTe: 300, tarifaTusd: 150, impostos: 50 } as any,
      { mesRef: "2024-02", consumoKwh: 1200, demandaKw: 110, tarifaTe: 320, tarifaTusd: 160, impostos: 55 } as any
    ];

    const result = calcularViabilidade({ meses, precoLivreReferencia: 350 });

    expect(result.custoCativoProj).toBeGreaterThan(result.custoLivreProj);
    expect(result.economiaEstimativa).toBeGreaterThan(0);
  });
});
