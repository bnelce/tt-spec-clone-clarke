import { AnaliseViabilidadeMes } from "@prisma/client";

interface CalculateParams {
  meses: AnaliseViabilidadeMes[];
  precoLivreReferencia?: number; // R$/MWh
}

export function calcularViabilidade({ meses, precoLivreReferencia }: CalculateParams) {
  if (!meses.length) {
    return {
      custoCativoProj: 0,
      custoLivreProj: 0,
      economiaEstimativa: 0,
      economiaPercent: 0
    };
  }

  const precoLivre = precoLivreReferencia ?? 350; // fallback R$/MWh

  const custoCativoProj = meses.reduce((acc, mes) => {
    const tarifaTe = mes.tarifaTe ?? 0;
    const tarifaTusd = mes.tarifaTusd ?? 0;
    const impostos = mes.impostos ?? 0;
    const consumo = mes.consumoKwh ?? 0;
    const custo = (tarifaTe + tarifaTusd + impostos) * (consumo / 1000); // kWh -> MWh
    return acc + custo;
  }, 0);

  const custoLivreProj = meses.reduce((acc, mes) => {
    const consumo = mes.consumoKwh ?? 0;
    const custo = (consumo / 1000) * precoLivre;
    return acc + custo;
  }, 0);

  const economiaEstimativa = custoCativoProj - custoLivreProj;
  const economiaPercent = custoCativoProj ? economiaEstimativa / custoCativoProj : 0;

  return {
    custoCativoProj,
    custoLivreProj,
    economiaEstimativa,
    economiaPercent
  };
}
