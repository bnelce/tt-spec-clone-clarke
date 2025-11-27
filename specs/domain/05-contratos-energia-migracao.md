# Contratos de Energia (ACL) e Migração

## Objetivo
Formalizar contratos ACL e acompanhar jornada de migração.

## Entidades — Contratos
- ContratoEnergia: {id, clienteId, comercializadoraId, ucIds[], tipoContrato, vigenciaInicio, vigenciaFim, volumeMwhMes?, volumeMwhAno?, precoR$/Mwh?, formulaPreco?, indexador, periodicidadeReajuste, condicoesEspeciais, status(ativo|futuro|encerrado), observacoes}
- ContratoEnergiaCurvaMensal: {id, contratoId, mesRef, volumeMwh, precoR$/Mwh}
- ContratoEnergiaArquivo: {id, contratoId, nome, url, tipo(pdf_assinado|outros), criadoEm}

## Entidades — Migração
- Migracao: {id, clienteId, ucId, responsavelId, status, criadoEm}
- MigracaoEtapa: {id, migracaoId, nome, ordem, prazoPrevisto?, status, concluidoEm?}
- MigracaoTarefa: {id, migracaoId, etapaId, titulo, descricao?, responsavelId?, prazo?, status, concluidoEm?}
- MigracaoArquivo: {id, migracaoId, nome, url, tipo, criadoEm}

## Regras
- Contrato status derivado de vigência (ativo/futuro/encerrado).
- Alertas de vencimento (3/6/12 meses).
- Migração em etapas configuráveis; tarefas/checklist por etapa.
- Cada UC pode ter uma migração ativa por vez.

## Eventos
- ContratoEnergiaCriado, ContratoEnergiaEncerrado, MigracaoIniciada, EtapaMigracaoConcluida, TarefaMigracaoAtrasada.
