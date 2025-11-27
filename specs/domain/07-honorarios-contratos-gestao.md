# Honorários e Contratos de Gestão

## Objetivo
Gerir contratos de gestão da gestora e calcular honorários.

## Entidades
- ContratoGestao: {id, clienteId, modelo(fixo|percentualEconomia|hibrido|taxaUnica), valorFixo?, percentualEconomia?, taxaUnica?, inicio, fim?, observacoes}
- ModeloHonorario (parametrização adicional se preciso)
- CalculoHonorario: {id, clienteId, contratoGestaoId, competencia, economiaBaseR$, valorHonorarioR$, detalhesCalculo, status}
- RelatorioHonorario: {id, clienteId, competencia, valorTotalR$, geradoPor, criadoEm}

## Regras
- Base de cálculo: economia (cativo vs livre) usando faturas/medições.
- Híbrido = fixo + % economia.
- Taxa única aplicada uma vez no início (flag pago?).
- Um contrato de gestão ativo por cliente por período.

## Eventos
- ContratoGestaoAssinado, CalculoHonorarioGerado, RelatorioHonorarioEmitido.
