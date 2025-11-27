# API — Honorários

## Endpoints
- POST /contratos-gestao {clienteId, modelo, valorFixo?, percentualEconomia?, taxaUnica?, inicio, fim?, observacoes?}
- GET /contratos-gestao?clienteId=
- GET /contratos-gestao/:id
- PUT /contratos-gestao/:id

- POST /honorarios/calcular {clienteId, competencia} -> {valor, detalhes}
- GET /honorarios?clienteId=&competencia=
- GET /honorarios/:id
- POST /honorarios/relatorios {clienteId, competencia} -> gera registro/arquivo

## Authz
- Internos (Financeiro/Admin).

## Erros
400/401/403/404.
