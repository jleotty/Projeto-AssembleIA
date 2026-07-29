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
  Phone, 
  Mail, 
  QrCode, 
  CheckCircle2, 
  RefreshCw,
  FileText
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
  const [editingMembro, setEditingMembro] = useState<Membro | null>(null);

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

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0A2540] flex items-center gap-2">
            <Users className="w-6 h-6 text-brand-blue" /> Área Administrativa — Rol de Membros
          </h1>
          <p className="text-slate-500 text-xs mt-1">Consulta, edição, exclusão e exportação de cadastros no SQLite</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#E6EBF1] shadow-stripe-sm text-[#0A2540] text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-emerald-600" /> Exportar Lista (CSV)
          </button>

          <Link 
            href="/cadastro"
            className="px-4 py-2.5 rounded-xl bg-flame-gradient text-white text-xs font-extrabold shadow-md shadow-brand-cyan/20 hover:scale-105 transition-transform flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" /> Novo Cadastro Web
          </Link>
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
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-[#0A2540] text-xs focus:outline-none focus:border-brand-blue"
          />
        </div>

        <button 
          onClick={() => fetchMembros(search)}
          className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-brand-blue text-xs font-bold flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Atualizar Consulta
        </button>
      </div>

      {/* TABELA DE MEMBROS */}
      <div className="bg-white rounded-2xl border border-[#E6EBF1] shadow-stripe-sm overflow-hidden">
        <div className="p-4 bg-[#F8FAFC] border-b border-[#E6EBF1] flex items-center justify-between">
          <span className="text-xs font-bold text-[#0A2540]">Membros Encontrados: {membros.length}</span>
          <span className="text-[10px] text-slate-500 font-mono">SQLite: SELECT * FROM membros WHERE ativo = 1</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E6EBF1] text-slate-500 uppercase font-semibold">
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
                  <td colSpan={6} className="py-8 text-center text-slate-400">Carregando cadastros do banco...</td>
                </tr>
              ) : membros.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">Nenhum membro encontrado com o filtro pesquisado.</td>
                </tr>
              ) : (
                membros.map((m) => (
                  <tr key={m.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-blue">{m.numeroMembro || 'AD-2026-0000'}</td>
                    <td className="py-3.5 px-4 font-bold text-[#0A2540]">{m.nomeCompleto}</td>
                    <td className="py-3.5 px-4 text-slate-600 space-y-0.5">
                      <div>CPF: {m.cpf || 'Não informado'}</div>
                      <div className="text-[10px] text-slate-500">{m.telefone || m.email || ''}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-semibold">{m.congregacao?.nome || 'Sede Assembleia de Deus'}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {m.membroMinisterios && m.membroMinisterios.length > 0 ? (
                          m.membroMinisterios.map((item, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-blue-50 text-brand-blue text-[10px] font-bold border border-blue-200">
                              {item.ministerio.nome}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400 text-[10px]">Geral</span>
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
    </div>
  );
}
