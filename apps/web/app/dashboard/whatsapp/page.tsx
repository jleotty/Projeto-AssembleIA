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
  Plus,
  Upload,
  X
} from 'lucide-react';

export default function WhatsAppSyncPage() {
  const [loading, setLoading] = useState(true);
  const [statusData, setStatusData] = useState<any>({});
  const [testPhone, setTestPhone] = useState('');
  const [testMessage, setTestMessage] = useState('Paz do Senhor! Notificação oficial AssembleIA.');
  const [sending, setSending] = useState(false);

  // Form de agendamento de status com arquivo anexo (Upload de Arquivo)
  const [statusForm, setStatusForm] = useState({
    titulo: '',
    legenda: '',
    dataAgendada: new Date().toISOString().slice(0, 16),
  });

  const [bannerFile, setBannerFile] = useState<string | null>(null);
  const [bannerFileName, setBannerFileName] = useState<string | null>(null);

  // Manipulador de upload de arquivo anexo
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
    if (!bannerFile) {
      alert('Você precisa anexar uma foto de banner clicando no botão de anexo.');
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
          mediaBase64: bannerFile, // Anexo físico base64
          dataAgendada: statusForm.dataAgendada,
          number: testPhone || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Status com foto anexa enviado/agendado com sucesso!');
        setStatusForm({
          titulo: '',
          legenda: '',
          dataAgendada: new Date().toISOString().slice(0, 16),
        });
        setBannerFile(null);
        setBannerFileName(null);
        checkWhatsAppStatus();
      }
    } catch (e) {
      alert('Erro ao agendar status com anexo.');
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
              <MessageSquare className="w-6 h-6 text-emerald-600" /> WhatsApp — Status & Anexo de Mídia
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
        {/* COLUNA 1: QR CODE */}
        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6EBF1]">
            <QrCode className="w-5 h-5 text-brand-blue" />
            <h3 className="text-base font-extrabold text-[#0A2540]">Escanear QR Code</h3>
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

        {/* COLUNA 2: AGENDAMENTO / POSTAGEM COM ANEXO DE BANNER (UPLOAD POR BOTÃO) */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6EBF1]">
            <ImageIcon className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-extrabold text-[#0A2540]">Anexar Foto de Banner e Postar Status</h3>
          </div>

          <form onSubmit={handleAgendarStatus} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#0A2540] mb-1">Título do Comunicado *</label>
                <input 
                  type="text"
                  required
                  value={statusForm.titulo}
                  onChange={(e) => setStatusForm({ ...statusForm, titulo: e.target.value })}
                  placeholder="Ex: Culto de Ensino de Quinta-Feira"
                  className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0A2540] mb-1">Data/Hora da Postagem *</label>
                <input 
                  type="datetime-local"
                  required
                  value={statusForm.dataAgendada}
                  onChange={(e) => setStatusForm({ ...statusForm, dataAgendada: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold focus:outline-none focus:border-brand-blue"
                />
              </div>
            </div>

            {/* ÁREA DE ANEXAR ARQUIVO DE BANNER (CLICANDO NO BOTÃO) */}
            <div className="space-y-2">
              <label className="block font-extrabold text-[#0A2540]">Anexo de Foto do Banner (CLIQUE NO BOTÃO) *</label>
              
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
                  {/* BOTÃO DE NAVEGAÇÃO PARA ANEXAR O ARQUIVO */}
                  <label className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all inline-flex items-center gap-2 cursor-pointer">
                    <Upload className="w-4 h-4" /> Anexar Arquivo de Banner
                    <input type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />
                  </label>
                  
                  {bannerFileName && (
                    <span className="text-xs text-emerald-700 font-bold block">✓ Arquivo selecionado: {bannerFileName}</span>
                  )}
                  <p className="text-[11px] text-slate-500 font-medium">
                    Selecione uma imagem do computador para ser enviada como mídia anexa no WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#0A2540] mb-1">Legenda / Texto Complementar</label>
              <textarea 
                rows={2}
                value={statusForm.legenda}
                onChange={(e) => setStatusForm({ ...statusForm, legenda: e.target.value })}
                placeholder="Escreva a legenda que irá junto com a imagem do banner..."
                className="w-full p-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold focus:outline-none focus:border-brand-blue"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3 rounded-xl bg-flame-gradient text-white text-xs font-extrabold shadow-md hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Enviar / Agendar Status com Banner Anexo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
