import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

const propostaSchema = z.object({
  clienteId: z.string().optional(),
  ucIds: z.array(z.string()).optional(),
  comercializadoraId: z.string(),
  tipoContrato: z.string().optional(),
  volumeMwhMes: z.number().optional(),
  volumeMwhAno: z.number().optional(),
  precoBase: z.number().optional(),
  indexador: z.string().optional(),
  fonte: z.string().optional(),
  vigenciaInicio: z.string().datetime().optional(),
  vigenciaFim: z.string().datetime().optional(),
  oportunidadeId: z.string().optional(),
  observacoes: z.string().optional(),
  selecionada: z.boolean().optional(),
  curvas: z
    .array(
      z.object({
        mesRef: z.string(),
        volumeMwh: z.number(),
        preco: z.number()
      })
    )
    .optional()
});

export async function propostaRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authorize(["admin", "diretor", "analista", "comercial"]));

  app.get("/propostas", async (request) => {
    const querySchema = z.object({
      clienteId: z.string().optional(),
      oportunidadeId: z.string().optional()
    });
    const { clienteId, oportunidadeId } = querySchema.parse(request.query);
    return prisma.propostaEnergia.findMany({
      where: {
        ...(clienteId ? { clienteId } : {}),
        ...(oportunidadeId ? { oportunidadeId } : {})
      },
      include: { comercializadora: true, curvas: true },
      orderBy: { createdAt: "desc" }
    });
  });

  app.post("/propostas", async (request) => {
    const body = propostaSchema.parse(request.body);
    return prisma.propostaEnergia.create({
      data: {
        ...body,
        ucIds: body.ucIds?.join(","),
        curvas: body.curvas
          ? {
              createMany: {
                data: body.curvas
              }
            }
          : undefined
      }
    });
  });

  app.put("/propostas/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = propostaSchema.partial().parse(request.body);
    const proposta = await prisma.propostaEnergia.findUnique({ where: { id: params.id } });
    if (!proposta) return reply.code(404).send({ message: "Proposta não encontrada" });
    return prisma.propostaEnergia.update({
      where: { id: params.id },
      data: {
        ...body,
        ucIds: body.ucIds ? body.ucIds.join(",") : proposta.ucIds,
        curvas: body.curvas
          ? {
              deleteMany: {},
              createMany: { data: body.curvas }
            }
          : undefined
      }
    });
  });

  app.post("/propostas/:id/selecionar", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const proposta = await prisma.propostaEnergia.findUnique({ where: { id: params.id } });
    if (!proposta) return reply.code(404).send({ message: "Proposta não encontrada" });

    if (proposta.oportunidadeId) {
      await prisma.propostaEnergia.updateMany({
        where: { oportunidadeId: proposta.oportunidadeId },
        data: { selecionada: false }
      });
    }

    await prisma.propostaEnergia.update({
      where: { id: params.id },
      data: { selecionada: true }
    });

    return { ok: true };
  });

  app.post("/propostas/comparar", async (request) => {
    const body = z.object({ propostaIds: z.array(z.string()).min(2) }).parse(request.body);
    const propostas = await prisma.propostaEnergia.findMany({
      where: { id: { in: body.propostaIds } },
      include: { comercializadora: true, curvas: true }
    });
    return {
      total: propostas.length,
      propostas
    };
  });
}
