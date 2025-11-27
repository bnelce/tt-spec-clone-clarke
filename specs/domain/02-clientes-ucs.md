# Clientes & Unidades Consumidoras

## Objetivo
Cadastro de empresas clientes e suas UCs, com vínculos a fluxos de energia e faturamento.

## Entidades
- Cliente: {id, razaoSocial, nomeFantasia, cnpj, segmento, endereco, contatoNome, contatoEmail, contatoTelefone, observacoes, criadoEm}
- ClienteArquivo: {id, clienteId, nome, url, tipo, criadoEm}
- UC: {id, clienteId, codigo, distribuidora, submercado, modalidadeTarifaria, tensao, demandaContratadaKw, consumoMedioKwhMes, cidade, estado, observacoes, criadoEm}
- UCTarifaPerfil? (opcional futuro)
- UCArquivo: {id, ucId, nome, url, tipo, criadoEm}

## Regras
- Cliente CNPJ único.
- UC código único por cliente.
- UC vincula-se a análises, migrações, contratos, faturas, medições.
- Importação em lote via CSV/Excel.

## Eventos
- ClienteCriado, UCCriada, UCAtualizada, UCImportada.
