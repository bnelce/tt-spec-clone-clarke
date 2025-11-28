import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
import { buildApp } from "../src/app";
import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

const app = buildApp();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Oportunidades API", () => {
  beforeEach(async () => {
    await prisma.oportunidade.deleteMany();
    await prisma.lead.deleteMany();
    await prisma.usuarioInterno.deleteMany();
  });

  it("deve rejeitar criação sem autenticação", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/oportunidades",
      payload: {
        etapaId: "fake",
        valorPotencial: 1000
      }
    });
    expect(response.statusCode).toBe(401);
  });

  it("deve criar oportunidade autenticada", async () => {
    const senhaHash = await bcrypt.hash("secret123", 8);
    const usuario = await prisma.usuarioInterno.create({
      data: {
        nome: "Tester",
        email: "tester@example.com",
        senhaHash,
        papel: "comercial",
        status: "ativo"
      }
    });

    const etapa = await prisma.oportunidadeEtapa.create({
      data: { nome: "Teste", ordem: 1 }
    });

    const login = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: { email: usuario.email, senha: "secret123" }
    });

    expect(login.statusCode).toBe(200);
    const token = login.json().token as string;

    const response = await app.inject({
      method: "POST",
      url: "/oportunidades",
      headers: {
        authorization: `Bearer ${token}`
      },
      payload: {
        etapaId: etapa.id,
        valorPotencial: 5000
      }
    });

    expect(response.statusCode).toBe(200);
  });
});
