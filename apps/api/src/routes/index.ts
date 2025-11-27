import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth";
import { leadRoutes } from "./leads";
import { clienteRoutes } from "./clientes";
import { ucRoutes } from "./ucs";
import { oportunidadeRoutes } from "./oportunidades";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(authRoutes);
  await app.register(leadRoutes);
  await app.register(clienteRoutes);
  await app.register(ucRoutes);
  await app.register(oportunidadeRoutes);
}
