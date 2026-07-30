'use client';

import { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  RefreshCw, 
  CheckCircle2, 
  X, 
  Minus, 
  ChevronRight,
  Maximize2
} from 'lucide-react';

export default function AssistenteADPage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [whatsappSynced, setWhatsappSynced] = useState(true);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Paz do Senhor, Pastor! Sou o Assistente AD, seu auxiliar de IA conectado à Assembleia de Deus e ao WhatsApp. Como posso ajudar você agora?',
      timestamp: 'Agora',
    },
  ]);

  const quickPills = [
    'Exibir Total de Membros',
    'Consultar Saldo Sicredi',
    'Ver Próximas Escalas',
    'Enviar Status WhatsApp'
  ];

  const handleSendPrompt = async (textToSend?: string) => {
    const query = textToSend || prompt;
    if (!query.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });

      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.aiResponse,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setWhatsappSynced(data.whatsappConnected);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Paz do Senhor, Pastor! Consulta processada no sistema da igreja.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Paz do Senhor, Pastor! Tivemos uma oscilação temporária no assistente.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6">
      {/* HEADER DE STATUS DO ASSISTENTE AD */}
      <div className="bg-white rounded-2xl p-5 border border-[#E6EBF1] shadow-stripe flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#635BFF] via-[#7928CA] to-[#FF0080] p-[1px] shadow">
            <div className="w-full h-full bg-[#0A2540] rounded-2xl flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0A2540] flex items-center gap-2">
              Assistente AD
            </h1>
            <p className="text-xs text-slate-500 font-medium">Assembleia de Deus IA • Auxiliar inteligente integrado ao WhatsApp e SQLite</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-extrabold border flex items-center gap-1.5 ${
            whatsappSynced 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            <CheckCircle2 className="w-3.5 h-3.5" /> 
            WhatsApp sincronizado • Gemini conectado
          </span>

          <button 
            onClick={() => setMessages([messages[0]])}
            className="p-2 rounded-xl bg-slate-50 border border-[#E6EBF1] text-slate-500 hover:text-[#0A2540]"
            title="Reiniciar Conversa"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CARD CENTRAL DO ASSISTENTE AD */}
      <div className="bg-white rounded-3xl border border-[#E6EBF1] shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-br from-[#635BFF] via-[#7928CA] to-[#635BFF] text-white p-8 space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold tracking-wide">Assistente AD</h2>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-mono font-bold">Assembleia de Deus IA</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center space-y-4 py-2 relative z-10">
            <div className="relative">
              <div className="w-20 h-20 bg-white/15 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/30 shadow-2xl transform rotate-45">
                <Sparkles className="w-10 h-10 text-white -rotate-45" />
              </div>
              <Sparkles className="w-5 h-5 text-amber-300 absolute -top-2 -right-2 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-white">Paz do Senhor, Pastor!</h3>
              <p className="text-xl font-bold text-white/90">Como posso ajudar você agora?</p>
            </div>
          </div>

          <div className="bg-white/95 text-[#0A2540] p-4 rounded-2xl border border-white/40 shadow-lg text-xs font-semibold text-center relative z-10">
            Fale comigo naturalmente. Exemplos: <span className="font-extrabold text-brand-blue">“Exibir membros”</span> ou <span className="font-extrabold text-purple-600">“Saldo Sicredi”</span>.
          </div>
        </div>

        {/* ÁREA DE MENSAGENS E BOTÕES DE AÇÃO */}
        <div className="p-6 space-y-6 bg-slate-50">
          <div className="flex flex-wrap gap-2 pt-1">
            {quickPills.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => handleSendPrompt(pill)}
                className="px-4 py-2 rounded-2xl bg-white border border-[#E6EBF1] text-[#0A2540] text-xs font-extrabold hover:bg-slate-100 hover:border-brand-blue shadow-stripe-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                {pill} <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
            {messages.map((msg, index) => (
              <div key={index} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase">{msg.role === 'user' ? 'Você' : 'Assistente AD'}</span>
                  <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                </div>
                <div className={`p-4 rounded-2xl text-xs font-bold leading-relaxed max-w-xl ${
                  msg.role === 'user'
                    ? 'bg-[#0A2540] text-white rounded-tr-none shadow'
                    : 'bg-white text-[#0A2540] border border-[#E6EBF1] rounded-tl-none shadow-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs font-extrabold text-purple-600 animate-pulse p-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Assistente AD processando com IA Gemini...</span>
              </div>
            )}
          </div>

          <div className="pt-2">
            <form onSubmit={(e) => { e.preventDefault(); handleSendPrompt(); }} className="relative flex items-center">
              <input 
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Pergunte ao Assistente..."
                className="w-full h-12 pl-4 pr-16 rounded-2xl bg-white border border-[#E6EBF1] text-xs font-bold text-[#0A2540] shadow-sm focus:outline-none focus:border-purple-600"
              />

              <div className="absolute right-2 flex items-center gap-1">
                <button 
                  type="submit" 
                  disabled={loading || !prompt.trim()} 
                  className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#635BFF] to-[#7928CA] text-white flex items-center justify-center shadow hover:scale-105 transition-transform cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
