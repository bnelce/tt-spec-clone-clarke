# API — Pós-Migração, Faturas, Medição, Exposição

## Endpoints
- POST /faturas {clienteId, ucId, tipo, competencia, consumoKwh, demandaKw, encargos?, tarifas?, tributos?, valorTotal, contratoEnergiaId?}
- GET /faturas?clienteId=&ucId=&competencia=
- GET /faturas/:id
- POST /faturas/:id/arquivos {file}

- POST /medicoes {clienteId, ucId, competencia, energiaKwh, demandaKw, pontaKwh?, foraPontaKwh?}
- GET /medicoes?clienteId=&ucId=&competencia=

- POST /exposicoes/calcular {clienteId?, ucId?, competencia} -> calcula e persiste
- GET /exposicoes?clienteId=&ucId=&competencia=

## Schemas
FaturaRequest {...}
MedicaoRequest {...}
ExposicaoRequest {clienteId?, ucId?, competencia}

## Authz
- Internos; Financeiro/Analista podem lançar; Admin total.
- Clientes: leitura de dados próprios via portal endpoints (separados).

## Erros
400/401/403/404.
