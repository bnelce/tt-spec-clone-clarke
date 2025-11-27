import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

const medicaoSchema = z.object({
  clienteId: z.string(),
  ucId: z.string(),
  competencia: z.string(),
  energiaKwh: z.number(),
  demandaKw: z.number().optional(),
  pontaKwh: z.number().optional(),
  foraPontaKwh: z.number().optional()
});

export async function medicaoRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authorize(["admin", "diretor", "analista", "financeiro"]));

  app.get("/medicoes", async (request) => {
    const querySchema = z.object({
      clienteId: z.string().optional(),
      ucId: z.string().optional(),
      competencia: z.string().optional()
    });
    const { clienteId, ucId, competencia } = querySchema.parse(request.query);
    return prisma.medicao.findMany({
      where: {
        ...(clienteId ? { clienteId } : {}),
        ...(ucId ? { ucId } : {}),
        ...(competencia ? { competencia } : {})
      },
      include: { cliente: true, uc: true },
      orderBy: { criadoEm: "desc" }
    });
  });

  app.post("/medicoes", async (request) => {
    const body = medicaoSchema.parse(request.body);
    return prisma.medicao.create({ data: body });
  });
}
