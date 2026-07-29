# ASSEMBLEIA IA
## Product Requirements Document (PRD) + Arquitetura Técnica Completa + Prompt Mestre para Agentes de Desenvolvimento

**Versão:** 1.0.0  
**Data:** 29 de julho de 2026  
**Status:** Documento Mestre Oficial  
**Idioma:** Português (Brasil) + Internacionalização  
**Tipo:** SaaS Multi-tenant | Sistema Operacional Inteligente para Igrejas  
**Objetivo deste documento:** Servir como especificação completa, auto-contida e executável por qualquer agente de IA de desenvolvimento (Antigravity, Cursor, Devin, Claude Code, Aider, etc.). O agente deve implementar **tudo** descrito aqui sem perguntas adicionais, priorizando arquitetura limpa, escalabilidade e agentes de IA como núcleo.

---

# 0. PROMPT MESTRE PARA O AGENTE DE DESENVOLVIMENTO (COPIE E COLE)

```
Você é um Engenheiro de Software Sênior Full-Stack + Arquiteto de Sistemas de IA + Especialista em SaaS Multi-tenant + Especialista em Plataformas Religiosas. 

Sua missão é construir do zero a plataforma **Assembleia IA** exatamente conforme este documento PRD completo. 

REGRAS ABSOLUTAS:
1. Implemente TUDO o que está descrito. Não omita nenhuma funcionalidade.
2. Use exatamente as tecnologias listadas na seção 17 (ou equivalentes superiores se justificado).
3. A IA (agentes) é o NÚCLEO do sistema, não um add-on.
4. Multi-tenant desde o dia 1 (cada igreja = tenant isolado).
5. WhatsApp Business API como principal canal de operação.
6. Todos os agentes devem ser orquestrados via LangGraph + MCP.
7. Segurança máxima (LGPD, RBAC+ABAC, MFA, auditoria completa).
8. Código limpo, tipado (TypeScript + Python), testável, documentado.
9. Frontend moderno com Next.js 15 App Router, Tailwind, Shadcn UI.
10. Backend NestJS + FastAPI (Python para agentes de IA).
11. Banco PostgreSQL + pgvector + Redis + MinIO + RabbitMQ/Kafka.
12. Deploy preparado para Kubernetes.
13. Gere código, migrations, seeds, testes, Dockerfiles, CI/CD, documentação e prompts de agentes.
14. Crie estrutura de monorepo (Turborepo ou Nx).
15. Implemente o Agente Mestre primeiro e depois os agentes especializados.
16. Toda funcionalidade deve ter endpoint REST + GraphQL opcional + comando WhatsApp + ação no portal.
17. Use Model Context Protocol (MCP) para todas as ferramentas externas e internas.
18. Inclua scripts de instalação de todos os MCPs necessários via linha de comando.
19. Priorize: 1) Core multi-tenant + Auth 2) Agente Mestre 3) Agentes especializados 4) WhatsApp 5) Portais 6) Estúdios de mídia 7) Financeiro 8) Mobile.

Comece criando a estrutura do monorepo, depois o schema do banco, depois o Agente Mestre, e avance módulo a módulo. Documente cada decisão.

Agora leia o documento completo abaixo e execute.
```

---

# 1. VISÃO GERAL

**Assembleia IA** é uma plataforma SaaS de última geração voltada para a **gestão completa de igrejas**, construída desde o início com **Inteligência Artificial como núcleo da aplicação**.

Não é apenas um ERP para igrejas. É um **Sistema Operacional Inteligente para Igrejas**, onde **agentes autônomos** trabalham continuamente para automatizar tarefas administrativas, financeiras, pastorais, ministeriais, de comunicação, mídia e atendimento.

**Objetivo principal:** Permitir que uma igreja funcione praticamente inteira através da IA, reduzindo drasticamente o trabalho manual. Pastores, líderes e voluntários dedicam tempo às **pessoas**, enquanto a tecnologia assume as atividades operacionais.

**Modelo de negócio:** SaaS multi-tenant (assinatura mensal/anual por igreja, com planos Bronze, Prata, Ouro, Diamante + add-ons de agentes e mídia).

**Escala alvo:** Milhares de igrejas simultâneas, de pequenas congregações (50 membros) a mega-igrejas (50.000+ membros).

---

# 2. CONCEITO E ECOSSISTEMA

O Assembleia IA é um **ecossistema unificado** composto por:

| Componente                    | Descrição                                      |
|-------------------------------|------------------------------------------------|
| ERP Administrativo            | Gestão completa de secretaria, membros, docs   |
| CRM de Membros                | Histórico, engajamento, discipulado, visitas   |
| Plataforma Financeira         | Dízimos, ofertas, PIX, conciliação, orçamentos |
| Plataforma de Comunicação     | WhatsApp, e-mail, SMS, push, newsletters       |
| Plataforma de Marketing       | Campanhas, automações, segmentação             |
| Plataforma de Eventos         | Congressos, retiros, cultos especiais          |
| Plataforma de Conteúdo        | Sermões, estudos, devocionais, biblioteca      |
| Plataforma de Streaming       | Transmissão ao vivo + VOD                      |
| Plataforma de Inteligência Artificial | Agentes autônomos + RAG + orquestração   |
| Aplicativo Mobile             | Android + iOS (React Native ou Flutter)        |
| Website Institucional         | Site por igreja + editor visual                |
| Portal do Membro              | Self-service completo                          |
| Portal do Pastor              | Visão pastoral + triagem                       |
| Portal Administrativo         | Dashboard executivo completo                   |
| API Pública                   | REST + GraphQL + Webhooks                      |
| Marketplace de Extensões      | Agentes, integrações e templates de terceiros  |

Tudo funciona como **um único sistema** com identidade visual e dados compartilhados por tenant.

---

# 3. FILOSOFIA DO PRODUTO

Toda funcionalidade deve responder à pergunta:

> **“Como a IA pode executar isso melhor que um processo manual?”**

Sempre que possível a plataforma deve:
- Automatizar
- Prever
- Sugerir
- Organizar
- Lembrar
- Publicar
- Responder
- Criar
- Analisar
- Aprender
- Executar

Nenhuma tela deve existir apenas para “cadastro manual”. Toda tela deve ter um botão **“Pedir para a IA”** ou **“Deixar a IA fazer”**.

---

# 4. AGENTE MESTRE (CÉREBRO DA PLATAFORMA)

O **Agente Mestre** é o orquestrador central. Ele conhece **absolutamente tudo** que existe no sistema (schema, permissões, histórico, preferências da igreja, identidade visual, etc.).

### Exemplo de comando em linguagem natural:
> “Organize um congresso de jovens para novembro.”

O Agente Mestre deve automaticamente (com aprovação humana quando necessário):

1. Criar o evento no módulo de Eventos
2. Reservar datas na agenda da igreja
3. Criar página no site institucional
4. Gerar artes (banners, stories, posts, cartazes) via Agente Designer
5. Gerar vídeos promocionais via Agente Vídeo
6. Abrir inscrições com formulário inteligente
7. Gerar QR Codes personalizados
8. Montar escalas de voluntários (via Agente Escalas)
9. Avisar voluntários e líderes via WhatsApp
10. Enviar mensagens de convite segmentadas
11. Criar cronograma completo do evento
12. Controlar orçamento e centros de custo
13. Gerar prestação de contas parcial e final
14. Acompanhar inscrições em tempo real
15. Criar certificados personalizados
16. Publicar automaticamente nas redes sociais
17. Enviar lembretes automáticos (D-7, D-3, D-1)
18. Gerar relatório final com métricas

**Tecnologia do Agente Mestre:**
- LangGraph (orquestração de multi-agentes)
- GPT-5.5 (ou modelo principal mais avançado disponível) como LLM principal
- Memória de longo prazo via pgvector + RAG
- Model Context Protocol (MCP) para chamar qualquer ferramenta
- Estado persistente por conversa e por tenant
- Human-in-the-loop para ações críticas (financeiras, exclusões, publicações em massa)

---

# 5. AGENTES ESPECIALIZADOS

Cada agente é um grafo LangGraph independente, registrado no Agente Mestre e no Marketplace.

### 5.1 Agente Pastoral
- Atendimento inicial via WhatsApp / chat / formulário
- Triagem inteligente (urgência, tipo de necessidade, histórico)
- Resumo automático de conversas
- Identificação de crises (suicídio, violência, doenças graves)
- Encaminhamento ao pastor apenas quando necessário
- Acompanhamento espiritual contínuo
- Registro de visitas e aconselhamentos
- Sugestão de próximos passos e conteúdo
- Integração com CRM de membros

### 5.2 Agente Financeiro
- Controle completo de dízimos, ofertas, campanhas, missões
- Fluxo de caixa em tempo real
- Prestação de contas automática
- Balancetes e DRE
- Conciliação bancária (Open Finance + extratos)
- Previsão financeira (ML)
- Detecção de inconsistências e anomalias
- Geração automática de gráficos e dashboards
- Emissão de recibos e comprovantes
- Controle de patrimônio e depreciação
- Relatórios inteligentes em linguagem natural

### 5.3 Agente Jurídico e LGPD
- Controle de consentimentos (cookies, marketing, dados sensíveis)
- Políticas de privacidade e termos dinâmicos
- Auditoria de acessos e alterações
- Controle de retenção e exclusão de dados (direito ao esquecimento)
- Registro de bases legais
- Apoio à conformidade LGPD / GDPR
- Geração de relatórios de conformidade

### 5.4 Agente Secretaria
- Cadastro de membros, visitantes, famílias
- Batismos, casamentos, apresentação de crianças, transferências
- Emissão de documentos (cartas, certificados, declarações)
- Controle de frequência (presença em cultos e eventos via QR Code)
- Organização de departamentos e ministérios
- Importação em massa (CSV, Excel)

### 5.5 Agente Comunicação
- Responder mensagens automaticamente (com tom da igreja)
- Criar campanhas e comunicados
- Escrever textos, e-mails, newsletters
- Traduzir conteúdos
- Responder perguntas frequentes (FAQ dinâmico)
- Segmentação inteligente de audiência

### 5.6 Agente Social Media
- Criar posts, stories, reels, carrosséis
- Criar cronograma de postagens
- Gerar hashtags e legendas
- Escolher melhor horário (baseado em histórico)
- Publicar automaticamente (APIs oficiais)
- Monitorar engajamento e sugerir melhorias
- Responder comentários básicos

### 5.7 Agente Designer IA
Gera automaticamente (usando identidade visual da igreja):
- Banners, folders, flyers, cartazes, convites, outdoors
- Thumbnails, artes para LED, stories, posts, reels cover
- Capas Facebook / YouTube / Spotify
- Wallpapers, certificados, crachás, cartões de visita
- QR Codes personalizados com logo

Utiliza:
- Logo, paleta de cores, fontes oficiais, padrões gráficos do tenant
- Modelos de geração de imagem (Flux, Ideogram, DALL·E, etc.)
- Editor visual (Fabric.js / Konva.js)

### 5.8 Agente Vídeo IA
Recebe vídeos completos (cultos, ensaios, eventos) e:
- Corta, edita, remove silêncio e ruído
- Melhora áudio e estabiliza imagem
- Corrige iluminação
- Cria shorts, reels, TikToks, Status, highlights
- Gera legendas (Whisper) + tradução
- Gera voz IA (clonagem ou TTS)
- Cria thumbnails automáticos
- Adiciona identidade visual, intros e outros
- Exporta em múltiplos formatos e publica

### 5.9 Agente Sermões
- Cataloga e indexa sermões (áudio, vídeo, texto)
- Indexa versículos bíblicos
- Cria resumos e estudos
- Busca semântica por tema, palavra, versículo
- Cria séries automaticamente
- Sugere sermões relacionados

### 5.10 Agente Escalas
Cria automaticamente escalas de:
- Músicos, obreiros, recepção, multimídia, estacionamento
- Limpeza, intercessão, louvor, EBD, infantil, etc.

Considera:
- Disponibilidade, férias, conflitos de agenda
- Frequência histórica, equilíbrio entre voluntários
- Preferências e competências (via Agente RH)

### 5.11 Agente RH Ministerial
- Cadastro de voluntários e ministérios
- Competências, dons, capacitações, cursos, certificados
- Disponibilidade e histórico ministerial
- Sugestão de alocação

### 5.12 Agente Eventos
Organiza completamente:
- Congressos, conferências, retiros, acampamentos
- Batismos, escolas bíblicas, seminários, encontros, cultos especiais

### 5.13 Agente Analytics
Responde perguntas em linguagem natural:
- “Quantos membros entraram este ano?”
- “Qual departamento mais cresceu?”
- “Quanto arrecadamos no mês passado?”
- “Quem está sem congregar há mais de 30 dias?”
- “Qual evento teve maior participação?”

Usa SQL + RAG + visualizações (ECharts).

---

# 6. WHATSAPP COMO CENTRO DE OPERAÇÕES

Toda a plataforma é operável via **WhatsApp Business Platform** (Cloud API).

Exemplos de comandos:
- “Marque reunião com os líderes quinta às 20h”
- “Publique o vídeo do culto de ontem”
- “Quanto entrou de dízimo hoje?”
- “Quem está escalado no louvor domingo?”
- “Envie um lembrete para os inscritos no congresso”
- “Cadastre um visitante: João Silva, telefone 11 99999-9999”
- “Faça uma arte para o culto de domingo”
- “Crie um banner 1920x1080 para o LED”
- “Organize um congresso de jovens em novembro”

O Agente Mestre interpreta a mensagem, identifica o tenant (via número oficial da igreja), verifica permissões do usuário e executa.

**Implementação:**
- Webhook oficial Meta
- Sessões de conversa persistentes
- Templates de mensagem aprovados
- Suporte a mídia, botões, listas, fluxos

---

# 7. PORTAL ADMINISTRATIVO

Dashboard completo com:
- Indicadores em tempo real (membros, finanças, presença, engajamento)
- Gráficos interativos (Apache ECharts)
- Lista de tarefas e pendências
- Agenda e calendário unificado
- Notificações inteligentes
- Módulos: Financeiro, Patrimônio, Comunicação, Ministérios, IA, Relatórios
- Acesso rápido aos agentes
- Configurações do tenant (identidade visual, integrações, usuários)

---

# 8. WEBSITE INTEGRADO + CMS INTELIGENTE

Cada igreja possui:
- Subdomínio: `igreja.assembleiaia.com.br`
- Ou domínio próprio: `www.suaigreja.com.br` (CNAME)

**Editor visual completo** (drag-and-drop, estilo Framer / Webflow light):
- Páginas, notícias, eventos, ministérios, líderes, horários
- Galeria de fotos e vídeos
- Transmissões ao vivo
- Banners, estudos, downloads, devocionais
- Formulários inteligentes
- SEO automático + sitemap

CMS alimentado por IA (pode gerar páginas inteiras a partir de prompt).

---

# 9. PORTAL DO MEMBRO

Self-service completo:
- Atualizar cadastro e foto
- Consultar escalas e agenda
- Fazer inscrições em eventos
- Enviar documentos
- Solicitar atendimento pastoral
- Acompanhar pedidos e orações
- Assistir cultos (VOD + live)
- Acessar estudos e discipulado
- Registrar pedidos de oração
- Contribuir online (PIX, cartão, boleto)
- Carteirinha digital + QR Code de presença

---

# 10. APLICATIVO MOBILE

- React Native (preferencial) ou Flutter
- Android + iOS
- Todas as funcionalidades do Portal do Membro + Admin (conforme permissão)
- Notificações push (Firebase Cloud Messaging)
- Carteirinha digital offline
- QR Code para check-in
- Acesso offline a conteúdos selecionados
- Chat direto com a igreja / pastor

---

# 11. ESTÚDIO CRIATIVO IA + EDITOR DE VÍDEO IA

### Estúdio Criativo
- Editor de imagens (Fabric.js / Konva.js)
- Remoção de fundo, restauração, upscale, geração de imagens
- Criação de logotipos, apresentações, PDFs, folders, campanhas
- Tudo via prompt + templates da igreja

### Editor de Vídeo
- Timeline profissional
- Cortes, junções, transições, efeitos, legendas, narração IA
- Botão **Publicar** com seleção multi-canal:
  - WhatsApp Status / Canais
  - Facebook, Instagram (Feed, Stories, Reels)
  - YouTube / YouTube Shorts
  - TikTok, Telegram, Site da igreja

Publicação automática via APIs oficiais.

---

# 12. GESTÃO FINANCEIRA E PATRIMONIAL

### Financeiro
- Dízimos, ofertas, campanhas, missões, eventos
- Caixa, bancos, PIX, cartão, boleto
- Conciliação automática
- Prestação de contas, balancetes, livro caixa
- Centros de custo, orçamentos, previsões, fluxo de caixa
- Relatórios em linguagem natural

### Patrimonial
- Instrumentos, veículos, equipamentos, computadores, projetores, microfones, imóveis
- Estoque, manutenção, garantias, inventário
- QR Codes para cada item
- Controle de empréstimos e localizações

---

# 13. SEGURANÇA E CONFORMIDADE

- LGPD / GDPR completo
- OAuth 2.0 + OpenID Connect
- JWT (access + refresh)
- MFA (TOTP + SMS + e-mail)
- Criptografia em trânsito (TLS 1.3) e em repouso
- Auditoria completa (quem, quando, o quê, de onde)
- Logs imutáveis
- Controle de permissões: **RBAC + ABAC**
- Backups automáticos diários + point-in-time recovery
- Monitoramento contínuo (Prometheus + Grafana + Loki + OpenTelemetry)
- Rate limiting, WAF, proteção DDoS
- Isolamento total de dados por tenant (row-level security no PostgreSQL)

---

# 14. ARQUITETURA TÉCNICA DETALHADA

### 14.1 Monorepo
```
assembleia-ia/
├── apps/
│   ├── web/                 # Next.js 15 (Portal Admin + Membro + Site)
│   ├── mobile/              # React Native
│   ├── api/                 # NestJS (API principal)
│   ├── ai-workers/          # FastAPI + LangGraph (agentes)
│   └── landing/             # Site institucional Assembleia IA
├── packages/
│   ├── ui/                  # Shadcn + componentes compartilhados
│   ├── database/            # Prisma / Drizzle schema + migrations
│   ├── auth/                # Biblioteca de autenticação
│   ├── agents/              # Definições dos agentes
│   ├── mcp-servers/         # Servidores MCP internos
│   └── config/              # ESLint, TSConfig, Tailwind
├── infra/
│   ├── terraform/
│   ├── k8s/
│   └── docker/
├── scripts/
│   ├── install-mcps.sh
│   └── seed.ts
└── docs/
```

### 14.2 Stack Oficial

**Frontend**
- Next.js 15 (App Router)
- React 19
- TypeScript 5.5+
- Tailwind CSS 4
- Shadcn UI + Radix UI
- Framer Motion
- TanStack Query (React Query)
- React Hook Form + Zod
- TipTap (editor rich text)
- Fabric.js ou Konva.js (canvas)
- Apache ECharts
- next-intl (i18n)

**Mobile**
- React Native (Expo preferencial) ou Flutter

**Backend**
- NestJS 10+ (TypeScript) – API principal, auth, multi-tenant
- FastAPI (Python 3.12+) – workers de IA e agentes
- gRPC (comunicação interna de alta performance)
- GraphQL (Apollo ou Mercurius) opcional
- REST (OpenAPI 3.1)

**Banco de Dados & Storage**
- PostgreSQL 16 + pgvector (embeddings + RAG)
- Redis 7 (cache, filas, sessões)
- OpenSearch ou Elasticsearch (busca full-text + logs)
- MinIO ou Amazon S3 (arquivos, mídia, backups)
- RabbitMQ ou Apache Kafka (eventos e filas de agentes)

**Infraestrutura**
- Docker + Docker Compose (dev)
- Kubernetes (produção)
- NGINX ou Traefik (ingress)
- Terraform (IaC)
- GitHub Actions (CI/CD)
- Prometheus + Grafana + Loki + OpenTelemetry
- Cloudflare (CDN + WAF + DNS)

**Inteligência Artificial**
- Modelo principal: GPT-5.5 (ou Claude 4 / Gemini 2.5 / modelo open-source mais avançado disponível)
- Visão / OCR / Geração de imagem: modelos especializados (Flux, Ideogram, SAM, etc.)
- Edição de vídeo: FFmpeg + modelos de visão + Whisper + TTS
- Orquestração: **LangGraph**
- Framework auxiliar: LangChain
- **Model Context Protocol (MCP)** para todas as ferramentas
- RAG com pgvector + embeddings de alta qualidade
- Memória de longo prazo por tenant e por usuário

### 14.3 Multi-tenancy
- Estratégia: **Shared Database + Row Level Security (RLS)** + schema isolation parcial para dados sensíveis
- Cada request carrega `tenant_id` (via JWT + subdomain + header)
- Isolamento total de dados, arquivos e configurações

### 14.4 Autenticação e Autorização
- OAuth 2.0 / OIDC (próprio + Google, Microsoft, Apple)
- JWT (access 15min + refresh 30 dias)
- MFA obrigatório para admins
- RBAC (roles: SuperAdmin, AdminIgreja, Pastor, Líder, Secretário, Financeiro, Voluntário, Membro)
- ABAC (atributos: departamento, ministério, localização, etc.)

---

# 15. INTEGRAÇÕES OBRIGATÓRIAS

- WhatsApp Business Platform (Cloud API)
- Instagram Graph API
- Facebook Graph API
- YouTube Data API + YouTube Analytics
- Google Calendar / Google Drive / Gmail / Google Meet
- Microsoft 365 / Outlook / Teams
- Zoom
- Gateways de pagamento (Stripe, PagSeguro, Mercado Pago, Asaas, etc.)
- PIX (via Open Finance e gateways)
- Firebase Cloud Messaging
- Serviços de e-mail transacional (Resend, Postmark, Amazon SES)
- Open Finance (quando aplicável no Brasil)

---

# 16. REQUISITOS NÃO FUNCIONAIS

| Requisito              | Meta                                      |
|------------------------|-------------------------------------------|
| Disponibilidade        | 99.9% (SLA)                               |
| Latência API (p95)     | < 200ms                                   |
| Tempo de resposta IA   | < 8s para comandos simples                |
| Escalabilidade         | 10.000+ igrejas simultâneas               |
| Concurrent users       | 100.000+                                  |
| RTO / RPO              | < 1h / < 15min                            |
| Acessibilidade         | WCAG 2.2 AA                               |
| Internacionalização    | pt-BR, en, es, fr, de (mínimo)            |
| Performance mobile     | Lighthouse > 90                           |
| Testes                 | Unit + Integration + E2E (Playwright)     |
| Cobertura de testes    | > 80% no core                             |

---

# 17. MODEL CONTEXT PROTOCOL (MCP) – INSTALAÇÃO VIA LINHA DE COMANDO

O agente de desenvolvimento deve instalar e configurar **todos** os MCPs necessários.

Crie o arquivo `scripts/install-mcps.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "=== Instalando Model Context Protocol Servers para Assembleia IA ==="

# 1. MCP oficial de filesystem
npx -y @modelcontextprotocol/server-filesystem /home/workdir/artifacts

# 2. MCP de PostgreSQL
npx -y @modelcontextprotocol/server-postgres "postgresql://user:pass@localhost:5432/assembleia"

# 3. MCP de GitHub
npx -y @modelcontextprotocol/server-github

# 4. MCP de Brave Search (ou Tavily)
npx -y @modelcontextprotocol/server-brave-search

# 5. MCP de Puppeteer / Browser
npx -y @modelcontextprotocol/server-puppeteer

# 6. MCP de Memory (para agentes)
npx -y @modelcontextprotocol/server-memory

# 7. MCP de Sequential Thinking
npx -y @modelcontextprotocol/server-sequential-thinking

# 8. MCP de Fetch
npx -y @modelcontextprotocol/server-fetch

# 9. MCPs customizados do projeto (criar em packages/mcp-servers)
# - mcp-whatsapp
# - mcp-instagram
# - mcp-youtube
# - mcp-financeiro
# - mcp-designer
# - mcp-video
# - mcp-calendar
# - mcp-email
# - mcp-s3
# - mcp-redis
# - mcp-analytics

echo "Instale os MCPs customizados com:"
echo "  cd packages/mcp-servers && npm install && npm run build"
echo "  # Depois registre cada um no arquivo de configuração do cliente MCP (claude_desktop_config.json, cursor, antigravity, etc.)"

echo "=== MCPs base instalados. Configure as variáveis de ambiente necessárias. ==="
```

**MCPs obrigatórios a serem criados pelo agente:**

1. `mcp-whatsapp` – envio/recebimento de mensagens, templates, mídia
2. `mcp-social` – Instagram, Facebook, YouTube, TikTok
3. `mcp-financeiro` – consultas e lançamentos financeiros
4. `mcp-designer` – geração e edição de artes
5. `mcp-video` – pipeline de edição e publicação de vídeo
6. `mcp-calendar` – Google Calendar + agenda interna
7. `mcp-email` – envio transacional e newsletters
8. `mcp-storage` – MinIO/S3
9. `mcp-analytics` – consultas em linguagem natural
10. `mcp-lgpd` – consentimentos e auditoria
11. `mcp-escalas` – geração e consulta de escalas
12. `mcp-membros` – CRM de membros

Todos os MCPs devem seguir a especificação oficial do Model Context Protocol e serem registráveis via configuração JSON.

---

# 18. BACKLOG PRIORITÁRIO (ORDEM DE IMPLEMENTAÇÃO)

### Fase 0 – Fundação (Semana 1-2)
- [ ] Monorepo (Turborepo)
- [ ] Schema PostgreSQL completo + RLS + pgvector
- [ ] Auth (NestJS + JWT + MFA + multi-tenant)
- [ ] Docker Compose completo
- [ ] CI/CD básico
- [ ] Portal Admin skeleton + Shadcn UI

### Fase 1 – Agente Mestre + Core (Semana 3-5)
- [ ] FastAPI + LangGraph skeleton
- [ ] Agente Mestre funcional
- [ ] MCP de filesystem, postgres, memory
- [ ] Integração WhatsApp básica (receber + responder)
- [ ] Cadastro de membros + visitantes
- [ ] Dashboard básico

### Fase 2 – Agentes Essenciais (Semana 6-9)
- [ ] Agente Secretaria
- [ ] Agente Financeiro (básico)
- [ ] Agente Escalas
- [ ] Agente Comunicação
- [ ] Agente Analytics (linguagem natural)
- [ ] Portal do Membro

### Fase 3 – Mídia e Criativos (Semana 10-13)
- [ ] Agente Designer IA
- [ ] Estúdio Criativo (canvas)
- [ ] Agente Vídeo IA (pipeline básico)
- [ ] Publicação multi-canal
- [ ] CMS + Website por igreja

### Fase 4 – Pastoral + Avançado (Semana 14-17)
- [ ] Agente Pastoral completo
- [ ] Agente Sermões + RAG
- [ ] Agente RH Ministerial
- [ ] Agente Eventos
- [ ] Agente Jurídico/LGPD
- [ ] App Mobile (MVP)

### Fase 5 – Escala e Marketplace (Semana 18+)
- [ ] Marketplace de agentes
- [ ] API Pública + Webhooks
- [ ] Observabilidade completa
- [ ] Internacionalização
- [ ] Testes de carga
- [ ] Documentação para clientes

---

# 19. DIFERENCIAIS EXCLUSIVOS

- Agentes de IA especializados trabalhando em conjunto sob o Agente Mestre
- Plataforma 100% orientada por linguagem natural (WhatsApp + chat + comandos)
- Geração automática de artes, vídeos e documentos com identidade visual
- Publicação multicanal em um clique
- IA para atendimento pastoral com triagem inteligente e detecção de crise
- Pesquisa semântica em sermões, documentos e histórico completo
- Painel executivo com métricas em tempo real + linguagem natural
- Marketplace de agentes e extensões
- Suporte nativo a múltiplas igrejas (multi-tenant)
- Internacionalização real
- Arquitetura preparada para dezenas de milhares de igrejas

---

# 20. VISÃO DE LONGO PRAZO

O **Assembleia IA** deve se tornar a **principal plataforma inteligente de gestão para igrejas no mundo**, combinando tecnologia, automação e Inteligência Artificial em uma experiência única.

O sistema deve ser:
- Modular
- Escalável
- Preparado para evoluir continuamente
- Capaz de incorporar novos agentes, modelos de IA e integrações **sem necessidade de reescrever a plataforma**

**Meta final:** A maior parte das tarefas administrativas, financeiras, comunicacionais e operacionais ser executada por agentes inteligentes, enquanto líderes e pastores concentram seus esforços no cuidado das pessoas e no ministério.

---

# 21. INSTRUÇÕES FINAIS PARA O AGENTE DE DESENVOLVIMENTO

1. Leia este documento inteiro antes de escrever qualquer código.
2. Crie a estrutura de pastas do monorepo exatamente como especificado.
3. Implemente o schema do banco com **todas** as tabelas necessárias (membros, famílias, departamentos, eventos, finanças, escalas, sermões, consentimentos, auditoria, tenants, usuários, permissões, etc.).
4. Implemente Row Level Security em todas as tabelas sensíveis.
5. Crie o Agente Mestre como primeiro grafo LangGraph funcional.
6. Faça o WhatsApp funcionar de ponta a ponta o mais cedo possível.
7. Documente cada agente com seu prompt de sistema, tools (MCPs) e exemplos de uso.
8. Gere testes automatizados.
9. Mantenha o código tipado e limpo.
10. Ao final de cada fase, atualize o README.md com status e instruções de execução.

**Você tem autorização total para criar arquivos, pastas, migrations, seeds, Dockerfiles, GitHub Actions, scripts de MCP e qualquer artefato necessário.**

Comece agora pela Fase 0.

---

**Fim do Documento Mestre – Assembleia IA v1.0.0**

Este arquivo é a fonte única da verdade. Qualquer dúvida deve ser resolvida consultando este documento.
