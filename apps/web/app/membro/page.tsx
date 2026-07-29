'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  QrCode, 
  Download, 
  Calendar, 
  Bell, 
  User, 
  FileText, 
  HeartHandshake, 
  CheckCircle2, 
  Share2, 
  LogOut,
  Sparkles,
  BookOpen
} from 'lucide-react';

export default function MemberPortalPage() {
  const [activeTab, setActiveTab] = useState<'carteirinha' | 'avisos' | 'escalas'>('carteirinha');

  const memberInfo = {
    name: 'Maria Santos',
    role: 'Regente / Solista de Louvor',
    congregation: 'Templo Central',
    status: 'Membro em Dia',
    baptismDate: '12/10/2021',
    qrToken: 'AD-SEDE-2026-98742',
    avatar: '/logo.jpg',
  };

  const announcements = [
    {
      id: '1',
      title: 'Grande Congresso de Jovens 2026',
      date: 'Publicado hoje às 10:00',
      category: 'Evento Especial',
      content: 'Inscrições abertas para o Congresso Anual! Tema: Geração Eleita. Faça sua inscrição antecipada no templo ou via PIX.',
    },
    {
      id: '2',
      title: 'Santa Ceia do Senhor — Próximo Domingo',
      date: 'Publicado ontem',
      category: 'Culto Solene',
      content: 'Contamos com a presença de toda a igreja para o culto de celebração da Santa Ceia às 18:00 no Templo Central.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#0A2540]">
      {/* MEMBER HEADER STRIPE LIGHT */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E6EBF1] shadow-stripe-sm">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-brand-cyan/40">
              <Image src="/logo.jpg" alt="AssembleIA Logo" fill className="object-cover" />
            </div>
            <div>
              <span className="font-bold text-lg text-[#0A2540]">Portal do Membro</span>
              <span className="block text-[10px] text-brand-blue font-semibold">Assembleia de Deus — Sede Central</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard" 
              className="text-xs font-bold px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A2540] transition-colors"
            >
              Ir para Área Admin
            </Link>
          </div>
        </div>
      </header>

      {/* BODY CONTAINER */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* MEMBER PROFILE BANNER */}
        <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-flame-gradient p-[2px]">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-extrabold text-[#0A2540] text-xl">
                MS
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-[#0A2540]">{memberInfo.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                  {memberInfo.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-semibold">
                {memberInfo.role} • {memberInfo.congregation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#F8FAFC] p-1.5 rounded-xl border border-[#E6EBF1]">
            <button 
              onClick={() => setActiveTab('carteirinha')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'carteirinha' 
                  ? 'bg-white text-brand-blue shadow-stripe-sm border border-[#E6EBF1]' 
                  : 'text-slate-500 hover:text-[#0A2540]'
              }`}
            >
              🪪 Carteirinha Digital
            </button>
            <button 
              onClick={() => setActiveTab('avisos')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'avisos' 
                  ? 'bg-white text-brand-blue shadow-stripe-sm border border-[#E6EBF1]' 
                  : 'text-slate-500 hover:text-[#0A2540]'
              }`}
            >
              📢 Mural & Avisos
            </button>
            <button 
              onClick={() => setActiveTab('escalas')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'escalas' 
                  ? 'bg-white text-brand-blue shadow-stripe-sm border border-[#E6EBF1]' 
                  : 'text-slate-500 hover:text-[#0A2540]'
              }`}
            >
              📅 Minhas Escalas
            </button>
          </div>
        </div>

        {/* TAB 1: CARTEIRINHA DIGITAL QR CODE */}
        {activeTab === 'carteirinha' && (
          <div className="max-w-md mx-auto space-y-6">
            <div className="bg-gradient-to-br from-white via-white to-blue-50/50 rounded-3xl p-8 border-2 border-brand-cyan/30 shadow-stripe relative overflow-hidden">
              {/* Flame Logo Glow Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-6 border-b border-[#E6EBF1]">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-brand-cyan/40">
                    <Image src="/logo.jpg" alt="AssembleIA" fill className="object-cover" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-base text-[#0A2540]">ASSEMBLEIA DE DEUS</h2>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Credencial Oficial de Membro</span>
                  </div>
                </div>
              </div>

              {/* CARD DETAILS */}
              <div className="py-6 flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-2xl bg-brand-blue/10 border-2 border-brand-blue/20 flex items-center justify-center text-brand-blue font-extrabold text-3xl shadow-sm">
                  MS
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#0A2540]">{memberInfo.name}</h3>
                  <span className="text-xs font-bold text-brand-blue block mt-0.5">{memberInfo.role}</span>
                  <span className="text-[11px] text-slate-500 block">{memberInfo.congregation}</span>
                </div>

                {/* QR CODE PREVIEW */}
                <div className="bg-white p-4 rounded-2xl border border-[#E6EBF1] shadow-stripe-sm flex flex-col items-center space-y-2">
                  <div className="w-36 h-36 bg-slate-900 rounded-xl p-2 flex items-center justify-center">
                    <QrCode className="w-28 h-28 text-white" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">TOKEN: {memberInfo.qrToken}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E6EBF1] flex items-center justify-between text-xs text-slate-500">
                <span>Batismo: {memberInfo.baptismDate}</span>
                <span className="text-emerald-600 font-bold">✓ Válida 2026</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-3 rounded-xl bg-brand-blue text-white font-bold text-xs shadow-md hover:bg-blue-900 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Baixar Carteirinha PDF
              </button>
              <button className="p-3 rounded-xl bg-white border border-[#E6EBF1] text-[#0A2540] hover:bg-slate-50 transition-colors" title="Compartilhar">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: MURAL DE AVISOS & POSTAGENS */}
        {activeTab === 'avisos' && (
          <div className="space-y-6">
            <h2 className="text-xl font-extrabold text-[#0A2540]">Mural de Anúncios e Comunicados</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {announcements.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-brand-blue border border-blue-200 text-[10px] font-bold">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">{item.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#0A2540]">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.content}</p>

                  <div className="pt-2">
                    <button className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1">
                      Ver detalhes do comunicado →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DOWNLOAD DE ESCALAS */}
        {activeTab === 'escalas' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-[#0A2540]">Escalas de Cultos e Eventos</h2>
              <button className="px-4 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold shadow-sm hover:bg-blue-900 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" /> Baixar Escala do Mês (PDF)
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#E6EBF1]">
                <div>
                  <span className="text-xs font-bold text-brand-blue uppercase">Culto de Celebração de Domingo (02/08/2026)</span>
                  <h3 className="text-base font-bold text-[#0A2540] mt-0.5">Escala do Ministério de Louvor</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Confirmada no WhatsApp
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E6EBF1] flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold text-[#0A2540]">Sua Função Escalada:</span>
                  <p className="text-slate-600 font-medium">Dirigente de Louvor & Solista</p>
                </div>
                <span className="text-slate-500 font-mono">Horário: 18:00 (Ensaio às 17:00)</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
