import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

const createSchema = z.object({
  leadId: z.string().optional(),
  clienteId: z.string().optional(),
  valorPotencial: z.number().optional(),
  responsavelId: z.string().optional(),
  etapaId: z.string(),
  probabilidade: z.number().min(0).max(1).optional(),
  dataEstimativaFechamento: z.string().datetime().optional(),
  observacoes: z.string().optional()
});

export async function oportunidadeRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authorize(["admin", "diretor", "comercial"]));

  app.get("/oportunidades", async (request) => {
    const etapaId = (request.query as any).etapaId as string | undefined;
    const responsavelId = (request.query as any).responsavelId as string | undefined;
    const where = {
      ...(etapaId ? { etapaId } : {}),
      ...(responsavelId ? { responsavelId } : {})
    };
    const oportunidades = await prisma.oportunidade.findMany({
      where,
      include: {
        etapa: true,
        lead: true,
        cliente: true
      },
      orderBy: { criadoEm: "desc" }
    });
    return oportunidades;
  });

  app.post("/oportunidades", async (request) => {
    const body = createSchema.parse(request.body);
    return prisma.oportunidade.create({ data: body });
  });

  app.get("/oportunidades/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const oportunidade = await prisma.oportunidade.findUnique({
      where: { id: params.id },
      include: {
        etapa: true,
        historico: true,
        lead: true,
        cliente: true
      }
    });
    if (!oportunidade) return reply.code(404).send({ message: "Oportunidade não encontrada" });
    return oportunidade;
  });

  app.patch("/oportunidades/:id/etapa", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = z.object({ etapaId: z.string(), motivoPerda: z.string().optional() }).parse(request.body);
    const oportunidade = await prisma.oportunidade.findUnique({ where: { id: params.id } });
    if (!oportunidade) return reply.code(404).send({ message: "Oportunidade não encontrada" });

    await prisma.$transaction([
      prisma.oportunidade.update({
        where: { id: params.id },
        data: { etapaId: body.etapaId, motivoPerda: body.motivoPerda }
      }),
      prisma.oportunidadeHistorico.create({
        data: {
          oportunidadeId: params.id,
          etapaAnterior: oportunidade.etapaId,
          etapaAtual: body.etapaId,
          usuarioId: request.user!.sub,
          motivo: body.motivoPerda
        }
      })
    ]);

    return { ok: true };
  });

  app.delete("/oportunidades/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    await prisma.oportunidade.delete({ where: { id: params.id } });
    return reply.code(204).send();
  });
}
