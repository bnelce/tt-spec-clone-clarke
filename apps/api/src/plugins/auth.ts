import fp from "fastify-plugin";
import { FastifyRequest, FastifyReply } from "fastify";

export interface JwtUserPayload {
  sub: string;
  role: string;
  scope?: "interno" | "cliente";
  clienteId?: string;
}

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    authorize: (allowed?: string[]) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    authorizeCliente: () => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
  interface FastifyRequest {
    user?: JwtUserPayload;
  }
}

export default fp(async function authPlugin(fastify) {
  fastify.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify<JwtUserPayload>();
      request.user = request.user as JwtUserPayload;
    } catch (err) {
      reply.code(401).send({ message: "Não autenticado" });
    }
  });

  fastify.decorate(
    "authorize",
    (allowed?: string[]) =>
      async (request: FastifyRequest, reply: FastifyReply) => {
        await fastify.authenticate(request, reply);
        if (!allowed || allowed.length === 0) return;
        const role = request.user?.role;
        if (!role || !allowed.includes(role)) {
          reply.code(403).send({ message: "Sem permissão" });
        }
      }
  );

  fastify.decorate(
    "authorizeCliente",
    () =>
      async (request: FastifyRequest, reply: FastifyReply) => {
        await fastify.authenticate(request, reply);
        if (request.user?.scope !== "cliente") {
          reply.code(403).send({ message: "Área exclusiva do cliente" });
        }
      }
  );
});
