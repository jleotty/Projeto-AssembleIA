'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  CreditCard, 
  Calendar, 
  Download, 
  QrCode as QrCodeIcon, 
  ShieldCheck,
  Search,
  CheckCircle2
} from 'lucide-react';

export default function MembroPortalPage() {
  const [searchNumero, setSearchNumero] = useState('000001');
  const [membroData, setMembroData] = useState<any>({
    numeroMembro: '000001',
    nomeCompleto: 'João Oliveira da Silva',
    cpf: '100.000.100-10',
    rg: '10.100.100-1',
    dataNascimento: '1985-05-20',
    cargo: 'Evangelista',
    congregacao: 'Assembleia de Deus — Sede Central',
    fotoCarteirinha: '/uploads/membros/carteirinha/000001_rosto.jpg',
    fotoBanner: '/uploads/membros/banner/000001_corpo.jpg',
    dataEmissao: '15/01/2026',
    validade: '15/01/2031',
    qrCodeContent: 'https://assembleia.com/verificar-carteira?membroId=1&numero=000001',
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
        const fotoCorpo = m.fotos?.find((f: any) => f.tipo === 'BANNER')?.caminho || '/uploads/membros/banner/000001_corpo.jpg';

        setMembroData({
          numeroMembro: m.numeroMembro || searchNumero,
          nomeCompleto: m.nomeCompleto,
          cpf: m.cpf || 'Não informado',
          rg: m.rg || 'Não informado',
          dataNascimento: m.dataNascimento ? new Date(m.dataNascimento).toLocaleDateString('pt-BR') : '20/05/1985',
          cargo: m.membroMinisterios?.[0]?.ministerio?.nome || 'Membro',
          congregacao: m.congregacao?.nome || 'Sede Central',
          fotoCarteirinha: fotoRosto,
          fotoBanner: fotoCorpo,
          dataEmissao: m.carteirinha?.dataEmissao ? new Date(m.carteirinha.dataEmissao).toLocaleDateString('pt-BR') : '15/01/2026',
          validade: m.carteirinha?.validade ? new Date(m.carteirinha.validade).toLocaleDateString('pt-BR') : '15/01/2031',
          qrCodeContent: m.carteirinha?.qrCode || `https://assembleia.com/verificar-carteira?membroId=${m.id}&numero=${m.numeroMembro}`,
        });
      } else {
        alert('Membro não encontrado com este número ou CPF.');
      }
    } catch (e) {
      alert('Erro ao consultar carteirinha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F9FC] py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-xs font-extrabold uppercase">
            <ShieldCheck className="w-4 h-4" /> Carteira Digital de Membro Oficial
          </div>
          <h1 className="text-3xl font-extrabold text-[#0A2540]">
            Portal do Membro — Assembleia de Deus
          </h1>
          <p className="text-xs text-[#425466] font-medium">
            Digite seu Número de Membro para visualizar e baixar sua Carteira Digital com QR Code único.
          </p>
        </div>

        {/* BUSCA DE CARTEIRINHA */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex items-center gap-2">
          <input 
            type="text"
            value={searchNumero}
            onChange={(e) => setSearchNumero(e.target.value)}
            placeholder="Digite seu Nº de Membro (ex: 000001)"
            className="flex-1 h-11 px-4 rounded-xl border border-[#E6EBF1] bg-white text-xs font-bold text-[#0A2540] shadow-sm focus:outline-none focus:border-brand-blue"
          />
          <button 
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-brand-blue text-white font-extrabold text-xs shadow hover:bg-blue-900 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" /> Consultar
          </button>
        </form>

        {/* CARTEIRA DIGITAL OFICIAL (VINCULAÇÃO DIRETA DE FOTO 3X4 E QR CODE ÚNICO) */}
        <div className="max-w-md mx-auto bg-gradient-to-br from-[#0A2540] via-[#103459] to-[#0A2540] rounded-3xl p-6 text-white border border-[#1E4976] shadow-2xl space-y-6 relative overflow-hidden">
          {/* MARCA D'ÁGUA DA CHAMA */}
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <img src="/logo.jpg" alt="Logo" className="w-48 h-48 rounded-full object-cover" />
          </div>

          {/* CABEÇALHO CARTEIRINHA */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Logo AD" className="w-10 h-10 rounded-xl border border-white/20 object-cover shadow" />
              <div>
                <h2 className="text-xs font-extrabold tracking-wider uppercase text-amber-400">Igreja Assembleia de Deus</h2>
                <p className="text-[10px] text-slate-300 font-semibold">{membroData.congregacao}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-extrabold uppercase">
              VÁLIDA
            </span>
          </div>

          {/* CORPO: FOTO 3X4 VINCULADA DIRETA + DADOS */}
          <div className="flex items-start gap-4">
            {/* FOTO 3X4 ROSTO (VINCULADA À CARTEIRA) */}
            <div className="flex-shrink-0">
              <img 
                src={membroData.fotoCarteirinha} 
                alt="Foto 3x4 do Membro" 
                className="w-24 h-28 object-cover rounded-xl border-2 border-amber-400 shadow-md"
              />
              <span className="text-[9px] text-amber-300 font-bold text-center block mt-1 uppercase">Foto 3x4 Oficial</span>
            </div>

            <div className="flex-1 space-y-1.5 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Nome do Membro</span>
                <span className="font-extrabold text-sm text-white block leading-tight">{membroData.nomeCompleto}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Nº Registro</span>
                  <span className="font-mono font-extrabold text-amber-400 text-xs">{membroData.numeroMembro}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Função / Cargo</span>
                  <span className="font-extrabold text-white text-xs">{membroData.cargo}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Emissão</span>
                  <span className="font-semibold text-slate-200 text-[11px]">{membroData.dataEmissao}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Validade</span>
                  <span className="font-semibold text-slate-200 text-[11px]">{membroData.validade}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RODAPÉ CARTEIRINHA: QR CODE ÚNICO POR CARTEIRA */}
          <div className="bg-white/10 rounded-2xl p-3 border border-white/10 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-amber-400 font-extrabold uppercase flex items-center gap-1">
                <QrCodeIcon className="w-3.5 h-3.5" /> QR Code Único de Autenticidade
              </span>
              <p className="text-[9px] text-slate-300 font-medium leading-tight">
                Escaneie para verificar o registro oficial no banco de dados da Igreja.
              </p>
            </div>

            {/* QR CODE GERADO E EXIBIDO NA CARTEIRA */}
            <div className="bg-white p-1.5 rounded-xl border border-amber-400/50 shadow-md flex-shrink-0">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(membroData.qrCodeContent)}`} 
                alt="QR Code da Carteirinha"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
