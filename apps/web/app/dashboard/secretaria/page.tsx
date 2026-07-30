'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  CreditCard, 
  Trash2, 
  Edit3,
  ChevronLeft, 
  ChevronRight,
  X,
  Camera,
  Upload,
  User,
  Heart,
  BookOpen,
  Sparkles,
  Save,
  CheckCircle,
  Download
} from 'lucide-react';

export default function SecretariaMembrosPage() {
  const [membros, setMembros] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  // Modal State (Cadastro & Edição)
  const [modalCadastroOpen, setModalCadastroOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [carteiraModalOpen, setCarteiraModalOpen] = useState<any>(null);

  // Form State Completo das 6 Seções
  const [form, setForm] = useState({
    nomeCompleto: '',
    dataNascimento: '',
    sexo: 'Masculino',
    estadoCivil: 'Solteiro',
    cpf: '',
    rg: '',
    telefone: '',
    email: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '',
    fotoCarteirinha: '', // OBRIGATÓRIA 3X4 ROSTO
    fotoBanner: '',      // OPCIONAL CORPO INTEIRO
    nomePai: '',
    nomeMae: '',
    nomeConjuge: '',
    quantidadeFilhos: '0',
    filhos: [] as { nome: string; idade: string }[],
    dataConversao: '',
    batizadoAguas: 'Não',
    dataBatismo: '',
    igrejaBatismo: '',
    batismoEspiritoSanto: 'Não',
    veioOutraIgreja: 'Não',
    igrejaAnterior: '',
    ministerios: [] as string[],
    talentos: '',
    necessidadesEspeciais: '',
    contatoEmergencia: '',
    telefoneEmergencia: '',
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

  const handleToggleMinisterio = (ministerio: string) => {
    setForm(prev => ({
      ...prev,
      ministerios: prev.ministerios.includes(ministerio)
        ? prev.ministerios.filter(m => m !== ministerio)
        : [...prev.ministerios, ministerio]
    }));
  };

  const handleOpenNovoCadastro = () => {
    setEditingId(null);
    setForm({
      nomeCompleto: '',
      dataNascimento: '',
      sexo: 'Masculino',
      estadoCivil: 'Solteiro',
      cpf: '',
      rg: '',
      telefone: '',
      email: '',
      endereco: '',
      numero: '',
      bairro: '',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '',
      fotoCarteirinha: '',
      fotoBanner: '',
      nomePai: '',
      nomeMae: '',
      nomeConjuge: '',
      quantidadeFilhos: '0',
      filhos: [],
      dataConversao: '',
      batizadoAguas: 'Não',
      dataBatismo: '',
      igrejaBatismo: '',
      batismoEspiritoSanto: 'Não',
      veioOutraIgreja: 'Não',
      igrejaAnterior: '',
      ministerios: [],
      talentos: '',
      necessidadesEspeciais: '',
      contatoEmergencia: '',
      telefoneEmergencia: '',
    });
    setErroFoto('');
    setModalCadastroOpen(true);
  };

  const handleOpenEdit = (m: any) => {
    setEditingId(m.id);
    const fotoRostoObj = m.fotos?.find((f: any) => f.tipo === 'CARTEIRINHA');
    const fotoBannerObj = m.fotos?.find((f: any) => f.tipo === 'BANNER');

    setForm({
      nomeCompleto: m.nomeCompleto || '',
      dataNascimento: m.dataNascimento ? new Date(m.dataNascimento).toISOString().slice(0, 10) : '',
      sexo: m.sexo || 'Masculino',
      estadoCivil: m.estadoCivil || 'Solteiro',
      cpf: m.cpf || '',
      rg: m.rg || '',
      telefone: m.telefone || m.whatsapp || '',
      email: m.email || '',
      endereco: m.endereco || '',
      numero: m.numero || '',
      bairro: m.bairro || '',
      cidade: m.cidade || 'São Paulo',
      estado: m.estado || 'SP',
      cep: m.cep || '',
      fotoCarteirinha: fotoRostoObj ? fotoRostoObj.caminho : (m.foto || ''),
      fotoBanner: fotoBannerObj ? fotoBannerObj.caminho : '',
      nomePai: m.familiares?.[0]?.nomePai || '',
      nomeMae: m.familiares?.[0]?.nomeMae || '',
      nomeConjuge: m.familiares?.[0]?.nomeConjuge || '',
      quantidadeFilhos: String(m.filhos?.length || 0),
      filhos: m.filhos || [],
      dataConversao: m.vidaEspiritual?.dataConversao ? new Date(m.vidaEspiritual.dataConversao).toISOString().slice(0, 10) : '',
      batizadoAguas: m.vidaEspiritual?.batizadoAguas ? 'Sim' : 'Não',
      dataBatismo: m.vidaEspiritual?.dataBatismo ? new Date(m.vidaEspiritual.dataBatismo).toISOString().slice(0, 10) : '',
      igrejaBatismo: m.vidaEspiritual?.igrejaBatismo || '',
      batismoEspiritoSanto: m.vidaEspiritual?.batismoEspiritoSanto ? 'Sim' : 'Não',
      veioOutraIgreja: m.vidaEspiritual?.veioOutraIgreja ? 'Sim' : 'Não',
      igrejaAnterior: m.vidaEspiritual?.igrejaAnterior || '',
      ministerios: m.membroMinisterios?.map((mm: any) => mm.ministerio?.nome).filter(Boolean) || [],
      talentos: m.observacoes?.[0]?.talentos || '',
      necessidadesEspeciais: m.observacoes?.[0]?.necessidadesEspeciais || '',
      contatoEmergencia: m.observacoes?.[0]?.contatoEmergencia || '',
      telefoneEmergencia: m.observacoes?.[0]?.telefoneEmergencia || '',
    });
    setErroFoto('');
    setModalCadastroOpen(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fotoCarteirinha) {
      setErroFoto('A Foto 3x4 de Carteirinha (rosto nítido) é OBRIGATÓRIA.');
      return;
    }

    try {
      const isEdit = editingId !== null;
      const url = '/api/membros';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: editingId }),
      });

      const data = await res.json();
      if (data.success) {
        alert(isEdit ? `Cadastro de ${form.nomeCompleto} editado com sucesso!` : `Membro ${form.nomeCompleto} cadastrado com sucesso!`);
        setModalCadastroOpen(false);
        fetchMembros(page, search);
      } else {
        alert(data.error || 'Erro ao salvar membro.');
      }
    } catch (e) {
      alert('Erro de conexão ao salvar membro.');
    }
  };

  const handleDeleteMember = async (id: number, nome: string) => {
    if (!confirm(`Excluir cadastro de ${nome}?`)) return;
    try {
      const res = await fetch(`/api/membros?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchMembros(page, search);
    } catch (e) {
      alert('Erro ao excluir membro.');
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER DA SECRETARIA COM REMOÇÃO DA PALAVRA "SQLITE" */}
      <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#0A2540] flex items-center gap-2">
              <Users className="w-6 h-6 text-brand-blue" /> Secretaria & Rol de Membros
            </h1>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-xs font-extrabold border border-blue-200">
              {total} Cadastrados
            </span>
          </div>
          <p className="text-xs text-[#425466] mt-1 font-semibold">
            Central única para emissão de carteirinhas com QR Code único e gerenciamento do rol oficial.
          </p>
        </div>

        <button 
          onClick={handleOpenNovoCadastro}
          className="px-6 py-3 rounded-xl bg-flame-gradient text-white text-xs font-extrabold shadow-md hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" /> Cadastrar Membro
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

      {/* TABELA DE MEMBROS COM AÇÕES DE EDITAR E EXCLUIR */}
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
                    Carregando Rol de Membros...
                  </td>
                </tr>
              ) : membros.map((m) => {
                const fotoRostoObj = m.fotos?.find((f: any) => f.tipo === 'CARTEIRINHA');
                const fotoRosto = fotoRostoObj ? fotoRostoObj.caminho : (m.foto && !m.foto.includes('corpo') ? m.foto : `/uploads/membros/carteirinha/${String(m.id).padStart(6, '0')}_rosto.jpg`);
                const qrCodeStr = m.carteirinha?.qrCode || `https://assembleia.com/verificar-carteira?membroId=${m.id}&numero=${m.numeroMembro || 'AD-2026-' + String(m.id).padStart(4, '0')}`;

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
                      #{m.numeroMembro || `AD-2026-${String(m.id).padStart(4, '0')}`}
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
                        <CreditCard className="w-3.5 h-3.5" /> Ver Carteira
                      </button>
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => handleOpenEdit(m)}
                          className="p-1.5 text-brand-blue hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Editar Cadastro"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteMember(m.id, m.nomeCompleto)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Excluir Membro"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* PAGINAÇÃO */}
        <div className="p-4 border-t border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-between text-xs">
          <span className="font-bold text-slate-600">Página {page} de {totalPages || 1} ({total} membros)</span>
          <div className="flex items-center gap-2">
            <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="p-2 rounded-lg bg-white border border-[#E6EBF1] disabled:opacity-50 font-bold"><ChevronLeft className="w-4 h-4" /></button>
            <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="p-2 rounded-lg bg-white border border-[#E6EBF1] disabled:opacity-50 font-bold"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* MODAL DE CADASTRO E EDIÇÃO COMPLETA */}
      {modalCadastroOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-4xl w-full border border-[#E6EBF1] shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-xl font-extrabold text-[#0A2540] flex items-center gap-2">
                  {editingId ? <Edit3 className="w-6 h-6 text-brand-blue" /> : <UserPlus className="w-6 h-6 text-brand-blue" />} 
                  {editingId ? 'Editar Cadastro do Membro' : 'Formulário de Cadastro de Membro'}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {editingId ? 'Altere as informações conforme a necessidade e clique em "Salvar cadastro".' : 'Preencha as seções para cadastrar o novo membro.'}
                </p>
              </div>
              <button onClick={() => setModalCadastroOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-8 text-xs">
              {/* UPLOAD DE FOTO DE CARTEIRINHA (OBRIGATÓRIA) & BANNER (OPCIONAL) */}
              <div className="space-y-4 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <h4 className="font-extrabold text-[#0A2540] flex items-center gap-2">
                  <Camera className="w-4 h-4 text-brand-blue" /> Fotos do Membro
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* CARTEIRINHA ROSTO */}
                  <div className="space-y-2">
                    <label className="block font-extrabold text-[#0A2540]">
                      1. Foto 3x4 de Carteirinha * <span className="text-rose-600 font-bold">(OBRIGATÓRIA)</span>
                    </label>
                    <div className="flex items-center gap-4">
                      {form.fotoCarteirinha ? (
                        <img src={form.fotoCarteirinha} alt="Foto Carteirinha" className="w-20 h-26 object-cover rounded-xl border border-brand-blue shadow-sm" />
                      ) : (
                        <div className="w-20 h-26 rounded-xl border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-slate-400">
                          <Camera className="w-6 h-6" />
                          <span className="text-[9px] font-bold mt-1">3x4 Oblig.</span>
                        </div>
                      )}
                      <label className="px-4 py-2.5 rounded-xl bg-white border border-[#E6EBF1] shadow-sm text-xs font-bold text-[#0A2540] hover:bg-slate-50 cursor-pointer flex items-center gap-2">
                        <Upload className="w-4 h-4 text-brand-blue" /> Enviar Foto 3x4
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'fotoCarteirinha')} />
                      </label>
                    </div>
                    {erroFoto && <p className="text-xs text-rose-600 font-bold">{erroFoto}</p>}
                  </div>

                  {/* BANNER CORPO INTEIRO */}
                  <div className="space-y-2">
                    <label className="block font-extrabold text-[#0A2540]">
                      2. Foto de Banner <span className="text-slate-400 font-normal">(OPCIONAL - Corpo Inteiro)</span>
                    </label>
                    <div className="flex items-center gap-4">
                      {form.fotoBanner ? (
                        <img src={form.fotoBanner} alt="Foto Banner" className="w-32 h-20 object-cover rounded-xl border border-emerald-500 shadow-sm" />
                      ) : (
                        <div className="w-32 h-20 rounded-xl border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-slate-400">
                          <Upload className="w-5 h-5" />
                          <span className="text-[9px] font-bold mt-1">Banner Opc.</span>
                        </div>
                      )}
                      <label className="px-4 py-2.5 rounded-xl bg-white border border-[#E6EBF1] shadow-sm text-xs font-bold text-[#0A2540] hover:bg-slate-50 cursor-pointer flex items-center gap-2">
                        <Upload className="w-4 h-4 text-emerald-600" /> Enviar Banner
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'fotoBanner')} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEÇÃO 1: DADOS PESSOAIS */}
              <div className="space-y-4 border-t pt-4">
                <h4 className="font-extrabold text-[#0A2540] text-sm flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-blue" /> 1. Dados Pessoais
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#0A2540] mb-1">Nome Completo *</label>
                    <input type="text" required value={form.nomeCompleto} onChange={(e) => setForm({ ...form, nomeCompleto: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0A2540] mb-1">Data de Nascimento *</label>
                    <input type="date" required value={form.dataNascimento} onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block font-bold text-[#0A2540] mb-1">Sexo *</label>
                    <select value={form.sexo} onChange={(e) => setForm({ ...form, sexo: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold">
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-[#0A2540] mb-1">Estado Civil *</label>
                    <select value={form.estadoCivil} onChange={(e) => setForm({ ...form, estadoCivil: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold">
                      <option value="Solteiro">Solteiro</option>
                      <option value="Casado">Casado</option>
                      <option value="Viúvo">Viúvo</option>
                      <option value="Divorciado">Divorciado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-[#0A2540] mb-1">CPF (Opcional)</label>
                    <input type="text" value={form.cpf} onChange={(e) => setForm({ ...form, cpf: e.target.value })} placeholder="000.000.000-00" className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0A2540] mb-1">Telefone / WhatsApp</label>
                    <input type="text" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} placeholder="(11) 98888-7777" className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold" />
                  </div>
                </div>
              </div>

              {/* SEÇÃO 2: INFORMAÇÕES FAMILIARES */}
              <div className="space-y-4 border-t pt-4">
                <h4 className="font-extrabold text-[#0A2540] text-sm flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-600" /> 2. Informações Familiares
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-[#0A2540] mb-1">Nome do Pai</label>
                    <input type="text" value={form.nomePai} onChange={(e) => setForm({ ...form, nomePai: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0A2540] mb-1">Nome da Mãe</label>
                    <input type="text" value={form.nomeMae} onChange={(e) => setForm({ ...form, nomeMae: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0A2540] mb-1">Nome do Cônjuge</label>
                    <input type="text" value={form.nomeConjuge} onChange={(e) => setForm({ ...form, nomeConjuge: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold" />
                  </div>
                </div>
              </div>

              {/* SEÇÃO 3: INFORMAÇÕES ESPIRITUAIS */}
              <div className="space-y-4 border-t pt-4">
                <h4 className="font-extrabold text-[#0A2540] text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-600" /> 3. Informações Espirituais
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-[#0A2540] mb-1">Data que Aceitou Jesus</label>
                    <input type="date" value={form.dataConversao} onChange={(e) => setForm({ ...form, dataConversao: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0A2540] mb-1">Batizado nas Águas?</label>
                    <select value={form.batizadoAguas} onChange={(e) => setForm({ ...form, batizadoAguas: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold">
                      <option value="Sim">Sim</option>
                      <option value="Não">Não</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-[#0A2540] mb-1">Batismo no Espírito Santo?</label>
                    <select value={form.batismoEspiritoSanto} onChange={(e) => setForm({ ...form, batismoEspiritoSanto: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold">
                      <option value="Sim">Sim</option>
                      <option value="Não">Não</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SEÇÃO 4: MINISTÉRIOS / PARTICIPAÇÃO */}
              <div className="space-y-4 border-t pt-4">
                <h4 className="font-extrabold text-[#0A2540] text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" /> 4. Participação nos Ministérios
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Louvor', 'Diaconato', 'Presbíteros', 'Mídia e Tecnologia', 'Recepção', 'Círculo de Oração', 'Escola Bíblica Dominical', 'Evangelismo'].map((min) => {
                    const sel = form.ministerios.includes(min);
                    return (
                      <button type="button" key={min} onClick={() => handleToggleMinisterio(min)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${sel ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white text-slate-700 border-slate-200'}`}>
                        {min}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* BOTÃO MANTIDO FIEL: Salvar cadastro */}
              <button 
                type="submit" 
                className="w-full py-4 rounded-xl bg-flame-gradient text-white text-sm font-extrabold shadow-lg hover:scale-[1.01] transition-transform cursor-pointer flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Salvar cadastro
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE VISUALIZAÇÃO DA CARTEIRINHA DIGITAL */}
      {carteiraModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A2540] rounded-3xl p-6 max-w-md w-full border border-[#1E4976] shadow-2xl text-white space-y-6 relative overflow-hidden">
            <button onClick={() => setCarteiraModalOpen(null)} className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white z-20">
              <X className="w-5 h-5" />
            </button>

            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue via-purple-500 to-amber-500" />

            <div className="flex items-start justify-between relative z-10 border-b border-white/10 pb-4 pt-1">
              <div className="flex items-center gap-3">
                <img src="/logo.jpg" alt="Logo AD" className="w-10 h-10 rounded-xl object-cover border border-white/20 shadow" />
                <div>
                  <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">IGREJA ASSEMBLEIA DE DEUS</h3>
                  <p className="text-[10px] text-slate-300 font-medium">{carteiraModalOpen.congregacao?.nome || 'Assembleia de Deus - Sede Central'}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-extrabold uppercase">
                <CheckCircle className="w-3 h-3" /> ATIVO
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 relative z-10">
              <div className="w-28 h-36 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg flex-shrink-0 bg-slate-800">
                <img 
                  src={carteiraModalOpen.fotoRosto} 
                  alt="Foto 3x4" 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="flex-1 min-w-0 space-y-3">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">MEMBRO TITULAR</span>
                  <h4 className="font-extrabold text-sm text-white truncate leading-tight uppercase tracking-wide">
                    {carteiraModalOpen.nomeCompleto}
                  </h4>
                </div>

                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">REGISTRO</span>
                  <span className="font-mono font-extrabold text-amber-400 text-xs tracking-wider">
                    #{carteiraModalOpen.numeroMembro || `AD-2026-${String(carteiraModalOpen.id).padStart(4, '0')}`}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center flex-shrink-0">
                <div className="bg-white p-2 rounded-2xl shadow-md border border-white/20">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(carteiraModalOpen.qrCodeStr)}`} 
                    alt="QR Code Carteira" 
                    className="w-16 h-16 object-contain" 
                  />
                </div>
                <span className="text-[8px] text-slate-300 font-bold uppercase mt-1 text-center">QR CODE ÚNICO</span>
              </div>
            </div>

            <div className="pt-2 relative z-10">
              <button 
                onClick={() => window.print()}
                className="w-full py-3.5 rounded-2xl bg-white text-[#0A2540] font-extrabold text-xs shadow-md hover:bg-slate-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-brand-blue" /> Salvar na galeria
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
