import { NextResponse } from 'next/server';
import { db } from '@assembleia/db';

// GET /api/membros — Consulta principal de membros
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const whereClause = {
      ativo: 1,
      OR: query ? [
        { nomeCompleto: { contains: query } },
        { cpf: { contains: query } },
        { telefone: { contains: query } },
        { numeroMembro: { contains: query } },
      ] : undefined,
    };

    const total = await db.membro.count({ where: whereClause });

    const membros = await db.membro.findMany({
      where: whereClause,
      include: {
        congregacao: true,
        familiares: true,
        filhos: true,
        vidaEspiritual: true,
        observacoes: true,
        fotos: true,
        carteirinha: true,
        membroMinisterios: {
          include: { ministerio: true }
        }
      },
      orderBy: { nomeCompleto: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({ success: true, total, page, limit, data: membros });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/membros — Cadastro de Membro
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fotoCarteirinha = body.fotoCarteirinha || body.foto;
    if (!fotoCarteirinha) {
      return NextResponse.json({
        success: false,
        error: 'Foto de carteirinha é OBRIGATÓRIA (rosto nítido, fundo limpo). Cadastro rejeitado.',
      }, { status: 400 });
    }

    const cleanCpf = body.cpf && body.cpf.trim() !== '' ? body.cpf.trim() : null;

    if (cleanCpf) {
      const cpfExistente = await db.membro.findUnique({
        where: { cpf: cleanCpf }
      });
      if (cpfExistente) {
        return NextResponse.json({
          success: false,
          error: `O CPF ${cleanCpf} já está cadastrado para o membro ${cpfExistente.nomeCompleto}.`,
        }, { status: 400 });
      }
    }

    const totalCount = await db.membro.count();
    const numeroMembro = `AD-${new Date().getFullYear()}-${String(totalCount + 1).padStart(4, '0')}`;

    const congregacaoPadrao = await db.congregacao.findFirst();

    const novoMembro = await db.membro.create({
      data: {
        numeroMembro,
        congregacaoId: congregacaoPadrao?.id || 1,
        nomeCompleto: body.nomeCompleto,
        dataNascimento: body.dataNascimento ? new Date(body.dataNascimento) : null,
        sexo: body.sexo,
        estadoCivil: body.estadoCivil,
        cpf: cleanCpf,
        rg: body.rg && body.rg.trim() !== '' ? body.rg.trim() : null,
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
        foto: fotoCarteirinha,
        ativo: 1,
      },
    });

    await db.fotoMembro.create({
      data: {
        membroId: novoMembro.id,
        tipo: 'CARTEIRINHA',
        arquivo: `${numeroMembro}.jpg`,
        caminho: fotoCarteirinha,
        extensao: 'jpg',
        principal: 1,
      },
    });

    if (body.fotoBanner) {
      await db.fotoMembro.create({
        data: {
          membroId: novoMembro.id,
          tipo: 'BANNER',
          arquivo: `${numeroMembro}_banner.jpg`,
          caminho: body.fotoBanner,
          extensao: 'jpg',
          principal: 0,
        },
      });
    }

    const qrCodeContent = `https://assembleia.com/verificar-carteira?membroId=${novoMembro.id}&numero=${numeroMembro}`;

    await db.carteirinha.create({
      data: {
        membroId: novoMembro.id,
        numero: numeroMembro,
        dataEmissao: new Date(),
        validade: new Date(new Date().setFullYear(new Date().getFullYear() + 5)),
        arquivo: `carteirinhas/${numeroMembro}.png`,
        qrCode: qrCodeContent,
      },
    });

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
      membroId: novoMembro.id,
      qrCode: qrCodeContent
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT /api/membros — Atualização de Cadastro Existente
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const id = parseInt(body.id, 10);

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID do membro é obrigatório para edição.' }, { status: 400 });
    }

    const cleanCpf = body.cpf && body.cpf.trim() !== '' ? body.cpf.trim() : null;

    if (cleanCpf) {
      const cpfOutro = await db.membro.findFirst({
        where: { cpf: cleanCpf, NOT: { id } }
      });
      if (cpfOutro) {
        return NextResponse.json({
          success: false,
          error: `O CPF ${cleanCpf} já está em uso pelo membro ${cpfOutro.nomeCompleto}.`,
        }, { status: 400 });
      }
    }

    // 1. Atualizar dados principais
    const membroAtualizado = await db.membro.update({
      where: { id },
      data: {
        nomeCompleto: body.nomeCompleto,
        dataNascimento: body.dataNascimento ? new Date(body.dataNascimento) : null,
        sexo: body.sexo,
        estadoCivil: body.estadoCivil,
        cpf: cleanCpf,
        rg: body.rg && body.rg.trim() !== '' ? body.rg.trim() : null,
        telefone: body.telefone || null,
        whatsapp: body.whatsapp || body.telefone || null,
        email: body.email || null,
        endereco: body.endereco || null,
        numero: body.numero || null,
        bairro: body.bairro || null,
        cidade: body.cidade || null,
        estado: body.estado || null,
        cep: body.cep || null,
        foto: body.fotoCarteirinha || undefined,
      },
    });

    // 2. Atualizar Foto 3x4 se enviada
    if (body.fotoCarteirinha) {
      const fotoExiste = await db.fotoMembro.findFirst({
        where: { membroId: id, tipo: 'CARTEIRINHA' }
      });

      if (fotoExiste) {
        await db.fotoMembro.update({
          where: { id: fotoExiste.id },
          data: { caminho: body.fotoCarteirinha }
        });
      } else {
        await db.fotoMembro.create({
          data: {
            membroId: id,
            tipo: 'CARTEIRINHA',
            arquivo: `${membroAtualizado.numeroMembro}.jpg`,
            caminho: body.fotoCarteirinha,
            extensao: 'jpg',
            principal: 1,
          }
        });
      }
    }

    // 3. Atualizar Foto Banner se enviada
    if (body.fotoBanner) {
      const bannerExiste = await db.fotoMembro.findFirst({
        where: { membroId: id, tipo: 'BANNER' }
      });

      if (bannerExiste) {
        await db.fotoMembro.update({
          where: { id: bannerExiste.id },
          data: { caminho: body.fotoBanner }
        });
      } else {
        await db.fotoMembro.create({
          data: {
            membroId: id,
            tipo: 'BANNER',
            arquivo: `${membroAtualizado.numeroMembro}_banner.jpg`,
            caminho: body.fotoBanner,
            extensao: 'jpg',
            principal: 0,
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Cadastro de ${membroAtualizado.nomeCompleto} atualizado com sucesso!`,
      data: membroAtualizado,
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
