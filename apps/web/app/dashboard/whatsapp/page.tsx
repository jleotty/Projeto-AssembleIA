'use client';

import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  QrCode, 
  RefreshCw, 
  CheckCircle2, 
  Smartphone, 
  Send, 
  Calendar,
  Image as ImageIcon,
  Clock,
  ShieldCheck,
  Plus
} from 'lucide-react';

export default function WhatsAppSyncPage() {
  const [loading, setLoading] = useState(true);
  const [statusData, setStatusData] = useState<any>({});
  const [testPhone, setTestPhone] = useState('');
  const [testMessage, setTestMessage] = useState('Paz do Senhor! Notificação oficial AssembleIA.');
  const [sending, setSending] = useState(false);

  // Form de agendamento de status (texto + mídia)
  const [statusForm, setStatusForm] = useState({
    titulo: '',
    legenda: '',
    mediaUrl: '',
    dataAgendada: new Date().toISOString().slice(0, 16),
  });

  // Form de automação de escala por data
  const [escalaForm, setEscalaForm] = useState({
    departamento: 'Louvor',
    dataEscala: new Date().toISOString().slice(0, 10),
    conteudo: 'Escala de Louvor: Ana Paula (Vocal), Carlos Silva (Violão)',
  });

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPhone) return alert('Digite um número com DDD');

    setSending(true);
    try {
      const res = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: testPhone, text: testMessage }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Mensagem enviada via WhatsApp!');
        setTestMessage('');
      } else {
        alert(data.error || 'Erro ao enviar mensagem.');
      }
    } catch (e) {
      alert('Erro de conexão ao enviar WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  const handleAgendarStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'SCHEDULE_STATUS',
          titulo: statusForm.titulo,
          legenda: statusForm.legenda,
          mediaUrl: statusForm.mediaUrl,
          dataAgendada: statusForm.dataAgendada,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Status WhatsApp agendado com sucesso no SQLite!');
        checkWhatsAppStatus();
      }
    } catch (e) {
      alert('Erro ao agendar status.');
    }
  };

  const handleAgendarEscala = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'SCHEDULE_ESCALA',
          departamento: escalaForm.departamento,
          dataEscala: escalaForm.dataEscala,
          conteudo: escalaForm.conteudo,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Escala de ${escalaForm.departamento} agendada para ${escalaForm.dataEscala}!`);
        checkWhatsAppStatus();
      }
    } catch (e) {
      alert('Erro ao agendar escala.');
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
              <MessageSquare className="w-6 h-6 text-emerald-600" /> Operação WhatsApp & Automação de Escalas
            </h1>
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
              isConnected ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              {isConnected ? '✓ WhatsApp Conectado' : 'Aguardando Leitura do QR Code'}
            </span>
          </div>
          <p className="text-xs text-[#425466] mt-1 font-semibold">
            Instância: <code className="font-mono text-brand-blue">assembleia_whatsapp</code> no Docker em <strong>http://localhost:8080</strong>
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
        {/* COLUNA 1: QR CODE & CONEXÃO */}
        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6EBF1]">
            <QrCode className="w-5 h-5 text-brand-blue" />
            <h3 className="text-base font-extrabold text-[#0A2540]">Escanear QR Code</h3>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-[#F8FAFC] rounded-2xl border border-dashed border-[#E6EBF1]">
            {isConnected ? (
              <div className="text-center space-y-3 py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-extrabold text-[#0A2540]">WhatsApp Sincronizado!</h4>
              </div>
            ) : statusData.qrCodeBase64 ? (
              <img src={statusData.qrCodeBase64} alt="QR Code WhatsApp" className="w-48 h-48 rounded-xl border border-[#E6EBF1] shadow-sm" />
            ) : (
              <div className="text-center py-6 text-slate-400 space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-blue" />
                <span className="text-xs font-bold text-[#0A2540] block">Gerando QR Code...</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="space-y-3 text-xs">
            <h4 className="font-extrabold text-[#0A2540]">Disparo Rápido de Teste</h4>
            <input 
              type="text"
              required
              value={testPhone}
              onChange={(e) => setTestPhone(e.target.value)}
              placeholder="DDD + Telefone (ex: 11988887777)"
              className="w-full h-9 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold"
            />
            <button 
              type="submit"
              disabled={sending || !isConnected}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold shadow flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" /> Enviar Teste
            </button>
          </form>
        </div>

        {/* COLUNA 2: AUTOMAÇÃO DE ESCALAS POR DATA */}
        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6EBF1]">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h3 className="text-base font-extrabold text-[#0A2540]">Automação de Escalas</h3>
          </div>

          <p className="text-xs text-slate-600 font-medium">
            Permita automatizar e agendar o envio de escalas para qualquer semana ou data específica.
          </p>

          <form onSubmit={handleAgendarEscala} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-[#0A2540] mb-1">Departamento</label>
              <select 
                value={escalaForm.departamento}
                onChange={(e) => setEscalaForm({ ...escalaForm, departamento: e.target.value })}
                className="w-full h-9 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold"
              >
                <option value="Louvor">Ministério de Louvor</option>
                <option value="Mídia">Mídia e Som</option>
                <option value="Recepção">Recepção</option>
                <option value="EBD">Escola Bíblica Dominical</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#0A2540] mb-1">Data Específica da Escala</label>
              <input 
                type="date"
                required
                value={escalaForm.dataEscala}
                onChange={(e) => setEscalaForm({ ...escalaForm, dataEscala: e.target.value })}
                className="w-full h-9 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0A2540] mb-1">Conteúdo / Voluntários Escalados</label>
              <textarea 
                rows={3}
                required
                value={escalaForm.conteudo}
                onChange={(e) => setEscalaForm({ ...escalaForm, conteudo: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold shadow flex items-center justify-center gap-2"
            >
              <Clock className="w-3.5 h-3.5" /> Automatizar Escala no WhatsApp
            </button>
          </form>
        </div>

        {/* COLUNA 3: AGENDAMENTO DE STATUS (TEXTO + BANNER) */}
        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6EBF1]">
            <ImageIcon className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-extrabold text-[#0A2540]">Status WhatsApp (Texto + Banner)</h3>
          </div>

          <p className="text-xs text-slate-600 font-medium">
            Agende envios de status com banner de membros ou comunicados em horários definidos.
          </p>

          <form onSubmit={handleAgendarStatus} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-[#0A2540] mb-1">Título do Comunicado</label>
              <input 
                type="text"
                required
                value={statusForm.titulo}
                onChange={(e) => setStatusForm({ ...statusForm, titulo: e.target.value })}
                placeholder="Ex: Culto de Ensino de Quinta"
                className="w-full h-9 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0A2540] mb-1">URL do Banner (Mídia)</label>
              <input 
                type="text"
                value={statusForm.mediaUrl}
                onChange={(e) => setStatusForm({ ...statusForm, mediaUrl: e.target.value })}
                placeholder="uploads/membros/000001.jpg ou URL"
                className="w-full h-9 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0A2540] mb-1">Data/Hora do Agendamento</label>
              <input 
                type="datetime-local"
                required
                value={statusForm.dataAgendada}
                onChange={(e) => setStatusForm({ ...statusForm, dataAgendada: e.target.value })}
                className="w-full h-9 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold shadow flex items-center justify-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" /> Agendar Status no WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
