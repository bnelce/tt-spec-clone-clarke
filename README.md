# Gestora ACL Monorepo

Sistema interno para uma gestora independente do Mercado Livre de Energia (ACL), seguindo o fluxo Spec → Code:

- **Backend**: Fastify + Prisma + MySQL (Docker).
- **Frontend**: Next.js (App Router) + React Query + shadcn/ui.
- **Monorepo**: Turborepo com pastas `apps/` e `packages/`.
- **Especificações**: `specs/` contém arquitetura, domínio, API e frontend.

## Requisitos

- Node.js 20.x
- npm 10
- Docker + Docker Compose (para banco/API containerizados)

## Instalação

```bash
npm install
```

Em seguida, copie os arquivos de ambiente:

```bash
cp apps/api/.env.example apps/api/.env
```

Atualize `DATABASE_URL` e `JWT_SECRET` conforme necessário.

## Banco de Dados (Prisma + MySQL)

Aplicar migrations e gerar Prisma Client:

```bash
cd apps/api
npm run prisma:migrate
npm run prisma:seed
cd ../../
```

## Scripts principais

```bash
# iniciar apps/api e apps/web em paralelo
npm run dev

# somente API
npm run dev:api

# somente Web
npm run dev:web

# build/lint/test
npm run build
npm run lint
npm run test
```

## Docker Compose

Para subir MySQL + API via containers:

```bash
docker-compose up --build
```

Serviços:

- `db`: MySQL 8 (porta 3306).
- `api`: Fastify (porta 3333) consumindo o DB via `DATABASE_URL`.

## Estrutura

- `apps/api`: Fastify + Prisma + rotas (CRM → Honorários + Portal).
- `apps/web`: Next.js App Router com layout interno e portal.
- `packages/config`: tsconfig/eslint/prettier/tailwind compartilhados.
- `packages/core`: tipos compartilhados.
- `packages/ui`: componentes compartilhados (shadcn base).
- `specs/`: especificações (arch/domain/api/frontend).
- `PLAN.md`: plano de implementação com checkboxes.

## Desenvolvimento

1. Garanta que o banco esteja rodando (Docker ou local).
2. Rode `npm run dev` na raiz para Next.js + Fastify com hot reload.
3. Use `PLAN.md` como guia das próximas tarefas (forms, kanban, testes, alertas adicionais).

## Testes e Qualidade

- Tests ainda não implementados (reservado em `PLAN.md`).
- Quando adicioná-los: `npm run test` no root (turbo orquestra).

## Alertas / Auditoria

- `LogAuditoria` registra CRUDs críticos automaticamente.
- Notificações hiệnte: contratos próximos do vencimento, migrações atrasadas, disponíveis em `/notificacoes`.
- Frontend apresenta badge de alertas no topo (rota `/alertas`).

## Próximos Passos

- Formularios (React Hook Form + zod) para CRUD completo.
- Kanban com drag-and-drop para oportunidades/migrações.
- Hooks/telas para medições e exposição + dashboards com gráficos.
- Testes automatizados e documentação adicional (OpenAPI/opcional).
