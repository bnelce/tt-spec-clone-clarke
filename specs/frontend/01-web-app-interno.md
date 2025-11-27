# Frontend — App Interno

## Rotas/Páginas (Next App Router)
- /login
- /dashboard (cards: leads, oportunidades, clientes, alertas)
- /leads (lista, filtro, criar/editar, detalhes com notas/arquivos)
- /oportunidades (kanban por etapas, detalhe, mudar etapa)
- /clientes (lista, detalhes com UCs, contratos, migração, honorários)
- /clientes/[id]/ucs (CRUD UC)
- /analises (lista, criar, detalhe com gráficos)
- /propostas (lista/comparador)
- /contratos (lista, detalhe)
- /migracoes (kanban por etapa, detalhe UC)
- /faturas /medicoes (lista, upload)
- /honorarios (contratos gestão, cálculos)
- /alertas

## Componentes-chave
- Layout com sidebar + topbar (user menu, alertas)
- Kanban (oportunidades, migração)
- Tabelas com filtros e paginação (shadcn/ui table)
- Forms (react-hook-form + zod)
- Upload (arquivos)
- Gráficos (cativo vs livre, economia, exposição) — lib a definir (ex: recharts)

## Fluxos
- Criar lead → converter → cliente
- Atualizar etapa de oportunidade (drag/drop)
- Rodar análise de viabilidade (upload ou input manual) → ver resultado
- Registrar proposta e marcar selecionada → criar contrato
- Acompanhar migração por etapas/tarefas
- Lançar fatura/medição → ver exposição
- Gerar cálculo de honorário

## Dados (React Query)
- Query keys por módulo (`['leads']`, `['clientes', id]`, etc.)
- Mutations invalidam listas/detalhes.
- Manejo de loading/error via shadcn/ui feedback.
