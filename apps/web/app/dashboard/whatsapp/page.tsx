'use client';

import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  QrCode, 
  RefreshCw, 
  CheckCircle2, 
  Smartphone, 
  Send, 
  AlertCircle,
  Wifi,
  ShieldCheck
} from 'lucide-react';

export default function WhatsAppSyncPage() {
  const [loading, setLoading] = useState(true);
  const [statusData, setStatusData] = useState<any>({});
  const [testPhone, setTestPhone] = useState('');
  const [testMessage, setTestMessage] = useState('Paz do Senhor! Mensagem enviada via AssembleIA + Evolution API.');
  const [sending, setSending] = useState(false);

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
    const interval = setInterval(checkWhatsAppStatus, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPhone) return alert('Digite um número de telefone com DDD');

    setSending(true);
    try {
      const res = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: testPhone, text: testMessage }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Mensagem disparada com sucesso pelo WhatsApp!');
        setTestMessage('');
      } else {
        alert(data.error || 'Erro ao enviar mensagem.');
      }
    } catch (e) {
      alert('Erro ao se comunicar com a API do WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  const isConnected = statusData.state === 'open';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#0A2540] flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-emerald-600" /> Sincronização WhatsApp (Evolution API)
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CARTÃO DE QR CODE E CONEXÃO */}
        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-[#E6EBF1]">
              <QrCode className="w-5 h-5 text-brand-blue" />
              <h3 className="text-base font-extrabold text-[#0A2540]">Escanear QR Code no WhatsApp</h3>
            </div>

            <p className="text-xs text-[#425466] mt-3 font-medium">
              1. Abra o WhatsApp no celular do Pastor ou da Secretaria.<br />
              2. Toque em <strong>Dispositivos Conectados</strong> → <strong>Conectar um dispositivo</strong>.<br />
              3. Aponte a câmera para o QR Code abaixo.
            </p>

            <div className="my-6 flex flex-col items-center justify-center p-6 bg-[#F8FAFC] rounded-2xl border border-dashed border-[#E6EBF1]">
              {isConnected ? (
                <div className="text-center space-y-3 py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-extrabold text-[#0A2540]">WhatsApp Sincronizado!</h4>
                  <p className="text-xs text-slate-500 font-semibold max-w-xs">
                    Sua conta está conectada à Evolution API e pronta para disparar escalas, avisos e notificações.
                  </p>
                </div>
              ) : statusData.qrCodeBase64 ? (
                <div className="text-center space-y-3">
                  <img 
                    src={statusData.qrCodeBase64} 
                    alt="QR Code WhatsApp Evolution API" 
                    className="w-56 h-56 rounded-xl border border-[#E6EBF1] shadow-md mx-auto"
                  />
                  <span className="text-[11px] text-slate-500 font-bold block animate-pulse">
                    Scan me with WhatsApp Camera
                  </span>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 space-y-2">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto text-brand-blue" />
                  <span className="text-xs font-bold text-[#0A2540] block">Gerando QR Code na Evolution API...</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-brand-blue font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Evolution API rodando em PostgreSQL + Redis no Docker local.</span>
          </div>
        </div>

        {/* CARTÃO DE TESTE DE DISPARO DE MENSAGENS */}
        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6EBF1]">
            <Smartphone className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-extrabold text-[#0A2540]">Testar Disparo de Mensagem</h3>
          </div>

          <form onSubmit={handleSendMessage} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#0A2540] mb-1">Número do Telefone (com DDD) *</label>
              <input 
                type="text"
                required
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
                placeholder="Ex: 11988887777"
                className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold focus:outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0A2540] mb-1">Mensagem de Teste *</label>
              <textarea 
                rows={4}
                required
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold focus:outline-none focus:border-brand-blue"
              />
            </div>

            <button 
              type="submit"
              disabled={sending || !isConnected}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-extrabold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" /> 
              {sending ? 'Enviando...' : isConnected ? 'Enviar Mensagem de Teste' : 'Conecte o WhatsApp para Enviar'}
            </button>
          </form>

          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E6EBF1] space-y-2">
            <span className="text-xs font-extrabold text-[#0A2540] block">Recursos Habilitados via Evolution API:</span>
            <ul className="text-[11px] text-[#425466] space-y-1 font-semibold list-disc pl-4">
              <li>Envio de lembretes e escalas para voluntários de louvor e mídia</li>
              <li>Recebimento de comprovantes de dízimo e ofertas</li>
              <li>Atendimento automatizado pelo Agente Mestre IA via WhatsApp</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
