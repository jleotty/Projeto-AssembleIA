'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  Calendar, 
  Bot, 
  LogOut,
  ExternalLink,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import JouleGlobalWidget from '../../components/JouleGlobalWidget';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Visão Geral', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Secretaria & Membros', href: '/dashboard/secretaria', icon: Users },
    { name: 'WhatsApp (Evolution)', href: '/dashboard/whatsapp', icon: MessageSquare },
    { name: 'Financeiro & Sicredi', href: '/dashboard/financeiro', icon: Wallet },
    { name: 'Escalas & Eventos', href: '/dashboard/escalas', icon: Calendar },
    { name: 'Agente Mestre (IA)', href: '/dashboard/agente-mestre', icon: Bot },
  ];

  return (
    <div className="min-h-screen bg-[#F6F9FC] flex relative">
      {/* SIDEBAR STRIPE LIGHT */}
      <aside className="w-64 bg-white border-r border-[#E6EBF1] flex flex-col justify-between p-4 shrink-0 shadow-sm">
        <div className="space-y-6">
          {/* LOGO SYSTEM */}
          <div className="flex items-center gap-3 px-2 py-1">
            <img 
              src="/logo.jpg" 
              alt="Logo Assembleia de Deus" 
              className="w-10 h-10 rounded-xl object-cover shadow-sm border border-[#E6EBF1]"
            />
            <div>
              <span className="font-extrabold text-[#0A2540] text-sm tracking-tight block">AssembleIA</span>
              <span className="text-[10px] text-brand-blue font-extrabold uppercase tracking-widest block">AD Sede Central</span>
            </div>
          </div>

          {/* NAV LINKS */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-blue-50 text-brand-blue border border-blue-200 shadow-stripe-sm' 
                      : 'text-[#425466] hover:bg-[#F8FAFC] hover:text-[#0A2540]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-blue' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* FOOTER USER / PORTAL DE MEMBROS */}
        <div className="space-y-3 pt-4 border-t border-[#E6EBF1]">
          <Link
            href="/membro"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#0A2540] hover:bg-slate-100 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Portal do Membro
            </span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          <div className="flex items-center justify-between px-2 pt-2 text-[#425466]">
            <div className="text-xs">
              <div className="font-extrabold text-[#0A2540]">Pr. João Oliveira</div>
              <div className="text-[10px] text-slate-500 font-semibold">Administrador Sede</div>
            </div>
            <Link href="/" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-rose-600 transition-colors">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>

      {/* JOULE GLOBAL FLOATING WIDGET FIXO NO CANTO DIREITO DE TODAS AS PAGINAS */}
      <JouleGlobalWidget />
    </div>
  );
}
