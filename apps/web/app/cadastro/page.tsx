'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Users, 
  Heart, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  Upload, 
  AlertCircle,
  Camera,
  Image as ImageIcon
} from 'lucide-react';

export default function PublicCadastroMembroPage() {
  const [submitted, setSubmitted] = useState(false);
  const [numeroMembroGerado, setNumeroMembroGerado] = useState('');
  const [loading, setLoading] = useState(false);
  const [erroFoto, setErroFoto] = useState('');

  // Form state com fotoCarteirinha (OBRIGATÓRIA) e fotoBanner (OPCIONAL)
  const [form, setForm] = useState({
    nomeCompleto: '',
    dataNascimento: '',
    sexo: 'Masculino',
    estadoCivil: 'Solteiro',
    cpf: '',
    rg: '',
    telefone: '',
    email: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: 'SP',
    cep: '',
    fotoCarteirinha: '', // OBRIGATÓRIA
    fotoBanner: '',      // OPCIONAL
    nomePai: '',
    nomeMae: '',
    nomeConjuge: '',
    quantidadeFilhos: '0',
    filhos: [] as { nome: string; idade: string }[],
    dataConversao: '',
    batizadoAguas: 'Não',
    dataBatismo: '',
    igrejaBatismo: '',
    batismoEspiritoSanto: 'Não',
    veioOutraIgreja: 'Não',
    igrejaAnterior: '',
    ministerios: [] as string[],
    talentos: '',
    necessidadesEspeciais: '',
    contatoEmergencia: '',
    telefoneEmergencia: '',
    termoCompromisso: false,
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'fotoCarteirinha' | 'fotoBanner') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, [field]: reader.result as string }));
        if (field === 'fotoCarteirinha') setErroFoto('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fotoCarteirinha) {
      setErroFoto('A Foto de Carteirinha (rosto nítido, fundo limpo) é OBRIGATÓRIA. Por favor, envie uma foto.');
      return;
    }
    if (!form.termoCompromisso) {
      alert('Você precisa aceitar os termos de compromisso para enviar o cadastro.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/membros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setNumeroMembroGerado(data.numeroMembro);
        setSubmitted(true);
      } else {
        alert(data.error || 'Erro ao realizar cadastro.');
      }
    } catch (err) {
      alert('Erro de conexão ao salvar cadastro.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F6F9FC] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-lg w-full text-center space-y-6 border border-[#E6EBF1] shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h1 className="text-2xl font-extrabold text-[#0A2540]">Cadastro realizado com sucesso!</h1>
          
          <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E6EBF1] space-y-2">
            <span className="text-xs text-slate-500 font-bold uppercase">Seu Número de Membro</span>
            <div className="text-3xl font-extrabold text-brand-blue font-mono">{numeroMembroGerado}</div>
            <p className="text-xs text-slate-600 font-semibold">
              Guarde este número para acessar sua Carteirinha Digital no Portal do Membro.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link 
              href="/membro" 
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-flame-gradient text-white text-xs font-extrabold shadow-md hover:scale-105 transition-transform"
            >
              Ir para o Portal do Membro
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F9FC] py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER FORM */}
        <div className="text-center space-y-3">
          <img 
            src="/logo.jpg" 
            alt="Logo Assembleia de Deus" 
            className="w-16 h-16 rounded-2xl mx-auto shadow-md border border-[#E6EBF1] object-cover"
          />
          <h1 className="text-3xl font-extrabold text-[#0A2540]">
            Cadastro de Membro - Igreja Assembleia de Deus
          </h1>
          <p className="text-xs text-[#425466] font-medium max-w-lg mx-auto">
            Preencha todos os campos do formulário para o Rol de Membros da Igreja.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-[#E6EBF1] shadow-stripe space-y-8">
          {/* FOTOS: CARTEIRINHA (OBRIGATÓRIA) E BANNER (OPCIONAL) */}
          <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h2 className="text-base font-extrabold text-[#0A2540] flex items-center gap-2">
              <Camera className="w-5 h-5 text-brand-blue" /> Fotos do Membro
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* FOTO 3X4 CARTEIRINHA (OBRIGATÓRIA) */}
              <div className="space-y-2">
                <label className="block text-xs font-extrabold text-[#0A2540]">
                  1. Foto de Carteirinha * <span className="text-rose-600 font-bold">(OBRIGATÓRIA)</span>
                </label>
                <p className="text-[11px] text-slate-500 font-medium">Rosto nítido, de frente e fundo limpo (estilo 3x4).</p>

                <div className="flex items-center gap-4">
                  {form.fotoCarteirinha ? (
                    <img src={form.fotoCarteirinha} alt="Foto Carteirinha" className="w-24 h-28 object-cover rounded-xl border border-brand-blue shadow-sm" />
                  ) : (
                    <div className="w-24 h-28 rounded-xl border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-slate-400">
                      <Camera className="w-8 h-8" />
                      <span className="text-[10px] font-bold mt-1">3x4 Oblig.</span>
                    </div>
                  )}

                  <label className="px-4 py-2.5 rounded-xl bg-white border border-[#E6EBF1] shadow-stripe-sm text-xs font-bold text-[#0A2540] hover:bg-slate-50 cursor-pointer flex items-center gap-2">
                    <Upload className="w-4 h-4 text-brand-blue" /> Selecionar Foto
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'fotoCarteirinha')} />
                  </label>
                </div>
                {erroFoto && <p className="text-xs text-rose-600 font-bold mt-1">{erroFoto}</p>}
              </div>

              {/* FOTO DE BANNER (OPCIONAL) */}
              <div className="space-y-2">
                <label className="block text-xs font-extrabold text-[#0A2540]">
                  2. Foto de Banner <span className="text-slate-400 font-semibold">(OPCIONAL - pode ser enviada depois)</span>
                </label>
                <p className="text-[11px] text-slate-500 font-medium">Foto em formato horizontal para destaque no portal.</p>

                <div className="flex items-center gap-4">
                  {form.fotoBanner ? (
                    <img src={form.fotoBanner} alt="Foto Banner" className="w-36 h-20 object-cover rounded-xl border border-emerald-500 shadow-sm" />
                  ) : (
                    <div className="w-36 h-20 rounded-xl border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-slate-400">
                      <ImageIcon className="w-6 h-6" />
                      <span className="text-[10px] font-bold mt-1">Banner Opc.</span>
                    </div>
                  )}

                  <label className="px-4 py-2.5 rounded-xl bg-white border border-[#E6EBF1] shadow-stripe-sm text-xs font-bold text-[#0A2540] hover:bg-slate-50 cursor-pointer flex items-center gap-2">
                    <Upload className="w-4 h-4 text-emerald-600" /> Enviar Banner
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'fotoBanner')} />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 1. DADOS PESSOAIS */}
          <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-[#0A2540] flex items-center gap-2 border-b pb-2">
              <User className="w-5 h-5 text-brand-blue" /> 1. Dados Pessoais
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0A2540] mb-1">Nome Completo *</label>
                <input 
                  type="text" 
                  required
                  value={form.nomeCompleto}
                  onChange={(e) => setForm({ ...form, nomeCompleto: e.target.value })}
                  placeholder="Nome completo do membro"
                  className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-xs text-[#0A2540] font-bold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A2540] mb-1">Data de Nascimento *</label>
                <input 
                  type="date" 
                  required
                  value={form.dataNascimento}
                  onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-xs text-[#0A2540] font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0A2540] mb-1">Sexo *</label>
                <select 
                  value={form.sexo}
                  onChange={(e) => setForm({ ...form, sexo: e.target.value })}
                  className="w-full h-11 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-xs text-[#0A2540] font-bold"
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A2540] mb-1">Estado Civil *</label>
                <select 
                  value={form.estadoCivil}
                  onChange={(e) => setForm({ ...form, estadoCivil: e.target.value })}
                  className="w-full h-11 px-3 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-xs text-[#0A2540] font-bold"
                >
                  <option value="Solteiro">Solteiro</option>
                  <option value="Casado">Casado</option>
                  <option value="Viúvo">Viúvo</option>
                  <option value="Divorciado">Divorciado</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A2540] mb-1">CPF</label>
                <input 
                  type="text" 
                  value={form.cpf}
                  onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                  placeholder="000.000.000-00"
                  className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-xs text-[#0A2540] font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A2540] mb-1">Telefone / WhatsApp</label>
                <input 
                  type="text" 
                  value={form.telefone}
                  onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                  placeholder="(00) 00000-0000"
                  className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-xs text-[#0A2540] font-bold"
                />
              </div>
            </div>
          </div>

          {/* 6. TERMO DE COMPROMISSO */}
          <div className="pt-4 border-t border-[#E6EBF1] space-y-4">
            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                id="termo"
                checked={form.termoCompromisso}
                onChange={(e) => setForm({ ...form, termoCompromisso: e.target.checked })}
                className="mt-1 w-4 h-4 accent-brand-blue rounded"
              />
              <label htmlFor="termo" className="text-xs text-[#425466] font-medium leading-relaxed">
                Declaro que as informações acima são verdadeiras e estou ciente do compromisso de comunhão e respeito à fé da Igreja Assembleia de Deus.
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-xl bg-flame-gradient text-white font-extrabold text-sm shadow-lg hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> 
              {loading ? 'Enviando Cadastro...' : 'Enviar Cadastro com Foto de Carteirinha'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
