import { NextResponse } from 'next/server';
import { db } from '@assembleia/db';

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || 'http://localhost:8080';
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || 'Jaera@2020';
const INSTANCE_NAME = 'assembleia_whatsapp';

// GET /api/whatsapp — Obtém status da conexão, agendamentos recorrentes de status e escalas
export async function GET() {
  try {
    const headers = {
      'apikey': EVOLUTION_API_KEY,
      'Content-Type': 'application/json',
    };

    let stateRes = await fetch(`${EVOLUTION_API_URL}/instance/connectionState/${INSTANCE_NAME}`, { headers });
    let stateData = await stateRes.json().catch(() => ({}));

    if (!stateRes.ok || stateData.status === 404) {
      const createRes = await fetch(`${EVOLUTION_API_URL}/instance/create`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          instanceName: INSTANCE_NAME,
          token: 'assembleia_token_123',
          qrcode: true,
          integration: 'WHATSAPP-BAILEYS',
        }),
      });
      stateData = await createRes.json().catch(() => ({}));
    }

    let qrCodeBase64 = null;
    let pairingCode = null;

    if (stateData?.instance?.state !== 'open') {
      const connectRes = await fetch(`${EVOLUTION_API_URL}/instance/connect/${INSTANCE_NAME}`, { headers });
      const connectData = await connectRes.json().catch(() => ({}));
      qrCodeBase64 = connectData?.base64 || connectData?.qrcode?.base64 || null;
      pairingCode = connectData?.pairingCode || null;
    }

    const agendamentos = await db.statusWhatsapp.findMany({
      orderBy: { dataAgendada: 'desc' },
      take: 50,
    });

    const escalas = await db.escalaAgendada.findMany({
      orderBy: { dataEscala: 'desc' },
      take: 50,
    });

    return NextResponse.json({
      success: true,
      instance: INSTANCE_NAME,
      state: stateData?.instance?.state || stateData?.state || 'connecting',
      qrCodeBase64,
      pairingCode,
      agendamentos,
      escalas,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      evolutionUrl: EVOLUTION_API_URL,
    }, { status: 500 });
  }
}

// POST /api/whatsapp — Envio Imediato e Agendamento Recorrente
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body.action || 'SEND_TEXT';

    // 1. Agendar ou Disparar Status / Transmissão de Mídia com Banner
    if (action === 'SCHEDULE_STATUS' || action === 'SEND_STATUS') {
      const rawMedia = body.mediaBase64 || body.mediaUrl || '/uploads/membros/banner/000001_corpo.jpg';
      
      // EVOLUTION API REQUER BASE64 PURO SEM PREFIXO 'data:image/...;base64,'
      let cleanMedia = rawMedia;
      if (cleanMedia.includes('base64,')) {
        cleanMedia = cleanMedia.split('base64,')[1];
      }

      const captionText = body.legenda ? `${body.titulo}\n\n${body.legenda}` : body.titulo || 'Comunicado Oficial AssembleIA';
      
      // Determinar números de destino: se número específico foi informado, usar ele.
      // Se não, buscar a lista de membros no banco para transmissão oficial
      let targetNumbers: string[] = [];

      if (body.number && body.number.trim() !== '') {
        targetNumbers.push(body.number.replace(/\D/g, ''));
      } else {
        const membrosComTel = await db.membro.findMany({
          where: { ativo: 1, OR: [{ telefone: { not: null } }, { whatsapp: { not: null } }] },
          take: 20,
        });

        const tels = membrosComTel
          .map(m => (m.whatsapp || m.telefone || '').replace(/\D/g, ''))
          .filter(t => t.length >= 10);

        if (tels.length > 0) {
          targetNumbers = tels;
        } else {
          targetNumbers = ['555195419525']; // fallback se nenhum membro tiver telefone
        }
      }

      let successCount = 0;
      let lastEvolutionResponse = null;

      // Disparar anexo de imagem + legenda para cada número de destino
      for (const num of targetNumbers) {
        try {
          const evoRes = await fetch(`${EVOLUTION_API_URL}/message/sendMedia/${INSTANCE_NAME}`, {
            method: 'POST',
            headers: {
              'apikey': EVOLUTION_API_KEY,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              number: num,
              media: cleanMedia,
              mediatype: 'image',
              caption: captionText,
            }),
          });

          const data = await evoRes.json();
          lastEvolutionResponse = data;
          if (evoRes.ok && (evoRes.status === 200 || evoRes.status === 201)) {
            successCount++;
          }
        } catch (err: any) {
          console.error(`Erro ao disparar via Evolution API para ${num}:`, err);
        }
      }

      // SALVAR REGISTRO NO SQLITE
      const statusObj = await db.statusWhatsapp.create({
        data: {
          titulo: body.titulo || 'Aviso Recorrente da Igreja',
          tipoMedia: 'IMAGEM_BANNER',
          mediaUrl: rawMedia,
          legenda: captionText,
          dataAgendada: body.dataAgendada ? new Date(body.dataAgendada) : new Date(),
          recorrencia: body.recorrencia || 'DIARIA',
          frequenciaDia: parseInt(body.frequenciaDia || '1', 10),
          diasSemana: Array.isArray(body.diasSemana) ? body.diasSemana.join(',') : (body.diasSemana || 'DOMINGO'),
          status: successCount > 0 ? 'ENVIADO' : 'PENDENTE',
        },
      });

      return NextResponse.json({ 
        success: true, 
        message: `Comunicado/Status disparado com sucesso para ${successCount} contato(s) no WhatsApp!`,
        statusObj,
        lastEvolutionResponse
      });
    }

    // 2. Agendar Escala Recorrente
    if (action === 'SCHEDULE_ESCALA') {
      const escalaObj = await db.escalaAgendada.create({
        data: {
          departamento: body.departamento || 'Louvor',
          dataEscala: body.dataEscala ? new Date(body.dataEscala) : new Date(),
          conteudo: body.conteudo || 'Escala oficial de voluntários',
          recorrencia: body.recorrencia || 'SEMANAL',
          frequenciaDia: parseInt(body.frequenciaDia || '1', 10),
          enviada: 0,
        },
      });

      return NextResponse.json({ 
        success: true, 
        message: `Escala Recorrente (${escalaObj.recorrencia}) agendada com sucesso!`, 
        escalaObj 
      });
    }

    // 3. Envio de Texto Padrão
    const targetNumber = (body.number || '555195419525').replace(/\D/g, '');
    const res = await fetch(`${EVOLUTION_API_URL}/message/sendText/${INSTANCE_NAME}`, {
      method: 'POST',
      headers: {
        'apikey': EVOLUTION_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: targetNumber,
        text: body.text || 'Notificação oficial AssembleIA',
      }),
    });

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE /api/whatsapp — Cancelar/Deletar Agendamentos
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type') || 'status';

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID do agendamento é obrigatório.' }, { status: 400 });
    }

    if (type === 'escala') {
      await db.escalaAgendada.delete({ where: { id: parseInt(id, 10) } });
    } else {
      await db.statusWhatsapp.delete({ where: { id: parseInt(id, 10) } });
    }

    return NextResponse.json({ success: true, message: 'Agendamento cancelado com sucesso!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
