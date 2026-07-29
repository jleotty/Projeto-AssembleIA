import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AssembleIA — Sistema Operacional Inteligente para Igrejas',
  description: 'Plataforma SaaS Multi-tenant para Gestão de Igrejas movida a Inteligência Artificial, Automação de Agentes e Operação via WhatsApp.',
  icons: {
    icon: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[#F6F9FC] text-[#0A2540] flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
