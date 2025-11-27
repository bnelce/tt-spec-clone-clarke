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
  app.addHook("preHandler", app.authorize(["admin", "diretor", "comercial"]));

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
  app.post("/leads/:id/notas", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = z.object({ texto: z.string().min(1) }).parse(request.body);
    const lead = await prisma.lead.findUnique({ where: { id: params.id } });
    if (!lead) return reply.code(404).send({ message: "Lead não encontrado" });
    const nota = await prisma.leadAnotacao.create({
      data: {
        leadId: params.id,
        autorId: request.user!.sub,
        texto: body.texto
      }
    });
    return nota;
  });

  app.post("/leads/:id/arquivos", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = z.object({ nome: z.string(), url: z.string().url(), tipo: z.string().optional() }).parse(request.body);
    const lead = await prisma.lead.findUnique({ where: { id: params.id } });
    if (!lead) return reply.code(404).send({ message: "Lead não encontrado" });
    const arquivo = await prisma.leadArquivo.create({
      data: {
        leadId: params.id,
        nome: body.nome,
        url: body.url,
        tipo: body.tipo
      }
    });
    return arquivo;
  });

  app.post("/leads/:id/convert", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const lead = await prisma.lead.findUnique({ where: { id: params.id } });
    if (!lead) return reply.code(404).send({ message: "Lead não encontrado" });

    const existingCliente = await prisma.cliente.findUnique({ where: { cnpj: lead.cnpj } });
    const cliente =
      existingCliente ??
      (await prisma.cliente.create({
        data: {
          razaoSocial: lead.nomeFantasia,
          nomeFantasia: lead.nomeFantasia,
          cnpj: lead.cnpj,
          segmento: lead.segmento,
          contatoNome: lead.contatoNome,
          contatoEmail: lead.email,
          contatoTelefone: lead.telefone,
          observacoes: lead.observacoes
        }
      }));

    await prisma.lead.update({
      where: { id: params.id },
      data: { status: "convertido" }
    });

    return { clienteId: cliente.id };
  });
}
