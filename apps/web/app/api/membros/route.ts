import { NextResponse } from 'next/server';
import { db } from '@assembleia/db';

// GET /api/membros — Consulta principal de membros no SQLite
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    const membros = await db.membro.findMany({
      where: {
        ativo: 1,
        OR: query ? [
          { nomeCompleto: { contains: query } },
          { cpf: { contains: query } },
          { telefone: { contains: query } },
          { numeroMembro: { contains: query } },
        ] : undefined,
      },
      include: {
        congregacao: true,
        familiares: true,
        filhos: true,
        vidaEspiritual: true,
        observacoes: true,
        membroMinisterios: {
          include: { ministerio: true }
        }
      },
      orderBy: { nomeCompleto: 'asc' },
    });

    return NextResponse.json({ success: true, data: membros });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/membros — Cadastro Completo de Membro nas 6 Seções
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Gerar número de membro único ex: AD-2026-0042
    const totalCount = await db.membro.count();
    const numeroMembro = `AD-${new Date().getFullYear()}-${String(totalCount + 1).padStart(4, '0')}`;

    // Buscar congregação padrão
    const congregacaoPadrao = await db.congregacao.findFirst();

    // 1. Dados Pessoais
    const novoMembro = await db.membro.create({
      data: {
        numeroMembro,
        congregacaoId: congregacaoPadrao?.id || 1,
        nomeCompleto: body.nomeCompleto,
        dataNascimento: body.dataNascimento ? new Date(body.dataNascimento) : null,
        sexo: body.sexo,
        estadoCivil: body.estadoCivil,
        cpf: body.cpf || null,
        rg: body.rg || null,
        telefone: body.telefone || null,
        whatsapp: body.whatsapp || body.telefone || null,
        email: body.email || null,
        endereco: body.endereco || null,
        numero: body.numero || null,
        complemento: body.complemento || null,
        bairro: body.bairro || null,
        cidade: body.cidade || null,
        estado: body.estado || null,
        cep: body.cep || null,
        ativo: 1,
      },
    });

    // 2. Informações Familiares
    if (body.nomePai || body.nomeMae || body.nomeConjuge) {
      await db.familiar.create({
        data: {
          membroId: novoMembro.id,
          nomePai: body.nomePai || null,
          nomeMae: body.nomeMae || null,
          nomeConjuge: body.nomeConjuge || null,
        },
      });
    }

    // Filhos
    if (Array.isArray(body.filhos) && body.filhos.length > 0) {
      for (const f of body.filhos) {
        if (f.nome) {
          await db.filho.create({
            data: {
              membroId: novoMembro.id,
              nome: f.nome,
              idade: f.idade ? parseInt(f.idade, 10) : null,
            },
          });
        }
      }
    }

    // 3. Informações Espirituais
    await db.vidaEspiritual.create({
      data: {
        membroId: novoMembro.id,
        dataConversao: body.dataConversao ? new Date(body.dataConversao) : null,
        batizadoAguas: body.batizadoAguas === 'Sim' ? 1 : 0,
        dataBatismo: body.dataBatismo ? new Date(body.dataBatismo) : null,
        igrejaBatismo: body.igrejaBatismo || null,
        batismoEspiritoSanto: body.batismoEspiritoSanto === 'Sim' ? 1 : 0,
        veioOutraIgreja: body.veioOutraIgreja === 'Sim' ? 1 : 0,
        igrejaAnterior: body.igrejaAnterior || null,
      },
    });

    // 4. Participação na Igreja (Ministérios)
    if (Array.isArray(body.ministerios) && body.ministerios.length > 0) {
      const ministeriosDB = await db.ministerio.findMany({
        where: { nome: { in: body.ministerios } },
      });

      for (const mDB of ministeriosDB) {
        await db.membroMinisterio.create({
          data: {
            membroId: novoMembro.id,
            ministerioId: mDB.id,
            dataInicio: new Date(),
            ativo: 1,
          },
        });
      }
    }

    // 5. Informações Adicionais / Observações
    await db.observacaoMembro.create({
      data: {
        membroId: novoMembro.id,
        talentos: body.talentos || null,
        necessidadesEspeciais: body.necessidadesEspeciais || null,
        contatoEmergencia: body.contatoEmergencia || null,
        telefoneEmergencia: body.telefoneEmergencia || null,
        observacoes: body.observacoes || null,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Cadastro realizado com sucesso!',
      numeroMembro,
      membroId: novoMembro.id
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE /api/membros?id=123 — Exclusão de Cadastro
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID não fornecido' }, { status: 400 });
    }

    await db.membro.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ success: true, message: 'Membro excluído com sucesso!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
