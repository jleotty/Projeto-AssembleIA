'use client';

import { useState } from 'react';
import { 
  Download, 
  ShieldCheck,
  Search,
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
    congregacao: 'Assembleia de Deus - Sede Central',
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
        const fotoRostoObj = m.fotos?.find((f: any) => f.tipo === 'CARTEIRINHA');
        const fotoRosto = fotoRostoObj ? fotoRostoObj.caminho : (m.foto && !m.foto.includes('corpo') ? m.foto : `/uploads/membros/carteirinha/${String(m.id).padStart(6, '0')}_rosto.jpg`);

        setMembroData({
          numeroMembro: m.numeroMembro || `AD-2026-${String(m.id).padStart(4, '0')}`,
          nomeCompleto: m.nomeCompleto.toUpperCase(),
          cpf: m.cpf || 'Não informado',
          dataNascimento: m.dataNascimento ? new Date(m.dataNascimento).toLocaleDateString('pt-BR') : '20/05/1985',
          cargo: m.membroMinisterios?.[0]?.ministerio?.nome || 'Membro',
          congregacao: m.congregacao?.nome || 'Assembleia de Deus - Sede Central',
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
      <div className="max-w-md mx-auto space-y-8">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-xs font-extrabold uppercase">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Carteira Digital Oficial
          </div>
          <h1 className="text-2xl font-extrabold text-[#0A2540]">
            Assembleia de Deus
          </h1>
          <p className="text-xs text-[#425466] font-semibold">
            Identificação de Membro com Autenticidade em Tempo Real.
          </p>
        </div>

        {/* BUSCA DE CARTEIRINHA */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input 
            type="text"
            value={searchNumero}
            onChange={(e) => setSearchNumero(e.target.value)}
            placeholder="Digite seu Nº de Membro ou Nome"
            className="flex-1 h-11 px-4 rounded-xl border border-[#E6EBF1] bg-white text-xs font-bold text-[#0A2540] shadow-sm focus:outline-none focus:border-brand-blue"
          />
          <button 
            type="submit"
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-[#0A2540] text-white font-extrabold text-xs shadow hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" /> Consultar
          </button>
        </form>

        {/* CARTÃO DIGITAL ELEGANTE COM ESTRUTURA FLEX RIGOROSA (100% IGUAL AO PADRÃO JULIAN) */}
        <div className="space-y-4">
          <div className="relative rounded-3xl p-6 bg-[#0A2540] text-white shadow-2xl border border-[#1E4976] overflow-hidden space-y-6">
            {/* DETALHE SUPERIOR BORDADO */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue via-purple-500 to-amber-500" />

            {/* CABEÇALHO */}
            <div className="flex items-start justify-between relative z-10 border-b border-white/10 pb-4 pt-1">
              <div className="flex items-center gap-3">
                <img src="/logo.jpg" alt="Logo AD" className="w-10 h-10 rounded-xl object-cover border border-white/20 shadow" />
                <div>
                  <h2 className="text-xs font-extrabold text-white uppercase tracking-wider">IGREJA ASSEMBLEIA DE DEUS</h2>
                  <p className="text-[10px] text-slate-300 font-medium">{membroData.congregacao}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-extrabold uppercase">
                <CheckCircle className="w-3 h-3" /> ATIVO
              </div>
            </div>

            {/* FOTO 3X4 FIXA (ESQUERDA) + DADOS DO MEMBRO (MEIO) + QR CODE (DIREITA) */}
            <div className="flex items-center justify-between gap-3 relative z-10">
              {/* FOTO 3X4 RIGOROSAMENTE FIXA COM DIMENSÃO w-28 h-36 */}
              <div className="w-28 h-36 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg flex-shrink-0 bg-slate-800">
                <img 
                  src={membroData.fotoCarteirinha} 
                  alt="Foto 3x4" 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* DADOS DO MEMBRO (MEMBRO TITULAR + REGISTRO) */}
              <div className="flex-1 min-w-0 space-y-3">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">MEMBRO TITULAR</span>
                  <h4 className="font-extrabold text-sm text-white truncate leading-tight uppercase tracking-wide">
                    {membroData.nomeCompleto}
                  </h4>
                </div>

                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">REGISTRO</span>
                  <span className="font-mono font-extrabold text-amber-400 text-xs tracking-wider">
                    #{membroData.numeroMembro}
                  </span>
                </div>
              </div>

              {/* QR CODE ÚNICO (DIREITA) */}
              <div className="flex flex-col items-center justify-center flex-shrink-0">
                <div className="bg-white p-2 rounded-2xl shadow-md border border-white/20">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(membroData.qrCodeContent)}`} 
                    alt="QR Code Único"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <span className="text-[8px] text-slate-300 font-bold uppercase mt-1 text-center">QR CODE ÚNICO</span>
              </div>
            </div>
          </div>

          {/* BOTÃO SALVAR NA GALERIA */}
          <button 
            onClick={() => window.print()}
            className="w-full py-3.5 rounded-2xl bg-white border border-[#E6EBF1] text-[#0A2540] font-extrabold text-xs shadow-stripe-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-brand-blue" /> Salvar na galeria
          </button>
        </div>
      </div>
    </div>
  );
}
