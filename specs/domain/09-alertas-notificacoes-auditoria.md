# Alertas, Notificações e Auditoria

## Objetivo
Gerar alertas operacionais e logs de auditoria.

## Entidades
- TipoNotificacao: {id, codigo, descricao, canais(sistema|email), ativo}
- Notificacao: {id, tipoId, referenciaEntidade, referenciaId, usuarioDestinoId?, clienteId?, titulo, mensagem, lida?, criadoEm}
- LogAuditoria: {id, acao, entidade, entidadeId, usuarioId, dataHora, antes?, depois?}

## Regras
- Tipos: contrato a vencer, migração atrasada, exposição alta, falta de fatura.
- Notificações internas; email opcional para internos; resumo opcional a cliente.
- Auditoria para CRUD críticos (clientes, UCs, contratos, faturas, migração, honorários).

## Eventos
- NotificacaoGerada, NotificacaoLida, LogAuditoriaRegistrado.
