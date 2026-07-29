import Link from 'next/link';
import { 
  Users, 
  Wallet, 
  HeartHandshake, 
  Calendar, 
  Bot, 
  ArrowUpRight, 
  Plus,
  FileText,
  UserPlus
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* WELCOME BANNER STRIPE LIGHT */}
      <div className="relative rounded-2xl bg-white p-8 border border-[#E6EBF1] shadow-stripe">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Painel de Controle — Assembleia de Deus Sede Central</span>
            <h1 className="text-3xl font-extrabold text-[#0A2540] mt-1">Paz do Senhor, Pr. João Oliveira!</h1>
            <p className="text-[#425466] text-sm mt-2 max-w-xl font-medium">
              Seu banco de dados <span className="text-emerald-700 font-mono font-bold">SQLite (assembleia.db)</span> está rodando localmente.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/cadastro" 
              className="px-5 py-2.5 rounded-xl bg-flame-gradient text-white font-extrabold text-xs shadow-md shadow-brand-cyan/20 hover:scale-105 transition-transform flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" /> Cadastrar Membro
            </Link>
          </div>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm hover:border-brand-blue transition-all">
          <div className="flex items-center justify-between text-[#425466] mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Total de Membros</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0A2540]">1.420</div>
          <div className="mt-2 text-xs text-emerald-600 font-bold flex items-center gap-1">
            <span>↑ +34 este mês</span> <span className="text-slate-500">• 98% ativos</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm hover:border-emerald-500 transition-all">
          <div className="flex items-center justify-between text-[#425466] mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Receita do Mês</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0A2540]">R$ 48.950,00</div>
          <div className="mt-2 text-xs text-emerald-600 font-bold flex items-center gap-1">
            <span>↑ 100% conciliado via PIX</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm hover:border-purple-500 transition-all">
          <div className="flex items-center justify-between text-[#425466] mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Triagem Pastoral</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0A2540]">12</div>
          <div className="mt-2 text-xs text-amber-600 font-bold flex items-center gap-1">
            <span>2 pendentes de visita</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm hover:border-amber-500 transition-all">
          <div className="flex items-center justify-between text-[#425466] mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Próximo Evento</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-bold text-[#0A2540] truncate">Congresso de Jovens</div>
          <div className="mt-2 text-xs text-slate-500 font-medium flex items-center gap-1">
            <span>15 a 17 de Novembro</span>
          </div>
        </div>
      </div>

      {/* RECENT MEMBERS TABLE COM NOMES VISÍVEIS EM ESCURO (#0A2540) */}
      <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-[#0A2540]">Últimos Membros Cadastrados</h3>
          <Link href="/dashboard/secretaria" className="text-xs text-brand-blue hover:underline flex items-center gap-1 font-bold">
            Ver todos <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6EBF1] text-[#425466] uppercase font-bold">
                <th className="py-3 px-2">Nome</th>
                <th className="py-3 px-2">Ministério</th>
                <th className="py-3 px-2">Telefone</th>
                <th className="py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EBF1]">
              <tr>
                <td className="py-3 px-2 font-extrabold text-[#0A2540] text-sm">Pr. João Oliveira</td>
                <td className="py-3 px-2 text-[#425466] font-semibold">Liderança</td>
                <td className="py-3 px-2 text-[#425466] font-semibold">(11) 98888-7777</td>
                <td className="py-3 px-2"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">Ativo</span></td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-extrabold text-[#0A2540] text-sm">Maria Santos</td>
                <td className="py-3 px-2 text-[#425466] font-semibold">Louvor</td>
                <td className="py-3 px-2 text-[#425466] font-semibold">(11) 97777-6666</td>
                <td className="py-3 px-2"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">Ativo</span></td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-extrabold text-[#0A2540] text-sm">Carlos Eduardo Silva</td>
                <td className="py-3 px-2 text-[#425466] font-semibold">Mídia</td>
                <td className="py-3 px-2 text-[#425466] font-semibold">(11) 96666-5555</td>
                <td className="py-3 px-2"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">Ativo</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
