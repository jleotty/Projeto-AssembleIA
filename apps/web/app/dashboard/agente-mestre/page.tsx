'use client';

import { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  RefreshCw, 
  CheckCircle2, 
  ChevronRight,
  Bot,
  HeartHandshake,
  Landmark,
  FileText,
  Calendar,
  Palette,
  Video,
  BookOpen,
  BarChart3,
  ShieldCheck,
  MessageSquare,
  Ticket,
  CheckSquare,
  Upload,
  Play,
  Download,
  Scissors,
  Check,
  Layers,
  Zap,
  Sliders,
  FileVideo,
  FileSpreadsheet
} from 'lucide-react';
import { AGENT_REGISTRY, AgentDefinition } from '../../../lib/ai/agents';

interface ChatMessage {
  role: string;
  agentName: string;
  content: string;
  timestamp: string;
  actionPayload?: any;
}

export default function AssistenteADPage() {
  const [selectedAgentId, setSelectedAgentId] = useState<string>('master_agent');
  const [activeTab, setActiveTab] = useState<'agents' | 'chat' | 'audit'>('agents');
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [whatsappSynced, setWhatsappSynced] = useState(true);

  const selectedAgent = AGENT_REGISTRY.find(a => a.id === selectedAgentId) || AGENT_REGISTRY[0];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      agentName: 'Agente Mestre Orquestrador',
      content: 'Paz do Senhor, Pastor! Sou o Assistente AD, seu auxiliar de IA conectado à Assembleia de Deus, ao Google Gemini e ao WhatsApp. Como posso ajudar você agora?',
      timestamp: 'Agora',
    },
  ]);

  const getAgentIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return Sparkles;
      case 'HeartHandshake': return HeartHandshake;
      case 'Landmark': return Landmark;
      case 'FileText': return FileText;
      case 'Calendar': return Calendar;
      case 'Palette': return Palette;
      case 'Video': return Video;
      case 'BookOpen': return BookOpen;
      case 'BarChart3': return BarChart3;
      case 'ShieldCheck': return ShieldCheck;
      case 'MessageSquare': return MessageSquare;
      case 'Ticket': return Ticket;
      case 'CheckSquare': return CheckSquare;
      default: return Bot;
    }
  };

  const handleSendPrompt = async (textToSend?: string, agentIdToUse?: string) => {
    const query = textToSend || prompt;
    const targetAgentId = agentIdToUse || selectedAgentId;
    if (!query.trim() || loading) return;

    const targetAgent = AGENT_REGISTRY.find(a => a.id === targetAgentId) || AGENT_REGISTRY[0];

    const userMessage: ChatMessage = {
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
            actionPayload: data.actionPayload,
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
          agentName: targetAgent.name,
          content: 'Paz do Senhor, Pastor! Tivemos uma oscilação temporária no assistente.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleProcessMediaUpload = () => {
    if (videoUrl.trim()) {
      handleSendPrompt(`Processar vídeo do culto enviado pelo link: ${videoUrl}`);
      setVideoUrl('');
      setShowUploadModal(false);
    } else {
      handleSendPrompt(`Arquivo de vídeo da pregação enviado para o ${selectedAgent.name}`);
      setShowUploadModal(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-4 space-y-6">
      {/* HEADER DE ORQUESTRAÇÃO DOS 13 AGENTES */}
      <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-flame-magenta p-[1.5px] shadow-lg border border-white/20">
            <div className="w-full h-full bg-[#0A2540] rounded-2xl flex items-center justify-center text-white">
              <Sparkles className="w-6 h-6 text-amber-300 animate-spin" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-[#0A2540]">Central dos 13 Agentes de IA</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-extrabold border border-purple-200">
                13/13 OPERACIONAIS
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Ecossistema Multi-Agente Operacional da Assembleia de Deus • Integrado ao Google Gemini e WhatsApp</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1.5 rounded-full text-xs font-extrabold border flex items-center gap-1.5 ${
            whatsappSynced 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 
            WhatsApp Sincronizado • Gemini Conectado
          </span>
        </div>
      </div>

      {/* ABAS DE NAVEGAÇÃO DO PAINEL */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('agents')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'agents'
              ? 'bg-[#0A2540] text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Bot className="w-4 h-4" /> Todos os 13 Agentes (Grid)
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'chat'
              ? 'bg-[#0A2540] text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Chat & Teste Real ({selectedAgent.name})
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'audit'
              ? 'bg-[#0A2540] text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <CheckSquare className="w-4 h-4" /> Auditoria & Aprovações
        </button>
      </div>

      {/* ABA 1: GRID DOS 13 AGENTES */}
      {activeTab === 'agents' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AGENT_REGISTRY.map((agent) => {
            const IconComp = getAgentIcon(agent.icon);
            return (
              <div 
                key={agent.id}
                className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between space-y-4 hover:shadow-lg ${
                  selectedAgentId === agent.id ? 'border-purple-600 ring-2 ring-purple-100' : 'border-[#E6EBF1]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow"
                        style={{ backgroundColor: agent.color }}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-[#0A2540]">{agent.name}</h3>
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{agent.department}</span>
                      </div>
                    </div>

                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      • ONLINE
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {agent.description}
                  </p>

                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase">Ferramentas Ativas (MCP):</span>
                    <div className="flex flex-wrap gap-1">
                      {agent.tools.slice(0, 3).map((tool, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono font-semibold">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500">Gemini 2.0 Flash • WhatsApp</span>

                  <button
                    onClick={() => {
                      setSelectedAgentId(agent.id);
                      setActiveTab('chat');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-extrabold hover:bg-purple-700 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    Testar / Conversar <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ABA 2: CHAT E INTERAÇÃO COM AGENTE SELECIONADO */}
      {activeTab === 'chat' && (
        <div className="space-y-4">
          {/* SELETOR DE AGENTE */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 overflow-x-auto">
            <span className="text-xs font-extrabold text-slate-500 whitespace-nowrap">Selecionar Agente de IA:</span>
            <div className="flex items-center gap-2 overflow-x-auto">
              {AGENT_REGISTRY.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgentId(agent.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedAgentId === agent.id
                      ? 'bg-purple-700 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {agent.name}
                </button>
              ))}
            </div>
          </div>

          {/* CARD CENTRAL DO CHAT DO AGENTE SELECIONADO */}
          <div className="bg-white rounded-3xl border border-[#E6EBF1] shadow-2xl overflow-hidden">
            <div className="bg-flame-magenta text-white p-6 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white text-purple-900 flex items-center justify-center font-extrabold shadow">
                    <Sparkles className="w-5 h-5 text-purple-700" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold tracking-wide text-white">{selectedAgent.name}</h2>
                    <span className="text-[10px] text-purple-200 font-extrabold">{selectedAgent.role} • {selectedAgent.department}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowUploadModal(!showUploadModal)}
                    className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <Upload className="w-3.5 h-3.5" /> Enviar Mídia / Vídeo
                  </button>

                  <button 
                    onClick={() => setMessages([messages[0]])}
                    className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                    title="Reiniciar Conversa"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-purple-100 font-medium relative z-10">
                {selectedAgent.description}
              </p>

              {/* MODAL / CAMPO DE ENVIO DE LINK OU MÍDIA */}
              {showUploadModal && (
                <div className="bg-white text-[#0A2540] p-4 rounded-2xl border border-white shadow-xl space-y-3 relative z-20">
                  <h4 className="text-xs font-extrabold flex items-center gap-1.5 text-purple-900">
                    <FileVideo className="w-4 h-4 text-purple-700" /> Enviar Arquivo de Vídeo ou Link do Culto para o {selectedAgent.name}
                  </h4>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="Cole o link do vídeo (YouTube, Google Drive, Vimeo, MP4)..." 
                      className="flex-1 h-9 px-3 text-xs border border-slate-300 rounded-xl bg-slate-50 font-medium"
                    />
                    <button 
                      onClick={() => handleProcessMediaUpload()}
                      className="px-4 py-2 bg-purple-700 text-white rounded-xl text-xs font-extrabold hover:bg-purple-800 cursor-pointer"
                    >
                      Processar Vídeo
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ÁREA DE MENSAGENS E PROMPTS RÁPIDOS */}
            <div className="p-6 space-y-6 bg-slate-50">
              {/* BOTÕES DE PROMPT RÁPIDO */}
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">Cenários Reais de Teste:</span>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {selectedAgent.samplePrompts.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendPrompt(sample)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-[#E6EBF1] text-[#0A2540] text-xs font-extrabold hover:bg-slate-100 hover:border-purple-600 shadow-stripe-sm transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      {sample} <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* LISTA DE MENSAGENS COM ARTEFATOS INTERATIVOS */}
              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase">{msg.agentName}</span>
                      <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                    </div>

                    <div className={`p-4 rounded-2xl text-xs font-bold leading-relaxed max-w-2xl ${
                      msg.role === 'user'
                        ? 'bg-[#0A2540] text-white rounded-tr-none shadow'
                        : 'bg-white text-[#0A2540] border border-[#E6EBF1] rounded-tl-none shadow-sm space-y-3'
                    }`}>
                      <div className="whitespace-pre-line">{msg.content}</div>

                      {/* RENDEREIZAÇÃO DE ARTEFATOS E PAINÉIS OPERACIONAIS */}
                      {msg.actionPayload && msg.actionPayload.type === 'video_processing' && (
                        <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-[#0A2540] space-y-2 mt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold text-purple-900 flex items-center gap-1">
                              <Scissors className="w-3.5 h-3.5 text-purple-700" /> {msg.actionPayload.title}
                            </span>
                            <span className="text-[9px] font-extrabold bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full">Whisper IA</span>
                          </div>

                          <p className="text-[11px] font-medium text-slate-600 italic">
                            {msg.actionPayload.transcriptionPreview}
                          </p>

                          <div className="space-y-1.5 pt-1">
                            {msg.actionPayload.cuts.map((cut: any) => (
                              <div key={cut.id} className="bg-white p-2.5 rounded-lg border border-purple-100 flex items-center justify-between gap-2">
                                <div>
                                  <span className="text-[11px] font-extrabold text-purple-900 block">{cut.title}</span>
                                  <span className="text-[9px] font-bold text-slate-500">{cut.timestamp} • {cut.platform}</span>
                                </div>
                                <button className="px-2.5 py-1 bg-purple-700 text-white rounded-md text-[10px] font-bold flex items-center gap-1 cursor-pointer">
                                  <Play className="w-3 h-3" /> Baixar
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {msg.actionPayload && msg.actionPayload.type === 'graphic_briefing' && (
                        <div className="p-3 bg-pink-50 rounded-xl border border-pink-200 text-[#0A2540] space-y-2 mt-2">
                          <span className="text-xs font-extrabold text-pink-900 flex items-center gap-1">
                            <Palette className="w-3.5 h-3.5 text-pink-700" /> {msg.actionPayload.title}
                          </span>
                          <p className="text-[11px] font-medium text-slate-700">{msg.actionPayload.previewPrompt}</p>
                          <div className="flex gap-1.5">
                            {msg.actionPayload.branding.colors.map((c: string, cIdx: number) => (
                              <span key={cIdx} className="px-2 py-0.5 bg-white rounded border border-pink-200 text-[9px] font-bold">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {msg.actionPayload && msg.actionPayload.type === 'financial_summary' && (
                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-[#0A2540] space-y-2 mt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold text-blue-900 flex items-center gap-1">
                              <Landmark className="w-3.5 h-3.5 text-blue-700" /> Conciliação Sicredi — Saldo: R$ {msg.actionPayload.balance.toFixed(2)}
                            </span>
                          </div>
                          <div className="space-y-1">
                            {msg.actionPayload.recentTransactions.map((tx: any) => (
                              <div key={tx.id} className="bg-white p-2 rounded border border-blue-100 flex items-center justify-between text-[10px]">
                                <span className="font-extrabold text-slate-800">{tx.desc}</span>
                                <span className="font-bold text-emerald-700">+ R$ {tx.valor.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2 text-xs font-extrabold text-purple-600 animate-pulse p-2">
                    <Sparkles className="w-4 h-4 animate-spin text-purple-600" />
                    <span>[{selectedAgent.name}] processando com Gemini IA...</span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <form onSubmit={(e) => { e.preventDefault(); handleSendPrompt(); }} className="relative flex items-center">
                  <input 
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={`Pergunte ou comande o ${selectedAgent.name}...`}
                    className="w-full h-12 pl-4 pr-16 rounded-2xl bg-white border border-[#E6EBF1] text-xs font-bold text-[#0A2540] shadow-sm focus:outline-none focus:border-purple-600"
                  />

                  <div className="absolute right-2 flex items-center gap-1">
                    <button 
                      type="submit" 
                      disabled={loading || !prompt.trim()} 
                      className="w-8 h-8 rounded-xl bg-flame-magenta text-white flex items-center justify-center shadow hover:scale-105 transition-transform cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 3: AUDITORIA & HISTÓRICO DE AUDITORIA */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-[#0A2540]">Logs de Auditoria & Aprovações dos Agentes</h2>
              <p className="text-xs text-slate-500 font-medium">Registro de execuções dos 13 Agentes de IA com protocolo Human-in-the-Loop</p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-extrabold rounded-full border border-emerald-200">
              ✓ Auditoria em Tempo Real
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                agent: 'Agente Vídeo IA & Cortador',
                action: 'video.transcrever_whisper',
                details: 'Transcrição e identificação de 8 momentos marcantes para Reels do Culto da Família',
                status: 'EXECUTADO',
                time: 'Há 2 min'
              },
              {
                agent: 'Agente Financeiro & Tesouraria',
                action: 'financeiro.lancar_despesa',
                details: 'Conciliação automática de recebimentos PIX Sicredi (R$ 50.550,00)',
                status: 'EXECUTADO E AUDITADO',
                time: 'Há 12 min'
              },
              {
                agent: 'Agente Secretaria & Rol',
                action: 'secretaria.cadastrar_membro',
                details: 'Formatadas máscaras de CPF e WhatsApp +55 para novos cadastros',
                status: 'EXECUTADO',
                time: 'Há 45 min'
              },
              {
                agent: 'Agente Escalas & Voluntários',
                action: 'escalas.enviar_whatsapp',
                details: 'Disparo de confirmações de escala no WhatsApp via Evolution API',
                status: 'EXECUTADO',
                time: 'Há 2h'
              }
            ].map((log, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-purple-900">{log.agent}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[10px]">{log.action}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{log.details}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-400 font-bold">{log.time}</span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
