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
import { faturaRoutes } from "./faturas";
import { medicaoRoutes } from "./medicoes";
import { exposicaoRoutes } from "./exposicoes";
import { honorarioRoutes } from "./honorarios";
import { portalRoutes } from "./portal";
import { alertaRoutes } from "./alertas";

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
  await app.register(faturaRoutes);
  await app.register(medicaoRoutes);
  await app.register(exposicaoRoutes);
  await app.register(honorarioRoutes);
  await app.register(portalRoutes);
  await app.register(alertaRoutes);
}
