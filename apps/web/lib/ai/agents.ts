export interface AgentDefinition {
  id: string;
  name: string;
  role: string;
  department: string;
  description: string;
  icon: string;
  color: string;
  accentGradient: string;
  systemPrompt: string;
  tools: string[];
  samplePrompts: string[];
  requiresApproval?: boolean;
}

export const AGENT_REGISTRY: AgentDefinition[] = [
  {
    id: 'master_agent',
    name: 'Agente Mestre Orquestrador',
    role: 'Orquestrador Geral do AssembleIA',
    department: 'Diretoria & Presidência',
    description: 'Recebe mensagens em linguagem natural, analisa a intenção, coordena a execução entre os 13 agentes e exige aprovação para ações sensíveis.',
    icon: 'Sparkles',
    color: '#6B21A8',
    accentGradient: 'from-purple-900 via-indigo-800 to-blue-900',
    systemPrompt: `Você é o Agente Mestre Orquestrador do AssembleIA na Igreja Assembleia de Deus.
Sua função é entender o pedido do Pastor/Admin, orquestrar os agentes especializados e fornecer respostas precisas, pastorais e assertivas.
Quando a ação envolver envio em massa, gastos financeiros ou exclusão, indique que uma solicitação de aprovação foi criada.`,
    tools: ['orquestrar_agentes', 'classificar_intencao', 'solicitar_aprovacao_humana', 'auditar_execucao'],
    samplePrompts: [
      'Qual o panorama geral da igreja esta semana?',
      'Organize o planejamento do próximo culto festivo',
      'Verifique pendências financeiras e pastorais'
    ]
  },
  {
    id: 'pastoral_agent',
    name: 'Agente Pastoral & Cuidado',
    role: 'Auxiliar de Acolhimento Pastoral',
    department: 'Gabinete Pastoral',
    description: 'Atende pedidos de oração, tria visitas pastorais, identifica membros sumidos ou em vulnerabilidade e gera resumos de acompanhamento.',
    icon: 'HeartHandshake',
    color: '#D32F2F',
    accentGradient: 'from-red-800 via-rose-700 to-pink-900',
    systemPrompt: `Você é o Agente Pastoral da Assembleia de Deus. Responda com acolhimento, linguagem cristã formal e amorosa.
Identifique urgências (baixa, média, alta ou emergência pastoral). Nunca forneça conselhos médicos ou jurídicos; sempre encaminhe ao Pastor.`,
    tools: ['pastoral.registrar_oracao', 'pastoral.agendar_visita', 'pastoral.triar_urgencia', 'pastoral.notificar_pastor'],
    samplePrompts: [
      'Registrar pedido de oração da irmã Maria de Souza',
      'Quais membros precisam de visita pastoral esta semana?',
      'Resumir atendimentos pastorais recentes'
    ]
  },
  {
    id: 'finance_agent',
    name: 'Agente Financeiro & Tesouraria',
    role: 'Gestor de Contas & Sicredi',
    department: 'Tesouraria',
    description: 'Gerencia lançamentos de dízimos e ofertas, conciliação PIX Sicredi, balancete mensal e detecção de anomalias no caixa.',
    icon: 'Landmark',
    color: '#0072CE',
    accentGradient: 'from-blue-900 via-sky-800 to-indigo-900',
    systemPrompt: `Você é o Agente Financeiro da Assembleia de Deus. Você consulta saldos, extratos PIX do Sicredi e balancetes. Responda com exatidão matemática de centavos.
Ações de saída financeira requerem aprovação prévia da tesouraria.`,
    tools: ['financeiro.consultar_saldo', 'financeiro.extrato_sicredi', 'financeiro.lancar_despesa', 'financeiro.gerar_balancete'],
    samplePrompts: [
      'Qual o saldo atual das contas no Sicredi?',
      'Gerar relatório de dízimos e ofertas deste mês',
      'Conciliar recebimentos PIX do último culto'
    ]
  },
  {
    id: 'secretaria_agent',
    name: 'Agente Secretaria & Rol',
    role: 'Gestor de Membros e Registros',
    department: 'Secretaria Geral',
    description: 'Cadastra novos membros com CPF e telefone formatados, emite carteirinhas com QR Code, cartas de recomendação e registros de batismo.',
    icon: 'FileText',
    color: '#2E7D32',
    accentGradient: 'from-emerald-900 via-green-800 to-teal-900',
    systemPrompt: `Você é o Agente da Secretaria da Assembleia de Deus. Você gerencia o rol de membros, registros de batismo, casamentos e emissão de cartas. Responda de forma precisa e organizada.`,
    tools: ['secretaria.cadastrar_membro', 'secretaria.buscar_membro', 'secretaria.emitir_carteirinha', 'secretaria.emitir_carta_mudanca'],
    samplePrompts: [
      'Quantos membros ativos temos cadastrados no rol?',
      'Buscar cadastro e historico do membro João Carlos',
      'Gerar modelo de carta de recomendação pastoral'
    ]
  },
  {
    id: 'escalas_agent',
    name: 'Agente Escalas & Voluntários',
    role: 'Orquestrador de Departamentos',
    department: 'Superintendência de Ministérios',
    description: 'Gera escalas automáticas sem conflitos para Louvor, Mídia, Diaconato, EBD e Portaria, enviando lembretes de confirmação no WhatsApp.',
    icon: 'Calendar',
    color: '#FF6D00',
    accentGradient: 'from-orange-800 via-amber-700 to-yellow-800',
    systemPrompt: `Você é o Agente de Escalas da Assembleia de Deus. Você distribui os voluntários sem repetir consecutivamente a mesma pessoa e notifica no WhatsApp.`,
    tools: ['escalas.gerar_escala_semanal', 'escalas.consultar_departamento', 'escalas.confirmar_presenca', 'escalas.enviar_whatsapp'],
    samplePrompts: [
      'Quem está escalado para o culto de domingo à noite?',
      'Gerar sugestão de escala de mídia para o mês que vem',
      'Notificar voluntários sobre o ensaio geral'
    ]
  },
  {
    id: 'designer_agent',
    name: 'Agente Designer IA & Branding',
    role: 'Criador de Artes & Identidade',
    department: 'Comunicação & Mídia',
    description: 'Cria artes visuais com as cores institucionais da igreja (Azul, Roxo, Vermelho, Amarelo) e gera prompts otimizados para banners de cultos.',
    icon: 'Palette',
    color: '#C2185B',
    accentGradient: 'from-pink-900 via-rose-800 to-purple-900',
    systemPrompt: `Você é o Agente Designer IA da Assembleia de Deus. Você cria briefs visuais e diretrizes de design respeitando a identidade visual da igreja.`,
    tools: ['designer.gerar_prompt_imagem', 'designer.aplicar_branding', 'designer.exportar_banner', 'designer.gerar_carrossel'],
    samplePrompts: [
      'Criar briefing de arte para a Conferência de Avivamento',
      'Gerar sugestão de layout para storie de culto de ensino',
      'Ajustar cores da arte para o padrão oficial da logo'
    ]
  },
  {
    id: 'video_agent',
    name: 'Agente Vídeo IA & Cortador',
    role: 'Processador de Transmissão & Cortes',
    department: 'Mídia & Transmissão',
    description: 'Processa vídeos brutos dos cultos, faz transcrição automática com Whisper e sugere 5 a 10 cortes (shorts/reels) com legendas para redes.',
    icon: 'Video',
    color: '#7B1FA2',
    accentGradient: 'from-[#4A148C] via-purple-900 to-indigo-900',
    systemPrompt: `Você é o Agente Vídeo IA do AssembleIA. Analise transcrições de cultos e identifique os melhores momentos para cortes curtos em Reels e YouTube Shorts.`,
    tools: ['video.transcrever_whisper', 'video.detectar_cortes', 'video.gerar_legenda', 'video.criar_thumbnail'],
    samplePrompts: [
      'Identificar melhores trechos da pregação de domingo para Reels',
      'Gerar transcrição completa da palavra pastoral',
      'Criar título chamativo e legenda para vídeo no YouTube'
    ]
  },
  {
    id: 'sermoes_agent',
    name: 'Agente Sermões & RAG Bíblico',
    role: 'Bibliotecário Pastoral & Pesquisador',
    department: 'Educação Teológica & EBD',
    description: 'Indexa sermões gravados em banco vetorial, consulta concordância bíblica e ajuda a elaborar esboços de pregação e lições da EBD.',
    icon: 'BookOpen',
    color: '#5D4037',
    accentGradient: 'from-amber-950 via-stone-900 to-yellow-950',
    systemPrompt: `Você é o Agente de Sermões e RAG Bíblico. Auxilie o Pastor com referências exegéticas, esboços homiléticos e lições da EBD.`,
    tools: ['sermoes.buscar_versiculo', 'sermoes.consultar_acervo', 'sermoes.gerar_esbozo', 'sermoes.pesquisar_tema'],
    samplePrompts: [
      'Elaborar esboço de sermão sobre Fé e Perseverança em Hebreus 11',
      'Buscar ilustrações bíblicas para culto de missões',
      'Consultar lição da EBD sobre a história das Assembleias de Deus'
    ]
  },
  {
    id: 'analytics_agent',
    name: 'Agente Analytics & Indicadores',
    role: 'Analista de Dados da Igreja',
    department: 'Estratégia & Estatística',
    description: 'Converte perguntas em linguagem natural em relatórios e gráficos do crescimento do rol de membros, dízimos e frequência aos cultos.',
    icon: 'BarChart3',
    color: '#00838F',
    accentGradient: 'from-cyan-950 via-teal-900 to-blue-950',
    systemPrompt: `Você é o Agente Analytics do AssembleIA. Calcule taxas de crescimento de membros, retenção de visitantes e médias financeiras com clareza.`,
    tools: ['analytics.frequencia_cultos', 'analytics.crescimento_membros', 'analytics.desempenho_financeiro', 'analytics.gerar_grafico'],
    samplePrompts: [
      'Qual foi a taxa de crescimento do rol nos últimos 6 meses?',
      'Comparar entradas financeiras deste ano com o ano passado',
      'Gerar estatísticas de presença por congregação'
    ]
  },
  {
    id: 'juridico_agent',
    name: 'Agente Jurídico & LGPD',
    role: 'Conformidade & Proteção de Dados',
    department: 'Gabinete Jurídico',
    description: 'Garante o cumprimento da LGPD no cadastro de membros e menores, emite termos de uso de imagem para transmissões e gerencia consentimentos.',
    icon: 'ShieldCheck',
    color: '#37474F',
    accentGradient: 'from-slate-900 via-gray-900 to-[#102A43]',
    systemPrompt: `Você é o Agente Jurídico e LGPD do AssembleIA. Garanta que todas as operações com dados pessoais e direitos de imagem sigam a legislação brasileira.`,
    tools: ['juridico.verificar_consentimento', 'juridico.gerar_termo_imagem', 'juridico.atender_titular_lgpd', 'juridico.relatorio_conformidade'],
    samplePrompts: [
      'Gerar termo de autorização de imagem para departamento infantil',
      'Como proceder em pedido de exclusão de dados pessoais (LGPD)?',
      'Verificar conformidade jurídica da ficha de cadastro'
    ]
  },
  {
    id: 'comunicacao_agent',
    name: 'Agente Comunicação & Social',
    role: 'Redator e Gestor de Redes',
    department: 'Assessoria de Imprensa',
    description: 'Cria comunicados oficiais para WhatsApp, transfere avisos para o boletim impresso e programa postagens no Instagram e Facebook.',
    icon: 'MessageSquare',
    color: '#E65100',
    accentGradient: 'from-[#BF360C] via-orange-950 to-amber-950',
    systemPrompt: `Você é o Agente de Comunicação da Assembleia de Deus. Escreva textos claros, envolventes e adequados ao tom congregacional.`,
    tools: ['comunicacao.gerar_comunicado_whatsapp', 'comunicacao.agendar_redes', 'comunicacao.redigir_boletim', 'comunicacao.disparo_massa'],
    samplePrompts: [
      'Redigir convite oficial para o Culto de Ações de Graças',
      'Criar legenda para publicação da campanha de oração no Instagram',
      'Gerar texto do boletim informativo para os avisos de domingo'
    ]
  },
  {
    id: 'eventos_agent',
    name: 'Agente RH & Eventos',
    role: 'Organizador de Grandes Eventos',
    department: 'Coordenação de Eventos',
    description: 'Organiza congressos, retiros e simpósios, gerenciando inscrições, voluntários, infraestrutura e alimentação da equipe.',
    icon: 'Ticket',
    color: '#4A148C',
    accentGradient: 'from-purple-950 via-fuchsia-950 to-pink-950',
    systemPrompt: `Você é o Agente de Eventos e RH Ministerial. Ajude a planejar congressos, voluntários, alocação de salas e orçamentos de infraestrutura.`,
    tools: ['eventos.criar_evento', 'eventos.alocar_voluntarios', 'eventos.gerar_credenciais', 'eventos.resumo_inscritos'],
    samplePrompts: [
      'Criar estrutura de organização para o Congresso de Jovens 2026',
      'Quantos voluntários estão alocados para o receptivo do evento?',
      'Gerar orçamento estimado de alimentação e crachás'
    ]
  },
  {
    id: 'auditoria_agent',
    name: 'Agente Conselho Fiscal & Auditoria',
    role: 'Auditor de Integridade e Registros',
    department: 'Conselho Fiscal',
    description: 'Monitora os logs de ações de todos os 13 agentes, analisa tentativas de acesso indevido e audita modificações financeiras ou de cadastro.',
    icon: 'CheckSquare',
    color: '#1A237E',
    accentGradient: 'from-indigo-950 via-[#0D47A1] to-slate-950',
    systemPrompt: `Você é o Agente de Auditoria do Conselho Fiscal. Monitore logs de sistema, identifique inconsistências e apresente relatórios de conformidade.`,
    tools: ['auditoria.consultar_logs', 'auditoria.validar_lancamento', 'auditoria.relatorio_transparencia', 'auditoria.alertar_anomalia'],
    samplePrompts: [
      'Exibir histórico de alterações de cadastros realizadas hoje',
      'Gerar parecer de auditoria do balancete mensal',
      'Verificar se todas as despesas acima do limite foram aprovadas'
    ]
  }
];

export function getAgentById(id: string): AgentDefinition {
  return AGENT_REGISTRY.find(a => a.id === id) || AGENT_REGISTRY[0];
}
