'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  UserPlus, 
  Search, 
  CreditCard, 
  QrCode as QrCodeIcon, 
  FileText, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  X,
  Camera,
  Upload
} from 'lucide-react';

export default function SecretariaMembrosPage() {
  const [membros, setMembros] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  // Modal de Novo Cadastro (ÚNICO LUGAR DO SISTEMA)
  const [modalCadastroOpen, setModalCadastroOpen] = useState(false);
  const [carteiraModalOpen, setCarteiraModalOpen] = useState<any>(null);

  // Form State para Novo Cadastro em Secretaria
  const [form, setForm] = useState({
    nomeCompleto: '',
    dataNascimento: '',
    sexo: 'Masculino',
    estadoCivil: 'Solteiro',
    cpf: '',
    telefone: '',
    fotoCarteirinha: '', // OBRIGATÓRIA 3X4
    fotoBanner: '',      // OPCIONAL
  });

  const [erroFoto, setErroFoto] = useState('');

  const fetchMembros = async (p = 1, q = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/membros?page=${p}&limit=${limit}&q=${q}`);
      const data = await res.json();
      if (data.success) {
        setMembros(data.data);
        setTotal(data.total);
      }
    } catch (e) {
      console.error('Erro ao buscar membros:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembros(page, search);
  }, [page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchMembros(1, search);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'fotoCarteirinha' | 'fotoBanner') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, [field]: reader.result as string }));
        if (field === 'fotoCarteirinha') setErroFoto('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fotoCarteirinha) {
      setErroFoto('A Foto de Carteirinha 3x4 (rosto nítido) é OBRIGATÓRIA para a emissão da carteira digital.');
      return;
    }

    try {
      const res = await fetch('/api/membros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        alert(`Membro ${form.nomeCompleto} cadastrado com sucesso! Registro Nº ${data.numeroMembro}.`);
        setModalCadastroOpen(false);
        setForm({
          nomeCompleto: '',
          dataNascimento: '',
          sexo: 'Masculino',
          estadoCivil: 'Solteiro',
          cpf: '',
          telefone: '',
          fotoCarteirinha: '',
          fotoBanner: '',
        });
        fetchMembros(1, search);
      } else {
        alert(data.error || 'Erro ao cadastrar membro.');
      }
    } catch (e) {
      alert('Erro de conexão.');
    }
  };

  const handleDeleteMember = async (id: number, nome: string) => {
    if (!confirm(`Tem certeza que deseja excluir o cadastro de ${nome}?`)) return;
    try {
      const res = await fetch(`/api/membros?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchMembros(page, search);
      }
    } catch (e) {
      alert('Erro ao excluir membro.');
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER DA SECRETARIA COM BOTÃO ÚNICO DE CADASTRO */}
      <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#0A2540] flex items-center gap-2">
              <Users className="w-6 h-6 text-brand-blue" /> Secretaria & Rol de Membros
            </h1>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-xs font-extrabold border border-blue-200">
              {total} Cadastrados no SQLite
            </span>
          </div>
          <p className="text-xs text-[#425466] mt-1 font-semibold">
            Central única para emissão de carteirinhas com QR Code único e gerenciamento do rol oficial.
          </p>
        </div>

        {/* BOTÃO ÚNICO E OFICIAL DE CADASTRO DE MEMBRO */}
        <button 
          onClick={() => setModalCadastroOpen(true)}
          className="px-6 py-3 rounded-xl bg-flame-gradient text-white text-xs font-extrabold shadow-md hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" /> Cadastrar Novo Membro
        </button>
      </div>

      {/* BARRA DE PESQUISA */}
      <div className="bg-white rounded-2xl p-4 border border-[#E6EBF1] shadow-stripe-sm">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar membro por nome, CPF, telefone ou registro..."
              className="w-full h-10 pl-9 pr-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-xs text-[#0A2540] font-bold focus:outline-none focus:border-brand-blue"
            />
          </div>
          <button 
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#0A2540] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* TABELA DE MEMBROS COM CARTEIRINHA E QR CODE */}
      <div className="bg-white rounded-2xl border border-[#E6EBF1] shadow-stripe-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-extrabold uppercase">
                <th className="py-3 px-4">Foto 3x4</th>
                <th className="py-3 px-4">Registro</th>
                <th className="py-3 px-4">Nome Completo</th>
                <th className="py-3 px-4">Congregação</th>
                <th className="py-3 px-4">Telefone</th>
                <th className="py-3 px-4 text-center">Carteirinha & QR Code</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EBF1]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-bold">
                    Carregando Rol de Membros do SQLite...
                  </td>
                </tr>
              ) : membros.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-bold">
                    Nenhum membro encontrado.
                  </td>
                </tr>
              ) : (
                membros.map((m) => {
                  const fotoRosto = m.fotos?.find((f: any) => f.tipo === 'CARTEIRINHA')?.caminho || m.foto || '/uploads/membros/carteirinha/000001_rosto.jpg';
                  const qrCodeStr = m.carteirinha?.qrCode || `https://assembleia.com/verificar-carteira?membroId=${m.id}&numero=${m.numeroMembro}`;

                  return (
                    <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-4">
                        <img 
                          src={fotoRosto} 
                          alt={m.nomeCompleto} 
                          className="w-10 h-12 object-cover rounded-lg border border-brand-blue shadow-sm"
                        />
                      </td>
                      <td className="py-2.5 px-4 font-mono font-extrabold text-brand-blue">
                        #{m.numeroMembro || m.id}
                      </td>
                      <td className="py-2.5 px-4 font-extrabold text-[#0A2540] text-sm">
                        {m.nomeCompleto}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-slate-600">
                        {m.congregacao?.nome || 'Sede Central'}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-slate-600">
                        {m.telefone || m.whatsapp || 'Não informado'}
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <button 
                          onClick={() => setCarteiraModalOpen({ ...m, fotoRosto, qrCodeStr })}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-extrabold hover:bg-emerald-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <CreditCard className="w-3.5 h-3.5" /> Carteira com QR Code
                        </button>
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <button 
                          onClick={() => handleDeleteMember(m.id, m.nomeCompleto)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Excluir membro"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINAÇÃO */}
        <div className="p-4 border-t border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-between text-xs">
          <span className="font-bold text-slate-600">
            Página {page} de {totalPages || 1} ({total} membros)
          </span>
          <div className="flex items-center gap-2">
            <button 
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="p-2 rounded-lg bg-white border border-[#E6EBF1] disabled:opacity-50 text-[#0A2540] font-bold"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="p-2 rounded-lg bg-white border border-[#E6EBF1] disabled:opacity-50 text-[#0A2540] font-bold"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DE NOVO CADASTRO DE MEMBRO (ÚNICO NO SISTEMA) */}
      {modalCadastroOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full border border-[#E6EBF1] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-extrabold text-[#0A2540] flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-brand-blue" /> Formulário Único de Cadastro de Membro
              </h3>
              <button onClick={() => setModalCadastroOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-4 text-xs">
              {/* UPLOAD DE FOTO DE CARTEIRINHA 3X4 (OBRIGATÓRIA) */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <label className="block font-extrabold text-[#0A2540]">
                  Foto 3x4 de Carteirinha * <span className="text-rose-600 font-bold">(OBRIGATÓRIA VINCULADA À CARTEIRA)</span>
                </label>
                <div className="flex items-center gap-4">
                  {form.fotoCarteirinha ? (
                    <img src={form.fotoCarteirinha} alt="Foto 3x4" className="w-20 h-24 object-cover rounded-xl border border-brand-blue" />
                  ) : (
                    <div className="w-20 h-24 rounded-xl border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-slate-400">
                      <Camera className="w-6 h-6" />
                      <span className="text-[9px] font-bold mt-1">3x4 Oblig.</span>
                    </div>
                  )}

                  <label className="px-4 py-2 rounded-xl bg-white border border-[#E6EBF1] shadow-sm text-xs font-bold text-[#0A2540] hover:bg-slate-50 cursor-pointer flex items-center gap-2">
                    <Upload className="w-4 h-4 text-brand-blue" /> Selecionar Foto 3x4
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'fotoCarteirinha')} />
                  </label>
                </div>
                {erroFoto && <p className="text-xs text-rose-600 font-bold">{erroFoto}</p>}
              </div>

              <div>
                <label className="block font-bold text-[#0A2540] mb-1">Nome Completo *</label>
                <input 
                  type="text" 
                  required
                  value={form.nomeCompleto}
                  onChange={(e) => setForm({ ...form, nomeCompleto: e.target.value })}
                  placeholder="Nome completo do membro"
                  className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0A2540] mb-1">Data de Nascimento *</label>
                  <input 
                    type="date" 
                    required
                    value={form.dataNascimento}
                    onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0A2540] mb-1">Sexo *</label>
                  <select 
                    value={form.sexo}
                    onChange={(e) => setForm({ ...form, sexo: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0A2540] mb-1">CPF</label>
                  <input 
                    type="text" 
                    value={form.cpf}
                    onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                    placeholder="000.000.000-00"
                    className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0A2540] mb-1">Telefone / WhatsApp</label>
                  <input 
                    type="text" 
                    value={form.telefone}
                    onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                    placeholder="(11) 98888-7777"
                    className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl bg-flame-gradient text-white text-xs font-extrabold shadow-md hover:scale-[1.01] transition-transform"
              >
                Confirmar Cadastro com Carteira & QR Code
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE VISUALIZAÇÃO DA CARTEIRINHA DIGITAL COM QR CODE ÚNICO */}
      {carteiraModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A2540] rounded-3xl p-6 max-w-md w-full border border-[#1E4976] shadow-2xl text-white space-y-6 relative">
            <button 
              onClick={() => setCarteiraModalOpen(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <img src="/logo.jpg" alt="Logo AD" className="w-10 h-10 rounded-xl object-cover border border-white/20" />
              <div>
                <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">Igreja Assembleia de Deus</h3>
                <p className="text-[10px] text-slate-300 font-semibold">{carteiraModalOpen.congregacao?.nome || 'Sede Central'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <img 
                src={carteiraModalOpen.fotoRosto} 
                alt="Foto Carteira" 
                className="w-24 h-28 object-cover rounded-xl border-2 border-amber-400 shadow"
              />
              <div className="space-y-2 text-xs flex-1">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Nome do Membro</span>
                  <span className="font-extrabold text-sm text-white block leading-tight">{carteiraModalOpen.nomeCompleto}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Nº de Registro</span>
                  <span className="font-mono font-extrabold text-amber-400 text-xs">#{carteiraModalOpen.numeroMembro || carteiraModalOpen.id}</span>
                </div>
              </div>
            </div>

            {/* QR CODE ÚNICO PERSISTIDO NA CARTEIRA */}
            <div className="bg-white/10 rounded-2xl p-3 border border-white/10 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] text-amber-400 font-extrabold uppercase flex items-center gap-1">
                  <QrCodeIcon className="w-3.5 h-3.5" /> QR Code Único de Autenticidade
                </span>
                <p className="text-[9px] text-slate-300">
                  Gerado automaticamente para a carteira deste membro.
                </p>
              </div>

              <div className="bg-white p-1 rounded-xl shadow-md flex-shrink-0">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(carteiraModalOpen.qrCodeStr)}`} 
                  alt="QR Code Carteira"
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
