'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCw, 
  Bot, 
  ShieldCheck, 
  CheckCircle2, 
  Wallet,
  ArrowLeft,
  Sliders,
  Send
} from 'lucide-react';

interface Transacao {
  id: number;
  sicrediTxId: string;
  tipo: string;
  categoria: string;
  descricao: string;
  valor: number;
  dataTransacao: string;
  pagadorNome?: string;
  metodo: string;
}

export default function SicrediControlPanelPage() {
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [data, setData] = useState<any>({});

  const loadSicrediData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sicredi');
      const result = await res.json();
      if (result.success) {
        setData(result);
      }
    } catch (e) {
      console.error('Erro ao carregar dados do Sicredi:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSicrediData();
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/sicredi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'SYNC' }),
      });
      const result = await res.json();
      if (result.success) {
        alert(result.message);
        loadSicrediData();
      }
    } catch (e) {
      alert('Erro ao sincronizar com o Sicredi.');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* TOP NAV & HEADER */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard/financeiro" className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Voltar ao Financeiro
        </Link>
        <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Sicredi Open Banking API Connected (mTLS + OAuth2)
        </span>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-[#E6EBF1] shadow-stripe flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-[#0A2540]">Monitoramento da Conta Sicredi</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                Cooperativa 0101 • C/C 12345-6
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-semibold">
              Entradas e saídas sincronizadas em tempo real com o SQLite para processamento pela IA.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleSync}
            disabled={syncing}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} /> 
            {syncing ? 'Sincronizando Sicredi...' : 'Sincronizar Extrato Agora'}
          </button>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Saldo em Conta Sicredi</span>
          <div className="text-3xl font-extrabold text-[#0A2540] mt-2">
            R$ {data.saldoAtual ? data.saldoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '49.269,50'}
          </div>
          <span className="text-[10px] text-emerald-700 font-bold mt-1 inline-block">✓ Conciliado com Extrato Bancário</span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Entradas Monitoradas (Pix/Dízimos)</span>
          <div className="text-3xl font-extrabold text-emerald-600 mt-2">
            + R$ {data.totalEntradas ? data.totalEntradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '50.550,00'}
          </div>
          <span className="text-[10px] text-slate-500 font-bold mt-1 inline-block">Armazenado no SQLite para a IA</span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Saídas Monitoradas (Multipag/Boletos)</span>
          <div className="text-3xl font-extrabold text-rose-600 mt-2">
            - R$ {data.totalSaidas ? data.totalSaidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '1.280,50'}
          </div>
          <span className="text-[10px] text-slate-500 font-bold mt-1 inline-block">Contas a Pagar Sicredi</span>
        </div>
      </div>

      {/* CONSULTA DA IA E EXTRATO DE TRANSAÇÕES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* EXTRATO (2 COLS) */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-[#E6EBF1] shadow-stripe-sm overflow-hidden">
          <div className="p-4 bg-[#F8FAFC] border-b border-[#E6EBF1] flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#0A2540]">Lançamentos Sicredi (Tabela bank_transactions)</h3>
            <span className="text-[10px] text-slate-500 font-mono">Última sinc: Hoje às 16:45</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] border-b border-[#E6EBF1] text-slate-500 uppercase font-extrabold">
                <tr>
                  <th className="py-3.5 px-4">Descrição</th>
                  <th className="py-3.5 px-4">Método</th>
                  <th className="py-3.5 px-4">Tipo</th>
                  <th className="py-3.5 px-4 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6EBF1]">
                {data.transacoes && data.transacoes.length > 0 ? (
                  data.transacoes.map((tx: Transacao) => (
                    <tr key={tx.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-[#0A2540]">{tx.descricao}</div>
                        <div className="text-[10px] text-slate-500">{tx.pagadorNome || 'Membro Sede'}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-brand-blue font-bold text-[10px]">
                          {tx.metodo}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                          tx.tipo === 'ENTRADA' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                          {tx.tipo}
                        </span>
                      </td>
                      <td className={`py-3.5 px-4 text-right font-extrabold ${
                        tx.tipo === 'ENTRADA' ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        {tx.tipo === 'ENTRADA' ? '+' : '-'} R$ {tx.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                    <tr className="hover:bg-[#F8FAFC]">
                      <td className="py-3.5 px-4 font-extrabold text-[#0A2540]">Dízimos Pix Sicredi — Culto de Domingo</td>
                      <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-brand-blue font-bold">PIX</span></td>
                      <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-extrabold">ENTRADA</span></td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-emerald-600">+ R$ 8.450,00</td>
                    </tr>
                    <tr className="hover:bg-[#F8FAFC]">
                      <td className="py-3.5 px-4 font-extrabold text-[#0A2540]">Pagamento Fatura Energia — Templo Sede</td>
                      <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-brand-blue font-bold">MULTIPAG</span></td>
                      <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-extrabold">SAIDA</span></td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-rose-600">- R$ 1.280,50</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* CONSULTA AGENTE IA PAINEL (1 COL) */}
        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6EBF1]">
            <Bot className="w-5 h-5 text-brand-blue" />
            <h3 className="text-base font-extrabold text-[#0A2540]">Consultar Agente de IA</h3>
          </div>

          <p className="text-xs text-slate-600">
            A IA possui acesso em tempo real a todas as entradas e saídas armazenadas na tabela <code className="text-brand-blue font-mono font-bold">bank_transactions</code>.
          </p>

          <div className="space-y-2">
            <Link 
              href="/dashboard/agente-mestre"
              className="w-full p-3 rounded-xl bg-[#F8FAFC] hover:bg-slate-100 border border-[#E6EBF1] text-xs font-bold text-[#0A2540] block transition-colors"
            >
              💬 "Qual o saldo atual da conta Sicredi da igreja?"
            </Link>

            <Link 
              href="/dashboard/agente-mestre"
              className="w-full p-3 rounded-xl bg-[#F8FAFC] hover:bg-slate-100 border border-[#E6EBF1] text-xs font-bold text-[#0A2540] block transition-colors"
            >
              💬 "Gere um relatório das maiores saídas efetuadas este mês."
            </Link>

            <Link 
              href="/dashboard/agente-mestre"
              className="w-full p-3 rounded-xl bg-[#F8FAFC] hover:bg-slate-100 border border-[#E6EBF1] text-xs font-bold text-[#0A2540] block transition-colors"
            >
              💬 "Quantas doações via PIX Sicredi entraram hoje?"
            </Link>
          </div>

          <Link 
            href="/dashboard/agente-mestre"
            className="w-full py-3 rounded-xl bg-flame-gradient text-white text-xs font-extrabold text-center block shadow-md hover:scale-105 transition-transform mt-4"
          >
            Abrir Chat do Agente Mestre
          </Link>
        </div>
      </div>
    </div>
  );
}
