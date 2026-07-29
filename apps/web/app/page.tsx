import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Bot, 
  Users, 
  Wallet, 
  Calendar, 
  MessageSquare, 
  ArrowRight,
  QrCode,
  FileText,
  UserCheck
} from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#F6F9FC] text-[#0A2540] overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-tr from-brand-cyan/10 via-brand-blue/5 to-transparent blur-[140px] pointer-events-none rounded-full" />

      {/* HEADER STRIPE STYLE */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-[#E6EBF1]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-brand-cyan/40 shadow-sm shadow-brand-cyan/20 group-hover:scale-105 transition-transform">
              <Image 
                src="/logo.jpg" 
                alt="Assembleia IA Logo Oficial" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-[#0A2540] flex items-center gap-1.5">
                AssembleIA <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand-cyan/10 text-brand-blue border border-brand-cyan/20">Igreja Sistema</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">Sistema Operacional para Igrejas</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#425466]">
            <Link href="/dashboard" className="hover:text-brand-blue transition-colors">Painel Admin</Link>
            <Link href="/membro" className="text-brand-blue font-bold flex items-center gap-1 hover:underline">
              <UserCheck className="w-4 h-4 text-brand-blue" /> Portal do Membro
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              href="/membro" 
              className="text-sm font-semibold text-brand-blue bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg transition-colors hover:bg-blue-100"
            >
              Área do Membro
            </Link>
            <Link 
              href="/dashboard" 
              className="px-6 py-2.5 rounded-xl bg-[#0A2540] text-white font-semibold text-sm shadow-md hover:bg-brand-blue transition-all"
            >
              Acessar Painel Admin
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-28 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E6EBF1] shadow-stripe-sm text-xs font-semibold text-brand-blue mb-8">
          <Sparkles className="w-4 h-4 text-brand-cyan" />
          <span>Gestão Completa de Igrejas com Inteligência Artificial & SQLite</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-[#0A2540] tracking-tight max-w-4xl mx-auto leading-[1.1]">
          Sua Igreja Inteira Movida por <span className="flame-text">Agentes Autônomos de IA</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-[#425466] max-w-2xl mx-auto font-normal leading-relaxed">
          Portal Administrativo para pastores e líderes + Portal exclusivo para Membros acompanharem escalas, postagens e credencial digital.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-flame-gradient text-white font-bold text-base shadow-lg shadow-brand-cyan/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            Abrir Painel Admin <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/membro"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-[#E6EBF1] shadow-stripe text-[#0A2540] font-bold text-base hover:border-brand-cyan transition-all flex items-center justify-center gap-2"
          >
            <UserCheck className="w-5 h-5 text-brand-blue" /> Abrir Portal do Membro
          </Link>
        </div>
      </section>
    </div>
  );
}
