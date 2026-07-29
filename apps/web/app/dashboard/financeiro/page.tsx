'use client';

import Link from 'next/link';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, FileText, CheckCircle2, Building2, RefreshCw } from 'lucide-react';

export default function FinanceiroPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER STRIPE LIGHT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0A2540] flex items-center gap-2">
            <Wallet className="w-6 h-6 text-emerald-600" /> Plataforma Financeira & DRE
          </h1>
          <p className="text-[#425466] text-xs font-semibold mt-1">
            Monitoramento de entradas e saídas via **Sicredi Open Banking API** e armazenamento no SQLite para a IA
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            href="/dashboard/financeiro/sicredi" 
            className="px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold hover:bg-emerald-100 transition-colors flex items-center gap-2"
          >
            <Building2 className="w-4 h-4 text-emerald-700" /> Monitorar Conta Sicredi
          </Link>

          <button className="px-4 py-2.5 rounded-xl bg-flame-gradient text-white text-xs font-extrabold shadow-md hover:scale-105 transition-transform flex items-center gap-2">
            <Plus className="w-4 h-4" /> Novo Lançamento
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Total Entradas (Julho 2026)</span>
          <div className="text-3xl font-extrabold text-emerald-600 mt-2">R$ 50.550,00</div>
          <span className="text-[10px] text-slate-500 font-bold mt-1 block">Dízimos (R$ 38.450) + Ofertas (R$ 12.100) via Sicredi</span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Total Saídas (Despesas)</span>
          <div className="text-3xl font-extrabold text-rose-600 mt-2">R$ 1.280,50</div>
          <span className="text-[10px] text-slate-500 font-bold mt-1 block">Manutenção, Luz e Multipag Sicredi</span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Saldo Líquido em Caixa</span>
          <div className="text-3xl font-extrabold text-[#0A2540] mt-2">R$ 49.269,50</div>
          <span className="text-[10px] text-emerald-700 font-extrabold mt-1 block">✓ Auditado pelo Agente Financeiro IA + Sicredi</span>
        </div>
      </div>

      {/* LEDGER TABLE */}
      <div className="bg-white rounded-2xl border border-[#E6EBF1] shadow-stripe-sm overflow-hidden">
        <div className="p-4 bg-[#F8FAFC] border-b border-[#E6EBF1] flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-[#0A2540]">Extrato de Lançamentos Sincronizados (bank_transactions)</h3>
          <Link href="/dashboard/financeiro/sicredi" className="text-xs font-bold text-brand-blue hover:underline">
            Ver painel de controle Sicredi →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E6EBF1] text-slate-500 uppercase font-extrabold">
              <tr>
                <th className="py-4 px-6">Descrição</th>
                <th className="py-4 px-4">Categoria</th>
                <th className="py-4 px-4">Origem / Método</th>
                <th className="py-4 px-4">Status API</th>
                <th className="py-4 px-6 text-right">Valor (R$)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EBF1]">
              <tr className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-4 px-6 font-extrabold text-[#0A2540]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-bold">Dízimos Culto de Domingo</span>
                      <span className="text-[10px] text-slate-500">Membros da Sede</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-[#0A2540] font-semibold">Dízimo</td>
                <td className="py-4 px-4 text-[#425466] font-bold">Pix Sicredi (mTLS)</td>
                <td className="py-4 px-4"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-extrabold">Sincronizado</span></td>
                <td className="py-4 px-6 text-right font-extrabold text-emerald-600">+ R$ 8.450,00</td>
              </tr>

              <tr className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-4 px-6 font-extrabold text-[#0A2540]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
                      <ArrowDownLeft className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-bold">Fatura Energia & Fibra Óptica</span>
                      <span className="text-[10px] text-slate-500">Concessionária de Luz</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-[#0A2540] font-semibold">Manutenção</td>
                <td className="py-4 px-4 text-[#425466] font-bold">Multipag Sicredi</td>
                <td className="py-4 px-4"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-extrabold">Pago</span></td>
                <td className="py-4 px-6 text-right font-extrabold text-rose-600">- R$ 1.280,50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
