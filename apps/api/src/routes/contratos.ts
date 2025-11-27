import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

const contratoSchema = z.object({
  clienteId: z.string(),
  comercializadoraId: z.string(),
  ucIds: z.array(z.string()).optional(),
  tipoContrato: z.string().optional(),
  vigenciaInicio: z.string().datetime(),
  vigenciaFim: z.string().datetime(),
  volumeMwhMes: z.number().optional(),
  volumeMwhAno: z.number().optional(),
  preco: z.number().optional(),
  formulaPreco: z.string().optional(),
  indexador: z.string().optional(),
  periodicidadeReajuste: z.string().optional(),
  condicoesEspeciais: z.string().optional(),
  status: z.string().optional(),
  observacoes: z.string().optional(),
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

export async function contratoRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authorize(["admin", "diretor", "analista"]));

  app.get("/contratos-energia", async (request) => {
    const querySchema = z.object({
      clienteId: z.string().optional(),
      status: z.string().optional()
    });
    const { clienteId, status } = querySchema.parse(request.query);
    return prisma.contratoEnergia.findMany({
      where: {
        ...(clienteId ? { clienteId } : {}),
        ...(status ? { status } : {})
      },
      include: { comercializadora: true, curvas: true },
      orderBy: { createdAt: "desc" }
    });
  });

  app.get("/contratos-energia/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const contrato = await prisma.contratoEnergia.findUnique({
      where: { id: params.id },
      include: { curvas: true, arquivos: true, comercializadora: true, cliente: true }
    });
    if (!contrato) return reply.code(404).send({ message: "Contrato não encontrado" });
    return contrato;
  });

  app.post("/contratos-energia", async (request) => {
    const body = contratoSchema.parse(request.body);
    return prisma.contratoEnergia.create({
      data: {
        ...body,
        ucIds: body.ucIds?.join(","),
        curvas: body.curvas
          ? {
              createMany: { data: body.curvas }
            }
          : undefined
      }
    });
  });

  app.put("/contratos-energia/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = contratoSchema.partial().parse(request.body);
    const contrato = await prisma.contratoEnergia.findUnique({ where: { id: params.id } });
    if (!contrato) return reply.code(404).send({ message: "Contrato não encontrado" });

    return prisma.contratoEnergia.update({
      where: { id: params.id },
      data: {
        ...body,
        ucIds: body.ucIds ? body.ucIds.join(",") : contrato.ucIds,
        curvas: body.curvas
          ? {
              deleteMany: {},
              createMany: { data: body.curvas }
            }
          : undefined
      }
    });
  });

  app.post("/contratos-energia/:id/arquivos", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = z.object({ nome: z.string(), url: z.string().url(), tipo: z.string().optional() }).parse(request.body);
    const contrato = await prisma.contratoEnergia.findUnique({ where: { id: params.id } });
    if (!contrato) return reply.code(404).send({ message: "Contrato não encontrado" });
    return prisma.contratoEnergiaArquivo.create({
      data: {
        contratoId: contrato.id,
        nome: body.nome,
        url: body.url,
        tipo: body.tipo
      }
    });
  });
}
