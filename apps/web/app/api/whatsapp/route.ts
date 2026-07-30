import { NextResponse } from 'next/server';
import { db } from '@assembleia/db';

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || 'http://localhost:8080';
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || 'Jaera@2020';
const INSTANCE_NAME = 'assembleia_whatsapp';

// GET /api/whatsapp — Obtém status da conexão, QR Code e agendamentos de status/escalas
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
      take: 20,
    });

    const escalas = await db.escalaAgendada.findMany({
      orderBy: { dataEscala: 'asc' },
      take: 20,
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

// POST /api/whatsapp — Envio de mensagens, agendamento de status (texto+mídia) e envio de escalas por data
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body.action || 'SEND_TEXT';

    // 1. Agendar Status (Texto + Mídia/Banner)
    if (action === 'SCHEDULE_STATUS') {
      const statusObj = await db.statusWhatsapp.create({
        data: {
          titulo: body.titulo || 'Aviso da Igreja',
          tipoMedia: body.mediaUrl ? 'IMAGEM_BANNER' : 'TEXTO',
          mediaUrl: body.mediaUrl || null,
          legenda: body.legenda || body.text || '',
          dataAgendada: body.dataAgendada ? new Date(body.dataAgendada) : new Date(),
          status: 'PENDENTE',
        },
      });
      return NextResponse.json({ success: true, message: 'Status WhatsApp agendado com sucesso!', statusObj });
    }

    // 2. Automar / Agendar Escala para qualquer data específica
    if (action === 'SCHEDULE_ESCALA') {
      const escalaObj = await db.escalaAgendada.create({
        data: {
          departamento: body.departamento || 'Louvor',
          dataEscala: body.dataEscala ? new Date(body.dataEscala) : new Date(),
          conteudo: body.conteudo || 'Escala de Louvor e Mídia',
          enviada: 0,
        },
      });
      return NextResponse.json({ success: true, message: `Escala agendada para ${body.dataEscala}!`, escalaObj });
    }

    // 3. Envio de Mídia / Banner de Membro ou Evento via WhatsApp
    if (action === 'SEND_MEDIA') {
      const res = await fetch(`${EVOLUTION_API_URL}/message/sendMedia/${INSTANCE_NAME}`, {
        method: 'POST',
        headers: {
          'apikey': EVOLUTION_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          number: body.number.replace(/\D/g, ''),
          mediaMessage: {
            mediatype: 'image',
            caption: body.caption || '',
            media: body.mediaUrl,
          },
        }),
      });
      const data = await res.json();
      return NextResponse.json({ success: true, data });
    }

    // 4. Envio de Texto Padrão
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
