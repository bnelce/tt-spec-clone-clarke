import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { registrarAuditoria } from "../services/auditoria";

const ucSchema = z.object({
  clienteId: z.string(),
  codigo: z.string(),
  distribuidora: z.string().optional(),
  submercado: z.string().optional(),
  modalidadeTarifaria: z.string().optional(),
  tensao: z.string().optional(),
  demandaContratadaKw: z.number().optional(),
  consumoMedioKwhMes: z.number().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  observacoes: z.string().optional()
});

export async function ucRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authorize(["admin", "diretor", "comercial", "analista"]));

  app.get("/ucs", async (request) => {
    const page = Number((request.query as any).page ?? 1);
    const pageSize = Number((request.query as any).pageSize ?? 20);
    const clienteId = (request.query as any).clienteId as string | undefined;
    const where = clienteId ? { clienteId } : {};
    const skip = (page - 1) * pageSize;
    const [data, total] = await Promise.all([
      prisma.uC.findMany({ where, skip, take: pageSize, orderBy: { criadoEm: "desc" } }),
      prisma.uC.count({ where })
    ]);
    return { data, page, pageSize, total };
  });

  app.get("/ucs/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const uc = await prisma.uC.findUnique({ where: { id: params.id } });
    if (!uc) return reply.code(404).send({ message: "UC não encontrada" });
    return uc;
  });

  app.post("/ucs", async (request) => {
    const body = ucSchema.parse(request.body);
    const uc = await prisma.uC.create({ data: body });
    await registrarAuditoria({
      acao: "create",
      entidade: "UC",
      entidadeId: uc.id,
      usuarioId: request.user?.sub,
      depois: uc
    });
    return uc;
  });

  app.put("/ucs/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = ucSchema.partial().parse(request.body);
    const exists = await prisma.uC.findUnique({ where: { id: params.id } });
    if (!exists) return reply.code(404).send({ message: "UC não encontrada" });
    const uc = await prisma.uC.update({ where: { id: params.id }, data: body });
    await registrarAuditoria({
      acao: "update",
      entidade: "UC",
      entidadeId: uc.id,
      usuarioId: request.user?.sub,
      antes: exists,
      depois: uc
    });
    return uc;
  });

  app.delete("/ucs/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const uc = await prisma.uC.delete({ where: { id: params.id } });
    await registrarAuditoria({
      acao: "delete",
      entidade: "UC",
      entidadeId: uc.id,
      usuarioId: request.user?.sub,
      antes: uc
    });
    return reply.code(204).send();
  });
}
