# Cotações, Propostas e Comercializadoras

## Objetivo
Cadastrar fornecedores e propostas, comparar e selecionar para contrato.

## Entidades
- Comercializadora: {id, nome, cnpj, contatoComercial, contatoOperacional, observacoes}
- PropostaEnergia: {id, clienteId?, ucIds[], comercializadoraId, tipoContrato, volumeMwhMes?, volumeMwhAno?, precoBaseR$/Mwh, indexador, fonte, vigenciaInicio, vigenciaFim, oportunidadeId?, observacoes, selecionada?}
- PropostaEnergiaCurva: {id, propostaId, mesRef, volumeMwh, precoR$/Mwh}
- RelatorioComparacaoPropostas (registro histórico): {id, clienteId, ucIds[], propostaIds[], geradoPor, criadoEm}

## Regras
- Proposta vinculável a oportunidade.
- Apenas uma “selecionada” por negociação específica.
- Curva opcional; se ausente, usa preço base.

## Eventos
- ComercializadoraCadastrada, PropostaCadastrada, PropostaSelecionada, RelatorioComparativoGerado.
