'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  CreditCard, 
  Download, 
  QrCode as QrCodeIcon, 
  ShieldCheck,
  Search,
  Share2,
  CheckCircle
} from 'lucide-react';

export default function MembroPortalPage() {
  const [searchNumero, setSearchNumero] = useState('000001');
  const [membroData, setMembroData] = useState<any>({
    numeroMembro: 'AD-2026-0001',
    nomeCompleto: 'JOÃO OLIVEIRA DA SILVA',
    cpf: '100.000.100-10',
    dataNascimento: '20/05/1985',
    cargo: 'Evangelista',
    congregacao: 'Assembleia de Deus — Sede Central',
    fotoCarteirinha: '/uploads/membros/carteirinha/000001_rosto.jpg',
    dataEmissao: '01/2026',
    validade: '01/2031',
    qrCodeContent: 'https://assembleia.com/verificar-carteira?membroId=1&numero=AD-2026-0001',
  });

  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchNumero) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/membros?q=${searchNumero}`);
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        const m = data.data[0];
        const fotoRosto = m.fotos?.find((f: any) => f.tipo === 'CARTEIRINHA')?.caminho || m.foto || '/uploads/membros/carteirinha/000001_rosto.jpg';

        setMembroData({
          numeroMembro: m.numeroMembro || `AD-2026-${String(m.id).padStart(4, '0')}`,
          nomeCompleto: m.nomeCompleto.toUpperCase(),
          cpf: m.cpf || 'Não informado',
          dataNascimento: m.dataNascimento ? new Date(m.dataNascimento).toLocaleDateString('pt-BR') : '20/05/1985',
          cargo: m.membroMinisterios?.[0]?.ministerio?.nome || 'Membro',
          congregacao: m.congregacao?.nome || 'Sede Central',
          fotoCarteirinha: fotoRosto,
          dataEmissao: m.carteirinha?.dataEmissao ? new Date(m.carteirinha.dataEmissao).toLocaleDateString('pt-BR').slice(3) : '01/2026',
          validade: m.carteirinha?.validade ? new Date(m.carteirinha.validade).toLocaleDateString('pt-BR').slice(3) : '01/2031',
          qrCodeContent: m.carteirinha?.qrCode || `https://assembleia.com/verificar-carteira?membroId=${m.id}&numero=${m.numeroMembro}`,
        });
      } else {
        alert('Membro não encontrado.');
      }
    } catch (e) {
      alert('Erro ao consultar carteirinha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F9FC] py-12 px-4">
      <div className="max-w-xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-xs font-extrabold uppercase">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Carteira Digital Oficial do Membro
          </div>
          <h1 className="text-3xl font-extrabold text-[#0A2540]">
            Assembleia de Deus
          </h1>
          <p className="text-xs text-[#425466] font-semibold">
            Identificação Oficial de Membro com QR Code de Autenticidade em Tempo Real.
          </p>
        </div>

        {/* BUSCA DE CARTEIRINHA */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input 
            type="text"
            value={searchNumero}
            onChange={(e) => setSearchNumero(e.target.value)}
            placeholder="Digite seu Nº de Membro ou Nome"
            className="flex-1 h-12 px-4 rounded-2xl border border-[#E6EBF1] bg-white text-xs font-bold text-[#0A2540] shadow-sm focus:outline-none focus:border-brand-blue"
          />
          <button 
            type="submit"
            disabled={loading}
            className="px-6 py-3.5 rounded-2xl bg-[#0A2540] text-white font-extrabold text-xs shadow hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" /> Consultar
          </button>
        </form>

        {/* CARTÃO DIGITAL COM GRADIENTE FIEL DA CHAMA (AZUL -> PÚRPURA -> LARANJA) */}
        <div className="space-y-4">
          <div className="relative rounded-3xl p-7 bg-gradient-to-br from-[#0062FF] via-[#61279E] to-[#FF4B00] text-white shadow-2xl border border-white/20 overflow-hidden space-y-6">
            {/* BRILHO SUAVE */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            {/* CABEÇALHO DO CARTÃO */}
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-3">
                <img src="/logo.jpg" alt="Logo AD" className="w-12 h-12 rounded-2xl object-cover border-2 border-white/40 shadow-md" />
                <div>
                  <h2 className="text-xs font-extrabold text-white uppercase tracking-wider">Igreja Assembleia de Deus</h2>
                  <p className="text-[10px] text-amber-200 font-semibold">{membroData.congregacao}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-extrabold uppercase">
                <CheckCircle className="w-3 h-3 text-emerald-400" /> ATIVO
              </div>
            </div>

            {/* CONTEÚDO PRINCIPAL: FOTO + DADOS + QR CODE GRANDE */}
            <div className="grid grid-cols-12 gap-4 items-center relative z-10 pt-2">
              {/* FOTO 3X4 E DADOS (ESQUERDA) */}
              <div className="col-span-8 flex items-center gap-3">
                <img 
                  src={membroData.fotoCarteirinha} 
                  alt="Foto do Membro" 
                  className="w-20 h-24 object-cover rounded-2xl border-2 border-white/50 shadow-lg flex-shrink-0"
                />

                <div className="space-y-2 overflow-hidden">
                  <div>
                    <span className="text-[9px] text-amber-200 font-bold uppercase tracking-wider block">MEMBRO TITULAR</span>
                    <h3 className="text-sm font-extrabold text-white truncate leading-tight tracking-wide">{membroData.nomeCompleto}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-1 text-[10px]">
                    <div>
                      <span className="text-[8px] text-white/80 font-bold uppercase block">REGISTRO</span>
                      <span className="font-mono font-extrabold text-amber-300">{membroData.numeroMembro}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-white/80 font-bold uppercase block">VALIDADE</span>
                      <span className="font-bold text-white">{membroData.validade}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR CODE GRANDE COM MOLDURA BRANCA (DIREITA) */}
              <div className="col-span-4 flex flex-col items-center justify-center">
                <div className="bg-white p-2.5 rounded-2xl shadow-2xl border-2 border-white/30">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(membroData.qrCodeContent)}`} 
                    alt="QR Code Único"
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <span className="text-[8px] text-white font-bold uppercase mt-1 text-center">QR CODE ÚNICO</span>
              </div>
            </div>
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="space-y-3">
            <button 
              onClick={() => alert('Link da carteirinha copiado para o WhatsApp!')}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0062FF] via-[#61279E] to-[#FF4B00] text-white font-extrabold text-xs shadow-lg hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4" /> Compartilhar carteirinha
            </button>

            <button 
              onClick={() => window.print()}
              className="w-full py-3.5 rounded-2xl bg-white border border-[#E6EBF1] text-[#0A2540] font-extrabold text-xs shadow-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-brand-blue" /> Salvar na galeria (Imprimir PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
