import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Inicializando seed idempotente do banco de dados SQLite (Volume 3 Assembleia de Deus)...');

  // Limpar tabelas existentes para garantir idempotência
  await prisma.scheduleItem.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.event.deleteMany();
  await prisma.pastoralCare.deleteMany();
  await prisma.financialTransaction.deleteMany();
  await prisma.member.deleteMany();
  await prisma.churchRole.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  // 1. Tenant Principal AD
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Assembleia de Deus — Sede Central',
      slug: 'assembleia-sede',
      plan: 'DOMINATE',
      convention: 'CGADB',
      accentColor: '#00B2FE',
      city: 'São Paulo',
      state: 'SP',
      phone: '(11) 99999-8888',
    },
  });

  console.log('✅ Tenant AD criado:', tenant.name);

  // 2. Catalogo Padrão de Cargos Eclesiásticos da Assembleia de Deus (Volume 3 Doc Mestre)
  const adRoles = [
    { code: 'pastor_presidente', name: 'Pastor Presidente / Titular', category: 'ECLESIASTICO', rankOrder: 10, requiresConsecration: true },
    { code: 'pastor_auxiliar', name: 'Pastor Auxiliar', category: 'ECLESIASTICO', rankOrder: 20, requiresConsecration: true },
    { code: 'evangelista', name: 'Evangelista', category: 'ECLESIASTICO', rankOrder: 40, requiresConsecration: true },
    { code: 'missionario', name: 'Missionário / Missionária', category: 'ECLESIASTICO', rankOrder: 50, requiresConsecration: true },
    { code: 'presbitero', name: 'Presbítero', category: 'ECLESIASTICO', rankOrder: 60, requiresConsecration: true },
    { code: 'diacono', name: 'Diácono', category: 'ECLESIASTICO', rankOrder: 70, requiresConsecration: true },
    { code: 'diaconisa', name: 'Diaconisa', category: 'ECLESIASTICO', rankOrder: 80, requiresConsecration: true },
    { code: 'cooperador', name: 'Cooperador / Auxiliar', category: 'ECLESIASTICO', rankOrder: 90, requiresConsecration: false },
    { code: 'dirigente_congregacao', name: 'Dirigente de Congregação', category: 'ADMINISTRATIVO', rankOrder: 100, requiresConsecration: false },
    { code: 'lider_circulo_oracao', name: 'Líder do Círculo de Oração', category: 'DEPARTAMENTO', rankOrder: 110, requiresConsecration: false },
    { code: 'superintendente_ebd', name: 'Superintendente EBD', category: 'ENSINO', rankOrder: 120, requiresConsecration: false },
    { code: 'regente_louvor', name: 'Regente / Maestro de Louvor', category: 'LOUVOR', rankOrder: 130, requiresConsecration: false },
  ];

  const roleMap: Record<string, string> = {};

  for (const r of adRoles) {
    const createdRole = await prisma.churchRole.create({
      data: {
        tenantId: tenant.id,
        code: r.code,
        name: r.name,
        category: r.category,
        rankOrder: r.rankOrder,
        requiresConsecration: r.requiresConsecration,
        isSystem: true,
      },
    });
    roleMap[r.code] = createdRole.id;
  }

  console.log('✅ Catálogo de Cargos da Assembleia de Deus pré-carregado.');

  // 3. Usuário Administrador / Pastor Presidente
  const adminUser = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: 'admin@assembleia.ia',
      name: 'Pastor João Oliveira',
      passwordHash: 'hash_placeholder',
      role: 'PASTOR',
      phone: '(11) 98888-7777',
    },
  });

  // 4. Membros com vínculo aos Cargos AD
  const member1 = await prisma.member.create({
    data: {
      tenantId: tenant.id,
      userId: adminUser.id,
      roleId: roleMap['pastor_presidente'],
      fullName: 'Pastor João Oliveira',
      phone: '(11) 98888-7777',
      email: 'admin@assembleia.ia',
      status: 'ACTIVE',
      ministry: 'LIDERANCA',
      congregation: 'Templo Central',
      notes: 'Pastor Presidente da Assembleia de Deus Sede Central (CGADB)',
    },
  });

  await prisma.member.createMany({
    data: [
      {
        tenantId: tenant.id,
        roleId: roleMap['regente_louvor'],
        fullName: 'Maria Santos',
        phone: '(11) 97777-6666',
        email: 'maria@gmail.com',
        status: 'ACTIVE',
        ministry: 'LOUVOR',
        congregation: 'Templo Central',
        notes: 'Regente do coral e solista do Ministério de Louvor',
      },
      {
        tenantId: tenant.id,
        roleId: roleMap['cooperador'],
        fullName: 'Carlos Eduardo Silva',
        phone: '(11) 96666-5555',
        email: 'carlos@gmail.com',
        status: 'ACTIVE',
        ministry: 'MIDIA',
        congregation: 'Congregação Bairro Novo',
        notes: 'Operador de câmera e transmissão ao vivo',
      },
      {
        tenantId: tenant.id,
        roleId: roleMap['lider_circulo_oracao'],
        fullName: 'Diaconisa Ana Maria Santos',
        phone: '(11) 95555-4444',
        email: 'anamaria@gmail.com',
        status: 'ACTIVE',
        ministry: 'CIRCULO_DE_ORAÇÃO',
        congregation: 'Templo Central',
        notes: 'Líder do Círculo de Oração Coluna de Fogo',
      },
    ],
  });

  console.log('✅ Membros com Cargos AD criados.');

  // 5. Financeiro
  await prisma.financialTransaction.createMany({
    data: [
      {
        tenantId: tenant.id,
        type: 'INCOME',
        category: 'DIZIMO',
        description: 'Dízimos do Culto de Santa Ceia',
        amount: 14850.0,
        paymentMethod: 'PIX',
        status: 'COMPLETED',
        payerName: 'Membros da Sede',
      },
      {
        tenantId: tenant.id,
        type: 'INCOME',
        category: 'OFERTA',
        description: 'Oferta do Círculo de Oração',
        amount: 3200.0,
        paymentMethod: 'DINHEIRO',
        status: 'COMPLETED',
      },
    ],
  });

  console.log('✨ Seed Volume 3 concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
