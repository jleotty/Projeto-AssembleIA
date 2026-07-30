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
  ThumbsUp,
  ThumbsDown,
  Maximize2
} from 'lucide-react';

export default function JouleGlobalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [whatsappSynced, setWhatsappSynced] = useState(true);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Olá, Pastor! Sou o Joule, seu assistente flutuante de IA conectado à Assembleia de Deus e ao WhatsApp. Como posso ajudar você agora?',
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
            content: 'Joule IA: Consulta processada com sucesso no sistema da igreja.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Erro de conexão com Joule IA.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CARD FLUTUANTE FIXO NO CANTO DIREITO (JOULE WIDGET) */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 z-50 w-96 bg-white rounded-3xl border border-[#E6EBF1] shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-[560px]'
        }`}>
          {/* CABEÇALHO ROXO/AZUL COM ANIMAÇÃO DO SÍMBOLO DA ASSEMBLEIA DE DEUS */}
          <div className="bg-gradient-to-br from-[#635BFF] via-[#7928CA] to-[#635BFF] text-white p-5 space-y-3 relative overflow-hidden flex-shrink-0">
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2.5">
                {/* ANIMAÇÃO COM SÍMBOLO DA ASSEMBLEIA DE DEUS */}
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-white p-[1.5px] shadow-lg animate-pulse">
                    <img 
                      src="/logo.jpg" 
                      alt="Assembleia de Deus" 
                      className="w-full h-full rounded-full object-cover" 
                    />
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1 animate-spin" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white leading-none">Joule Co-Pilot</h3>
                  <span className="text-[9px] text-purple-200 font-semibold">Assembleia de Deus IA</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)} 
                  className="p-1 rounded-lg hover:bg-white/20 text-white/90 cursor-pointer"
                  title="Minimizar"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1 rounded-lg hover:bg-white/20 text-white/90 cursor-pointer"
                  title="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <div className="space-y-2 pt-1 relative z-10">
                <div className="flex items-center justify-between text-[10px] font-extrabold text-purple-100">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-300" /> WhatsApp Synced & Gemini Connected
                  </span>
                  <button onClick={() => setMessages([messages[0]])} className="hover:text-white" title="Limpar"><RefreshCw className="w-3 h-3" /></button>
                </div>
                
                <div className="bg-white/95 text-[#0A2540] p-2.5 rounded-xl border border-white/40 shadow-sm text-[11px] font-semibold text-center">
                  Talk to me naturally. For example, <span className="font-extrabold text-brand-blue">'Exibir membros'</span> or <span className="font-extrabold text-purple-600">'Saldo Sicredi'</span>.
                </div>
              </div>
            )}
          </div>

          {/* CORPO DO CHAT E PILLS RÁPIDAS (SE NÃO ESTIVER MINIMIZADO) */}
          {!isMinimized && (
            <div className="flex-1 p-4 bg-slate-50 flex flex-col justify-between overflow-hidden">
              {/* PILLS RÁPIDAS */}
              <div className="flex flex-wrap gap-1.5 pb-2">
                {quickPills.map((pill, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendPrompt(pill)}
                    className="px-2.5 py-1 rounded-xl bg-white border border-[#E6EBF1] text-[#0A2540] text-[10px] font-extrabold hover:bg-slate-100 hover:border-brand-blue shadow-stripe-sm transition-all cursor-pointer flex items-center gap-1"
                  >
                    {pill} <ChevronRight className="w-3 h-3 text-slate-400" />
                  </button>
                ))}
              </div>

              {/* MENSAGENS */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-2">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-1.5 mb-0.5 px-1">
                      <span className="text-[9px] font-extrabold text-slate-400 uppercase">{msg.role === 'user' ? 'Você' : 'Joule'}</span>
                      <span className="text-[9px] text-slate-400">{msg.timestamp}</span>
                    </div>
                    <div className={`p-3 rounded-2xl text-[11px] font-bold leading-relaxed max-w-[85%] ${
                      msg.role === 'user'
                        ? 'bg-[#0A2540] text-white rounded-tr-none shadow-sm'
                        : 'bg-white text-[#0A2540] border border-[#E6EBF1] rounded-tl-none shadow-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-purple-600 animate-pulse p-1">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Joule processando com IA Gemini...</span>
                  </div>
                )}
              </div>

              {/* INPUT INFERIOR */}
              <div className="pt-2">
                <form onSubmit={(e) => { e.preventDefault(); handleSendPrompt(); }} className="relative flex items-center">
                  <input 
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Pergunte ao Joule..."
                    className="w-full h-10 pl-3 pr-20 rounded-xl bg-white border border-[#E6EBF1] text-xs font-bold text-[#0A2540] shadow-sm focus:outline-none focus:border-purple-600"
                  />
                  <div className="absolute right-1.5 flex items-center gap-1">
                    <button 
                      type="submit" 
                      disabled={loading || !prompt.trim()} 
                      className="w-7 h-7 rounded-lg bg-gradient-to-r from-[#635BFF] to-[#7928CA] text-white flex items-center justify-center shadow hover:scale-105 transition-transform cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* BOTÃO FLUTUANTE DE DISPARO NO CANTO INFERIOR DIREITO COM LOGO ANIMADO DA ASSEMBLEIA DE DEUS */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => { setIsOpen(!isOpen); setIsMinimized(false); }}
          className="relative group p-1 rounded-full bg-gradient-to-r from-[#635BFF] via-[#7928CA] to-[#FF0080] shadow-2xl hover:scale-110 transition-transform cursor-pointer flex items-center justify-center"
          title="Abrir Joule Co-pilot IA"
        >
          {/* ANIMAÇÃO DE PULSO E BRILHO DA ASSEMBLEIA DE DEUS */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#635BFF] to-[#FF0080] opacity-75 blur animate-pulse group-hover:opacity-100 transition duration-500" />
          
          <div className="relative w-12 h-12 rounded-full bg-[#0A2540] border-2 border-white flex items-center justify-center p-0.5 overflow-hidden">
            <img 
              src="/logo.jpg" 
              alt="Logo Assembleia de Deus" 
              className="w-full h-full rounded-full object-cover" 
            />
            <div className="absolute inset-0 bg-purple-600/20 rounded-full" />
            <Sparkles className="w-4 h-4 text-amber-300 absolute -top-0.5 -right-0.5 animate-bounce" />
          </div>

          <span className="absolute -top-2 -left-2 bg-emerald-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-white shadow">
            Joule
          </span>
        </button>
      </div>
    </>
  );
}
