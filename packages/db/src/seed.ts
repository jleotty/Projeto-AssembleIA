import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Inicializando banco de dados SQLite para Cadastro de Membros AD...');

  // Limpeza para garantia de idempotência
  await prisma.historicoMembro.deleteMany();
  await prisma.membroMinisterio.deleteMany();
  await prisma.observacaoMembro.deleteMany();
  await prisma.vidaEspiritual.deleteMany();
  await prisma.filho.deleteMany();
  await prisma.familiar.deleteMany();
  await prisma.membro.deleteMany();
  await prisma.ministerio.deleteMany();
  await prisma.congregacao.deleteMany();
  await prisma.usuario.deleteMany();

  // 1. Congregação Inicial
  const congregacao = await prisma.congregacao.create({
    data: {
      nome: 'Sede Assembleia de Deus',
      pastorResponsavel: 'Pastor Responsável',
      endereco: 'Rua Principal, 1000 — Templo Central',
      telefone: '(11) 99999-8888',
    },
  });

  console.log('✅ Congregação criada:', congregacao.nome);

  // 2. Ministérios Iniciais
  const ministeriosNomes = [
    'Louvor',
    'Escola Bíblica Dominical',
    'Crianças',
    'Jovens',
    'Adolescentes',
    'Evangelismo',
    'Missões',
    'Recepção',
    'Diaconato',
    'Obreiros',
  ];

  for (const nome of ministeriosNomes) {
    await prisma.ministerio.create({
      data: { nome },
    });
  }

  console.log('✅ Ministérios iniciais cadastrados.');

  // 3. Usuário Administrador da Secretaria
  const user = await prisma.usuario.create({
    data: {
      nome: 'Administrador da Secretaria',
      email: 'admin@assembleia.ia',
      senhaHash: 'hash_placeholder',
      perfil: 'Secretaria',
    },
  });

  // 4. Membro Demonstrativo para Testes
  const membro = await prisma.membro.create({
    data: {
      numeroMembro: 'AD-2026-0001',
      congregacaoId: congregacao.id,
      nomeCompleto: 'Pastor João Oliveira',
      dataNascimento: new Date('1980-05-15'),
      sexo: 'Masculino',
      estadoCivil: 'Casado',
      cpf: '123.456.789-00',
      rg: '12.345.678-9',
      telefone: '(11) 98888-7777',
      whatsapp: '(11) 98888-7777',
      email: 'admin@assembleia.ia',
      endereco: 'Av. Brasil',
      numero: '500',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01000-000',
      ativo: 1,
    },
  });

  await prisma.familiar.create({
    data: {
      membroId: membro.id,
      nomePai: 'Antônio Oliveira',
      nomeMae: 'Maria Oliveira',
      nomeConjuge: 'Ana Oliveira',
    },
  });

  await prisma.vidaEspiritual.create({
    data: {
      membroId: membro.id,
      dataConversao: new Date('1995-03-10'),
      batizadoAguas: 1,
      dataBatismo: new Date('1996-08-20'),
      igrejaBatismo: 'Assembleia de Deus Sede',
      batismoEspiritoSanto: 1,
      veioOutraIgreja: 0,
    },
  });

  await prisma.observacaoMembro.create({
    data: {
      membroId: membro.id,
      talentos: 'Pregação, Ensino Bíblico, Gestão Ministerial',
      contatoEmergencia: 'Ana Oliveira',
      telefoneEmergencia: '(11) 97777-6666',
    },
  });

  console.log('✨ Seed SQLite concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
