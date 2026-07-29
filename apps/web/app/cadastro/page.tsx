'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  User, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Send,
  ArrowLeft,
  BookOpen
} from 'lucide-react';

export default function CadastroMembroPage() {
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ numeroMembro: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Formulário Estado
  const [form, setForm] = useState({
    // 1. Dados Pessoais
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

    // 2. Informações Familiares
    nomePai: '',
    nomeMae: '',
    nomeConjuge: '',
    qtdFilhos: 0,
    filhos: [] as { nome: string; idade: string }[],

    // 3. Informações Espirituais
    dataConversao: '',
    batizadoAguas: 'Não',
    dataBatismo: '',
    igrejaBatismo: '',
    batismoEspiritoSanto: 'Não',
    veioOutraIgreja: 'Não',
    igrejaAnterior: '',

    // 4. Participação na Igreja
    ministerios: [] as string[],
    talentos: '',

    // 5. Informações Adicionais
    necessidadesEspeciais: '',
    contatoEmergencia: '',
    telefoneEmergencia: '',

    // 6. Termo de Compromisso
    termoCompromisso: false,
  });

  const estadosBR = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const listaMinisterios = [
    'Louvor',
    'Escola Bíblica Dominical',
    'Crianças',
    'Jovens',
    'Adolescentes',
    'Evangelismo',
    'Missões',
    'Recepção',
    'Outro ministério'
  ];

  // Máscaras
  const formatCPF = (v: string) => {
    return v.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .substring(0, 14);
  };

  const formatCEP = (v: string) => {
    return v.replace(/\D/g, '')
      .replace(/^(\d{5})(\d)/, '$1-$2')
      .substring(0, 9);
  };

  const formatTelefone = (v: string) => {
    return v.replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2')
      .substring(0, 15);
  };

  const handleAddFilho = () => {
    setForm(prev => ({
      ...prev,
      filhos: [...prev.filhos, { nome: '', idade: '' }]
    }));
  };

  const handleRemoveFilho = (index: number) => {
    setForm(prev => ({
      ...prev,
      filhos: prev.filhos.filter((_, i) => i !== index)
    }));
  };

  const handleMinisterioToggle = (min: string) => {
    setForm(prev => {
      const exists = prev.ministerios.includes(min);
      return {
        ...prev,
        ministerios: exists 
          ? prev.ministerios.filter(m => m !== min)
          : [...prev.ministerios, min]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.termoCompromisso) {
      setErrorMsg('Você precisa aceitar o Termo de Compromisso para prosseguir.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/membros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessData({ numeroMembro: data.numeroMembro });
      } else {
        setErrorMsg(data.error || 'Erro ao realizar cadastro.');
      }
    } catch (err: any) {
      setErrorMsg('Erro de conexão ao enviar formulário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-[#0A2540] py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* TOP BAR */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Voltar ao Início
          </Link>
          <span className="text-xs font-bold text-slate-500">Igreja Assembleia de Deus</span>
        </div>

        {/* HEADER BRANDING */}
        <div className="bg-white rounded-2xl p-8 border border-[#E6EBF1] shadow-stripe text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-brand-cyan shadow-md">
            <Image src="/logo.jpg" alt="Logo Assembleia de Deus" fill className="object-cover" />
          </div>

          <h1 className="text-3xl font-extrabold text-[#0A2540] tracking-tight">
            Cadastro de Membro - Igreja Assembleia de Deus
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Seja bem-vindo à nossa comunidade! Preencha as seções abaixo para oficializar seu cadastro no rol de membros.
          </p>
        </div>

        {/* POPUP DE SUCESSO */}
        {successData && (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-8 text-center space-y-4 shadow-stripe animate-fade-in">
            <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-extrabold text-emerald-900">Cadastro realizado com sucesso!</h2>
            <p className="text-emerald-800 text-sm">
              Suas informações foram salvas com segurança no sistema da igreja.
            </p>
            <div className="inline-block bg-white px-6 py-3 rounded-xl border border-emerald-200 shadow-sm font-mono font-bold text-lg text-emerald-900">
              Número de Membro: <span className="text-brand-blue">{successData.numeroMembro}</span>
            </div>
            <div className="pt-4 flex justify-center gap-4">
              <button 
                onClick={() => { setSuccessData(null); window.location.reload(); }}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow hover:bg-emerald-700 transition-colors"
              >
                Cadastrar Outro Membro
              </button>
              <Link 
                href="/dashboard/secretaria"
                className="px-6 py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-900 font-bold text-xs hover:bg-emerald-100 transition-colors"
              >
                Ver na Secretaria Admin
              </Link>
            </div>
          </div>
        )}

        {/* MENSAGEM DE ERRO */}
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-300 rounded-xl p-4 text-rose-800 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {!successData && (
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* SEÇÃO 1: DADOS PESSOAIS */}
            <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E6EBF1]">
                <User className="w-5 h-5 text-brand-blue" />
                <h2 className="text-lg font-extrabold text-[#0A2540]">1. Dados Pessoais</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nome Completo *</label>
                  <input 
                    type="text" 
                    required
                    value={form.nomeCompleto}
                    onChange={(e) => setForm({ ...form, nomeCompleto: e.target.value })}
                    placeholder="Digite o nome completo"
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Data de Nascimento *</label>
                  <input 
                    type="date" 
                    required
                    value={form.dataNascimento}
                    onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Sexo</label>
                  <select 
                    value={form.sexo}
                    onChange={(e) => setForm({ ...form, sexo: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estado Civil</label>
                  <select 
                    value={form.estadoCivil}
                    onChange={(e) => setForm({ ...form, estadoCivil: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  >
                    <option value="Solteiro">Solteiro</option>
                    <option value="Casado">Casado</option>
                    <option value="Viúvo">Viúvo</option>
                    <option value="Divorciado">Divorciado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CPF</label>
                  <input 
                    type="text" 
                    value={form.cpf}
                    onChange={(e) => setForm({ ...form, cpf: formatCPF(e.target.value) })}
                    placeholder="000.000.000-00"
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">RG</label>
                  <input 
                    type="text" 
                    value={form.rg}
                    onChange={(e) => setForm({ ...form, rg: e.target.value })}
                    placeholder="Número do RG"
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Telefone / WhatsApp</label>
                  <input 
                    type="text" 
                    value={form.telefone}
                    onChange={(e) => setForm({ ...form, telefone: formatTelefone(e.target.value) })}
                    placeholder="(00) 00000-0000"
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">E-mail</label>
                  <input 
                    type="email" 
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="exemplo@email.com"
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Endereço</label>
                  <input 
                    type="text" 
                    value={form.endereco}
                    onChange={(e) => setForm({ ...form, endereco: e.target.value })}
                    placeholder="Rua, Avenida, Alameda..."
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Número</label>
                  <input 
                    type="text" 
                    value={form.numero}
                    onChange={(e) => setForm({ ...form, numero: e.target.value })}
                    placeholder="Nº"
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bairro</label>
                  <input 
                    type="text" 
                    value={form.bairro}
                    onChange={(e) => setForm({ ...form, bairro: e.target.value })}
                    placeholder="Nome do bairro"
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cidade</label>
                  <input 
                    type="text" 
                    value={form.cidade}
                    onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                    placeholder="Cidade"
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estado</label>
                  <select 
                    value={form.estado}
                    onChange={(e) => setForm({ ...form, estado: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  >
                    {estadosBR.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CEP</label>
                  <input 
                    type="text" 
                    value={form.cep}
                    onChange={(e) => setForm({ ...form, cep: formatCEP(e.target.value) })}
                    placeholder="00000-000"
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>
            </div>

            {/* SEÇÃO 2: INFORMAÇÕES FAMILIARES */}
            <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E6EBF1]">
                <Heart className="w-5 h-5 text-rose-500" />
                <h2 className="text-lg font-extrabold text-[#0A2540]">2. Informações Familiares</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nome do Pai</label>
                  <input 
                    type="text" 
                    value={form.nomePai}
                    onChange={(e) => setForm({ ...form, nomePai: e.target.value })}
                    placeholder="Nome do pai"
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nome da Mãe</label>
                  <input 
                    type="text" 
                    value={form.nomeMae}
                    onChange={(e) => setForm({ ...form, nomeMae: e.target.value })}
                    placeholder="Nome da mãe"
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nome do Cônjuge (se casado)</label>
                  <input 
                    type="text" 
                    value={form.nomeConjuge}
                    onChange={(e) => setForm({ ...form, nomeConjuge: e.target.value })}
                    placeholder="Nome do cônjuge"
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              {/* LISTA DINÂMICA DE FILHOS */}
              <div className="space-y-4 pt-2 border-t border-[#E6EBF1]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0A2540]">Filhos</span>
                  <button 
                    type="button" 
                    onClick={handleAddFilho}
                    className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Adicionar Filho(a)
                  </button>
                </div>

                {form.filhos.map((filho, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-[#F8FAFC] p-3 rounded-xl border border-[#E6EBF1]">
                    <input 
                      type="text" 
                      placeholder="Nome do filho(a)"
                      value={filho.nome}
                      onChange={(e) => {
                        const newFilhos = [...form.filhos];
                        newFilhos[idx].nome = e.target.value;
                        setForm({ ...form, filhos: newFilhos });
                      }}
                      className="flex-1 h-9 px-3 rounded-lg border border-[#E6EBF1] bg-white text-xs"
                    />
                    <input 
                      type="number" 
                      placeholder="Idade"
                      value={filho.idade}
                      onChange={(e) => {
                        const newFilhos = [...form.filhos];
                        newFilhos[idx].idade = e.target.value;
                        setForm({ ...form, filhos: newFilhos });
                      }}
                      className="w-20 h-9 px-3 rounded-lg border border-[#E6EBF1] bg-white text-xs"
                    />
                    <button 
                      type="button" 
                      onClick={() => handleRemoveFilho(idx)}
                      className="p-2 text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SEÇÃO 3: INFORMAÇÕES ESPIRITUAIS */}
            <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E6EBF1]">
                <BookOpen className="w-5 h-5 text-brand-cyan" />
                <h2 className="text-lg font-extrabold text-[#0A2540]">3. Informações Espirituais</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Data em que aceitou Jesus</label>
                  <input 
                    type="date" 
                    value={form.dataConversao}
                    onChange={(e) => setForm({ ...form, dataConversao: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Foi batizado nas águas?</label>
                  <select 
                    value={form.batizadoAguas}
                    onChange={(e) => setForm({ ...form, batizadoAguas: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  >
                    <option value="Não">Não</option>
                    <option value="Sim">Sim</option>
                  </select>
                </div>

                {form.batizadoAguas === 'Sim' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Data do Batismo</label>
                      <input 
                        type="date" 
                        value={form.dataBatismo}
                        onChange={(e) => setForm({ ...form, dataBatismo: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Igreja onde foi batizado</label>
                      <input 
                        type="text" 
                        value={form.igrejaBatismo}
                        onChange={(e) => setForm({ ...form, igrejaBatismo: e.target.value })}
                        placeholder="Nome da igreja"
                        className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Recebeu o batismo com o Espírito Santo?</label>
                  <select 
                    value={form.batismoEspiritoSanto}
                    onChange={(e) => setForm({ ...form, batismoEspiritoSanto: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  >
                    <option value="Não">Não</option>
                    <option value="Sim">Sim</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Veio de outra congregação?</label>
                  <select 
                    value={form.veioOutraIgreja}
                    onChange={(e) => setForm({ ...form, veioOutraIgreja: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  >
                    <option value="Não">Não</option>
                    <option value="Sim">Sim</option>
                  </select>
                </div>

                {form.veioOutraIgreja === 'Sim' && (
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Congregação Anterior</label>
                    <input 
                      type="text" 
                      value={form.igrejaAnterior}
                      onChange={(e) => setForm({ ...form, igrejaAnterior: e.target.value })}
                      placeholder="Nome da congregação anterior"
                      className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* SEÇÃO 4: PARTICIPAÇÃO NA IGREJA */}
            <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E6EBF1]">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-extrabold text-[#0A2540]">4. Participação na Igreja</h2>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-3">Ministérios que deseja participar (Seleção Múltipla):</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {listaMinisterios.map((min) => (
                    <label 
                      key={min}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2.5 cursor-pointer transition-all ${
                        form.ministerios.includes(min)
                          ? 'bg-blue-50 border-brand-blue text-brand-blue shadow-sm'
                          : 'bg-[#F8FAFC] border-[#E6EBF1] text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <input 
                        type="checkbox"
                        checked={form.ministerios.includes(min)}
                        onChange={() => handleMinisterioToggle(min)}
                        className="rounded text-brand-blue focus:ring-0"
                      />
                      <span>{min}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Talentos, habilidades ou áreas onde deseja servir</label>
                <textarea 
                  rows={3}
                  value={form.talentos}
                  onChange={(e) => setForm({ ...form, talentos: e.target.value })}
                  placeholder="Ex: Toco violão, canto, experiência com som, ensino de crianças, ornamentação..."
                  className="w-full p-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                />
              </div>
            </div>

            {/* SEÇÃO 5: INFORMAÇÕES ADICIONAIS */}
            <div className="bg-white rounded-2xl p-6 border border-[#E6EBF1] shadow-stripe-sm space-y-6">
              <h2 className="text-lg font-extrabold text-[#0A2540] pb-3 border-b border-[#E6EBF1]">5. Informações Adicionais</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Necessidades especiais ou observações</label>
                  <textarea 
                    rows={2}
                    value={form.necessidadesEspeciais}
                    onChange={(e) => setForm({ ...form, necessidadesEspeciais: e.target.value })}
                    placeholder="Informações de saúde, restrições ou observações relevantes..."
                    className="w-full p-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contato de Emergência</label>
                  <input 
                    type="text" 
                    value={form.contatoEmergencia}
                    onChange={(e) => setForm({ ...form, contatoEmergencia: e.target.value })}
                    placeholder="Nome do contato"
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Telefone de Emergência</label>
                  <input 
                    type="text" 
                    value={form.telefoneEmergencia}
                    onChange={(e) => setForm({ ...form, telefoneEmergencia: formatTelefone(e.target.value) })}
                    placeholder="(00) 00000-0000"
                    className="w-full h-11 px-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>
            </div>

            {/* SEÇÃO 6: TERMO DE COMPROMISSO */}
            <div className="bg-white rounded-2xl p-6 border-2 border-brand-blue/30 shadow-stripe space-y-4">
              <h2 className="text-lg font-extrabold text-[#0A2540]">6. Termo de Compromisso</h2>

              <label className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox"
                  required
                  checked={form.termoCompromisso}
                  onChange={(e) => setForm({ ...form, termoCompromisso: e.target.checked })}
                  className="mt-1 rounded text-brand-blue focus:ring-0 w-4 h-4"
                />
                <span className="text-xs font-bold text-[#0A2540] leading-relaxed">
                  Declaro que as informações fornecidas são verdadeiras e desejo fazer parte da comunhão da Igreja Assembleia de Deus.
                </span>
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-flame-gradient text-white font-extrabold text-base shadow-lg shadow-brand-cyan/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Cadastrando no banco...' : 'Enviar Cadastro'} <Send className="w-5 h-5" />
            </button>

          </form>
        )}
      </div>
    </div>
  );
}
