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
      orderBy: { dataAgendada: 'asc' },
      take: 30,
    });

    const escalas = await db.escalaAgendada.findMany({
      orderBy: { dataEscala: 'asc' },
      take: 30,
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

// POST /api/whatsapp — Envio e Agendamento Recorrente (Diário, Semanal, Mensal, Anual, Frequência no dia)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body.action || 'SEND_TEXT';

    // 1. Agendar Status Recorrente (Diário, Semanal, Mensal, Anual + Mídia)
    if (action === 'SCHEDULE_STATUS') {
      const mediaUrl = body.mediaBase64 || body.mediaUrl || '/uploads/membros/banner/000001_corpo.jpg';
      
      const statusObj = await db.statusWhatsapp.create({
        data: {
          titulo: body.titulo || 'Aviso Recorrente da Igreja',
          tipoMedia: 'IMAGEM_BANNER',
          mediaUrl: mediaUrl,
          legenda: body.legenda || body.text || '',
          dataAgendada: body.dataAgendada ? new Date(body.dataAgendada) : new Date(),
          recorrencia: body.recorrencia || 'UNICA', // UNICA, DIARIA, SEMANAL, MENSAL, ANUAL
          frequenciaDia: parseInt(body.frequenciaDia || '1', 10),
          diasSemana: Array.isArray(body.diasSemana) ? body.diasSemana.join(',') : (body.diasSemana || 'DOMINGO'),
          status: 'PENDENTE',
        },
      });

      // Disparar anexo físico se número especificado
      if (body.number) {
        await fetch(`${EVOLUTION_API_URL}/message/sendMedia/${INSTANCE_NAME}`, {
          method: 'POST',
          headers: {
            'apikey': EVOLUTION_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            number: body.number.replace(/\D/g, ''),
            mediaMessage: {
              mediatype: 'image',
              caption: statusObj.legenda || statusObj.titulo,
              media: mediaUrl,
            },
          }),
        }).catch(() => null);
      }

      return NextResponse.json({ 
        success: true, 
        message: `Automação Recorrente (${statusObj.recorrencia} - ${statusObj.frequenciaDia}x/dia) agendada com sucesso!`, 
        statusObj 
      });
    }

    // 2. Agendar Escala Recorrente (Diária, Semanal, Mensal)
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

    // 3. Envio Padrão
    const res = await fetch(`${EVOLUTION_API_URL}/message/sendText/${INSTANCE_NAME}`, {
      method: 'POST',
      headers: {
        'apikey': EVOLUTION_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: body.number.replace(/\D/g, ''),
        text: body.text,
      }),
    });

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
