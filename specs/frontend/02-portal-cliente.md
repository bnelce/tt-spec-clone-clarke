# Frontend — Portal do Cliente

## Rotas/Páginas
- /portal/login
- /portal/dashboard (cards: economia acumulada, custo médio, consumo histórico, exposição simplificada, contratos vigentes)
- /portal/relatorios (listar/baixar)
- /portal/documentos (listar/baixar)

## Componentes
- Layout portal (brand da gestora)
- Filtros de período
- Gráficos simples (economia vs tempo, consumo)
- Listas de contratos e documentos

## Fluxos
- Login cliente -> token
- Ver dashboard com filtros de período
- Baixar relatório PDF
- Baixar documentos (contratos, laudos)

## Dados (React Query)
- Query keys: `['portal','dashboard',periodo]`, `['portal','relatorios']`, `['portal','documentos']`
- Mutations: geração de relatório on-demand (se habilitado)
- Auth header com token cliente.
