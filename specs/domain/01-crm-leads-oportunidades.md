# CRM — Leads & Oportunidades

## Objetivo
Gerir prospecção e funil de vendas até conversão em cliente e contrato.

## Entidades
- Lead: {id, nomeFantasia, cnpj, contatoNome, contatoCargo, email, telefone, segmento, origem, status(novo|qualificação|descartado), observacoes, criadoEm}
- LeadAnotacao: {id, leadId, autorId, texto, criadoEm}
- LeadArquivo: {id, leadId, nome, url, tipo, criadoEm}
- Oportunidade: {id, empresaRef(leadId|clienteId), valorPotencial, responsavelId, etapaId, probabilidade?, dataEstimativaFechamento?, motivoPerda?, criadoEm}
- OportunidadeEtapa: {id, nome, ordem, ativo}
- OportunidadeHistorico: {id, oportunidadeId, etapaIdAnterior?, etapaIdAtual, usuarioId, motivo?, criadoEm}

## Regras
- Lead convertível em Cliente; ao converter, mantém histórico/anexos.
- Oportunidade só pode estar em uma etapa; transição registra histórico.
- Marcar como Ganha: cria Cliente se origem lead; vincula cliente se já existir.
- Marcar como Perdida: motivo obrigatório.
- Kanban por etapas padrão (configuráveis).

## Eventos
- LeadCriado, LeadConvertidoEmCliente, OportunidadeCriada, EtapaAtualizada, OportunidadeGanha, OportunidadePerdida.

