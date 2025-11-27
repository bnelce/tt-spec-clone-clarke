# API — Clientes & UCs

## Endpoints
- POST /clientes {dadosCliente}
- GET /clientes?search= -> lista paginada
- GET /clientes/:id -> cliente + ucs + oportunidades resumidas
- PUT /clientes/:id
- DELETE /clientes/:id (restrito Admin)
- POST /clientes/:id/arquivos {file}

- POST /ucs {clienteId, dados}
- GET /ucs?clienteId=&search=
- GET /ucs/:id
- PUT /ucs/:id
- DELETE /ucs/:id
- POST /ucs/import {file(csv|xlsx)}

## Schemas
ClienteRequest {razaoSocial, nomeFantasia, cnpj, segmento?, endereco?, contatoNome?, contatoEmail?, contatoTelefone?, observacoes?}
UCRequest {clienteId, codigo, distribuidora, submercado?, modalidadeTarifaria?, tensao?, demandaContratadaKw?, consumoMedioKwhMes?, cidade?, estado?, observacoes?}

## Authz
- Internos JWT; Comercial/Analista podem ler; CRUD por Comercial/Admin.
- Cliente (portal) não acessa endpoints internos.

## Erros
400/401/403/404.
