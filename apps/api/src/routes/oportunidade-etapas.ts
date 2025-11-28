import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function oportunidadeEtapaRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authorize(["admin", "diretor", "comercial"]));

  app.get("/oportunidades/etapas", async () => {
    return prisma.oportunidadeEtapa.findMany({
      orderBy: { ordem: "asc" }
    });
  });
}
