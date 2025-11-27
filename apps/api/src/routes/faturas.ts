import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { registrarAuditoria } from "../services/auditoria";

const faturaSchema = z.object({
  clienteId: z.string(),
  ucId: z.string(),
  tipo: z.enum(["cativa", "livre"]),
  competencia: z.string(),
  consumoKwh: z.number(),
  demandaKw: z.number().optional(),
  encargos: z.number().optional(),
  tarifas: z.number().optional(),
  tributos: z.number().optional(),
  valorTotal: z.number(),
  contratoEnergiaId: z.string().optional()
});

export async function faturaRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authorize(["admin", "diretor", "analista", "financeiro"]));

  app.get("/faturas", async (request) => {
    const querySchema = z.object({
      clienteId: z.string().optional(),
      ucId: z.string().optional(),
      competencia: z.string().optional()
    });
    const { clienteId, ucId, competencia } = querySchema.parse(request.query);
    return prisma.fatura.findMany({
      where: {
        ...(clienteId ? { clienteId } : {}),
        ...(ucId ? { ucId } : {}),
        ...(competencia ? { competencia } : {})
      },
      include: { cliente: true, uc: true, contrato: true },
      orderBy: { criadoEm: "desc" }
    });
  });

  app.get("/faturas/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const fatura = await prisma.fatura.findUnique({
      where: { id: params.id },
      include: { arquivos: true, cliente: true, uc: true }
    });
    if (!fatura) return reply.code(404).send({ message: "Fatura não encontrada" });
    return fatura;
  });

  app.post("/faturas", async (request) => {
    const body = faturaSchema.parse(request.body);
    const fatura = await prisma.fatura.create({ data: body });
    await registrarAuditoria({
      acao: "create",
      entidade: "Fatura",
      entidadeId: fatura.id,
      usuarioId: request.user?.sub,
      depois: fatura
    });
    return fatura;
  });

  app.put("/faturas/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = faturaSchema.partial().parse(request.body);
    const exists = await prisma.fatura.findUnique({ where: { id: params.id } });
    if (!exists) return reply.code(404).send({ message: "Fatura não encontrada" });
    const fatura = await prisma.fatura.update({ where: { id: params.id }, data: body });
    await registrarAuditoria({
      acao: "update",
      entidade: "Fatura",
      entidadeId: fatura.id,
      usuarioId: request.user?.sub,
      antes: exists,
      depois: fatura
    });
    return fatura;
  });

  app.post("/faturas/:id/arquivos", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = z.object({ nome: z.string(), url: z.string().url(), tipo: z.string().optional() }).parse(request.body);
    const fatura = await prisma.fatura.findUnique({ where: { id: params.id } });
    if (!fatura) return reply.code(404).send({ message: "Fatura não encontrada" });
    const arquivo = await prisma.faturaArquivo.create({
      data: { faturaId: params.id, nome: body.nome, url: body.url, tipo: body.tipo }
    });
    await registrarAuditoria({
      acao: "upload",
      entidade: "FaturaArquivo",
      entidadeId: arquivo.id,
      usuarioId: request.user?.sub,
      depois: arquivo
    });
    return arquivo;
  });
}
