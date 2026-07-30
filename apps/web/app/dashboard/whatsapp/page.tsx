'use client';

import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  QrCode, 
  RefreshCw, 
  CheckCircle2, 
  Send, 
  Calendar,
  Image as ImageIcon,
  Clock,
  Plus,
  Upload,
  Repeat,
  X,
  Trash2,
  AlertCircle
} from 'lucide-react';

export default function WhatsAppSyncPage() {
  const [loading, setLoading] = useState(true);
  const [statusData, setStatusData] = useState<any>({ agendamentos: [], escalas: [] });
  const [testPhone, setTestPhone] = useState('');
  const [testMessage, setTestMessage] = useState('Paz do Senhor! Notificação oficial AssembleIA.');
  const [sending, setSending] = useState(false);

  // Form de agendamento de status com Recorrência
  const [statusForm, setStatusForm] = useState({
    titulo: '',
    legenda: '',
    dataAgendada: new Date().toISOString().slice(0, 16),
    recorrencia: 'DIARIA', // UNICA, DIARIA, SEMANAL, MENSAL, ANUAL
    frequenciaDia: '1',    // 1, 2, 3, 4 vezes no dia
    diasSemana: ['DOMINGO', 'QUARTA', 'SEXTA'] as string[],
  });

  const [bannerFile, setBannerFile] = useState<string | null>(null);
  const [bannerFileName, setBannerFileName] = useState<string | null>(null);

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleDiaSemana = (dia: string) => {
    setStatusForm(prev => ({
      ...prev,
      diasSemana: prev.diasSemana.includes(dia) 
        ? prev.diasSemana.filter(d => d !== dia)
        : [...prev.diasSemana, dia]
    }));
  };

  const checkWhatsAppStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/whatsapp');
      const data = await res.json();
      if (data.success) {
        setStatusData(data);
      }
    } catch (e) {
      console.error('Erro ao verificar status do WhatsApp:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkWhatsAppStatus();
  }, []);

  const handleAgendarStatusRecorrente = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerFile) {
      alert('Por favor, anexe a foto de banner clicando no botão de anexo.');
      return;
    }

    try {
      const res = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'SCHEDULE_STATUS',
          titulo: statusForm.titulo,
          legenda: statusForm.legenda,
          mediaBase64: bannerFile,
          dataAgendada: statusForm.dataAgendada,
          recorrencia: statusForm.recorrencia,
          frequenciaDia: statusForm.frequenciaDia,
          diasSemana: statusForm.diasSemana,
          number: testPhone || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        setStatusForm({
          titulo: '',
          legenda: '',
          dataAgendada: new Date().toISOString().slice(0, 16),
          recorrencia: 'DIARIA',
          frequenciaDia: '1',
          diasSemana: ['DOMINGO', 'QUARTA', 'SEXTA'],
        });
        setBannerFile(null);
        setBannerFileName(null);
        checkWhatsAppStatus();
      }
    } catch (e) {
      alert('Erro ao agendar automação recorrente.');
    }
  };

  const handleCancelAgendamento = async (id: number, titulo: string) => {
    if (!confirm(`Deseja cancelar e remover o agendamento "${titulo}"?`)) return;

    try {
      const res = await fetch(`/api/whatsapp?id=${id}&type=status`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        alert('Agendamento cancelado com sucesso!');
        checkWhatsAppStatus();
      } else {
        alert(data.error || 'Erro ao cancelar agendamento.');
      }
    } catch (e) {
      alert('Erro de conexão ao cancelar agendamento.');
    }
  };

  const isConnected = statusData.state === 'open';

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#0A2540] flex items-center gap-2">
              <Repeat className="w-6 h-6 text-purple-600" /> Automação com Recorrência & Status WhatsApp
            </h1>
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
              isConnected ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              {isConnected ? '✓ WhatsApp Conectado' : 'Aguardando Leitura do QR Code'}
            </span>
          </div>
          <p className="text-xs text-[#425466] mt-1 font-semibold">
            Agende envios automáticos recorrentes, gerencie postagens e cancele agendamentos a qualquer momento.
          </p>
        </div>

        <button 
          onClick={checkWhatsAppStatus}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-brand-blue text-xs font-bold flex items-center gap-2 hover:bg-blue-100 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Atualizar Conexão
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* COLUNA 1: QR CODE */}
        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6EBF1]">
            <QrCode className="w-5 h-5 text-brand-blue" />
            <h3 className="text-base font-extrabold text-[#0A2540]">Status da Conexão</h3>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-[#F8FAFC] rounded-2xl border border-dashed border-[#E6EBF1]">
            {isConnected ? (
              <div className="text-center space-y-2 py-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-extrabold text-[#0A2540]">WhatsApp Sincronizado!</h4>
              </div>
            ) : statusData.qrCodeBase64 ? (
              <img src={statusData.qrCodeBase64} alt="QR Code" className="w-44 h-44 rounded-xl border border-[#E6EBF1]" />
            ) : (
              <div className="text-center py-6 text-slate-400 space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-blue" />
                <span className="text-xs font-bold text-[#0A2540] block">Gerando QR Code...</span>
              </div>
            )}
          </div>
        </div>

        {/* COLUNA 2 E 3: CONFIGURAÇÃO DE RECORRÊNCIA COMPLETA */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6EBF1]">
            <Repeat className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-extrabold text-[#0A2540]">Criar Automação Recorrente (Status & Comunicados)</h3>
          </div>

          <form onSubmit={handleAgendarStatusRecorrente} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#0A2540] mb-1">Título do Comunicado *</label>
                <input 
                  type="text"
                  required
                  value={statusForm.titulo}
                  onChange={(e) => setStatusForm({ ...statusForm, titulo: e.target.value })}
                  placeholder="Ex: Boletim Semanal do Culto de Quarta"
                  className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0A2540] mb-1">Data/Hora da Primeira Postagem *</label>
                <input 
                  type="datetime-local"
                  required
                  value={statusForm.dataAgendada}
                  onChange={(e) => setStatusForm({ ...statusForm, dataAgendada: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold focus:outline-none focus:border-brand-blue"
                />
              </div>
            </div>

            {/* SELEÇÃO DE RECORRÊNCIA E FREQUÊNCIA NO DIA */}
            <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E6EBF1] space-y-3">
              <h4 className="font-extrabold text-[#0A2540] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-600" /> Configuração de Recorrência & Frequência
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#0A2540] mb-1">Tipo de Recorrência *</label>
                  <select 
                    value={statusForm.recorrencia}
                    onChange={(e) => setStatusForm({ ...statusForm, recorrencia: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-white text-[#0A2540] font-bold"
                  >
                    <option value="UNICA">Única Vez (Sem Repetição)</option>
                    <option value="DIARIA">Diário (Todos os Dias)</option>
                    <option value="SEMANAL">Semanal (Dias Selecionados)</option>
                    <option value="MENSAL">Mensal (Todo Mês)</option>
                    <option value="ANUAL">Anual (Todo Ano)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#0A2540] mb-1">Quantas Vezes no Dia? *</label>
                  <select 
                    value={statusForm.frequenciaDia}
                    onChange={(e) => setStatusForm({ ...statusForm, frequenciaDia: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-white text-[#0A2540] font-bold"
                  >
                    <option value="1">1 vez ao dia</option>
                    <option value="2">2 vezes ao dia (Manhã e Noite)</option>
                    <option value="3">3 vezes ao dia (Manhã, Tarde e Noite)</option>
                    <option value="4">4 vezes ao dia (De 6h em 6h)</option>
                  </select>
                </div>
              </div>

              {/* SELEÇÃO DOS DIAS DA SEMANA */}
              {statusForm.recorrencia === 'SEMANAL' && (
                <div className="space-y-1.5 pt-2">
                  <label className="block font-bold text-[#0A2540]">Dias da Semana para Repetição:</label>
                  <div className="flex flex-wrap gap-2">
                    {['DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'].map((dia) => {
                      const selected = statusForm.diasSemana.includes(dia);
                      return (
                        <button
                          type="button"
                          key={dia}
                          onClick={() => handleToggleDiaSemana(dia)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-extrabold border transition-colors ${
                            selected 
                              ? 'bg-purple-600 text-white border-purple-600' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {dia}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ANEXO DE BANNER (UPLOAD) */}
            <div className="space-y-2">
              <label className="block font-extrabold text-[#0A2540]">Anexo de Foto do Banner *</label>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-[#F8FAFC] rounded-2xl border border-dashed border-[#E6EBF1]">
                {bannerFile ? (
                  <div className="relative group">
                    <img src={bannerFile} alt="Preview Banner" className="w-36 h-20 object-cover rounded-xl border border-emerald-500 shadow-sm" />
                    <button 
                      type="button" 
                      onClick={() => { setBannerFile(null); setBannerFileName(null); }}
                      className="absolute -top-2 -right-2 p-1 bg-rose-600 text-white rounded-full shadow"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-36 h-20 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center text-slate-400">
                    <ImageIcon className="w-6 h-6" />
                    <span className="text-[10px] font-bold mt-1">Nenhum Anexo</span>
                  </div>
                )}

                <div className="flex-1 space-y-1">
                  <label className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all inline-flex items-center gap-2 cursor-pointer">
                    <Upload className="w-4 h-4" /> Anexar Arquivo de Banner
                    <input type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />
                  </label>
                  
                  {bannerFileName && (
                    <span className="text-xs text-emerald-700 font-bold block">✓ Anexo: {bannerFileName}</span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#0A2540] mb-1">Legenda / Texto Complementar</label>
              <textarea 
                rows={2}
                value={statusForm.legenda}
                onChange={(e) => setStatusForm({ ...statusForm, legenda: e.target.value })}
                placeholder="Texto complementar para ser enviado juntamente com o banner..."
                className="w-full p-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold focus:outline-none focus:border-brand-blue"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 rounded-xl bg-flame-gradient text-white text-xs font-extrabold shadow-md hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Ativar Automação Recorrente no WhatsApp
            </button>
          </form>
        </div>
      </div>

      {/* SEÇÃO NOVO GERENCIAMENTO DE AGENDAMENTOS GERADOS COM BOTÃO DE CANCELAR */}
      <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E6EBF1]">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-blue" />
            <h3 className="text-base font-extrabold text-[#0A2540]">Agendamentos Recorrentes Ativos</h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-xs font-extrabold border border-blue-200">
            {statusData.agendamentos?.length || 0} Registros no SQLite
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-extrabold uppercase">
                <th className="py-3 px-4">Banner</th>
                <th className="py-3 px-4">Título & Legenda</th>
                <th className="py-3 px-4">Recorrência</th>
                <th className="py-3 px-4">Frequência</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EBF1]">
              {!statusData.agendamentos || statusData.agendamentos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-400 font-bold">
                    Nenhum agendamento ativo encontrado.
                  </td>
                </tr>
              ) : (
                statusData.agendamentos.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      {item.mediaUrl?.startsWith('data:image') ? (
                        <img src={item.mediaUrl} alt="Banner" className="w-14 h-10 object-cover rounded-lg border border-slate-200 shadow-sm" />
                      ) : (
                        <div className="w-14 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-extrabold text-[#0A2540] block">{item.titulo}</span>
                      <span className="text-[11px] text-slate-500 block truncate max-w-xs">{item.legenda}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-extrabold border border-purple-200 text-[10px]">
                        {item.recorrencia}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-600">
                      {item.frequenciaDia}x ao dia
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        item.status === 'ENVIADO' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button 
                        onClick={() => handleCancelAgendamento(item.id, item.titulo)}
                        className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Cancelar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
