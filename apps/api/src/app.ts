import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { env } from "./env";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(cors, { origin: true });
  app.register(jwt, { secret: env.JWT_SECRET });

  // Healthcheck
  app.get("/health", async () => ({ status: "ok" }));

  return app;
}
