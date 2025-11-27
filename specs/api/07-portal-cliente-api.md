# API — Portal do Cliente

## Endpoints (cliente-auth)
- POST /portal/auth/login {email, senha} -> {token}
- GET /portal/dashboard?periodo= -> {economiaAcumulada, economiaMensal[], custoMedioR$/Mwh, consumoHistorico[], exposicaoSimplificada[], contratosVigentes[]}
- GET /portal/relatorios -> lista RelatorioPortal
- POST /portal/relatorios (opcional: geração on-demand) {tipo, competencia?}
- GET /portal/documentos -> lista Documentos
- GET /portal/documentos/:id/download

## Authz
- JWT cliente; só dados do cliente vinculado.

## Erros
400/401/403/404.
