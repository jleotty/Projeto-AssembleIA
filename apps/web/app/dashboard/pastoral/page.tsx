'use client';

import { HeartHandshake, MessageSquare, AlertTriangle, CheckCircle, Phone, Calendar, Sparkles } from 'lucide-react';

export default function PastoralPage() {
  const pastoralRequests = [
    {
      id: '1',
      member: 'Irmã Ana Maria Santos',
      topic: 'Pedido de Oração e Visita Hospitalar',
      urgency: 'ALTA',
      status: 'Aguardando Pastor',
      summary: 'Membro relatou cirurgia agendada para sexta-feira. Agente Pastoral fez o acolhimento inicial no WhatsApp.',
      date: 'Hoje, 14:20',
    },
    {
      id: '2',
      member: 'Lucas Mendes',
      topic: 'Aconselhamento Matrimonial',
      urgency: 'NORMAL',
      status: 'Agendado',
      summary: 'Casal solicitou horário de gabinete com o Pastor João para terça-feira às 15h.',
      date: 'Ontem, 19:45',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <HeartHandshake className="w-6 h-6 text-rose-400" /> Triagem Pastoral & Atendimento WhatsApp
        </h1>
        <p className="text-slate-400 text-xs mt-1">Escuta empática automatizada com identificação de urgências emocionais e integração pastoral</p>
      </div>

      {/* PASTORAL REQUESTS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pastoralRequests.map((req) => (
          <div key={req.id} className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                req.urgency === 'ALTA' 
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                Urgência: {req.urgency}
              </span>
              <span className="text-xs text-slate-400">{req.date}</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{req.member}</h3>
              <p className="text-xs font-semibold text-brand-cyan mt-0.5">{req.topic}</p>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-white/5">
              "{req.summary}"
            </p>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Status: {req.status}</span>
              <button className="px-4 py-2 rounded-xl bg-flame-gradient text-white text-xs font-bold shadow-md hover:scale-105 transition-transform">
                Assumir Atendimento
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
