import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

const schema = z.object({
  nome: z.string(),
  cnpj: z.string().optional(),
  contatoComercial: z.string().optional(),
  contatoOperacional: z.string().optional(),
  observacoes: z.string().optional()
});

export async function comercializadoraRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authorize(["admin", "diretor", "analista", "comercial"]));

  app.get("/comercializadoras", async () => {
    return prisma.comercializadora.findMany({ orderBy: { nome: "asc" } });
  });

  app.post("/comercializadoras", async (request) => {
    const body = schema.parse(request.body);
    return prisma.comercializadora.create({ data: body });
  });

  app.put("/comercializadoras/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = schema.partial().parse(request.body);
    const exists = await prisma.comercializadora.findUnique({ where: { id: params.id } });
    if (!exists) return reply.code(404).send({ message: "Comercializadora não encontrada" });
    return prisma.comercializadora.update({ where: { id: params.id }, data: body });
  });

  app.delete("/comercializadoras/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    await prisma.comercializadora.delete({ where: { id: params.id } });
    return reply.code(204).send();
  });
}
