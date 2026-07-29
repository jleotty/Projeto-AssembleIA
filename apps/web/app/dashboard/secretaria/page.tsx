'use client';

import { useState } from 'react';
import { Users, Plus, Search, Filter, QrCode, Mail, Phone, CheckCircle, UserPlus, Download } from 'lucide-react';

export default function SecretariaPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const members = [
    { id: '1', name: 'Pr. João Oliveira', role: 'Pastor Presidente', status: 'Ativo', ministry: 'Liderança', phone: '(11) 98888-7777', email: 'admin@assembleia.ia' },
    { id: '2', name: 'Maria Santos', role: 'Membro Solista', status: 'Ativo', ministry: 'Louvor', phone: '(11) 97777-6666', email: 'maria@gmail.com' },
    { id: '3', name: 'Carlos Eduardo Silva', role: 'Operador de Som', status: 'Ativo', ministry: 'Mídia', phone: '(11) 96666-5555', email: 'carlos@gmail.com' },
    { id: '4', name: 'Ana Paula Costa', role: 'Professora EBD', status: 'Visitante', ministry: 'Infantil', phone: '(11) 95555-4444', email: 'ana@gmail.com' },
  ];

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.ministry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-brand-cyan" /> Secretaria & Rol de Membros
          </h1>
          <p className="text-slate-400 text-xs mt-1">Gestão de cadastros, QR Code de presença e histórico ministerial no SQLite</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-xs font-semibold hover:text-white transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Exportar CSV
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-flame-gradient text-white text-xs font-bold shadow-md shadow-brand-cyan/20 hover:scale-105 transition-transform flex items-center gap-2">
            <UserPlus className="w-4 h-4" /> Cadastrar Membro
          </button>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="glass-card rounded-2xl p-4 border border-white/5 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, ministério ou telefone..."
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-xs font-medium flex items-center gap-2">
            <Filter className="w-3.5 h-3.5" /> Filtrar por Ministério
          </button>
        </div>
      </div>

      {/* MEMBERS TABLE */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-white/5 text-slate-400 uppercase font-semibold">
              <tr>
                <th className="py-4 px-6">Membro</th>
                <th className="py-4 px-4">Ministério</th>
                <th className="py-4 px-4">Contato</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">QR Code Credencial</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-4 px-6 font-medium text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center font-bold text-xs">
                        {member.name[0]}
                      </div>
                      <div>
                        <span className="block text-white font-semibold">{member.name}</span>
                        <span className="text-[10px] text-slate-400">{member.role}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-300">
                    <span className="px-2.5 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 font-semibold text-[10px]">
                      {member.ministry}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400 space-y-0.5">
                    <div className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-slate-500" /> {member.phone}</div>
                    <div className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-slate-500" /> {member.email}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                      member.status === 'Ativo' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="p-2 rounded-lg bg-slate-900 border border-white/10 hover:border-brand-cyan text-brand-cyan transition-colors" title="Gerar QR Code">
                      <QrCode className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
