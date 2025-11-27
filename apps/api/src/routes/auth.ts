import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";

const loginSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6),
  scope: z.enum(["interno", "cliente"]).default("interno")
});

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/login", async (request, reply) => {
    const { email, senha } = loginSchema.parse(request.body);

    const user = await prisma.usuarioInterno.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(senha, user.senhaHash))) {
      return reply.code(401).send({ message: "Credenciais inválidas" });
    }
    const token = app.jwt.sign(
      { role: user.papel, scope: "interno" },
      { sub: user.id, expiresIn: "8h" }
    );
    return { token, role: user.papel };
  });

  app.post("/portal/auth/login", async (request, reply) => {
    const { email, senha } = loginSchema.parse({ ...request.body, scope: "cliente" });
    const user = await prisma.usuarioCliente.findUnique({
      where: { email },
      include: { cliente: true }
    });
    if (!user || !(await bcrypt.compare(senha, user.senhaHash))) {
      return reply.code(401).send({ message: "Credenciais inválidas" });
    }
    const token = app.jwt.sign(
      { role: "cliente", scope: "cliente", clienteId: user.clienteId },
      { sub: user.id, expiresIn: "8h" }
    );
    return { token };
  });
}
