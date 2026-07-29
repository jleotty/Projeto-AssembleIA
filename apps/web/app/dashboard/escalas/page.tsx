'use client';

import { CalendarDays, Plus, CheckCircle2, Clock, Users, Calendar, Sparkles } from 'lucide-react';

export default function EscalasPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-amber-400" /> Escalas de Voluntários & Eventos
          </h1>
          <p className="text-slate-400 text-xs mt-1">Geração automática de escalas com aviso e confirmação instantânea no WhatsApp</p>
        </div>

        <button className="px-4 py-2.5 rounded-xl bg-flame-gradient text-white text-xs font-bold shadow-md shadow-brand-cyan/20 hover:scale-105 transition-transform flex items-center gap-2">
          <Plus className="w-4 h-4" /> Criar Nova Escala
        </button>
      </div>

      {/* ACTIVE SCHEDULE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div>
              <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-wider">Culto de Domingo (02/08)</span>
              <h3 className="text-lg font-bold text-white">Escala do Ministério de Mídia</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
              Publicada
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-semibold text-white">Carlos Eduardo Silva</span>
                <p className="text-[10px] text-slate-400">Função: Câmera & Transmissão YouTube</p>
              </div>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Confirmado (WhatsApp)
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-semibold text-white">Lucas Fernando</span>
                <p className="text-[10px] text-slate-400">Função: Mesa de Som Templo Central</p>
              </div>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Aguardando Confirmação
              </span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div>
              <span className="text-[10px] font-bold text-brand-purple uppercase tracking-wider">Culto de Domingo (02/08)</span>
              <h3 className="text-lg font-bold text-white">Escala do Ministério de Louvor</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
              Publicada
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-semibold text-white">Maria Santos</span>
                <p className="text-[10px] text-slate-400">Função: Dirigente de Louvor & Vocal</p>
              </div>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Confirmado (WhatsApp)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
