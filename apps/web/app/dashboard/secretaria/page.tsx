'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  UserPlus, 
  Download, 
  Trash2, 
  Edit, 
  RefreshCw,
  X,
  Send,
  User,
  Heart,
  BookOpen,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface Membro {
  id: number;
  numeroMembro: string;
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  email: string;
  congregacao?: { nome: string };
  membroMinisterios?: { ministerio: { nome: string } }[];
}

export default function SecretariaAdminPage() {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form State para Modal Inline
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
    cidade: '',
    estado: 'SP',
    cep: '',
    nomePai: '',
    nomeMae: '',
    nomeConjuge: '',
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
    termoCompromisso: true,
  });

  const fetchMembros = async (query = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/membros?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.success) {
        setMembros(data.data);
      }
    } catch (e) {
      console.error('Erro ao buscar membros:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembros(search);
  }, [search]);

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este cadastro de membro?')) return;

    try {
      const res = await fetch(`/api/membros?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setMembros(prev => prev.filter(m => m.id !== id));
      }
    } catch (e) {
      alert('Erro ao excluir membro.');
    }
  };

  const handleExportCSV = () => {
    const headers = ['Número Membro', 'Nome Completo', 'CPF', 'Telefone', 'E-mail', 'Congregação'];
    const rows = membros.map(m => [
      m.numeroMembro || '',
      `"${m.nomeCompleto}"`,
      m.cpf || '',
      m.telefone || '',
      m.email || '',
      `"${m.congregacao?.nome || 'Sede'}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Membros_Assembleia_de_Deus_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/membros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Cadastro realizado com sucesso! Número do Membro: ${data.numeroMembro}`);
        setShowModal(false);
        fetchMembros();
      } else {
        alert(data.error || 'Erro ao realizar cadastro.');
      }
    } catch (err) {
      alert('Erro de conexão ao salvar cadastro.');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0A2540] flex items-center gap-2">
            <Users className="w-6 h-6 text-brand-blue" /> Área Administrativa — Rol de Membros
          </h1>
          <p className="text-[#425466] text-xs mt-1 font-medium">Consulta, edição, exclusão e exportação de cadastros no SQLite</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#E6EBF1] shadow-stripe-sm text-[#0A2540] text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-emerald-600" /> Exportar Lista (CSV)
          </button>

          {/* BOTÃO CADASTRAR MEMBRO (ABRE MODAL OU NAVEGA) */}
          <button 
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 rounded-xl bg-flame-gradient text-white text-xs font-extrabold shadow-md shadow-brand-cyan/20 hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Cadastrar Membro
          </button>
        </div>
      </div>

      {/* BARRA DE PESQUISA POR NOME, TELEFONE OU CPF */}
      <div className="bg-white rounded-2xl p-4 border border-[#E6EBF1] shadow-stripe-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por nome, telefone, CPF ou número de membro..."
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] font-bold text-xs focus:outline-none focus:border-brand-blue"
          />
        </div>

        <button 
          onClick={() => fetchMembros(search)}
          className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-brand-blue text-xs font-bold flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Atualizar Consulta
        </button>
      </div>

      {/* TABELA DE MEMBROS (CORRIGIDA COR DO TEXTO DOS NOMES PARA PRETO/NAVY CLARO ESCURO VISÍVEL) */}
      <div className="bg-white rounded-2xl border border-[#E6EBF1] shadow-stripe-sm overflow-hidden">
        <div className="p-4 bg-[#F8FAFC] border-b border-[#E6EBF1] flex items-center justify-between">
          <span className="text-xs font-bold text-[#0A2540]">Membros Encontrados: {membros.length}</span>
          <span className="text-[10px] text-[#425466] font-mono font-bold">SQLite: SELECT * FROM membros WHERE ativo = 1</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E6EBF1] text-[#425466] uppercase font-extrabold">
              <tr>
                <th className="py-3.5 px-4">Nº Membro</th>
                <th className="py-3.5 px-4">Nome Completo</th>
                <th className="py-3.5 px-4">CPF / Contato</th>
                <th className="py-3.5 px-4">Congregação</th>
                <th className="py-3.5 px-4">Ministérios</th>
                <th className="py-3.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EBF1]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#425466] font-semibold">Carregando cadastros do banco...</td>
                </tr>
              ) : membros.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#425466] font-semibold">Nenhum membro encontrado. Clique em "Cadastrar Membro" acima.</td>
                </tr>
              ) : (
                membros.map((m) => (
                  <tr key={m.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-extrabold text-brand-blue">{m.numeroMembro || 'AD-2026-0000'}</td>
                    
                    {/* TEXTO DO NOME DO MEMBRO CORRIGIDO PARA ALTO CONTRASTE (#0A2540) */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-brand-blue font-extrabold flex items-center justify-center text-xs shrink-0">
                          {m.nomeCompleto ? m.nomeCompleto[0] : 'M'}
                        </div>
                        <div>
                          <span className="block font-extrabold text-[#0A2540] text-sm">{m.nomeCompleto}</span>
                          <span className="text-[10px] text-[#425466] font-semibold">Membro Cadastrado</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-[#425466] font-semibold space-y-0.5">
                      <div className="text-[#0A2540] font-bold">CPF: {m.cpf || 'Não informado'}</div>
                      <div className="text-[11px] text-[#425466] font-medium">{m.telefone || m.email || ''}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#0A2540] font-bold">{m.congregacao?.nome || 'Sede Assembleia de Deus'}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {m.membroMinisterios && m.membroMinisterios.length > 0 ? (
                          m.membroMinisterios.map((item, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-blue-50 text-brand-blue text-[10px] font-extrabold border border-blue-200">
                              {item.ministerio.nome}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-500 text-[10px] font-bold">Geral</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button 
                        onClick={() => alert(`Edição do cadastro #${m.numeroMembro}: ${m.nomeCompleto}`)}
                        className="p-1.5 rounded-lg bg-blue-50 text-brand-blue border border-blue-200 hover:bg-blue-100 transition-colors"
                        title="Editar Cadastro"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(m.id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-colors"
                        title="Excluir Cadastro"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL INLINE DE CADASTRO DE MEMBRO */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl border border-[#E6EBF1] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E6EBF1]">
              <h2 className="text-xl font-extrabold text-[#0A2540] flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-brand-blue" /> Formulário de Cadastro de Membro
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-6">
              {/* DADOS PESSOAIS */}
              <div className="space-y-4">
                <h3 className="text-sm font-extrabold text-brand-blue uppercase border-b pb-1">1. Dados Pessoais</h3>
                <div>
                  <label className="block text-xs font-bold text-[#0A2540] mb-1">Nome Completo *</label>
                  <input 
                    type="text" 
                    required
                    value={form.nomeCompleto}
                    onChange={(e) => setForm({ ...form, nomeCompleto: e.target.value })}
                    placeholder="Digite o nome completo do membro"
                    className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-xs text-[#0A2540] font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0A2540] mb-1">Data de Nascimento *</label>
                    <input 
                      type="date" 
                      required
                      value={form.dataNascimento}
                      onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-xs text-[#0A2540] font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0A2540] mb-1">CPF</label>
                    <input 
                      type="text" 
                      value={form.cpf}
                      onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                      placeholder="000.000.000-00"
                      className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-xs text-[#0A2540] font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0A2540] mb-1">Telefone / WhatsApp</label>
                    <input 
                      type="text" 
                      value={form.telefone}
                      onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                      placeholder="(00) 00000-0000"
                      className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-xs text-[#0A2540] font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0A2540] mb-1">E-mail</label>
                    <input 
                      type="email" 
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="membro@email.com"
                      className="w-full h-10 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-xs text-[#0A2540] font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* BOTÕES */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E6EBF1]">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-[#0A2540] text-xs font-bold"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 rounded-xl bg-flame-gradient text-white text-xs font-extrabold shadow-md flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Salvar Cadastro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
