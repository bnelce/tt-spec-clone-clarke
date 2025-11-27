import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

const migracaoSchema = z.object({
  clienteId: z.string(),
  ucId: z.string(),
  responsavelId: z.string().optional(),
  etapasDefault: z.boolean().optional()
});

export async function migracaoRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authorize(["admin", "diretor", "analista"]));

  app.get("/migracoes", async (request) => {
    const querySchema = z.object({
      clienteId: z.string().optional(),
      status: z.string().optional()
    });
    const { clienteId, status } = querySchema.parse(request.query);
    return prisma.migracao.findMany({
      where: {
        ...(clienteId ? { clienteId } : {}),
        ...(status ? { status } : {})
      },
      include: {
        uc: true,
        cliente: true,
        etapas: true,
        tarefas: true
      },
      orderBy: { criadoEm: "desc" }
    });
  });

  app.get("/migracoes/:id", async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const migracao = await prisma.migracao.findUnique({
      where: { id: params.id },
      include: {
        uc: true,
        cliente: true,
        etapas: true,
        tarefas: true,
        arquivos: true
      }
    });
    if (!migracao) return reply.code(404).send({ message: "Migração não encontrada" });
    return migracao;
  });

  app.post("/migracoes", async (request) => {
    const body = migracaoSchema.parse(request.body);
    const etapasDefault = [
      "Viabilidade concluída",
      "Contratação",
      "Documentação distribuidora",
      "Adequações técnicas",
      "CCEE",
      "Testes",
      "Início ACL"
    ];
    return prisma.migracao.create({
      data: {
        clienteId: body.clienteId,
        ucId: body.ucId,
        responsavelId: body.responsavelId,
        etapas: body.etapasDefault
          ? {
              createMany: {
                data: etapasDefault.map((nome, idx) => ({
                  nome,
                  ordem: idx + 1
                }))
              }
            }
          : undefined
      }
    });
  });

  app.patch("/migracoes/:id/etapas/:etapaId", async (request, reply) => {
    const params = z.object({ id: z.string(), etapaId: z.string() }).parse(request.params);
    const body = z.object({
      status: z.string().optional(),
      prazoPrevisto: z.string().datetime().optional(),
      concluidoEm: z.string().datetime().optional()
    }).parse(request.body);
    const etapa = await prisma.migracaoEtapa.findUnique({ where: { id: params.etapaId } });
    if (!etapa) return reply.code(404).send({ message: "Etapa não encontrada" });
    await prisma.migracaoEtapa.update({
      where: { id: params.etapaId },
      data: body
    });
    return { ok: true };
  });

  app.post("/migracoes/:id/tarefas", async (request) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = z.object({
      etapaId: z.string(),
      titulo: z.string(),
      descricao: z.string().optional(),
      responsavelId: z.string().optional(),
      prazo: z.string().datetime().optional()
    }).parse(request.body);
    return prisma.migracaoTarefa.create({
      data: {
        migracaoId: params.id,
        etapaId: body.etapaId,
        titulo: body.titulo,
        descricao: body.descricao,
        responsavelId: body.responsavelId,
        prazo: body.prazo ? new Date(body.prazo) : undefined
      }
    });
  });

  app.patch("/migracoes/:id/tarefas/:tarefaId", async (request, reply) => {
    const params = z.object({ id: z.string(), tarefaId: z.string() }).parse(request.params);
    const body = z.object({
      status: z.string().optional(),
      concluidoEm: z.string().datetime().optional()
    }).parse(request.body);
    const tarefa = await prisma.migracaoTarefa.findUnique({ where: { id: params.tarefaId } });
    if (!tarefa) return reply.code(404).send({ message: "Tarefa não encontrada" });
    await prisma.migracaoTarefa.update({
      where: { id: params.tarefaId },
      data: {
        status: body.status,
        concluidoEm: body.concluidoEm ? new Date(body.concluidoEm) : tarefa.concluidoEm
      }
    });
    return { ok: true };
  });
}
