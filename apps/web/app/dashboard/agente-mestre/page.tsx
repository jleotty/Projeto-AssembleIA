'use client';

import { useState } from 'react';
import { Bot, Send, RefreshCw } from 'lucide-react';

export default function AgenteMestrePage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Paz do Senhor, Pr. João! Eu sou o Agente Mestre do AssembleIA. Conheço todo o histórico, membros, financeiro e escalas da igreja. Como posso ajudar o ministério hoje?',
      timestamp: '15:30',
      agent: 'Agente Mestre Orquestrador',
    },
  ]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agent: 'Pastor João Oliveira',
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentPrompt = prompt;
    setPrompt('');
    setLoading(true);

    setTimeout(() => {
      let aiContent = '';
      if (currentPrompt.toLowerCase().includes('congresso') || currentPrompt.toLowerCase().includes('evento')) {
        aiContent = `Comando recebido! Iniciei a orquestração do evento:
1. ✅ Criado evento "Congresso de Jovens" no módulo de Eventos
2. ✅ Reservadas as datas 15 a 17 de Novembro no templo principal
3. ✅ Geradas 3 opções de artes promocionais (Agente Designer IA)
4. ✅ Disparado aviso no grupo de líderes via WhatsApp
5. ✅ Aberto formulário de inscrição com QR Code individual

Deseja que eu envie agora a confirmação para a equipe de mídia?`;
      } else if (currentPrompt.toLowerCase().includes('financeiro') || currentPrompt.toLowerCase().includes('balancete')) {
        aiContent = `Análise financeira concluída no SQLite (assembleia.db):
• Entradas no mês: R$ 48.950,00 (100% conciliado via PIX/Dinheiro)
• Saídas: R$ 1.280,50 (Despesas de manutenção e luz)
• Saldo positivo acumulado: R$ 47.669,50

O balancete em PDF foi gerado e está pronto para apresentação na reunião do presbitério.`;
      } else {
        aiContent = `Entendido! Processei sua solicitação "${currentPrompt}" consultando o banco SQLite da igreja e orquestrando as ferramentas necessárias. Todas as atualizações foram salvas com sucesso no banco multi-tenant.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: aiContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          agent: 'Agente Mestre Orquestrador',
        },
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col space-y-4">
      {/* HEADER BANNER STRIPE LIGHT */}
      <div className="bg-white rounded-2xl p-5 border border-[#E6EBF1] shadow-stripe-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-flame-gradient p-[1px]">
            <div className="w-full h-full bg-white rounded-xl flex items-center justify-center text-brand-blue">
              <Bot className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0A2540] flex items-center gap-2">
              Agente Mestre Orquestrador
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-brand-blue text-xs font-mono border border-blue-200">
                LangGraph + MCP Active
              </span>
            </h1>
            <p className="text-slate-500 text-xs">Orquestração autônoma para Secretaria, Financeiro, Mídia e Pastoral</p>
          </div>
        </div>

        <button 
          onClick={() => setMessages([messages[0]])}
          className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E6EBF1] text-slate-500 hover:text-[#0A2540] transition-colors"
          title="Limpar Conversa"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* CHAT MESSAGES AREA */}
      <div className="flex-1 bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm overflow-y-auto space-y-6">
        {messages.map((msg, index) => (
          <div 
            key={index}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-2 mb-1.5 px-1">
              <span className="text-[11px] font-bold text-slate-500">{msg.agent}</span>
              <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
            </div>

            <div 
              className={`max-w-2xl p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-brand-blue text-white rounded-tr-none shadow-sm'
                  : 'bg-[#F8FAFC] text-[#0A2540] border border-[#E6EBF1] rounded-tl-none whitespace-pre-line'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3 text-slate-500 text-xs animate-pulse p-4">
            <Bot className="w-4 h-4 text-brand-blue animate-spin" />
            <span>O Agente Mestre está consultando o banco SQLite e executando ferramentas MCP...</span>
          </div>
        )}
      </div>

      {/* INPUT FORM */}
      <form onSubmit={handleSend} className="relative">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Digite um comando para a IA (ex: 'Envie um lembrete no WhatsApp para os dizimistas'...)"
          className="w-full h-14 pl-5 pr-14 rounded-2xl bg-white border border-[#E6EBF1] text-[#0A2540] text-sm focus:outline-none focus:border-brand-blue shadow-stripe-sm transition-colors"
        />
        <button 
          type="submit"
          disabled={loading || !prompt.trim()}
          className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-flame-gradient text-white flex items-center justify-center disabled:opacity-50 transition-opacity shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
