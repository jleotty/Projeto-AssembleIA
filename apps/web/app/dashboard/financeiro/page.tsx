'use client';

import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, FileText, CheckCircle2, PieChart } from 'lucide-react';

export default function FinanceiroPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Wallet className="w-6 h-6 text-emerald-400" /> Plataforma Financeira & DRE
          </h1>
          <p className="text-slate-400 text-xs mt-1">Conciliação automática de PIX, Dízimos, Ofertas e prestação de contas SQLite</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-xs font-semibold hover:text-white transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" /> Gerar Balancete DRE
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> Novo Lançamento
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-white/5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Entradas (Julho 2026)</span>
          <div className="text-3xl font-extrabold text-emerald-400 mt-2">R$ 50.550,00</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Dízimos (R$ 38.450) + Ofertas (R$ 12.100)</span>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Saídas (Despesas)</span>
          <div className="text-3xl font-extrabold text-rose-400 mt-2">R$ 1.280,50</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Manutenção, Luz e Materiais EBD</span>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Saldo Líquido em Caixa</span>
          <div className="text-3xl font-extrabold text-white mt-2">R$ 49.269,50</div>
          <span className="text-[10px] text-emerald-400 mt-1 block">✓ 100% Auditado pelo Agente Financeiro IA</span>
        </div>
      </div>

      {/* LEDGER TABLE */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-4 bg-slate-900/60 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Extrato de Lançamentos (assembleia.db)</h3>
          <span className="text-xs text-slate-400">Exibindo últimos registros</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-white/5 text-slate-400 uppercase font-semibold">
              <tr>
                <th className="py-4 px-6">Descrição</th>
                <th className="py-4 px-4">Categoria</th>
                <th className="py-4 px-4">Forma de Pgto</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Valor (R$)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="py-4 px-6 font-medium text-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-semibold">Dízimos Culto de Domingo</span>
                      <span className="text-[10px] text-slate-400">Diversos Membros</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-slate-300">Dízimo</td>
                <td className="py-4 px-4 text-slate-400">PIX (Chave CNPJ)</td>
                <td className="py-4 px-4"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">Conciliado</span></td>
                <td className="py-4 px-6 text-right font-extrabold text-emerald-400">+ R$ 8.450,00</td>
              </tr>

              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="py-4 px-6 font-medium text-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-semibold">Oferta Especial de Missões</span>
                      <span className="text-[10px] text-slate-400">Congregação Templo Central</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-slate-300">Oferta Missões</td>
                <td className="py-4 px-4 text-slate-400">Dinheiro / Envelope</td>
                <td className="py-4 px-4"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">Conciliado</span></td>
                <td className="py-4 px-6 text-right font-extrabold text-emerald-400">+ R$ 2.100,00</td>
              </tr>

              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="py-4 px-6 font-medium text-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                      <ArrowDownLeft className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-semibold">Fatura Energia & Fibra Óptica</span>
                      <span className="text-[10px] text-slate-400">Concessionária de Luz</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-slate-300">Manutenção</td>
                <td className="py-4 px-4 text-slate-400">Boleto Bancário</td>
                <td className="py-4 px-4"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">Pago</span></td>
                <td className="py-4 px-6 text-right font-extrabold text-rose-400">- R$ 1.280,50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
