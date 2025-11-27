import { TipoNotificacao, Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

async function ensureTipo(codigo: string, descricao: string) {
  let tipo = await prisma.tipoNotificacao.findUnique({ where: { codigo } });
  if (!tipo) {
    tipo = await prisma.tipoNotificacao.create({
      data: { codigo, descricao, canais: "sistema" }
    });
  }
  return tipo;
}

export async function notificarContratoAVencer(contratoId: string, clienteId: string, dias: number) {
  const tipo = await ensureTipo("contrato_a_vencer", "Contrato de energia a vencer");
  await prisma.notificacao.create({
    data: {
      tipoId: tipo.id,
      clienteId,
      referenciaEntidade: "ContratoEnergia",
      referenciaId: contratoId,
      titulo: "Contrato próximo do vencimento",
      mensagem: `Contrato vence em ${dias} dias`
    }
  });
}

export async function notificarMigracaoAtrasada(migracaoId: string, etapaNome: string) {
  const tipo = await ensureTipo("migracao_atrasada", "Migração com atraso");
  await prisma.notificacao.create({
    data: {
      tipoId: tipo.id,
      referenciaEntidade: "Migracao",
      referenciaId: migracaoId,
      titulo: "Etapa de migração atrasada",
      mensagem: `Etapa ${etapaNome} está atrasada`
    }
  });
}

export async function listarNotificacoes(where: Prisma.NotificacaoWhereInput = {}) {
  return prisma.notificacao.findMany({
    where,
    orderBy: { criadoEm: "desc" },
    include: { tipo: true }
  });
}
