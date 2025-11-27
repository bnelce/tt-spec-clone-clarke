# API — CRM

## Endpoints
- POST /auth/login {email, senha} -> {token, role}
- POST /leads {dadosLead} (auth interno)
- GET /leads?status=&search= -> lista paginada
- GET /leads/:id -> lead + notas + arquivos
- PUT /leads/:id -> update
- DELETE /leads/:id
- POST /leads/:id/notas {texto}
- POST /leads/:id/arquivos {file}
- POST /leads/:id/convert -> cria Cliente, retorna clienteId

- POST /oportunidades {empresaRef, valorPotencial,...}
- GET /oportunidades?etapa=&responsavel= -> kanban list
- PATCH /oportunidades/:id/etapa {etapaId, motivoPerda?}
- GET /oportunidades/:id -> detalhe + historico
- DELETE /oportunidades/:id

## Schemas (pseudo-TS)
LeadRequest {nomeFantasia, cnpj, contatoNome, contatoCargo?, email, telefone?, segmento?, origem?, status?, observacoes?}
OportunidadeRequest {empresaRef:{leadId?|clienteId?}, valorPotencial?, responsavelId?, etapaId, probabilidade?, dataEstimativaFechamento?, observacoes?}

## Authz
- Internos (JWT) com RBAC: Comercial pode CRUD lead/oportunidade; Admin/Diretor total.
- Clientes: sem acesso CRM.

## Erros
400 validação, 401 não autenticado, 403 sem permissão, 404 não encontrado.
