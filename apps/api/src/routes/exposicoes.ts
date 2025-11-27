import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { calcularExposicao } from "../services/exposicao";

const requestSchema = z.object({
  clienteId: z.string(),
  ucId: z.string(),
  competencia: z.string(),
  volumeContratadoMwh: z.number(),
  volumeMedidoMwh: z.number(),
  contratoEnergiaId: z.string()
});

export async function exposicaoRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authorize(["admin", "diretor", "analista"]));

  app.get("/exposicoes", async (request) => {
    const querySchema = z.object({
      clienteId: z.string().optional(),
      ucId: z.string().optional(),
      competencia: z.string().optional()
    });
    const { clienteId, ucId, competencia } = querySchema.parse(request.query);
    return prisma.exposicaoContratual.findMany({
      where: {
        ...(clienteId ? { clienteId } : {}),
        ...(ucId ? { ucId } : {}),
        ...(competencia ? { competencia } : {})
      },
      include: { cliente: true, uc: true, contrato: true },
      orderBy: { criadoEm: "desc" }
    });
  });

  app.post("/exposicoes/calcular", async (request) => {
    const body = requestSchema.parse(request.body);
    const { exposicaoAbsolutaMwh, exposicaoPercent, risco } = calcularExposicao(body);
    return prisma.exposicaoContratual.create({
      data: {
        ...body,
        exposicaoAbsolutaMwh,
        exposicaoPercent,
        risco
      }
    });
  });
}
