import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function portalRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authorizeCliente());

  app.get("/portal/dashboard", async (request) => {
    const clienteId = request.user!.clienteId!;
    const querySchema = z.object({
      meses: z.coerce.number().optional().default(12)
    });
    const { meses } = querySchema.parse(request.query);

    const faturas = await prisma.fatura.findMany({
      where: { clienteId },
      orderBy: { competencia: "desc" },
      take: meses
    });
    const medicoes = await prisma.medicao.findMany({
      where: { clienteId },
      orderBy: { competencia: "desc" },
      take: meses
    });
    const exposicoes = await prisma.exposicaoContratual.findMany({
      where: { clienteId },
      orderBy: { competencia: "desc" },
      take: meses
    });
    const contratosVigentes = await prisma.contratoEnergia.findMany({
      where: {
        clienteId,
        vigenciaInicio: { lte: new Date() },
        vigenciaFim: { gte: new Date() }
      },
      include: { comercializadora: true }
    });

    const economiaMensal = faturas.map((f) => ({
      competencia: f.competencia,
      economia: f.tipo === "cativa" ? 0 : f.valorTotal * 0.05 // placeholder
    }));
    const economiaAcumulada = economiaMensal.reduce((acc, item) => acc + item.economia, 0);
    const consumoHistorico = medicoes.map((m) => ({
      competencia: m.competencia,
      energiaKwh: m.energiaKwh
    }));
    const custoMedio =
      faturas.length > 0
        ? faturas.reduce((acc, f) => acc + f.valorTotal, 0) /
          faturas.reduce((acc, f) => acc + f.consumoKwh, 0)
        : 0;

    return {
      economiaAcumulada,
      economiaMensal,
      custoMedio,
      consumoHistorico,
      exposicaoSimplificada: exposicoes,
      contratosVigentes
    };
  });

  app.get("/portal/relatorios", async (request) => {
    const clienteId = request.user!.clienteId!;
    return prisma.relatorioPortal.findMany({
      where: { clienteId },
      orderBy: { criadoEm: "desc" }
    });
  });

  app.post("/portal/relatorios", async (request) => {
    const clienteId = request.user!.clienteId!;
    const body = z
      .object({
        tipo: z.string(),
        competencia: z.string().optional(),
        url: z.string().url().optional()
      })
      .parse(request.body);
    return prisma.relatorioPortal.create({
      data: {
        clienteId,
        tipo: body.tipo,
        competencia: body.competencia,
        url: body.url ?? "https://example.com/relatorio.pdf"
      }
    });
  });

  app.get("/portal/documentos", async (request) => {
    const clienteId = request.user!.clienteId!;
    return prisma.documentoPortal.findMany({
      where: { clienteId },
      orderBy: { criadoEm: "desc" }
    });
  });
}
