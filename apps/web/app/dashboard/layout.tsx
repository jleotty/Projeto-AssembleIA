import Image from 'next/image';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Bot, 
  Users, 
  Wallet, 
  HeartHandshake, 
  CalendarDays, 
  UserCheck,
  LogOut, 
  Database,
  ChevronDown,
  Sparkles,
  Bell
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F6F9FC] flex text-[#0A2540] font-sans">
      {/* SIDEBAR STRIPE LIGHT */}
      <aside className="w-64 bg-white border-r border-[#E6EBF1] flex flex-col justify-between shrink-0 shadow-stripe-sm">
        <div>
          {/* LOGO & TENANT HEADER */}
          <div className="p-5 border-b border-[#E6EBF1] flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-brand-cyan/40 shadow-sm shadow-brand-cyan/20">
                <Image 
                  src="/logo.jpg" 
                  alt="Assembleia IA Logo Oficial" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-[#0A2540]">AssembleIA</span>
                <span className="text-[10px] text-brand-blue font-mono flex items-center gap-1">
                  <Database className="w-3 h-3 text-emerald-600" /> SQLite Engine
                </span>
              </div>
            </Link>
          </div>

          {/* CHURCH TENANT SELECTOR */}
          <div className="p-4 border-b border-[#E6EBF1]">
            <div className="p-2.5 rounded-xl bg-[#F8FAFC] flex items-center justify-between border border-[#E6EBF1] hover:border-brand-blue transition-colors cursor-pointer">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-xs">
                  AD
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0A2540] truncate max-w-[120px]">AD Sede Central</span>
                  <span className="text-[10px] text-slate-500 font-medium">Painel Admin</span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="p-4 space-y-1 text-sm font-semibold">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-brand-blue/10 text-brand-blue border border-brand-blue/20 transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Visão Geral</span>
            </Link>

            <Link 
              href="/dashboard/agente-mestre" 
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[#425466] hover:bg-[#F8FAFC] hover:text-[#0A2540] transition-all group"
            >
              <div className="flex items-center gap-3">
                <Bot className="w-4 h-4 text-brand-purple" />
                <span>Agente Mestre IA</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-brand-purple/10 text-[10px] text-brand-purple border border-brand-purple/20 font-bold">
                PRO
              </span>
            </Link>

            <Link 
              href="/dashboard/secretaria" 
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#425466] hover:bg-[#F8FAFC] hover:text-[#0A2540] transition-all"
            >
              <Users className="w-4 h-4 text-brand-cyan" />
              <span>Secretaria & Membros</span>
            </Link>

            <Link 
              href="/dashboard/financeiro" 
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#425466] hover:bg-[#F8FAFC] hover:text-[#0A2540] transition-all"
            >
              <Wallet className="w-4 h-4 text-emerald-600" />
              <span>Financeiro & PIX</span>
            </Link>

            <Link 
              href="/dashboard/pastoral" 
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#425466] hover:bg-[#F8FAFC] hover:text-[#0A2540] transition-all"
            >
              <HeartHandshake className="w-4 h-4 text-rose-500" />
              <span>Triagem Pastoral</span>
            </Link>

            <Link 
              href="/dashboard/escalas" 
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#425466] hover:bg-[#F8FAFC] hover:text-[#0A2540] transition-all"
            >
              <CalendarDays className="w-4 h-4 text-amber-500" />
              <span>Escalas & Eventos</span>
            </Link>

            {/* PORTAL DO MEMBRO LINK */}
            <Link 
              href="/membro" 
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-brand-blue bg-blue-50/50 hover:bg-blue-50 border border-blue-200 transition-all font-bold mt-4"
            >
              <UserCheck className="w-4 h-4 text-brand-blue" />
              <span>Portal do Membro</span>
            </Link>
          </nav>
        </div>

        {/* FOOTER USER PROFILE */}
        <div className="p-4 border-t border-[#E6EBF1] space-y-3">
          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E6EBF1] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-flame-gradient p-[1px]">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-xs font-bold text-[#0A2540]">
                  PJ
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0A2540]">Pr. João Oliveira</span>
                <span className="text-[10px] text-slate-500">Pastor Presidente</span>
              </div>
            </div>
            <Link href="/" title="Sair do Sistema">
              <LogOut className="w-4 h-4 text-slate-400 hover:text-rose-600 transition-colors" />
            </Link>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP NAVBAR */}
        <header className="h-16 border-b border-[#E6EBF1] bg-white px-6 flex items-center justify-between sticky top-0 z-40 shadow-stripe-sm">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Assembleia de Deus Sede Central</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl bg-[#F8FAFC] border border-[#E6EBF1] hover:border-slate-300 text-slate-500 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-red" />
            </button>

            <Link 
              href="/dashboard/agente-mestre" 
              className="px-4 py-2 rounded-xl bg-flame-gradient text-white text-xs font-bold shadow-md shadow-brand-cyan/20 hover:scale-105 transition-transform flex items-center gap-2"
            >
              <Bot className="w-4 h-4" /> Falar com Agente Mestre
            </Link>
          </div>
        </header>

        {/* DYNAMIC DASHBOARD PAGE */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
