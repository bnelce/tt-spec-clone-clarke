# Análise de Viabilidade de Migração

## Objetivo
Avaliar migração ao ACL por UC ou grupo de UCs.

## Entidades
- AnaliseViabilidade: {id, clienteId?, ucId?, oportunidadeId?, periodoMeses, status, criadoPor, criadoEm}
- AnaliseViabilidadeMes: {id, analiseId, mesRef(YYYY-MM), consumoKwh, demandaKw, tarifaTe, tarifaTusd, impostos?, tipoTarifa}
- AnaliseViabilidadeResultado: {id, analiseId, custoCativoProj, custoLivreProj, economiaEstimativa, economiaPercent, paybackMeses?, premissasPreco}
- AnaliseViabilidadeArquivo: {id, analiseId, nome, url, tipo(pdf/template), criadoEm}

## Regras
- Validação de datas (mes/ano) e números positivos.
- Cenário livre usa premissas de preço ou propostas vinculadas.
- Economia = custoCativo - custoLivre; payback opcional.

## Eventos
- AnaliseCriada, AnaliseAtualizada, ResultadoGerado.
