import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import sensible from "@fastify/sensible";
import { env } from "./env";
import authPlugin from "./plugins/auth";
import { registerRoutes } from "./routes";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(cors, { origin: true });
  app.register(sensible);
  app.register(jwt, { secret: env.JWT_SECRET });
  app.register(authPlugin);

  // Healthcheck
  app.get("/health", async () => ({ status: "ok" }));

  app.register(registerRoutes);

  return app;
}
