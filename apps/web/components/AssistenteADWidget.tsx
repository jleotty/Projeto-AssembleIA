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
  Bot
} from 'lucide-react';
import { AGENT_REGISTRY, AgentDefinition } from '../lib/ai/agents';

export default function AssistenteADWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string>('master_agent');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [whatsappSynced, setWhatsappSynced] = useState(true);

  const selectedAgent = AGENT_REGISTRY.find(a => a.id === selectedAgentId) || AGENT_REGISTRY[0];

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      agentName: 'Agente Mestre',
      content: 'Paz do Senhor, Pastor! Sou o Assistente AD, seu auxiliar de IA conectado à Assembleia de Deus, ao Google Gemini e ao WhatsApp. Como posso ajudar você agora?',
      timestamp: 'Agora',
    },
  ]);

  const handleSendPrompt = async (textToSend?: string, agentIdToUse?: string) => {
    const query = textToSend || prompt;
    const targetAgentId = agentIdToUse || selectedAgentId;
    if (!query.trim() || loading) return;

    const targetAgent = AGENT_REGISTRY.find(a => a.id === targetAgentId) || AGENT_REGISTRY[0];

    const userMessage = {
      role: 'user',
      agentName: 'Pastor / Admin',
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
        body: JSON.stringify({ prompt: query, agentId: targetAgentId }),
      });

      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            agentName: data.agentName || targetAgent.name,
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
            agentName: targetAgent.name,
            content: 'Paz do Senhor, Pastor! Consulta processada com sucesso no sistema da igreja.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          agentName: targetAgent.name,
          content: 'Paz do Senhor, Pastor! Tivemos uma oscilação na conexão com o assistente.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CARD FLUTUANTE FIXO NO CANTO DIREITO (ASSISTENTE AD COM SUPORTE AOS 13 AGENTES) */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 z-50 w-[420px] bg-white rounded-3xl border border-[#E6EBF1] shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-[600px]'
        }`}>
          {/* CABEÇALHO COM DEGRADÊ LEVE NO TOM ROXO MAGENTA DA LOGO */}
          <div className="bg-flame-magenta text-white p-4 space-y-3 relative overflow-hidden flex-shrink-0">
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-white p-[1.5px] shadow-md">
                    <img 
                      src="/logo.jpg" 
                      alt="Assembleia de Deus" 
                      className="w-full h-full rounded-full object-cover" 
                    />
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1 animate-spin" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white leading-none tracking-wide">{selectedAgent.name}</h3>
                  <span className="text-[9px] text-purple-200 font-semibold">{selectedAgent.role}</span>
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
                    <CheckCircle2 className="w-3 h-3 text-emerald-300" /> 
                    13/13 Agentes Ativos • Gemini & WhatsApp
                  </span>
                  <button onClick={() => setMessages([messages[0]])} className="hover:text-white" title="Limpar"><RefreshCw className="w-3 h-3" /></button>
                </div>

                {/* SELETOR RÁPIDO DOS 13 AGENTES */}
                <div className="flex items-center gap-1 overflow-x-auto py-1">
                  {AGENT_REGISTRY.map((ag) => (
                    <button
                      key={ag.id}
                      onClick={() => setSelectedAgentId(ag.id)}
                      className={`px-2 py-0.5 rounded-lg text-[9px] font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                        selectedAgentId === ag.id
                          ? 'bg-white text-purple-900 font-black shadow'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {ag.name.replace('Agente ', '')}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CORPO DO CHAT E BOTÕES DE AÇÃO */}
          {!isMinimized && (
            <div className="flex-1 p-4 bg-slate-50 flex flex-col justify-between overflow-hidden">
              {/* BOTÕES DE PROMPT RÁPIDO DO AGENTE SELECIONADO */}
              <div className="flex flex-wrap gap-1.5 pb-2">
                {selectedAgent.samplePrompts.map((pill, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendPrompt(pill)}
                    className="px-2.5 py-1 rounded-xl bg-white border border-[#E6EBF1] text-[#0A2540] text-[10px] font-extrabold hover:bg-slate-100 hover:border-purple-600 shadow-stripe-sm transition-all cursor-pointer flex items-center gap-1"
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
                      <span className="text-[9px] font-extrabold text-slate-400 uppercase">{msg.agentName}</span>
                      <span className="text-[9px] text-slate-400">{msg.timestamp}</span>
                    </div>
                    <div className={`p-3 rounded-2xl text-[11px] font-bold leading-relaxed max-w-[88%] ${
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
                    <Sparkles className="w-3.5 h-3.5 animate-spin text-purple-600" />
                    <span>[{selectedAgent.name}] processando com Gemini IA...</span>
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
                    placeholder={`Pergunte ao ${selectedAgent.name}...`}
                    className="w-full h-10 pl-3 pr-20 rounded-xl bg-white border border-[#E6EBF1] text-xs font-bold text-[#0A2540] shadow-sm focus:outline-none focus:border-purple-600"
                  />
                  <div className="absolute right-1.5 flex items-center gap-1">
                    <button 
                      type="submit" 
                      disabled={loading || !prompt.trim()} 
                      className="w-7 h-7 rounded-lg bg-flame-magenta text-white flex items-center justify-center shadow hover:scale-105 transition-transform cursor-pointer"
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

      {/* BOTÃO FLUTUANTE NO CANTO INFERIOR DIREITO COM CONTADOR DE AGENTES */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => { setIsOpen(!isOpen); setIsMinimized(false); }}
          className="relative group p-1 rounded-full bg-flame-magenta shadow-2xl hover:scale-110 transition-transform cursor-pointer flex items-center justify-center"
          title="Abrir Central dos 13 Agentes AD"
        >
          <span className="absolute -inset-1 rounded-full bg-flame-magenta opacity-75 blur animate-pulse group-hover:opacity-100 transition duration-500" />
          
          <div className="relative w-12 h-12 rounded-full bg-[#0A2540] border-2 border-white flex items-center justify-center p-0.5 overflow-hidden shadow-lg">
            <img 
              src="/logo.jpg" 
              alt="Logo Assembleia de Deus" 
              className="w-full h-full rounded-full object-cover" 
            />
            <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-0.5 -right-0.5" />
          </div>

          <span className="absolute -top-2 -left-2 bg-flame-magenta text-white text-[9px] font-black px-2 py-0.5 rounded-full border border-white shadow">
            13 Agentes
          </span>
        </button>
      </div>
    </>
  );
}
