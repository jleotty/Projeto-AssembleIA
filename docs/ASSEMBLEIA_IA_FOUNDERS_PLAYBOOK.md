# THE FOUNDER'S PLAYBOOK
# ASSEMBLEIA IA

## Manual Completo do Fundador — Da Ideia ao Domínio de Mercado

**Produto:** Assembleia IA — Sistema Operacional Inteligente para Igrejas  
**Versão do Playbook:** 1.0.0  
**Data:** 29 de julho de 2026  
**Idioma:** Português (Brasil)  
**Público:** Fundador(es), co-fundadores, early employees, investidores early-stage  
**Princípio:** Este documento não é motivacional genérico. É um manual operacional específico para construir, lançar, vender e escalar a Assembleia IA no mercado brasileiro e, depois, global de gestão eclesiástica com IA.

---

# PARTE 0 — COMO USAR ESTE PLAYBOOK

1. Leia a Parte 1 (tese) antes de qualquer decisão de produto ou fundraising.
2. Use a Parte 2 (problema/mercado) em toda conversa com investidor ou early adopter.
3. Execute a Parte 3 (MVP e fases) em sincronia com o Documento Mestre Técnico (Volumes 1–3).
4. Trate a Parte 4 (GTM) como o sistema de vendas — não como “ideias de marketing”.
5. Revise métricas (Parte 6) toda segunda-feira em 30 minutos.
6. Atualize este playbook a cada trimestre. Versão desatualizada é dívida estratégica.

**Arquivos companheiros obrigatórios:**
- `ASSEMBLEIA_IA_DOCUMENTO_MESTRE_COMPLETO.md` (especificação técnica)
- `ASSEMBLEIA_IA_VOLUME3_ASSEMBLEIA_DE_DEUS.md` (cargos e estrutura AD)
- Este Founder's Playbook

---

# PARTE 1 — A TESE DO FUNDADOR

## 1.1 Por que a Assembleia IA existe

Igrejas são organizações complexas: pessoas, dinheiro, eventos, voluntários, mídia, cuidado pastoral e conformidade legal. A maior parte ainda roda em:

- Planilhas Excel
- Grupos de WhatsApp desorganizados
- Sistemas legados caros e pouco inteligentes
- Trabalho manual de secretárias e líderes esgotados

A tese não é “mais um ERP de igreja”. A tese é:

> **A igreja do século XXI terá um sistema operacional de IA que executa o trabalho operacional, enquanto pastores e líderes cuidam de pessoas.**

Quem construir o OS padrão das igrejas com agentes de IA captura:

1. Receita recorrente (SaaS)
2. Dados agregados (anonimizados) de engajamento e saúde congregacional
3. Marketplace de extensões e agentes
4. Expansão internacional (latam → global)

## 1.2 Por que agora (timing)

| Força | Evidência de timing |
|-------|---------------------|
| LLMs maduros | Agentes com tools, memória e orquestração (LangGraph) já são viáveis em produção |
| WhatsApp como interface | No Brasil, a igreja já “mora” no WhatsApp; a API oficial existe |
| Digitalização pós-pandemia | Cultos online, PIX, presença digital viraram hábito |
| Cansaço operacional | Secretarias e líderes pedem alívio real, não mais telas |
| Concorrência lenta | ERPs tradicionais de igreja ainda tratam IA como chatbot decorativo |

## 1.3 O que NÃO somos

- Não somos só “chatbot para pastor”
- Não somos só contabilidade de igreja
- Não somos rede social gospel
- Não somos curso de liderança empacotado em app

Somos o **sistema onde a operação da igreja acontece**, com IA no núcleo.

## 1.4 Princípios de decisão do fundador

1. **IA first** — se um humano faz algo repetitivo, o agente deve poder fazer.
2. **WhatsApp first** — a interface primária do operador é o WhatsApp.
3. **Multi-tenant from day one** — nunca construir single-tenant “e depois migramos”.
4. **Human-in-the-loop** — confiança > automação cega, especialmente em pastoral e financeiro.
5. **Denominação-aware** — Assembleia de Deus primeiro (maior base), depois universalização.
6. **Receita antes de vaidade** — MRR e retenção > downloads e press.
7. **Segurança e LGPD não são feature** — são pré-requisito de venda para igrejas sérias.

---

# PARTE 2 — MERCADO, PROBLEMA E POSICIONAMENTO

## 2.1 Tamanho de mercado (abordagem prática)

**Brasil**
- Dezenas de milhares de congregações evangélicas (IBGE/censo religioso + dados denominacionais)
- Assembleia de Deus: uma das maiores bases do país (CGADB, CADB, Madureira e ministérios)
- Ticket mensal estimado SaaS: R$ 197 a R$ 2.997+ conforme porte

**Bottom-up (exemplo de raciocínio para investidor)**

| Segmento | Igrejas endereçáveis (hipótese) | Ticket médio/mês | Potencial mensal |
|----------|----------------------------------|------------------|------------------|
| Pequenas (até 200) | 15.000 | R$ 197 | R$ 2,9M |
| Médias (200–1.000) | 5.000 | R$ 497 | R$ 2,5M |
| Grandes (1.000–5.000) | 1.500 | R$ 1.297 | R$ 1,9M |
| Mega / ministérios | 300 | R$ 3.500 | R$ 1,0M |

> Estes números são **modelo de trabalho**, não estatística oficial. O fundador deve validar com dados de campo e atualizar a tese a cada trimestre.

**TAM/SAM/SOM (narrativa)**
- **TAM:** gestão + comunicação + mídia de organizações religiosas de língua portuguesa e espanhola
- **SAM:** igrejas evangélicas no Brasil com capacidade de pagar SaaS
- **SOM (3–5 anos):** liderança no segmento AD + penetração em outras denominações no Brasil

## 2.2 Personas de compra (quem assina o boleto)

| Persona | Dor principal | O que compra |
|---------|---------------|--------------|
| Pastor Presidente | Tempo engolido por operação | “A igreja anda sem eu micromanagear” |
| Secretária | Retrabalho, WhatsApp caótico, planilhas | Cadastro, documentos, escalas, atendimento |
| Tesoureiro | Prestação de contas e conciliação | PIX, relatórios, conformidade |
| Líder de mídia | Produzir artes/vídeos toda semana | Estúdio IA + publicação |
| Conselho / Assembleia | Transparência e governança | Relatórios e auditoria |

**Champion interno típico:** secretária ou pastor auxiliar tech-friendly.  
**Economic buyer:** pastor presidente ou tesoureiro.  
**Bloqueador comum:** medo de “IA substituir o humano” ou de vazamento de dados.

## 2.3 Posicionamento em uma frase

> **Assembleia IA é o sistema operacional com agentes de IA que administra a igreja pelo WhatsApp e pelo painel — para a Assembleia de Deus e demais igrejas que querem menos planilha e mais pastoreio.**

## 2.4 Concorrência (mapa)

| Tipo | Exemplos (categorias) | Fraqueza típica | Nossa cunha |
|------|------------------------|-----------------|-------------|
| ERP tradicional de igreja | Softwares legados BR | UI antiga, pouca IA, WhatsApp fraco | Agentes + WhatsApp + mídia |
| Ferramentas genéricas | Planilhas, Trello, Notion | Não são verticais de igreja | Modelo mental AD + cargos + EBD |
| Chatbots isolados | Bots de atendimento | Não operam finanças/escalas/eventos | Orquestração multi-agente |
| Suites internacionais | Church management US/EU | Pouco fit BR (PIX, LGPD, AD, WhatsApp) | Local-first Brasil |

**Regra:** nunca criticar concorrente em público por nome em tom agressivo. Diferenciar por demonstração.

## 2.5 Diferenciação defensável (moats ao longo do tempo)

1. **Workflow data** — quanto mais escalas, sermões e finanças no sistema, melhor a IA fica por tenant
2. **Catálogo AD** — cargos, departamentos, linguagem (Volume 3)
3. **Integração WhatsApp operacional** (não só broadcast)
4. **Marketplace de agentes** (efeito rede)
5. **Confiança denominacional** — cases, pastores referência, conformidade

---

# PARTE 3 — PRODUTO, MVP E ROADMAP DE VALOR

## 3.1 Definição de MVP (o que precisa ser verdade)

O MVP **não** é “todos os 13 agentes”. O MVP é:

> Uma igreja real consegue, em 14 dias de trial:
> 1. Cadastrar membros e visitantes
> 2. Rodar escala de um departamento
> 3. Lançar dízimo/oferta e ver relatório simples
> 4. Conversar com o agente pelo WhatsApp para 5 comandos críticos
> 5. Ver dashboard com presença e financeiro básico

**Comandos WhatsApp do MVP**
1. Cadastrar visitante  
2. Quem está escalado domingo?  
3. Quanto entrou esta semana?  
4. Enviar lembrete para a escala  
5. Quantos membros ativos temos?

## 3.2 Alinhamento com fases técnicas (Documento Mestre)

| Fase técnica | Valor de negócio | Critério de “fase paga” |
|--------------|------------------|-------------------------|
| Fase 0–1 | Fundação + WhatsApp + membros | Design partners usam de verdade |
| Fase 2 | Escalas + financeiro + analytics | Primeiras conversões pagas |
| Fase 3 | Mídia e site | Upsell para planos Impactar |
| Fase 4 | Pastoral + sermões + mobile | Retenção e expansão de assento |
| Fase 5 | Marketplace + API | Margem e ecossistema |

## 3.3 Princípio de escopo

Toda feature nova deve responder:

1. Qual persona paga mais ou cancela menos por causa disso?
2. O agente consegue executar ou só “conversa”?
3. Aumenta switching cost?
4. Podemos cobrar add-on?

Se a resposta for “não” em 3 de 4, não entra no trimestre.

## 3.4 Design partners (igrejas-piloto)

**Perfil ideal do piloto**
- 150–800 membros
- Pastor aberto a tecnologia
- Secretária sobrecarregada (dor aguda)
- Já usa PIX e WhatsApp Business (ou topa)
- Assembleia de Deus (validação do Volume 3)

**Quantidade:** 5–10 design partners no primeiro ciclo.  
**Contrato:** trial estendido ou desconto vitalício de early adopter em troca de feedback semanal e case público.

**O que pedir a cada piloto**
- Gravação de 1 processo real (escala, dízimo, cadastro)
- Lista de 10 frases que digitariam no WhatsApp
- NPSO (nota de dor) antes/depois

---

# PARTE 4 — GO-TO-MARKET (GTM)

## 4.1 Estratégia geral

**Fase GTM 1 — Fundação denominacional (0–12 meses)**  
Dominar a conversa dentro da Assembleia de Deus em 2–3 estados-piloto.

**Fase GTM 2 — Expansão evangélica BR (12–24 meses)**  
Batistas, quadrangulares, outras pentecostais, não-denominacionais.

**Fase GTM 3 — Latam / português-espanhol (24–36 meses)**  
Localização + parcerias.

## 4.2 Canais de aquisição (priorizados)

| Canal | Por que funciona | CAC esperado (hipótese) | Ação semanal |
|-------|------------------|-------------------------|--------------|
| Indicação de pastor para pastor | Confiança denominacional | Baixo | Programa de referral com crédito |
| Convenções e congressos AD | Densidade de decision makers | Médio | Stands + demos ao vivo no WhatsApp |
| Conteúdo prático (YouTube/Reels) | “Como gerar escala em 2 min” | Médio-baixo | 3 peças/semana de demo real |
| Parcerias com contadores de igrejas | Acesso a tesoureiros | Médio | Revenda / indicação remunerada |
| Outbound qualificado | Listas de ministérios médios | Alto | 20 conversas/semana no early stage |
| App stores / SEO | Longo prazo | Baixo marginal | Depois do PMF |

**Canal #1 no início:** indicação + demos em grupos de pastores/secretárias onde você já tem relacionamento.

## 4.3 Funil de vendas (B2B igreja)

```
Lead (pastor/secretária/tesoureiro)
  → Qualificação (porte, dor, WhatsApp, decisão)
    → Demo 20–30 min (ao vivo no produto + WhatsApp)
      → Trial 14 dias com onboarding assistido
        → Fechamento (Pix/boleto/cartão mensal ou anual)
          → Onboarding 30 dias
            → Expansão (add-ons, mais usuários, plano superior)
```

**Script de qualificação (5 perguntas)**
1. Quantos membros aproximadamente?
2. Quem hoje faz escala, finanças e cadastro?
3. Vocês usam algum sistema pago? Qual a maior dor?
4. O pastor ou o tesoureiro participa da decisão?
5. Conseguem testar 14 dias com a secretária dedicando 2h na primeira semana?

## 4.4 Demo que vende (estrutura de 25 minutos)

1. **2 min** — “Vou mostrar a igreja operando pelo WhatsApp”  
2. **5 min** — Cadastrar visitante + listar membros  
3. **5 min** — Gerar escala e mandar lembrete  
4. **5 min** — Lançar oferta e perguntar “quanto entrou”  
5. **5 min** — Dashboard e permissões  
6. **3 min** — Preço, trial, próximos passos  

**Regra de ouro:** na demo, o cliente digita no WhatsApp. Não assista passivo a um slide.

## 4.5 Pricing (revisitar a cada 6 meses)

| Plano | Quem é | Preço âncora | O que desbloqueia |
|-------|--------|--------------|-------------------|
| Essencial | Igreja pequena | R$ 197/mês | Membros, WhatsApp básico, escalas simples |
| Crescer | Igreja média | R$ 497/mês | Financeiro + analytics + mais usuários |
| Impactar | Igreja grande | R$ 1.297/mês | Designer + eventos + social |
| Dominar | Mega / ministério | R$ 2.997+/mês | Vídeo IA + RH + jurídico + SLA |

**Táticas**
- Anual com 2 meses off (melhora cash e churn)
- Early adopter: 30–40% off por 12 meses em troca de case
- Add-on de créditos de geração de imagem/vídeo
- Nunca competir só no preço contra legado; competir em tempo economizado

## 4.6 Onboarding (os primeiros 30 dias decidem o churn)

**Dia 0–2**
- Branding, usuários, WhatsApp conectado
- Importação de membros (CSV)

**Dia 3–7**
- Primeira escala real
- Primeiro lançamento financeiro

**Dia 8–14**
- Treino de 45 min com secretária + pastor
- Checklist de “primeira vitória”

**Dia 15–30**
- Revisão de uso (product analytics)
- Pedido de feedback e indicação

**Owner:** Customer Success (no início = fundador).

---

# PARTE 5 — OPERAÇÃO COMERCIAL E CUSTOMER SUCCESS

## 5.1 Ritual semanal de vendas (fundador)

| Dia | Bloco | Duração |
|-----|-------|---------|
| Seg | Pipeline review + metas | 45 min |
| Ter–Qui | Demos e follow-ups | 2–3 h/dia |
| Sex | Conteúdo + parcerias | 2 h |
| Contínuo | Responder leads < 1h útil | — |

## 5.2 Playbook de objeções

| Objeção | Resposta-mãe |
|---------|----------------|
| “IA vai substituir a secretária” | “Ela tira o repetitivo. A secretária sobra para pessoas e exceções.” |
| “Nossos dados são sagrados” | “Multi-tenant com RLS, LGPD, MFA, auditoria. Posso mostrar o modelo de segurança.” |
| “Já temos sistema” | “Ótimo. Em 20 min comparamos o tempo de uma escala e um relatório.” |
| “Está caro” | “Quanto custa 10h/semana da secretária + erros de escala + atraso de prestação?” |
| “Vamos orar / decidir depois” | “Perfeito. Enquanto isso deixo o trial ativo 14 dias para a secretária testar um processo real.” |

## 5.3 Health score do cliente (simples)

Pontue 0–10:
- Login semanal do admin
- Uso de WhatsApp comandos
- Escala publicada no mês
- Transação financeira no mês
- Resposta a onboarding

**< 4:** risco de churn → intervenção humana  
**4–7:** nutrir  
**> 7:** pedir indicação e case

## 5.4 Expansão de receita (net revenue retention)

- Subir de plano quando membros > limite
- Vender créditos de mídia
- Adicionar congregações do mesmo ministério (multi-unit)
- Treinamento pago para equipes grandes

---

# PARTE 6 — MÉTRICAS, OKRS E RITUAIS

## 6.1 North Star

**North Star Metric sugerida:**  
`Número de ações operacionais executadas por agentes com sucesso por igreja ativa / semana`

Proxy inicial se ainda não instrumentou agentes:  
`Igrejas ativas com ≥1 escala publicada e ≥1 transação financeira nos últimos 30 dias`

## 6.2 Métricas semanais (dashboard do fundador)

| Métrica | Por que importa |
|---------|-----------------|
| Novos trials | Topo de funil |
| Taxa trial → pago | Qualidade do produto e onboarding |
| MRR e MoM growth | Oxigênio |
| Churn logo / revenue churn | Sustentabilidade |
| NPS / CSAT onboarding | Retenção futura |
| Custo de IA / igreja | Margem |
| Tempo médio 1ª escala | Ativação |

## 6.3 OKRs exemplo — Trimestre de validação

**Objetivo:** Provar que igrejas AD pagam e usam toda semana.

- KR1: 25 trials qualificados  
- KR2: 10 clientes pagantes  
- KR3: ≥60% dos pagantes com escala + financeiro ativos  
- KR4: Churn < 8% no trimestre  
- KR5: 5 cases escritos com número de horas economizadas  

## 6.4 Ritual mensal

1. Revisão de churn (por que saíram?)  
2. Revisão de roadmap vs. receita  
3. Unit economics (CAC, LTV hipotético, payback)  
4. Uma decisão corajosa (matar feature, dobrar canal, subir preço)

---

# PARTE 7 — EQUIPE, CULTURA E CONTRATAÇÕES

## 7.1 Ordem de contratação (bootstrap → seed)

| Ordem | Papel | Quando |
|------:|-------|--------|
| 0 | Fundador full-stack / product | Dia 0 |
| 1 | Co-fundador tech ou design/GTM | O quanto antes se houver química |
| 2 | Engenheiro full-stack (produto core) | Com primeiros pagantes ou seed |
| 3 | Pessoa de Customer Success / onboarding | Com 15–30 clientes |
| 4 | Engenheiro de IA / agentes | Quando agentes forem o gargalo |
| 5 | Vendas (AE) | Com playbook de demo repetível |
| 6 | Marketing de conteúdo | Com canal orgânico validado |

**Evite:** contratar marketing pesado antes de um funil que converte em demo.

## 7.2 Cultura operacional

- **Igreja real > opinião interna** — toda feature controversa vai a um design partner
- **Demo ou não aconteceu** — progresso se mostra no produto
- **Respeito denominacional** — linguagem cuidadosa; nunca deboche de fé
- **Segurança por padrão** — atalho em LGPD é dívida existencial
- **Escrita clara** — PRs, ADRs e mensagens a clientes sem jargão vazio

## 7.3 Valores de produto (para o time)

1. Tempo devolvido ao pastor e à secretária  
2. Clareza acima de “mágica”  
3. Controle humano nas decisões sensíveis  
4. Excelência no detalhe AD (cargos, EBD, carta de mudança)

---

# PARTE 8 — FINANÇAS, UNIT ECONOMICS E FUNDRAISING

## 8.1 Modelo de receita

- Assinatura mensal/anual (core)
- Add-ons de uso de IA generativa (imagens/vídeo)
- Implementação/onboarding premium (opcional)
- Marketplace (futuro: revenue share)

## 8.2 Custos críticos a monitorar

| Custo | Risco | Mitigação |
|-------|-------|-----------|
| Tokens LLM | Margem corroída | Cache, modelos menores, budgets por tenant |
| WhatsApp (Meta) | Custo por conversa | Templates eficientes, janelas de 24h |
| Storage de vídeo | Pico de custo | Ciclo de vida, compressão, planos com quota |
| Suporte humano | Não escala | CS assistido por agente + docs |

## 8.3 Unit economics (framework)

- **ARPU** = ticket médio mensal  
- **CAC** = gasto vendas+marketing / novos clientes  
- **LTV** ≈ ARPU × margem bruta × vida média (meses)  
- **Payback** = CAC / (ARPU × margem)

**Alvo early stage:** payback < 12 meses.  
**Alvo escala:** payback < 6–8 meses.

## 8.4 Bootstrap vs. investimento

**Bootstrap se:**
- Você consegue 20–50 clientes com rede pessoal
- Burn baixo (time mínimo)
- Quer manter controle e ritmo denominacional cuidadoso

**Buscar investimento se:**
- Canal de convenções/parcerias escala mais rápido que o caixa
- Precisa de time de engenharia para não perder janela de IA
- Há tração mensurável (MRR + retenção)

## 8.5 Narrative para investidor (estrutura)

1. Problema visceral (dia na vida da secretária/pastor)  
2. Por que agora (IA + WhatsApp + digitalização)  
3. Solução em 1 demo  
4. Mercado bottom-up  
5. Tração (pilots, MRR, retenção, horas economizadas)  
6. Moat (dados de workflow + fit AD + marketplace)  
7. Time  
8. Ask e uso do capital  

**Nunca:** prometer “IA que aconselha espiritualmente no lugar do pastor”.  
**Sempre:** “IA que tira operação do caminho do pastoreio”.

---

# PARTE 9 — LEGAL, COMPLIANCE E RISCO

## 9.1 Estrutura societária (orientações gerais — consultar advogado)

- Empresa de tecnologia (SaaS), não “igreja”
- Contratos de adesão claros (SaaS Agreement)
- DPA / termos de tratamento de dados (LGPD)
- Política de privacidade legível
- Termos de uso de IA (limites, HITL, responsabilidade)

## 9.2 LGPD na prática comercial

- Consentimentos no onboarding de membros
- Bases legais documentadas
- Processo de exclusão/portabilidade
- Suboperadores (Meta, cloud, LLM) listados
- Treinamento do time para não vazar dados em demos

## 9.3 Riscos existenciais e mitigação

| Risco | Mitigação |
|-------|-----------|
| Banimento WhatsApp | Políticas Meta, templates, fallback e-mail/SMS |
| Alucinação financeira | Tools read-only + aprovação + auditoria |
| Crise pastoral mal conduzida pela IA | Protocolo de crise, sem métodos, escalada humana |
| Vazamento cross-tenant | RLS, testes de isolamento, bug bounty depois |
| Rejeição denominacional | Pastores conselheiros, linguagem respeitosa, cases |

## 9.4 Conselho informal (muito valioso)

3–5 pastores/líderes respeitados como **advisory** não societário:
- Feedback de produto
- Introduções
- Escudo reputacional

Compensação: equity pequena ou produto vitalício + reconhecimento.

---

# PARTE 10 — MARCA, COMUNICAÇÃO E CONTEÚDO

## 10.1 Tom de marca

- Respeitoso e sóbrio (não “hype startup” agressivo)
- Claro e concreto (horas economizadas, não “revolução”)
- Técnico quando fala com secretária/tesoureiro
- Pastoral quando fala com pastor (sem pieguice)

## 10.2 Mensagens-chave

1. “Menos planilha. Mais pastoreio.”  
2. “Sua igreja no WhatsApp — de verdade.”  
3. “Agentes que executam. Você aprova o que importa.”  
4. “Feito para a realidade da Assembleia de Deus.”  

## 10.3 Conteúdo que gera demo

- “Gerei a escala de louvor em 40 segundos” (screen + WhatsApp)  
- “Perguntei quanto entrou de dízimo e a IA respondeu com gráfico”  
- “Do culto bruto aos shorts em um fluxo”  
- “Como importar o rol de membros sem dor”  

**Cadência inicial:** 3 posts curtos/semana + 1 demo longa/quinzena.

## 10.4 O que evitar

- Promessas de milagre financeiro ou crescimento de igreja garantido pela IA  
- Uso de dados de clientes em marketing sem autorização  
- Memes que ridicularizam igrejas ou lideranças  

---

# PARTE 11 — PLAYBOOK DE LANÇAMENTO (90 DIAS)

## Dias 1–30 — Fundação

- [ ] Empresa e contas cloud básicas  
- [ ] MVP técnico Fase 0–1 em andamento (Doc Mestre)  
- [ ] Lista de 50 igrejas candidatas a design partner  
- [ ] Landing page com waitlist + agendamento de demo  
- [ ] Termos, privacidade, LGPD v0  
- [ ] Pricing publicado (mesmo que early)

## Dias 31–60 — Validação

- [ ] 5 design partners ativos  
- [ ] 10 demos feitas  
- [ ] Primeiros comandos WhatsApp estáveis  
- [ ] Medir tempo até primeira escala  
- [ ] Coletar 20 frases reais de usuários  
- [ ] Ajustar onboarding

## Dias 61–90 — Primeira receita

- [ ] 5–15 clientes pagantes (meta aspiracional; ajustar à realidade)  
- [ ] 2 cases escritos  
- [ ] Referral pedido a cada cliente saudável  
- [ ] Ritual semanal de métricas instaurado  
- [ ] Decisão: bootstrap mais 90 dias ou preparar seed  

---

# PARTE 12 — EXPANSÃO DENOMINACIONAL E GEOGRÁFICA

## 12.1 Depois de AD

Ordem sugerida de expansão de “templates denominacionais”:
1. Outras pentecostais  
2. Batistas  
3. Não-denominacionais  
4. Históricas (com cuidado doutrinário e de linguagem)

Cada uma exige: cargos, departamentos, vocabulário, talvez fluxos de membresia diferentes.

## 12.2 Internacional

- Priorizar países com WhatsApp forte e base evangélica  
- Espanhol como segundo idioma  
- Pagamentos locais  
- Parceiro local de CS antes de marketing pesado  

---

# PARTE 13 — CHECKLIST DO FUNDADOR (USO DIÁRIO/SEMANAL)

### Diário
- [ ] Respondi leads em < 1 hora útil?  
- [ ] Empurre um design partner a uma vitória concreta?  
- [ ] Bloqueei tempo profundo de produto/engenharia?

### Semanal
- [ ] Atualizei pipeline  
- [ ] Olhei churn e health scores  
- [ ] Publiquei ou gravou 1 prova social  
- [ ] Revisei custo de IA  

### Mensal
- [ ] Unit economics  
- [ ] Roadmap vs. receita  
- [ ] 1 conversa profunda com cliente (não suporte)  
- [ ] Atualizei tese de mercado se necessário  

---

# PARTE 14 — ANTI-PLAYBOOK (ERROS QUE MATAM)

1. Construir 13 agentes antes de 1 igreja pagar  
2. Tratar WhatsApp como “notificação” e não como operação  
3. Ignorar tesoureiro na venda (ele mata ou salva o deal)  
4. Prometer aconselhamento espiritual autônomo  
5. Hardcode single-tenant “temporário”  
6. Contratar time de marketing antes de demo repetível  
7. Não medir custo de tokens por tenant  
8. Usar dados reais de igreja em demos públicas  
9. Brigar com denominações no Twitter  
10. Abandonar onboarding porque “o produto é intuitivo”  

---

# PARTE 15 — VISÃO DE LONGO PRAZO (5–10 ANOS)

- Padrão de fato de OS de igrejas em português  
- Marketplace de agentes (terceiros)  
- Dados agregados anônimos de saúde congregacional (com ética rígida)  
- Expansão para ONGs e organizações baseadas em fé  
- Possível camada de infraestrutura (APIs) para o ecossistema gospel tech  

O fundador não precisa “acreditar em hype”. Precisa executar ciclos de:
**dor real → agente que executa → dinheiro → retenção → indicação.**

---

# PARTE 16 — APÊNDICES RÁPIDOS DO FUNDADOR

## A. E-mail de first contact (modelo)

Assunto: Escale e dízimo sem planilha — 20 min

Pastor/Secretária [Nome],  
Trabalho num sistema em que a secretária pede no WhatsApp: “gere a escala de domingo” e “quanto entrou esta semana” — e o sistema executa.  
Foi desenhado com a realidade da Assembleia de Deus (cargos, EBD, congregações).  
Topa uma demo de 20 minutos esta semana?  
[Link de agenda]

## B. Perguntas de discovery (call)

1. Como está hoje o processo de escala?  
2. Onde o financeiro trava no fim do mês?  
3. O que mais tira o pastor de cuidar de gente?  
4. Quem precisaria aprovar um sistema novo?  
5. Se resolvêssemos só uma coisa em 30 dias, qual seria?

## C. Definição de “cliente saudável”

- Logou nos últimos 7 dias  
- Publicou escala nos últimos 30  
- Tem ≥1 lançamento financeiro nos últimos 30  
- Respondeu pesquisa de onboarding  
- Não abriu ticket crítico aberto há >7 dias  

## D. Template de case

- Igreja, cidade, porte  
- Dor antes (horas/semana)  
- O que passaram a fazer no Assembleia IA  
- Número depois (tempo, erros, assiduidade de escala)  
- Citação do pastor ou secretária  
- Autorização por escrito  

---

# PARTE 17 — INTEGRAÇÃO COM O DOCUMENTO TÉCNICO

O fundador **não substitui** o Documento Mestre Técnico. Ele **prioriza**:

| Prioridade de negócio | Módulo técnico |
|-----------------------|----------------|
| Ativação rápida | Membros + WhatsApp + Auth multi-tenant |
| Retenção | Escalas + Financeiro |
| Upsell | Designer + Vídeo + Eventos |
| Moat AD | Volume 3 (cargos, church_units, person_positions) |
| Enterprise | LGPD, auditoria, SSO, SLA |

Toda reunião de roadmap deve ter uma coluna: **“impacta trial-to-paid ou churn?”**

---

# PARTE 18 — DECLARAÇÃO FINAL DO FUNDADOR

Construir a Assembleia IA é construir infraestrutura para comunidades de fé.  
Isso exige excelência técnica, humildade denominacional e disciplina comercial.

O sucesso não é “IA impressionante”.  
O sucesso é **igreja que renova todo mês porque a operação ficou mais leve e o cuidado com pessoas ficou mais possível.**

Execute o Playbook.  
Atualize o Playbook.  
Não troque o Playbook por motivação vazia.

---

**FIM — THE FOUNDER'S PLAYBOOK | ASSEMBLEIA IA v1.0.0**

Documento vivo. Próxima revisão recomendada: ao atingir 10 clientes pagantes ou 90 dias após o primeiro design partner, o que ocorrer primeiro.
