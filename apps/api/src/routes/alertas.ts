import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { listarNotificacoes } from "../services/notificacoes";
import { z } from "zod";

export async function alertaRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authorize(["admin", "diretor", "analista", "comercial", "financeiro"]));

  app.get("/notificacoes", async () => {
    return listarNotificacoes();
  });

  app.post("/notificacoes/:id/lida", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const notificacao = await prisma.notificacao.findUnique({ where: { id: params.id } });
    if (!notificacao) return reply.code(404).send({ message: "Notificação não encontrada" });
    await prisma.notificacao.update({ where: { id: params.id }, data: { lida: true } });
    return { ok: true };
  });
}
