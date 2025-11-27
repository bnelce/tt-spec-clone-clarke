# Portal do Cliente — Dashboards e Relatórios

## Objetivo
Permitir que o cliente visualize economia, consumo, contratos e documentos.

## Entidades
- UsuarioCliente: {id, clienteId, nome, email, senhaHash, status(ativo|inativo), criadoEm}
- RelatorioPortal: {id, clienteId, competencia?, tipo(economia|comparativo|exposicao), url, criadoEm}
- DocumentoPortal: {id, clienteId, nome, url, tipo(contrato|laudo|outros), criadoEm}

## Regras
- UsuarioCliente só acessa dados do próprio cliente.
- Histórico de relatórios disponíveis para download.

## Eventos
- UsuarioClienteCriado, RelatorioGerado, DocumentoPublicadoPortal.
