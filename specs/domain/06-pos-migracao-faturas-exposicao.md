# Pós-Migração: Faturas, Medição, Exposição

## Objetivo
Registrar dados operacionais pós-migração e monitorar exposição contratual.

## Entidades
- Fatura: {id, clienteId, ucId, tipo(cativa|livre), competencia(YYYY-MM), consumoKwh, demandaKw, encargos, tarifas, tributos, valorTotal, contratoEnergiaId?, criadoEm}
- FaturaArquivo: {id, faturaId, nome, url, tipo(pdf), criadoEm}
- Medicao: {id, clienteId, ucId, competencia, energiaKwh, demandaKw, pontaKwh?, foraPontaKwh?, criadoEm}
- ExposicaoContratual: {id, clienteId, ucId, competencia, volumeContratadoMwh, volumeMedidoMwh, exposicaoAbsolutaMwh, exposicaoPercent, risco(baixo|medio|alto), contratoEnergiaId}

## Regras
- Uma fatura/medição por UC por competência (unicidade).
- Exposição = medido - contratado; risco por thresholds configuráveis.
- Fatura vincula contrato vigente no período.

## Eventos
- FaturaRegistrada, MedicaoRegistrada, ExposicaoCalculada, ExposicaoCritica.
