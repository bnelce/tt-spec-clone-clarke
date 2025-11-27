# API — Contratos de Energia e Migração

## Endpoints Contratos
- POST /contratos-energia {clienteId, comercializadoraId, ucIds[], ...}
- GET /contratos-energia?status=&clienteId=
- GET /contratos-energia/:id -> contrato + curvas + arquivos
- PUT /contratos-energia/:id
- POST /contratos-energia/:id/arquivos {file}

## Endpoints Migração
- POST /migracoes {clienteId, ucId, responsavelId?, etapasDefault?}
- GET /migracoes?clienteId=&status=
- GET /migracoes/:id -> etapas, tarefas, arquivos
- PATCH /migracoes/:id/etapas/:etapaId {status, prazoPrevisto?, concluidoEm?}
- POST /migracoes/:id/tarefas {etapaId, titulo, descricao?, responsavelId?, prazo?}
- PATCH /migracoes/:id/tarefas/:tarefaId {status, concluidoEm?, anexos?}
- POST /migracoes/:id/arquivos {file}

## Schemas
ContratoEnergiaRequest {clienteId, comercializadoraId, ucIds[], tipoContrato, vigenciaInicio, vigenciaFim, volumeMwhMes?, volumeMwhAno?, precoR$/Mwh?, formulaPreco?, indexador?, periodicidadeReajuste?, condicoesEspeciais?, observacoes?}
MigracaoRequest {clienteId, ucId, responsavelId?, etapasDefault?:bool}

## Authz
- Internos (Analista/Admin). Clientes não.
- Upload restrito a perfis autorizados.

## Erros
400/401/403/404.
