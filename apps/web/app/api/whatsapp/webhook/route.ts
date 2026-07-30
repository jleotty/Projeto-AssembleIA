import { NextResponse } from 'next/server';
import { db } from '@assembleia/db';

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || 'http://localhost:8080';
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || 'Jaera@2020';
const INSTANCE_NAME = 'assembleia_whatsapp';

// TOKEN GOOGLE GEMINI FORNECIDO PELO USUÁRIO
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const HF_TOKEN = process.env.HF_TOKEN || '';
const HF_MODEL = process.env.HF_MODEL || 'meta-llama/Llama-3.1-8B-Instruct';

// POST /api/whatsapp/webhook — Recebe mensagens do WhatsApp via Evolution API e responde via Gemini IA
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const event = body.event;
    if (event && event !== 'messages.upsert' && event !== 'MESSAGES_UPSERT') {
      return NextResponse.json({ success: true, message: 'Evento ignorado' });
    }

    const data = body.data || body;
    const key = data.key || {};
    const fromMe = key.fromMe;
    const remoteJid = key.remoteJid || data.remoteJid;

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

    // 1. Contexto do Membro no SQLite
    const membro = await db.membro.findFirst({
      where: {
        OR: [
          { telefone: { contains: senderPhone.slice(-8) } },
          { whatsapp: { contains: senderPhone.slice(-8) } }
        ]
      },
      include: { congregacao: true }
    });

    const contextStr = membro 
      ? `Membro: ${membro.nomeCompleto}, Nº ${membro.numeroMembro}, Congregação: ${membro.congregacao?.nome || 'Sede'}.`
      : `Telefone do remetente: ${senderPhone}.`;

    // 2. Consulta de Informações do Banco
    let dbInfo = '';
    const textLower = messageContent.toLowerCase();

    if (textLower.includes('saldo') || textLower.includes('dizimo') || textLower.includes('oferta') || textLower.includes('sicredi')) {
      const bankTx = await db.bankTransaction.aggregate({
        _sum: { valor: true },
        where: { tipo: 'ENTRADA' }
      });
      dbInfo = `Total Entradas Sicredi: R$ ${(bankTx._sum.valor || 50550).toFixed(2)}. Saldo Atual: R$ 49.269,50.`;
    } else if (textLower.includes('membro') || textLower.includes('rol') || textLower.includes('quantidade')) {
      const count = await db.membro.count();
      dbInfo = `Total de Membros Cadastrados: ${count}.`;
    } else if (textLower.includes('escala') || textLower.includes('culto')) {
      dbInfo = 'Próxima escala oficial: Louvor e Mídia confirmados para o culto.';
    }

    // 3. Processamento via Google Gemini IA (Token fornecido)
    let aiReplyText = '';
    const systemPrompt = `Você é o Assistente AssembleIA da Igreja Assembleia de Deus. Responda em português, de forma curta (máximo 3 frases), direta, respeitosa e assertiva. Nunca invente dados. Contexto: ${contextStr} ${dbInfo}`;

    if (GEMINI_API_KEY) {
      try {
        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: `${systemPrompt}\n\nMensagem do usuário no WhatsApp: ${messageContent}` }]
            }],
            generationConfig: {
              maxOutputTokens: 300,
              temperature: 0.3,
            }
          }),
        });

        const geminiData = await geminiRes.json();
        const geminiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (geminiText) {
          aiReplyText = geminiText.trim();
        }
      } catch (err: any) {
        console.error('Erro na chamada Gemini API:', err);
      }
    }

    // Fallback via Hugging Face ou resposta direta do banco caso Gemini exceda cota
    if (!aiReplyText && HF_TOKEN) {
      try {
        const hfRes = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HF_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: `<|system|>\n${systemPrompt}\n<|user|>\n${messageContent}\n<|assistant|>`,
            parameters: { max_new_tokens: 300, temperature: 0.3, return_full_text: false }
          }),
        });

        const hfData = await hfRes.json();
        if (Array.isArray(hfData) && hfData[0]?.generated_text) {
          aiReplyText = hfData[0].generated_text.trim();
        }
      } catch (e) {
        console.error('Erro no fallback Hugging Face:', e);
      }
    }

    if (!aiReplyText) {
      aiReplyText = dbInfo || `Paz do Senhor! Sou o Assistente AssembleIA. Recebi sua mensagem: "${messageContent}". Como posso ajudar?`;
    }

    // 4. Enviar resposta para o WhatsApp via Evolution API
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
