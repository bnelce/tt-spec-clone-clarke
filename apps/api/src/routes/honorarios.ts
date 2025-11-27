import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { calcularHonorario } from "../services/honorarios";

const contratoGestaoSchema = z.object({
  clienteId: z.string(),
  modelo: z.enum(["fixo", "percentualEconomia", "hibrido", "taxaUnica"]),
  valorFixo: z.number().optional(),
  percentualEconomia: z.number().optional(),
  taxaUnica: z.number().optional(),
  inicio: z.string().datetime(),
  fim: z.string().datetime().optional(),
  observacoes: z.string().optional()
});

export async function honorarioRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authorize(["admin", "diretor", "financeiro"]));

  app.get("/contratos-gestao", async (request) => {
    const querySchema = z.object({ clienteId: z.string().optional() });
    const { clienteId } = querySchema.parse(request.query);
    return prisma.contratoGestao.findMany({
      where: { ...(clienteId ? { clienteId } : {}) },
      include: { cliente: true }
    });
  });

  app.post("/contratos-gestao", async (request) => {
    const body = contratoGestaoSchema.parse(request.body);
    return prisma.contratoGestao.create({ data: body });
  });

  app.put("/contratos-gestao/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = contratoGestaoSchema.partial().parse(request.body);
    const contrato = await prisma.contratoGestao.findUnique({ where: { id: params.id } });
    if (!contrato) return reply.code(404).send({ message: "Contrato gestão não encontrado" });
    return prisma.contratoGestao.update({ where: { id: params.id }, data: body });
  });

  app.post("/honorarios/calcular", async (request, reply) => {
    const body = z.object({
      clienteId: z.string(),
      competencia: z.string()
    }).parse(request.body);

    const contrato = await prisma.contratoGestao.findFirst({
      where: {
        clienteId: body.clienteId
      }
    });
    if (!contrato) return reply.code(404).send({ message: "Contrato de gestão não encontrado" });

    // TODO: usar dados reais de faturas/medicoes para economia
    const economiaBase = 0;
    const valor = calcularHonorario({
      modelo: contrato.modelo,
      valorFixo: contrato.valorFixo ?? 0,
      percentualEconomia: contrato.percentualEconomia ?? 0,
      taxaUnica: contrato.taxaUnica ?? 0,
      economia: economiaBase
    });

    return prisma.calculoHonorario.create({
      data: {
        clienteId: body.clienteId,
        contratoGestaoId: contrato.id,
        competencia: body.competencia,
        economiaBase,
        valorHonorario: valor,
        detalhesCalculo: "Calculado automaticamente a partir do modelo configurado"
      }
    });
  });

  app.get("/honorarios", async (request) => {
    const querySchema = z.object({
      clienteId: z.string().optional(),
      competencia: z.string().optional()
    });
    const { clienteId, competencia } = querySchema.parse(request.query);
    return prisma.calculoHonorario.findMany({
      where: {
        ...(clienteId ? { clienteId } : {}),
        ...(competencia ? { competencia } : {})
      },
      include: { cliente: true, contratoGestao: true }
    });
  });
}
