# Plano de Implementação — Gestora ACL (Spec → Code)

Use as caixas para marcar conclusão das tarefas. Ordem sugerida, podendo paralelizar onde fizer sentido.

## 1) Infra / Monorepo
- [x] Criar Turborepo com `apps/api`, `apps/web`, `packages/config`, `packages/core`, `packages/ui`.
- [x] Adicionar `turbo.json` e `package.json` raiz com workspaces e scripts `dev`, `dev:api`, `dev:web`, `build`, `lint`, `test`.
- [x] Configurar `packages/config`: `tsconfig.base`, ESLint, Prettier, Tailwind base.
- [x] Configurar `packages/core`: tipos de domínio compartilhados (derivados das specs).
- [x] Configurar `packages/ui`: componentes base (shadcn) reutilizáveis.

## 2) Backend Setup (apps/api)
- [x] Inicializar Fastify + TypeScript + Zod + Prisma.
- [x] Criar `.env` exemplo e `docker-compose.yml` (MySQL + API).
- [x] Definir `schema.prisma` cobrindo entidades dos domain specs.
- [ ] Gerar migrations e Prisma Client (`prisma migrate dev`, `prisma generate`).
- [x] Middlewares: logger, error handler, auth JWT, RBAC simples (auth/authorize plugin por rota).
- [x] Seeds iniciais: etapas de oportunidades, perfil admin, usuário admin (prisma/seed.ts). Migração etapas ainda pendente.

## 3) Auth & RBAC
- [x] Modelos já definidos em `schema.prisma` para usuários e papéis.
- [x] Endpoints `/auth/login` (interno) e `/portal/auth/login` (cliente).
- [x] Guards por role e escopo cliente (`authorize`, `authorizeCliente`).
- [ ] Proteções adicionais: rate limit/login attempts (pendente).

## 4) Vertical Slice 1 – CRM
- [x] Endpoints Leads: CRUD + notas + arquivos + converter para cliente.
- [x] Endpoints Oportunidades: criar/listar (kanban), mudar etapa, histórico.
- [ ] Validações (Zod) conforme specs; paginação em listas (parcial: leads/clientes/ucs).
- [x] Hooks/telas básicas para leads e oportunidades; [ ] kanban completo + formulários.

## 5) Vertical Slice 2 – Clientes & UCs
- [x] Endpoints Clientes: CRUD, arquivos.
- [x] Endpoints UCs: CRUD, import CSV (stub inicial).
- [ ] Integrar com CRM (conversão de lead cria cliente).
- [x] Hooks `useClientes`, `useUcs`; telas Next básicas. [ ] telas detalhadas/CRUD.

## 6) Vertical Slice 3 — Análise de Viabilidade
- [x] Endpoints: criar análise com dados mensais, calcular resultado (rotas `/analises`).
- [ ] Upload/anexos de análise pendente.
- [x] Serviço de cálculo (custo cativo vs livre, economia); payback opcional pendente.
- [ ] Hooks `useAnalises`; telas para input/upload e visualização (gráficos).

## 7) Vertical Slice 4 – Propostas & Contratos de Energia
- [x] Endpoints Comercializadoras: CRUD.
- [x] Endpoints Propostas: CRUD, seleção de proposta.
- [x] Comparador (API + resposta consolidada).
- [x] Endpoints Contratos Energia: CRUD, arquivos.
- [x] Hooks `usePropostas`, `useContratos` + telas básicas. [ ] telas detalhadas/CRUD.

## 8) Vertical Slice 5 – Migração
- [x] Endpoints Migração: criar por UC, etapas, tarefas (arquivos pendente).
- [ ] Kanban de migração; alertas de atraso (persistir notificações).
- [x] Hook/tela básica `useMigracoes`; [ ] detalhar tarefas + kanban arrastar.

## 9) Vertical Slice 6 – Pós-Migração (Faturas, Medição, Exposição)
- [x] Endpoints Faturas: CRUD + upload metadata.
- [x] Endpoints Medições: CRUD.
- [x] Endpoint Exposição: calcular e persistir.
- [x] Hook/tela básica `useFaturas`; [ ] hooks de medições/exposições + gráficos.

## 10) Vertical Slice 7 – Honorários
- [x] Endpoints Contratos de Gestão: CRUD.
- [x] Endpoint Cálculo de Honorário (modelo simples).
- [ ] Endpoint Relatórios de Honorário (pendente).
- [x] Hook/tela básica `useHonorarios`; [ ] telas de contratos de gestão + cálculo avançado.

## 11) Portal do Cliente
- [x] Endpoints portal: dashboard, relatórios, documentos.
- [x] Hooks portal (`usePortalDashboard`, `usePortalRelatorios`, `usePortalDocumentos`).
- [x] Telas portal: login, dashboard, relatórios e documentos básicos.

## 12) Alertas, Notificações e Auditoria
- [x] Registrar `LogAuditoria` em CRUD de leads/clientes/UCs/contratos/faturas/migrações/honorários.
- [x] Notificações automáticas: contrato a vencer e migração atrasada + listagem `/notificacoes`.
- [ ] Expandir notificações (exposição alta, fatura ausente) e permitir marcar como lida via API (parcial).
- [x] Badge/visualização no app interno (Topbar + página `/alertas`).

## 13) UI/UX e Componentes
- [x] Layout interno inicial (sidebar/topbar) e páginas base.
- [ ] Formulários com `react-hook-form + zod` e componentes shadcn.
- [ ] Tabelas com filtros/paginação avançados; uploads.
- [ ] Kanban (oportunidades, migração); gráficos (recharts ou similar).

## 14) Alertas, Notificações e Auditoria
- [ ] Registrar `LogAuditoria` em CRUD críticos.
- [ ] Persistir `Notificacao` para: contrato a vencer, migração atrasada, exposição alta, falta de fatura.
- [ ] Badge de alertas no topo do app interno.

## 15) UI/UX e Componentes
- [ ] Layout interno (sidebar/topbar), tema da gestora.
- [ ] Formulários com `react-hook-form + zod` e componentes shadcn.
- [ ] Tabelas com filtros/paginação; uploads.
- [ ] Kanban (oportunidades, migração); gráficos (recharts ou similar).

## 16) Testes e Qualidade
- [ ] Backend: testes unit (serviços de cálculo) e integração (rotas principais).
- [ ] Frontend: smoke tests de páginas/hooks críticos.
- [ ] Lint/format no CI; checar paginação e validação em todas as listas.

## 17) DevOps local
- [ ] Validar `docker-compose up` (MySQL + API).
- [ ] Scripts `dev` (api+web), `build`, `lint`, `test`.
- [x] README com instruções de setup, env vars e comandos.
