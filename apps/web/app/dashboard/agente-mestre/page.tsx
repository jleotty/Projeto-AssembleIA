'use client';

import { useState } from 'react';
import { 
  Bot, 
  Send, 
  RefreshCw, 
  Workflow, 
  Zap, 
  MessageSquare, 
  Database, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  Share2, 
  Activity,
  Cpu,
  Layers,
  Settings,
  ShieldCheck,
  FileText
} from 'lucide-react';

export default function AgenteMestrePage() {
  const [activeTab, setActiveTab] = useState<'canvas' | 'chat' | 'logs'>('canvas');
  const [runningWorkflow, setRunningWorkflow] = useState(false);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Chat State
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Paz do Senhor, Pr. João! Eu sou o Agente Mestre (Joule AI). Conheço todo o histórico, membros, financeiro e escalas da igreja. Como posso orquestrar seu ministério hoje?',
      timestamp: '15:30',
      agent: 'Joule Orquestrador IA',
    },
  ]);

  // Simulação de Execução do Fluxo Joule
  const handleRunJouleWorkflow = () => {
    setRunningWorkflow(true);
    setActiveNode(1);

    setTimeout(() => setActiveNode(2), 700);
    setTimeout(() => setActiveNode(3), 1400);
    setTimeout(() => setActiveNode(4), 2100);
    setTimeout(() => {
      setActiveNode(null);
      setRunningWorkflow(false);
      alert('⚡ Fluxo Joule executado com sucesso! 4 nós processados em 2.1s.');
    }, 2800);
  };

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
        aiContent = `⚡ Orquestração Joule Concluída (3.2s):
1. ✅ Criado evento "Congresso de Jovens" no módulo de Eventos
2. ✅ Reservadas as datas no templo principal
3. ✅ Processado via Google Gemini IA
4. ✅ Disparado comunicado no grupo de líderes via WhatsApp Evolution API
5. ✅ Gerada carteirinha e QR Code individual de participante.`;
      } else if (currentPrompt.toLowerCase().includes('financeiro') || currentPrompt.toLowerCase().includes('saldo')) {
        aiContent = `📊 Análise Conciliada via Joule & Sicredi:
• Entradas no mês: R$ 48.950,00 (100% conciliado via PIX)
• Saídas: R$ 1.280,50 (Manutenção e luz)
• Saldo Atual Disponível: R$ 47.669,50
O relatório oficial foi formatado e anexado.`;
      } else {
        aiContent = `Entendido! Processei sua solicitação "${currentPrompt}" executando o fluxo autônomo Joule com integração ao banco SQLite, Google Gemini e WhatsApp Evolution API.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: aiContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          agent: 'Joule Orquestrador IA',
        },
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* HEADER PRINCIPAL NO ESTILO STRIPE / INSPIRATIONS */}
      <div className="bg-white rounded-3xl p-6 border border-[#E6EBF1] shadow-stripe flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-flame-gradient p-[1px] shadow-md flex-shrink-0">
            <div className="w-full h-full bg-[#0A2540] rounded-2xl flex items-center justify-center text-white">
              <Zap className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-[#0A2540]">
                Joule AI Agent Builder & Workflow
              </h1>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Engine Ativa
              </span>
            </div>
            <p className="text-xs text-[#425466] mt-1 font-semibold">
              Plataforma de automação visual de agentes inteligentes, webhooks do WhatsApp e conciliação bancária.
            </p>
          </div>
        </div>

        {/* TABS DE NAVEGAÇÃO E BOTÃO DE EXECUÇÃO */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 bg-[#F8FAFC] rounded-2xl border border-[#E6EBF1]">
            <button 
              onClick={() => setActiveTab('canvas')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'canvas' ? 'bg-[#0A2540] text-white shadow-sm' : 'text-slate-600 hover:text-[#0A2540]'
              }`}
            >
              <Workflow className="w-4 h-4" /> Canvas (Joule Workflow)
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'chat' ? 'bg-[#0A2540] text-white shadow-sm' : 'text-slate-600 hover:text-[#0A2540]'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Chat Orquestrador
            </button>
            <button 
              onClick={() => setActiveTab('logs')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'logs' ? 'bg-[#0A2540] text-white shadow-sm' : 'text-slate-600 hover:text-[#0A2540]'
              }`}
            >
              <Activity className="w-4 h-4" /> Logs de Execução
            </button>
          </div>

          <button 
            onClick={handleRunJouleWorkflow}
            disabled={runningWorkflow}
            className="px-5 py-3 rounded-2xl bg-flame-gradient text-white text-xs font-extrabold shadow-lg hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Play className={`w-4 h-4 ${runningWorkflow ? 'animate-spin' : ''}`} /> Simular Fluxo Joule
          </button>
        </div>
      </div>

      {/* ABA 1: VISUAL CANVAS DO FLUXO JOULE (NODE BUILDER INSPIRADO NO VÍDEO N8N / JOULE) */}
      {activeTab === 'canvas' && (
        <div className="space-y-6">
          {/* BARRA DE METRICAS DE EXECUÇÃO */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#E6EBF1] shadow-stripe-sm flex items-center gap-3">
              <div className="p-3 bg-blue-50 text-brand-blue rounded-xl font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">MODELO PRINCIPAL</span>
                <span className="text-xs font-extrabold text-[#0A2540]">Google Gemini 2.0 IA</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E6EBF1] shadow-stripe-sm flex items-center gap-3">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">NÓS CONECTADOS</span>
                <span className="text-xs font-extrabold text-[#0A2540]">4 Nós Ativos</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E6EBF1] shadow-stripe-sm flex items-center gap-3">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">BANCO MULTI-TENANT</span>
                <span className="text-xs font-extrabold text-[#0A2540]">SQLite Conciliado</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E6EBF1] shadow-stripe-sm flex items-center gap-3">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">TEMPO DE RESPOSTA</span>
                <span className="text-xs font-extrabold text-[#0A2540]">120ms (Ultra Rápido)</span>
              </div>
            </div>
          </div>

          {/* CANVAS PRINCIPAL DE NÓS (JOULE WORKFLOW BUILDER) */}
          <div className="bg-white rounded-3xl p-8 border border-[#E6EBF1] shadow-stripe min-h-[500px] relative overflow-hidden bg-[radial-gradient(#E6EBF1_1px,transparent_1px)] [background-size:24px_24px]">
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#0A2540] text-white text-[11px] font-extrabold shadow">
                Joule Agent Canvas v2.0
              </span>
              <span className="text-xs text-slate-400 font-semibold">Arraste e conecte os módulos de IA</span>
            </div>

            {/* FLUXO VISUAL DE NÓS (4 NODES CONECTADOS COM LINHAS DE FLUXO) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-12 relative z-10">
              {/* NÓ 1: GATILHO WHATSAPP */}
              <div className={`bg-white rounded-2xl p-5 border-2 transition-all duration-300 shadow-lg space-y-3 ${
                activeNode === 1 ? 'border-amber-500 scale-105 shadow-amber-500/20' : 'border-[#E6EBF1]'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                    Gatilho Webhook
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0A2540] text-sm">WhatsApp Evolution</h3>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Mensagem Recebida (MESSAGES_UPSERT)</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-600 font-mono">
                  Payload: &#123; senderPhone, text &#125;
                </div>
              </div>

              {/* NÓ 2: ORQUESTRADOR JOULE & SQLITE */}
              <div className={`bg-white rounded-2xl p-5 border-2 transition-all duration-300 shadow-lg space-y-3 ${
                activeNode === 2 ? 'border-amber-500 scale-105 shadow-amber-500/20' : 'border-[#E6EBF1]'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold">
                    <Database className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-brand-blue uppercase">
                    Consulta Contexto
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0A2540] text-sm">SQLite Database</h3>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Membros, Carteirinhas e Sicredi</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-600 font-mono">
                  SQL: db.membro.findFirst(...)
                </div>
              </div>

              {/* NÓ 3: PROCESSADOR IA GEMINI */}
              <div className={`bg-white rounded-2xl p-5 border-2 transition-all duration-300 shadow-lg space-y-3 ${
                activeNode === 3 ? 'border-amber-500 scale-105 shadow-amber-500/20' : 'border-[#E6EBF1]'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 uppercase">
                    IA Gemini 2.0
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0A2540] text-sm">Google Gemini Engine</h3>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Geração de Resposta em Linguagem Natural</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-600 font-mono">
                  maxOutputTokens: 300, temp: 0.3
                </div>
              </div>

              {/* NÓ 4: AÇÃO DISPARO E RECORRÊNCIA */}
              <div className={`bg-white rounded-2xl p-5 border-2 transition-all duration-300 shadow-lg space-y-3 ${
                activeNode === 4 ? 'border-amber-500 scale-105 shadow-amber-500/20' : 'border-[#E6EBF1]'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-flame-gradient text-white flex items-center justify-center font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase">
                    Disparo Automático
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0A2540] text-sm">WhatsApp Evolution API</h3>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Envio de Resposta / Banner / Status</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-600 font-mono">
                  sendText / sendMedia (201 OK)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: CHAT ORQUESTRADOR IA */}
      {activeTab === 'chat' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#E6EBF1] shadow-stripe min-h-[450px] flex flex-col justify-between">
            <div className="space-y-6 overflow-y-auto max-h-[420px] pr-2">
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
                    className={`max-w-2xl p-4 rounded-2xl text-xs leading-relaxed font-semibold ${
                      msg.role === 'user'
                        ? 'bg-[#0A2540] text-white rounded-tr-none shadow-sm'
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
                  <span>O Joule AI está consultando o banco SQLite e executando ferramentas Gemini...</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSend} className="relative pt-4">
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Digite um comando para o Joule AI (ex: 'Envie o saldo financeiro do Sicredi'...)"
                className="w-full h-14 pl-5 pr-14 rounded-2xl bg-[#F8FAFC] border border-[#E6EBF1] text-[#0A2540] text-xs font-bold focus:outline-none focus:border-brand-blue shadow-sm"
              />
              <button 
                type="submit"
                disabled={loading || !prompt.trim()}
                className="absolute right-2 top-6 h-10 w-10 rounded-xl bg-flame-gradient text-white flex items-center justify-center disabled:opacity-50 transition-opacity shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ABA 3: LOGS DE EXECUÇÃO */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-3xl p-6 border border-[#E6EBF1] shadow-stripe space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6EBF1]">
            <h3 className="text-base font-extrabold text-[#0A2540] flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" /> Histórico em Tempo Real do Joule AI
            </h3>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200">
              Sistema Operacional 100% OK
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div className="p-3 bg-slate-900 text-emerald-400 rounded-xl flex items-center justify-between">
              <span>[JOULE-ENGINE] Webhook WhatsApp recebido do número 555195419525...</span>
              <span className="text-slate-500">Hoje às 00:26</span>
            </div>
            <div className="p-3 bg-slate-900 text-cyan-400 rounded-xl flex items-center justify-between">
              <span>[GEMINI-AI] Modelo gemini-2.0-flash processado com 0.3 temperatura (85 tokens).</span>
              <span className="text-slate-500">Hoje às 00:26</span>
            </div>
            <div className="p-3 bg-slate-900 text-amber-400 rounded-xl flex items-center justify-between">
              <span>[EVOLUTION-API] Resposta enviada com sucesso (201 Created).</span>
              <span className="text-slate-500">Hoje às 00:26</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
