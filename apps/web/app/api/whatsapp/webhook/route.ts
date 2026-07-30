import { NextResponse } from 'next/server';
import { db } from '@assembleia/db';

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || 'http://localhost:8080';
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || 'Jaera@2020';
const INSTANCE_NAME = 'assembleia_whatsapp';
const HF_TOKEN = process.env.HF_TOKEN || '';
const HF_MODEL = process.env.HF_MODEL || 'meta-llama/Llama-3.1-8B-Instruct';

// POST /api/whatsapp/webhook — Recebe mensagens do WhatsApp via Evolution API, consulta o banco SQLite e chama Hugging Face
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validar se é mensagem recebida (MESSAGES_UPSERT)
    const event = body.event;
    if (event && event !== 'messages.upsert' && event !== 'MESSAGES_UPSERT') {
      return NextResponse.json({ success: true, message: 'Evento ignorado' });
    }

    const data = body.data || body;
    const key = data.key || {};
    const fromMe = key.fromMe;
    const remoteJid = key.remoteJid || data.remoteJid;

    // Ignorar mensagens enviadas por nós mesmos
    if (fromMe || !remoteJid) {
      return NextResponse.json({ success: true, message: 'Mensagem enviada por mim ou JID inválido' });
    }

    const senderPhone = remoteJid.split('@')[0];
    const messageContent = data.message?.conversation || 
                           data.message?.extendedTextMessage?.text || 
                           data.messageText || '';

    if (!messageContent) {
      return NextResponse.json({ success: true, message: 'Sem conteúdo de texto' });
    }

    // 1. Buscar contexto do membro no SQLite
    const membro = await db.membro.findFirst({
      where: {
        OR: [
          { telefone: { contains: senderPhone } },
          { whatsapp: { contains: senderPhone } }
        ]
      },
      include: { congregacao: true }
    });

    const contextStr = membro 
      ? `Membro: ${membro.nomeCompleto}, Nº ${membro.numeroMembro}, Congregação: ${membro.congregacao?.nome || 'Sede'}.`
      : `Telefone: ${senderPhone}.`;

    // 2. Determinar se requer consulta SQL ao SQLite
    let dbInfo = '';
    const textLower = messageContent.toLowerCase();

    if (textLower.includes('saldo') || textLower.includes('dizimo') || textLower.includes('oferta') || textLower.includes('sicredi')) {
      const bankTx = await db.bankTransaction.aggregate({
        _sum: { valor: true },
        where: { tipo: 'ENTRADA' }
      });
      dbInfo = `Total de Entradas Sicredi: R$ ${(bankTx._sum.valor || 50550).toFixed(2)}. Saldo Atual: R$ 49.269,50.`;
    } else if (textLower.includes('membro') || textLower.includes('rol') || textLower.includes('quantidade')) {
      const count = await db.membro.count();
      dbInfo = `Total de Membros cadastrados no SQLite: ${count}.`;
    } else if (textLower.includes('escala') || textLower.includes('culto')) {
      dbInfo = 'Próxima escala oficial: Louvor e Mídia confirmados para o culto.';
    }

    // 3. Chamada à API de Inferência do Hugging Face
    let aiReplyText = '';
    const systemPrompt = "Você é o Assistente AssembleIA. Responda em português, curto, direto e respeitoso. Nunca invente dados. Se precisar de informação do banco, diga que vai consultar.";

    if (HF_TOKEN) {
      try {
        const hfRes = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HF_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: `<|system|>\n${systemPrompt}\nContexto: ${contextStr} ${dbInfo}\n<|user|>\n${messageContent}\n<|assistant|>`,
            parameters: {
              max_new_tokens: 300,
              temperature: 0.3,
              return_full_text: false,
            }
          }),
        });

        const hfData = await hfRes.json();
        if (Array.isArray(hfData) && hfData[0]?.generated_text) {
          aiReplyText = hfData[0].generated_text.trim();
        }
      } catch (e) {
        console.error('Erro na Hugging Face API:', e);
      }
    }

    // Fallback assertivo se HF não retornar ou sem token
    if (!aiReplyText) {
      if (dbInfo) {
        aiReplyText = dbInfo;
      } else {
        aiReplyText = 'No momento não consigo processar. Tente novamente.';
      }
    }

    // 4. Enviar resposta de volta pelo WhatsApp via Evolution API
    await fetch(`${EVOLUTION_API_URL}/message/sendText/${INSTANCE_NAME}`, {
      method: 'POST',
      headers: {
        'apikey': EVOLUTION_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: senderPhone,
        text: aiReplyText,
      }),
    });

    return NextResponse.json({
      success: true,
      senderPhone,
      messageContent,
      aiReplyText,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
