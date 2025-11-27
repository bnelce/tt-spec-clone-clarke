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
});
