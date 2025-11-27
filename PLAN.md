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
- [ ] Implementar modelos `UsuarioInterno`, `UsuarioCliente`, `Papel`.
- [ ] Endpoints `/auth/login` (interno) e `/portal/auth/login` (cliente).
- [ ] Guards por role (Comercial, Analista, Financeiro, Admin) e escopo cliente no portal.
- [ ] Proteções básicas: rate limit em login, expiração de token.

## 4) Vertical Slice 1 — CRM
- [x] Endpoints Leads: CRUD + notas + arquivos + converter para cliente.
- [x] Endpoints Oportunidades: criar/listar (kanban), mudar etapa, histórico.
- [ ] Validações (Zod) conforme specs; paginação em listas (parcial: leads/clientes/ucs).
- [ ] Hooks React Query: `useLeads`, `useOportunidades`; telas Next (lista, formulário, kanban).

## 5) Vertical Slice 2 — Clientes & UCs
- [ ] Endpoints Clientes: CRUD, arquivos.
- [ ] Endpoints UCs: CRUD, import CSV (stub inicial).
- [ ] Integrar com CRM (conversão de lead cria cliente).
- [ ] Hooks `useClientes`, `useUcs`; telas Next (lista/detalhe/CRUD).

## 6) Vertical Slice 3 — Análise de Viabilidade
- [x] Endpoints: criar análise com dados mensais, calcular resultado (rotas `/analises`).
- [ ] Upload/anexos de análise pendente.
- [x] Serviço de cálculo (custo cativo vs livre, economia); payback opcional pendente.
- [ ] Hooks `useAnalises`; telas para input/upload e visualização (gráficos).

## 7) Vertical Slice 4 — Propostas & Contratos de Energia
- [ ] Endpoints Propostas: CRUD, seleção de proposta.
- [ ] Comparador (API + resposta consolidada).
- [ ] Endpoints Contratos Energia: CRUD, arquivos.
- [ ] Hooks `usePropostas`, `useContratos`; telas de lista/detalhe.

## 8) Vertical Slice 5 — Migração
- [ ] Endpoints Migração: criar por UC, etapas, tarefas, arquivos.
- [ ] Kanban de migração; alertas de atraso (persistir notificações).
- [ ] Hooks `useMigracoes`; telas kanban/detalhe.

## 9) Vertical Slice 6 — Pós-Migração (Faturas, Medição, Exposição)
- [ ] Endpoints Faturas: CRUD + upload PDF.
- [ ] Endpoints Medições: CRUD.
- [ ] Endpoint Exposição: calcular e persistir.
- [ ] Hooks `useFaturas`, `useMedicoes`, `useExposicoes`; telas de lista e gráfico básico.

## 10) Vertical Slice 7 — Honorários
- [ ] Endpoints Contratos de Gestão: CRUD.
- [ ] Endpoint Cálculo de Honorário (fixo, % economia, híbrido, taxa única).
- [ ] Endpoint Relatórios de Honorário.
- [ ] Hooks `useHonorarios`; telas de contrato e cálculo.

## 11) Portal do Cliente
- [ ] Endpoints portal: dashboard, relatórios, documentos.
- [ ] Hooks portal (`usePortalDashboard`, `usePortalRelatorios`, `usePortalDocumentos`).
- [ ] Telas portal: login, dashboard, relatórios, documentos. (login/Dashboard esqueleto criados)

## 12) Alertas, Notificações e Auditoria
- [ ] Registrar `LogAuditoria` em CRUD críticos.
- [ ] Persistir `Notificacao` para: contrato a vencer, migração atrasada, exposição alta, falta de fatura.
- [ ] Badge de alertas no topo do app interno.

## 13) UI/UX e Componentes
- [ ] Layout interno (sidebar/topbar), tema da gestora.
- [ ] Formulários com `react-hook-form + zod` e componentes shadcn.
- [ ] Tabelas com filtros/paginação; uploads.
- [ ] Kanban (oportunidades, migração); gráficos (recharts ou similar).

## 14) Testes e Qualidade
- [ ] Backend: testes unit (serviços de cálculo) e integração (rotas principais).
- [ ] Frontend: smoke tests de páginas/hooks críticos.
- [ ] Lint/format no CI; checar paginação e validação em todas as listas.

## 15) DevOps local
- [ ] Validar `docker-compose up` (MySQL + API).
- [ ] Scripts `dev` (api+web), `build`, `lint`, `test`.
- [ ] README com instruções de setup, env vars e comandos.
