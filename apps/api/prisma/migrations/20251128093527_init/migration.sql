-- CreateTable
CREATE TABLE `UsuarioInterno` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senhaHash` VARCHAR(191) NOT NULL,
    `papel` ENUM('admin', 'diretor', 'comercial', 'analista', 'financeiro') NOT NULL,
    `status` ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UsuarioInterno_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsuarioCliente` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senhaHash` VARCHAR(191) NOT NULL,
    `status` ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UsuarioCliente_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gestora` (
    `id` VARCHAR(191) NOT NULL,
    `nomeFantasia` VARCHAR(191) NOT NULL,
    `razaoSocial` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NULL,
    `contato` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GestoraConfig` (
    `id` VARCHAR(191) NOT NULL,
    `gestoraId` VARCHAR(191) NOT NULL,
    `timezone` VARCHAR(191) NULL,
    `idioma` VARCHAR(191) NULL DEFAULT 'pt-BR',
    `moeda` VARCHAR(191) NULL DEFAULT 'BRL',
    `logoUrl` VARCHAR(191) NULL,
    `corPrimaria` VARCHAR(191) NULL,

    UNIQUE INDEX `GestoraConfig_gestoraId_key`(`gestoraId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lead` (
    `id` VARCHAR(191) NOT NULL,
    `nomeFantasia` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `contatoNome` VARCHAR(191) NULL,
    `contatoCargo` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `telefone` VARCHAR(191) NULL,
    `segmento` VARCHAR(191) NULL,
    `origem` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'novo',
    `observacoes` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeadAnotacao` (
    `id` VARCHAR(191) NOT NULL,
    `leadId` VARCHAR(191) NOT NULL,
    `autorId` VARCHAR(191) NOT NULL,
    `texto` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeadArquivo` (
    `id` VARCHAR(191) NOT NULL,
    `leadId` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OportunidadeEtapa` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `ordem` INTEGER NOT NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Oportunidade` (
    `id` VARCHAR(191) NOT NULL,
    `leadId` VARCHAR(191) NULL,
    `clienteId` VARCHAR(191) NULL,
    `valorPotencial` DOUBLE NULL,
    `responsavelId` VARCHAR(191) NULL,
    `etapaId` VARCHAR(191) NOT NULL,
    `probabilidade` DOUBLE NULL,
    `dataEstimativaFechamento` DATETIME(3) NULL,
    `motivoPerda` VARCHAR(191) NULL,
    `observacoes` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OportunidadeHistorico` (
    `id` VARCHAR(191) NOT NULL,
    `oportunidadeId` VARCHAR(191) NOT NULL,
    `etapaAnterior` VARCHAR(191) NULL,
    `etapaAtual` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `motivo` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `id` VARCHAR(191) NOT NULL,
    `razaoSocial` VARCHAR(191) NOT NULL,
    `nomeFantasia` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `segmento` VARCHAR(191) NULL,
    `endereco` VARCHAR(191) NULL,
    `contatoNome` VARCHAR(191) NULL,
    `contatoEmail` VARCHAR(191) NULL,
    `contatoTelefone` VARCHAR(191) NULL,
    `observacoes` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Cliente_cnpj_key`(`cnpj`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClienteArquivo` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UC` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `distribuidora` VARCHAR(191) NULL,
    `submercado` VARCHAR(191) NULL,
    `modalidadeTarifaria` VARCHAR(191) NULL,
    `tensao` VARCHAR(191) NULL,
    `demandaContratadaKw` DOUBLE NULL,
    `consumoMedioKwhMes` DOUBLE NULL,
    `cidade` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NULL,
    `observacoes` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UCArquivo` (
    `id` VARCHAR(191) NOT NULL,
    `ucId` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnaliseViabilidade` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NULL,
    `ucId` VARCHAR(191) NULL,
    `oportunidadeId` VARCHAR(191) NULL,
    `periodoMeses` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'criada',
    `criadoPorId` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnaliseViabilidadeMes` (
    `id` VARCHAR(191) NOT NULL,
    `analiseId` VARCHAR(191) NOT NULL,
    `mesRef` VARCHAR(191) NOT NULL,
    `consumoKwh` DOUBLE NOT NULL,
    `demandaKw` DOUBLE NOT NULL,
    `tarifaTe` DOUBLE NULL,
    `tarifaTusd` DOUBLE NULL,
    `impostos` DOUBLE NULL,
    `tipoTarifa` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnaliseViabilidadeResultado` (
    `id` VARCHAR(191) NOT NULL,
    `analiseId` VARCHAR(191) NOT NULL,
    `custoCativoProj` DOUBLE NOT NULL,
    `custoLivreProj` DOUBLE NOT NULL,
    `economiaEstimativa` DOUBLE NOT NULL,
    `economiaPercent` DOUBLE NOT NULL,
    `paybackMeses` DOUBLE NULL,
    `premissasPreco` VARCHAR(191) NULL,

    UNIQUE INDEX `AnaliseViabilidadeResultado_analiseId_key`(`analiseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnaliseViabilidadeArquivo` (
    `id` VARCHAR(191) NOT NULL,
    `analiseId` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comercializadora` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NULL,
    `contatoComercial` VARCHAR(191) NULL,
    `contatoOperacional` VARCHAR(191) NULL,
    `observacoes` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropostaEnergia` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NULL,
    `ucIds` VARCHAR(191) NULL,
    `comercializadoraId` VARCHAR(191) NOT NULL,
    `tipoContrato` VARCHAR(191) NULL,
    `volumeMwhMes` DOUBLE NULL,
    `volumeMwhAno` DOUBLE NULL,
    `precoBase` DOUBLE NULL,
    `indexador` VARCHAR(191) NULL,
    `fonte` VARCHAR(191) NULL,
    `vigenciaInicio` DATETIME(3) NULL,
    `vigenciaFim` DATETIME(3) NULL,
    `oportunidadeId` VARCHAR(191) NULL,
    `observacoes` VARCHAR(191) NULL,
    `selecionada` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropostaEnergiaCurva` (
    `id` VARCHAR(191) NOT NULL,
    `propostaId` VARCHAR(191) NOT NULL,
    `mesRef` VARCHAR(191) NOT NULL,
    `volumeMwh` DOUBLE NOT NULL,
    `preco` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContratoEnergia` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NOT NULL,
    `comercializadoraId` VARCHAR(191) NOT NULL,
    `ucIds` VARCHAR(191) NULL,
    `tipoContrato` VARCHAR(191) NULL,
    `vigenciaInicio` DATETIME(3) NOT NULL,
    `vigenciaFim` DATETIME(3) NOT NULL,
    `volumeMwhMes` DOUBLE NULL,
    `volumeMwhAno` DOUBLE NULL,
    `preco` DOUBLE NULL,
    `formulaPreco` VARCHAR(191) NULL,
    `indexador` VARCHAR(191) NULL,
    `periodicidadeReajuste` VARCHAR(191) NULL,
    `condicoesEspeciais` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'futuro',
    `observacoes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContratoEnergiaCurvaMensal` (
    `id` VARCHAR(191) NOT NULL,
    `contratoId` VARCHAR(191) NOT NULL,
    `mesRef` VARCHAR(191) NOT NULL,
    `volumeMwh` DOUBLE NOT NULL,
    `preco` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContratoEnergiaArquivo` (
    `id` VARCHAR(191) NOT NULL,
    `contratoId` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Migracao` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NOT NULL,
    `ucId` VARCHAR(191) NOT NULL,
    `responsavelId` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'em_andamento',
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MigracaoEtapa` (
    `id` VARCHAR(191) NOT NULL,
    `migracaoId` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `ordem` INTEGER NOT NULL,
    `prazoPrevisto` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pendente',
    `concluidoEm` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MigracaoTarefa` (
    `id` VARCHAR(191) NOT NULL,
    `migracaoId` VARCHAR(191) NOT NULL,
    `etapaId` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `responsavelId` VARCHAR(191) NULL,
    `prazo` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pendente',
    `concluidoEm` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MigracaoArquivo` (
    `id` VARCHAR(191) NOT NULL,
    `migracaoId` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fatura` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NOT NULL,
    `ucId` VARCHAR(191) NOT NULL,
    `tipo` ENUM('cativa', 'livre') NOT NULL,
    `competencia` VARCHAR(191) NOT NULL,
    `consumoKwh` DOUBLE NOT NULL,
    `demandaKw` DOUBLE NULL,
    `encargos` DOUBLE NULL,
    `tarifas` DOUBLE NULL,
    `tributos` DOUBLE NULL,
    `valorTotal` DOUBLE NOT NULL,
    `contratoEnergiaId` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FaturaArquivo` (
    `id` VARCHAR(191) NOT NULL,
    `faturaId` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medicao` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NOT NULL,
    `ucId` VARCHAR(191) NOT NULL,
    `competencia` VARCHAR(191) NOT NULL,
    `energiaKwh` DOUBLE NOT NULL,
    `demandaKw` DOUBLE NULL,
    `pontaKwh` DOUBLE NULL,
    `foraPontaKwh` DOUBLE NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExposicaoContratual` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NOT NULL,
    `ucId` VARCHAR(191) NOT NULL,
    `competencia` VARCHAR(191) NOT NULL,
    `volumeContratadoMwh` DOUBLE NOT NULL,
    `volumeMedidoMwh` DOUBLE NOT NULL,
    `exposicaoAbsolutaMwh` DOUBLE NOT NULL,
    `exposicaoPercent` DOUBLE NOT NULL,
    `risco` ENUM('baixo', 'medio', 'alto') NOT NULL,
    `contratoEnergiaId` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContratoGestao` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NOT NULL,
    `modelo` ENUM('fixo', 'percentualEconomia', 'hibrido', 'taxaUnica') NOT NULL,
    `valorFixo` DOUBLE NULL,
    `percentualEconomia` DOUBLE NULL,
    `taxaUnica` DOUBLE NULL,
    `inicio` DATETIME(3) NOT NULL,
    `fim` DATETIME(3) NULL,
    `observacoes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CalculoHonorario` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NOT NULL,
    `contratoGestaoId` VARCHAR(191) NOT NULL,
    `competencia` VARCHAR(191) NOT NULL,
    `economiaBase` DOUBLE NULL,
    `valorHonorario` DOUBLE NOT NULL,
    `detalhesCalculo` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'gerado',
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RelatorioHonorario` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NOT NULL,
    `competencia` VARCHAR(191) NOT NULL,
    `valorTotal` DOUBLE NOT NULL,
    `geradoPorId` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `url` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RelatorioPortal` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NOT NULL,
    `competencia` VARCHAR(191) NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentoPortal` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoNotificacao` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `canais` VARCHAR(191) NOT NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `TipoNotificacao_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notificacao` (
    `id` VARCHAR(191) NOT NULL,
    `tipoId` VARCHAR(191) NOT NULL,
    `referenciaEntidade` VARCHAR(191) NULL,
    `referenciaId` VARCHAR(191) NULL,
    `usuarioDestinoId` VARCHAR(191) NULL,
    `clienteId` VARCHAR(191) NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `mensagem` VARCHAR(191) NOT NULL,
    `lida` BOOLEAN NOT NULL DEFAULT false,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LogAuditoria` (
    `id` VARCHAR(191) NOT NULL,
    `acao` VARCHAR(191) NOT NULL,
    `entidade` VARCHAR(191) NOT NULL,
    `entidadeId` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NULL,
    `dataHora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `antes` VARCHAR(191) NULL,
    `depois` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsuarioCliente` ADD CONSTRAINT `UsuarioCliente_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GestoraConfig` ADD CONSTRAINT `GestoraConfig_gestoraId_fkey` FOREIGN KEY (`gestoraId`) REFERENCES `Gestora`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeadAnotacao` ADD CONSTRAINT `LeadAnotacao_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Lead`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeadAnotacao` ADD CONSTRAINT `LeadAnotacao_autorId_fkey` FOREIGN KEY (`autorId`) REFERENCES `UsuarioInterno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeadArquivo` ADD CONSTRAINT `LeadArquivo_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Lead`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oportunidade` ADD CONSTRAINT `Oportunidade_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Lead`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oportunidade` ADD CONSTRAINT `Oportunidade_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oportunidade` ADD CONSTRAINT `Oportunidade_responsavelId_fkey` FOREIGN KEY (`responsavelId`) REFERENCES `UsuarioInterno`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oportunidade` ADD CONSTRAINT `Oportunidade_etapaId_fkey` FOREIGN KEY (`etapaId`) REFERENCES `OportunidadeEtapa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OportunidadeHistorico` ADD CONSTRAINT `OportunidadeHistorico_oportunidadeId_fkey` FOREIGN KEY (`oportunidadeId`) REFERENCES `Oportunidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OportunidadeHistorico` ADD CONSTRAINT `OportunidadeHistorico_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `UsuarioInterno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClienteArquivo` ADD CONSTRAINT `ClienteArquivo_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UC` ADD CONSTRAINT `UC_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UCArquivo` ADD CONSTRAINT `UCArquivo_ucId_fkey` FOREIGN KEY (`ucId`) REFERENCES `UC`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnaliseViabilidade` ADD CONSTRAINT `AnaliseViabilidade_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnaliseViabilidade` ADD CONSTRAINT `AnaliseViabilidade_ucId_fkey` FOREIGN KEY (`ucId`) REFERENCES `UC`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnaliseViabilidade` ADD CONSTRAINT `AnaliseViabilidade_oportunidadeId_fkey` FOREIGN KEY (`oportunidadeId`) REFERENCES `Oportunidade`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnaliseViabilidade` ADD CONSTRAINT `AnaliseViabilidade_criadoPorId_fkey` FOREIGN KEY (`criadoPorId`) REFERENCES `UsuarioInterno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnaliseViabilidadeMes` ADD CONSTRAINT `AnaliseViabilidadeMes_analiseId_fkey` FOREIGN KEY (`analiseId`) REFERENCES `AnaliseViabilidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnaliseViabilidadeResultado` ADD CONSTRAINT `AnaliseViabilidadeResultado_analiseId_fkey` FOREIGN KEY (`analiseId`) REFERENCES `AnaliseViabilidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnaliseViabilidadeArquivo` ADD CONSTRAINT `AnaliseViabilidadeArquivo_analiseId_fkey` FOREIGN KEY (`analiseId`) REFERENCES `AnaliseViabilidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropostaEnergia` ADD CONSTRAINT `PropostaEnergia_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropostaEnergia` ADD CONSTRAINT `PropostaEnergia_comercializadoraId_fkey` FOREIGN KEY (`comercializadoraId`) REFERENCES `Comercializadora`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropostaEnergia` ADD CONSTRAINT `PropostaEnergia_oportunidadeId_fkey` FOREIGN KEY (`oportunidadeId`) REFERENCES `Oportunidade`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropostaEnergiaCurva` ADD CONSTRAINT `PropostaEnergiaCurva_propostaId_fkey` FOREIGN KEY (`propostaId`) REFERENCES `PropostaEnergia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContratoEnergia` ADD CONSTRAINT `ContratoEnergia_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContratoEnergia` ADD CONSTRAINT `ContratoEnergia_comercializadoraId_fkey` FOREIGN KEY (`comercializadoraId`) REFERENCES `Comercializadora`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContratoEnergiaCurvaMensal` ADD CONSTRAINT `ContratoEnergiaCurvaMensal_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `ContratoEnergia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContratoEnergiaArquivo` ADD CONSTRAINT `ContratoEnergiaArquivo_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `ContratoEnergia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Migracao` ADD CONSTRAINT `Migracao_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Migracao` ADD CONSTRAINT `Migracao_ucId_fkey` FOREIGN KEY (`ucId`) REFERENCES `UC`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Migracao` ADD CONSTRAINT `Migracao_responsavelId_fkey` FOREIGN KEY (`responsavelId`) REFERENCES `UsuarioInterno`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MigracaoEtapa` ADD CONSTRAINT `MigracaoEtapa_migracaoId_fkey` FOREIGN KEY (`migracaoId`) REFERENCES `Migracao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MigracaoTarefa` ADD CONSTRAINT `MigracaoTarefa_migracaoId_fkey` FOREIGN KEY (`migracaoId`) REFERENCES `Migracao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MigracaoTarefa` ADD CONSTRAINT `MigracaoTarefa_etapaId_fkey` FOREIGN KEY (`etapaId`) REFERENCES `MigracaoEtapa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MigracaoTarefa` ADD CONSTRAINT `MigracaoTarefa_responsavelId_fkey` FOREIGN KEY (`responsavelId`) REFERENCES `UsuarioInterno`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MigracaoArquivo` ADD CONSTRAINT `MigracaoArquivo_migracaoId_fkey` FOREIGN KEY (`migracaoId`) REFERENCES `Migracao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fatura` ADD CONSTRAINT `Fatura_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fatura` ADD CONSTRAINT `Fatura_ucId_fkey` FOREIGN KEY (`ucId`) REFERENCES `UC`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fatura` ADD CONSTRAINT `Fatura_contratoEnergiaId_fkey` FOREIGN KEY (`contratoEnergiaId`) REFERENCES `ContratoEnergia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FaturaArquivo` ADD CONSTRAINT `FaturaArquivo_faturaId_fkey` FOREIGN KEY (`faturaId`) REFERENCES `Fatura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medicao` ADD CONSTRAINT `Medicao_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medicao` ADD CONSTRAINT `Medicao_ucId_fkey` FOREIGN KEY (`ucId`) REFERENCES `UC`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExposicaoContratual` ADD CONSTRAINT `ExposicaoContratual_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExposicaoContratual` ADD CONSTRAINT `ExposicaoContratual_ucId_fkey` FOREIGN KEY (`ucId`) REFERENCES `UC`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExposicaoContratual` ADD CONSTRAINT `ExposicaoContratual_contratoEnergiaId_fkey` FOREIGN KEY (`contratoEnergiaId`) REFERENCES `ContratoEnergia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContratoGestao` ADD CONSTRAINT `ContratoGestao_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CalculoHonorario` ADD CONSTRAINT `CalculoHonorario_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CalculoHonorario` ADD CONSTRAINT `CalculoHonorario_contratoGestaoId_fkey` FOREIGN KEY (`contratoGestaoId`) REFERENCES `ContratoGestao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RelatorioHonorario` ADD CONSTRAINT `RelatorioHonorario_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RelatorioHonorario` ADD CONSTRAINT `RelatorioHonorario_geradoPorId_fkey` FOREIGN KEY (`geradoPorId`) REFERENCES `UsuarioInterno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RelatorioPortal` ADD CONSTRAINT `RelatorioPortal_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentoPortal` ADD CONSTRAINT `DocumentoPortal_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notificacao` ADD CONSTRAINT `Notificacao_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `TipoNotificacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notificacao` ADD CONSTRAINT `Notificacao_usuarioDestinoId_fkey` FOREIGN KEY (`usuarioDestinoId`) REFERENCES `UsuarioInterno`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notificacao` ADD CONSTRAINT `Notificacao_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LogAuditoria` ADD CONSTRAINT `LogAuditoria_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `UsuarioInterno`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
