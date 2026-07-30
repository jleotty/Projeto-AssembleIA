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

// POST /api/whatsapp — Envio Imediato e Agendamento Recorrente
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body.action || 'SEND_TEXT';

    // 1. Agendar ou Disparar Status com Foto de Banner / Mídia
    if (action === 'SCHEDULE_STATUS' || action === 'SEND_STATUS') {
      const mediaUrl = body.mediaBase64 || body.mediaUrl || '/uploads/membros/banner/000001_corpo.jpg';
      const captionText = body.legenda ? `${body.titulo}\n\n${body.legenda}` : body.titulo || 'Comunicado Oficial AssembleIA';
      const targetNumber = (body.number || '555195419525').replace(/\D/g, '');

      // DISPARO IMEDIATO VIA EVOLUTION API COM PAYLOAD FLAT CORRETO
      let evolutionSuccess = false;
      let evolutionResponse = null;

      try {
        const evoRes = await fetch(`${EVOLUTION_API_URL}/message/sendMedia/${INSTANCE_NAME}`, {
          method: 'POST',
          headers: {
            'apikey': EVOLUTION_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            number: targetNumber,
            media: mediaUrl,
            mediatype: 'image',
            caption: captionText,
          }),
        });

        evolutionResponse = await evoRes.json();
        evolutionSuccess = evoRes.ok && (evoRes.status === 200 || evoRes.status === 201);
      } catch (err: any) {
        console.error('Erro ao chamar Evolution API sendMedia:', err);
      }

      // GRAVAR RECORD NO BANCO SQLITE
      const statusObj = await db.statusWhatsapp.create({
        data: {
          titulo: body.titulo || 'Aviso Recorrente da Igreja',
          tipoMedia: 'IMAGEM_BANNER',
          mediaUrl: mediaUrl,
          legenda: captionText,
          dataAgendada: body.dataAgendada ? new Date(body.dataAgendada) : new Date(),
          recorrencia: body.recorrencia || 'DIARIA',
          frequenciaDia: parseInt(body.frequenciaDia || '1', 10),
          diasSemana: Array.isArray(body.diasSemana) ? body.diasSemana.join(',') : (body.diasSemana || 'DOMINGO'),
          status: evolutionSuccess ? 'ENVIADO' : 'PENDENTE',
        },
      });

      return NextResponse.json({ 
        success: true, 
        message: evolutionSuccess 
          ? `Status e anexo de mídia disparados com sucesso no WhatsApp (${targetNumber})!`
          : `Agendamento salvo no banco. Status Evolution API: ${JSON.stringify(evolutionResponse)}`,
        statusObj,
        evolutionResponse
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
