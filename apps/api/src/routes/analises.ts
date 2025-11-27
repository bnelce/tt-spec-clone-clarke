import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { calcularViabilidade } from "../services/viabilidade";

const dadosMensaisSchema = z.array(
  z.object({
    mesRef: z.string(),
    consumoKwh: z.number(),
    demandaKw: z.number().optional(),
    tarifaTe: z.number().optional(),
    tarifaTusd: z.number().optional(),
    impostos: z.number().optional(),
    tipoTarifa: z.string().optional()
  })
);

const analiseSchema = z.object({
  clienteId: z.string().optional(),
  ucId: z.string().optional(),
  oportunidadeId: z.string().optional(),
  periodoMeses: z.number().min(1),
  dadosMensais: dadosMensaisSchema
});

export async function analiseRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authorize(["admin", "diretor", "analista", "comercial"]));

  app.get("/analises", async (request) => {
    const querySchema = z.object({
      clienteId: z.string().optional(),
      ucId: z.string().optional(),
      page: z.coerce.number().optional().default(1),
      pageSize: z.coerce.number().optional().default(20)
    });
    const { clienteId, ucId, page, pageSize } = querySchema.parse(request.query);
    const where = {
      ...(clienteId ? { clienteId } : {}),
      ...(ucId ? { ucId } : {})
    };
    const skip = (page - 1) * pageSize;
    const [data, total] = await Promise.all([
      prisma.analiseViabilidade.findMany({
        where,
        skip,
        take: pageSize,
        include: { cliente: true, uc: true, resultado: true },
        orderBy: { criadoEm: "desc" }
      }),
      prisma.analiseViabilidade.count({ where })
    ]);
    return { data, page, pageSize, total };
  });

  app.get("/analises/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const analise = await prisma.analiseViabilidade.findUnique({
      where: { id: params.id },
      include: { meses: true, resultado: true, cliente: true, uc: true }
    });
    if (!analise) return reply.code(404).send({ message: "Análise não encontrada" });
    return analise;
  });

  app.post("/analises", async (request) => {
    const body = analiseSchema.parse(request.body);
    return prisma.analiseViabilidade.create({
      data: {
        clienteId: body.clienteId,
        ucId: body.ucId,
        oportunidadeId: body.oportunidadeId,
        periodoMeses: body.periodoMeses,
        criadoPorId: request.user!.sub,
        meses: {
          createMany: {
            data: body.dadosMensais.map((mes) => ({
              mesRef: mes.mesRef,
              consumoKwh: mes.consumoKwh,
              demandaKw: mes.demandaKw ?? 0,
              tarifaTe: mes.tarifaTe,
              tarifaTusd: mes.tarifaTusd,
              impostos: mes.impostos,
              tipoTarifa: mes.tipoTarifa
            }))
          }
        }
      }
    });
  });

  app.put("/analises/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = analiseSchema.partial().parse(request.body);
    const analise = await prisma.analiseViabilidade.findUnique({ where: { id: params.id } });
    if (!analise) return reply.code(404).send({ message: "Análise não encontrada" });

    await prisma.analiseViabilidade.update({
      where: { id: params.id },
      data: {
        clienteId: body.clienteId ?? analise.clienteId,
        ucId: body.ucId ?? analise.ucId,
        oportunidadeId: body.oportunidadeId ?? analise.oportunidadeId,
        periodoMeses: body.periodoMeses ?? analise.periodoMeses,
        ...(body.dadosMensais
          ? {
              meses: {
                deleteMany: {},
                createMany: {
                  data: body.dadosMensais.map((mes) => ({
                    mesRef: mes.mesRef,
                    consumoKwh: mes.consumoKwh,
                    demandaKw: mes.demandaKw ?? 0,
                    tarifaTe: mes.tarifaTe,
                    tarifaTusd: mes.tarifaTusd,
                    impostos: mes.impostos,
                    tipoTarifa: mes.tipoTarifa
                  }))
                }
              }
            }
          : {})
      }
    });

    return { ok: true };
  });

  app.post("/analises/:id/calcular", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = z.object({ precoLivreReferencia: z.number().optional() }).parse(request.body ?? {});
    const analise = await prisma.analiseViabilidade.findUnique({
      where: { id: params.id },
      include: { meses: true }
    });
    if (!analise) return reply.code(404).send({ message: "Análise não encontrada" });

    const result = calcularViabilidade({
      meses: analise.meses,
      precoLivreReferencia: body.precoLivreReferencia
    });

    const saved = await prisma.analiseViabilidadeResultado.upsert({
      where: { analiseId: analise.id },
      update: result,
      create: {
        analiseId: analise.id,
        ...result,
        premissasPreco: body.precoLivreReferencia?.toString()
      }
    });

    return saved;
  });
}
