# API — Análise de Viabilidade

## Endpoints
- POST /analises {clienteId?, ucId?, oportunidadeId?, periodoMeses, dadosMensais[]}
- GET /analises?clienteId=&ucId=
- GET /analises/:id -> analise + linhas + resultado
- PUT /analises/:id {atualiza entradas}
- POST /analises/:id/calcular {premissasPreco?} -> resultado
- POST /analises/:id/arquivos {file}

## Schemas
AnaliseRequest {clienteId?, ucId?, oportunidadeId?, periodoMeses, dadosMensais: [{mesRef, consumoKwh, demandaKw, tarifaTe?, tarifaTusd?, impostos?, tipoTarifa?}]}
ResultadoResponse {custoCativoProj, custoLivreProj, economiaEstimativa, economiaPercent, paybackMeses?}

## Authz
- Internos (Analista/Comercial/Admin). Clientes: não.

## Erros
400 validação/calculo, 401/403, 404.
