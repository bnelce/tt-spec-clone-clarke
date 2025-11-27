# System Architecture — Gestora ACL (single-tenant)

## Contexto
Sistema interno para uma gestora independente do ACL: CRM → Viabilidade → Cotações/Propostas → Contratos → Migração → Pós-migração (faturas/medição/exposição) → Honorários → Portal Cliente.

## Visão Geral
- Frontend interno: Next.js (App Router) + React Query + shadcn/ui.
- Portal cliente: Next.js (mesma app, área separada /auth separada).
- Backend: Fastify + TypeScript + Prisma.
- DB: MySQL (via Docker Compose).
- Auth: JWT + RBAC (perfis internos) + perfis cliente.
- Storage: diretório/app para arquivos (PDFs, uploads).
- Observabilidade: logs de auditoria em tabela; métricas futuras.
- Infra dev: Turborepo (apps/api, apps/web; packages/config, packages/core, packages/ui).

## Bounded Contexts
- CRM & Prospecção
- Clientes & UCs
- Análise de Viabilidade
- Cotações/Propostas & Comercializadoras
- Contratos de Energia (ACL)
- Migração
- Pós-migração (Faturas, Medição, Exposição)
- Financeiro (Honorários/Contratos de Gestão)
- Portal do Cliente
- Alertas/Notificações/Auditoria
- Configurações (Gestora, Usuários)

## Fluxo alto nível
Lead → Oportunidade → Análise de Viabilidade → Propostas/Comparação → Contrato ACL → Jornada de Migração → Pós-migração (fatura/medição/exposição) → Cálculo de Honorários → Portal cliente (dashboards/relatórios).
