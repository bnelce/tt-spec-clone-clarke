import { prisma } from "../lib/prisma";

interface AuditParams {
  acao: string;
  entidade: string;
  entidadeId: string;
  usuarioId?: string;
  antes?: unknown;
  depois?: unknown;
}

export async function registrarAuditoria({
  acao,
  entidade,
  entidadeId,
  usuarioId,
  antes,
  depois
}: AuditParams) {
  await prisma.logAuditoria.create({
    data: {
      acao,
      entidade,
      entidadeId,
      usuarioId,
      antes: antes ? JSON.stringify(antes) : undefined,
      depois: depois ? JSON.stringify(depois) : undefined
    }
  });
}
