import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

const leadSchema = z.object({
  nomeFantasia: z.string(),
  cnpj: z.string(),
  contatoNome: z.string().optional(),
  contatoCargo: z.string().optional(),
  email: z.string().email().optional(),
  telefone: z.string().optional(),
  segmento: z.string().optional(),
  origem: z.string().optional(),
  status: z.string().optional(),
  observacoes: z.string().optional()
});

export async function leadRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  app.get("/leads", async (request) => {
    const page = Number((request.query as any).page ?? 1);
    const pageSize = Number((request.query as any).pageSize ?? 20);
    const skip = (page - 1) * pageSize;
    const [data, total] = await Promise.all([
      prisma.lead.findMany({ skip, take: pageSize, orderBy: { criadoEm: "desc" } }),
      prisma.lead.count()
    ]);
    return { data, page, pageSize, total };
  });

  app.get("/leads/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const lead = await prisma.lead.findUnique({
      where: { id: params.id },
      include: { anotacoes: true, arquivos: true }
    });
    if (!lead) return reply.code(404).send({ message: "Lead não encontrado" });
    return lead;
  });

  app.post("/leads", async (request) => {
    const body = leadSchema.parse(request.body);
    return prisma.lead.create({ data: body });
  });

  app.put("/leads/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = leadSchema.partial().parse(request.body);
    const exists = await prisma.lead.findUnique({ where: { id: params.id } });
    if (!exists) return reply.code(404).send({ message: "Lead não encontrado" });
    return prisma.lead.update({ where: { id: params.id }, data: body });
  });

  app.delete("/leads/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    await prisma.lead.delete({ where: { id: params.id } });
    return reply.code(204).send();
  });
}
