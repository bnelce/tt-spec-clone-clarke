import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const adminEmail = "admin@gestora.com";
  const adminPass = "admin123";
  const senhaHash = await bcrypt.hash(adminPass, 10);
  await prisma.usuarioInterno.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      nome: "Admin",
      papel: "admin",
      senhaHash,
      status: "ativo"
    }
  });

  // Etapas padrão de oportunidade
  const etapas = [
    { nome: "Novo", ordem: 1 },
    { nome: "Em análise", ordem: 2 },
    { nome: "Em cotação", ordem: 3 },
    { nome: "Proposta enviada", ordem: 4 },
    { nome: "Negociação", ordem: 5 },
    { nome: "Ganha", ordem: 6 },
    { nome: "Perdida", ordem: 7 }
  ];
  for (const etapa of etapas) {
    await prisma.oportunidadeEtapa.upsert({
      where: { nome: etapa.nome },
      update: { ordem: etapa.ordem, ativo: true },
      create: etapa
    });
  }

  console.log("Seed concluído (admin e etapas).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
