import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

const clienteSchema = z.object({
  razaoSocial: z.string(),
  nomeFantasia: z.string(),
  cnpj: z.string(),
  segmento: z.string().optional(),
  endereco: z.string().optional(),
  contatoNome: z.string().optional(),
  contatoEmail: z.string().email().optional(),
  contatoTelefone: z.string().optional(),
  observacoes: z.string().optional()
});

export async function clienteRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authorize(["admin", "diretor", "comercial", "analista"]));

  app.get("/clientes", async (request) => {
    const page = Number((request.query as any).page ?? 1);
    const pageSize = Number((request.query as any).pageSize ?? 20);
    const skip = (page - 1) * pageSize;
    const [data, total] = await Promise.all([
      prisma.cliente.findMany({
        skip,
        take: pageSize,
        orderBy: { criadoEm: "desc" }
      }),
      prisma.cliente.count()
    ]);
    return { data, page, pageSize, total };
  });

  app.get("/clientes/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const cliente = await prisma.cliente.findUnique({
      where: { id: params.id },
      include: {
        ucs: true,
        contratos: true,
        migracoes: true
      }
    });
    if (!cliente) return reply.code(404).send({ message: "Cliente não encontrado" });
    return cliente;
  });

  app.post("/clientes", async (request) => {
    const body = clienteSchema.parse(request.body);
    return prisma.cliente.create({ data: body });
  });

  app.put("/clientes/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = clienteSchema.partial().parse(request.body);
    const exists = await prisma.cliente.findUnique({ where: { id: params.id } });
    if (!exists) return reply.code(404).send({ message: "Cliente não encontrado" });
    return prisma.cliente.update({ where: { id: params.id }, data: body });
  });

  app.delete("/clientes/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    await prisma.cliente.delete({ where: { id: params.id } });
    return reply.code(204).send();
  });
}
