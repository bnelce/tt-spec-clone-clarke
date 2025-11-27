import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth";
import { leadRoutes } from "./leads";
import { clienteRoutes } from "./clientes";
import { ucRoutes } from "./ucs";
import { oportunidadeRoutes } from "./oportunidades";
import { analiseRoutes } from "./analises";
import { comercializadoraRoutes } from "./comercializadoras";
import { propostaRoutes } from "./propostas";
import { contratoRoutes } from "./contratos";
import { migracaoRoutes } from "./migracoes";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(authRoutes);
  await app.register(leadRoutes);
  await app.register(clienteRoutes);
  await app.register(ucRoutes);
  await app.register(oportunidadeRoutes);
  await app.register(analiseRoutes);
  await app.register(comercializadoraRoutes);
  await app.register(propostaRoutes);
  await app.register(contratoRoutes);
  await app.register(migracaoRoutes);
}
