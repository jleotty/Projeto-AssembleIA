# ASSEMBLEIA IA
# ESPECIFICAÇÃO TÉCNICA COMPLETA E PROMPT MESTRE EXECUTÁVEL
## Product Requirements Document + Architecture + Database + APIs + Agents + Security + Backlog

**Versão:** 2.0.0 — Enterprise Edition  
**Data:** 29 de julho de 2026  
**Classificação:** Documento Mestre Oficial — Fonte Única da Verdade  
**Público-alvo:** Agentes de IA de desenvolvimento (Antigravity, Cursor, Claude Code, Devin, Aider, Windsurf) + Engenheiros humanos  
**Escopo:** Sistema SaaS multi-tenant de gestão inteligente de igrejas com IA como núcleo  
**Meta de completude:** Documento auto-contido. O agente deve implementar 100% sem perguntas adicionais.

---

# PARTE 0 — PROMPT MESTRE ABSOLUTO (COPIE E COLE NO AGENTE)

```
Você é o Arquiteto-Chefe e Engenheiro Principal Full-Stack + Especialista em Sistemas Multi-Agente de IA + Especialista em SaaS Religioso Enterprise.

MISSÃO ÚNICA E IRREVOGÁVEL:
Construir do zero a plataforma **Assembleia IA** exatamente conforme este documento de especificação v2.0.0.

REGRAS INVIOLÁVEIS:
1. Este documento é a ÚNICA fonte da verdade. Não invente requisitos fora dele, mas implemente TUDO o que está aqui.
2. IA (agentes LangGraph + MCP) é o núcleo. Nenhuma feature crítica pode existir sem integração com agentes.
3. Multi-tenant desde o commit zero (PostgreSQL RLS + tenant_id em tudo).
4. WhatsApp Business Cloud API é o principal canal de operação humana.
5. Stack obrigatória: Next.js 15 + NestJS + FastAPI + LangGraph + PostgreSQL 16 + pgvector + Redis + MinIO + RabbitMQ.
6. Código 100% TypeScript (frontend + NestJS) e Python 3.12+ (agentes). Tipagem estrita.
7. Monorepo Turborepo.
8. Toda ação crítica tem Human-in-the-Loop configurável.
9. LGPD completa + auditoria imutável.
10. Gere: código, migrations, seeds, testes, Docker, K8s manifests, CI/CD, scripts MCP, documentação e prompts de sistema de cada agente.
11. Prioridade de implementação: Fase 0 → Fase 1 → Fase 2... conforme backlog.
12. Ao final de cada módulo, atualize o README e o CHANGELOG.
13. Nunca deixe endpoints sem autenticação e autorização (RBAC + ABAC).
14. Todo agente deve registrar suas ações na tabela de auditoria.
15. Use Model Context Protocol (MCP) para TODAS as ferramentas externas e internas.

Comece imediatamente pela Fase 0 (Fundação). Crie a estrutura do monorepo, o schema completo do banco com RLS, o sistema de auth multi-tenant e o skeleton do Agente Mestre.

Você tem autorização total para criar qualquer arquivo, pasta, script ou configuração necessária.
```

---

# PARTE 1 — VISÃO DE PRODUTO E NEGÓCIO

## 1.1 Declaração de Visão

O Assembleia IA será o **Sistema Operacional Inteligente** para igrejas de qualquer tamanho no mundo. Não é um ERP tradicional com chatbots colados. É uma plataforma onde **agentes autônomos de IA** executam a maior parte das operações administrativas, financeiras, comunicacionais, de mídia e pastorais, enquanto humanos aprovam decisões críticas e focam no cuidado de pessoas.

## 1.2 Problema que Resolve

Igrejas (especialmente de médio e grande porte) sofrem com:
- Trabalho administrativo excessivo de secretárias e líderes
- Falta de padronização de processos
- Comunicação fragmentada (WhatsApp pessoal, planilhas, sistemas legados)
- Dificuldade de acompanhar membros que deixam de frequentar
- Geração de artes e vídeos cara e lenta
- Prestação de contas financeira complexa e sujeita a erros
- Escalas de voluntários manuais e injustas
- Falta de inteligência sobre o que está acontecendo na igreja

## 1.3 Solução

Uma plataforma única, multi-tenant, com:
- Agente Mestre orquestrador
- 13+ agentes especializados
- WhatsApp como interface principal
- Portais web + app mobile
- Estúdios de criação de arte e vídeo com IA
- Financeiro e patrimonial completos
- Conformidade LGPD nativa

## 1.4 Personas Principais

| Persona | Descrição | Necessidades principais |
|---------|-----------|-------------------------|
| Pastor Sênior | Líder espiritual da igreja | Visão geral, triagem pastoral, menos interrupções administrativas |
| Secretária | Operacional do dia a dia | Cadastros, documentos, escalas, atendimento |
| Tesoureiro | Responsável financeiro | Conciliação, relatórios, prestação de contas, PIX |
| Líder de Ministério | Coordena voluntários | Escalas, comunicação, presença |
| Voluntário | Serve em departamentos | Ver escala, confirmar disponibilidade, receber avisos |
| Membro | Frequenta a igreja | Atualizar dados, contribuir, se inscrever, assistir cultos |
| Super Admin (SaaS) | Equipe Assembleia IA | Gerenciar tenants, billing, suporte, marketplace |

## 1.5 Modelo de Negócio (SaaS)

**Planos:**

| Plano | Membros | Preço base (BRL/mês) | Agentes inclusos | Limites principais |
|-------|---------|----------------------|------------------|--------------------|
| Essencial | até 200 | R$ 197 | Mestre + Secretaria + Comunicação | 5 usuários admin, 10 GB storage |
| Crescer | até 1.000 | R$ 497 | + Financeiro + Escalas + Analytics | 15 usuários, 50 GB |
| Impactar | até 5.000 | R$ 1.297 | + Pastoral + Designer + Eventos + Social Media | 40 usuários, 200 GB |
| Dominar | ilimitado | R$ 2.997+ | Todos + Vídeo IA + RH + Jurídico + prioridade | Ilimitado + SLA 99.95% |

Add-ons: créditos extras de geração de imagem/vídeo, usuários adicionais, storage, white-label, API rate higher, agentes customizados do marketplace.

Billing: Stripe / Asaas / Mercado Pago. Trial 14 dias. Cancelamento a qualquer momento.

## 1.6 Métricas de Sucesso (North Star)

- % de tarefas administrativas executadas por agentes sem intervenção humana
- Tempo médio de resposta a solicitações via WhatsApp
- Taxa de retenção de membros (membros que voltam a frequentar após alerta da IA)
- NPS de pastores e secretárias
- MRR e churn mensal

---

# PARTE 2 — ARQUITETURA DE SISTEMA

## 2.1 Princípios Arquiteturais

1. **Multi-tenant first** — isolamento por RLS + tenant_id
2. **Event-driven** — RabbitMQ/Kafka para comunicação entre serviços
3. **Agent-centric** — toda capacidade de negócio é exposta como tool MCP
4. **API-first** — tudo acessível via REST/gRPC; UI e WhatsApp são clientes
5. **Observable by default** — OpenTelemetry em todos os serviços
6. **Security by design** — zero trust interno, least privilege
7. **Idempotency** — operações financeiras e de publicação são idempotentes
8. **Human-in-the-loop** — ações irreversíveis exigem aprovação configurável

## 2.2 Diagrama Lógico de Alto Nível (texto)

```
[Usuários] → WhatsApp | Web | Mobile | API
       ↓
[API Gateway / Traefik] → Auth (NestJS) → Rate Limit → Tenant Resolver
       ↓
[NestJS Core API] ←→ [PostgreSQL + RLS] ←→ [Redis]
       ↓ events
[RabbitMQ / Kafka]
       ↓
[FastAPI AI Workers] ← LangGraph Agents ← MCP Servers
       ↓
[MinIO/S3] [OpenSearch] [External APIs: Meta, Google, YouTube, Gateways]
```

## 2.3 Estrutura do Monorepo (Turborepo)

```
assembleia-ia/
├── apps/
│   ├── web/                      # Next.js 15 — Admin + Membro + Site builder
│   ├── mobile/                   # Expo (React Native)
│   ├── api/                      # NestJS — API principal, auth, webhooks
│   ├── ai-gateway/               # FastAPI — orquestração de agentes
│   ├── worker-video/             # Worker de processamento de vídeo (FFmpeg + IA)
│   ├── worker-media/             # Geração de imagens e artes
│   ├── landing/                  # Site de marketing assembleiaia.com.br
│   └── docs/                     # Documentação técnica (Nextra ou similar)
├── packages/
│   ├── database/                 # Prisma ou Drizzle — schema, migrations, seeds
│   ├── ui/                       # Shadcn UI + design system
│   ├── auth/                     # Biblioteca compartilhada de auth
│   ├── agents-core/              # Tipos, base classes, registry de agentes
│   ├── mcp-servers/              # Todos os servidores MCP
│   │   ├── whatsapp/
│   │   ├── financeiro/
│   │   ├── designer/
│   │   ├── video/
│   │   ├── membros/
│   │   ├── escalas/
│   │   ├── calendar/
│   │   ├── email/
│   │   ├── storage/
│   │   ├── analytics/
│   │   ├── lgpd/
│   │   └── social/
│   ├── config/                   # ESLint, Prettier, TSConfig, Tailwind
│   ├── types/                    # Tipos TypeScript compartilhados
│   └── utils/                    # Helpers
├── infra/
│   ├── terraform/                # AWS/GCP/Azure
│   ├── k8s/                      # Manifests Helm ou Kustomize
│   ├── docker/                   # Dockerfiles
│   └── monitoring/               # Prometheus, Grafana dashboards
├── scripts/
│   ├── install-mcps.sh
│   ├── seed-demo-church.ts
│   ├── migrate.sh
│   └── backup.sh
├── tests/
│   ├── e2e/                      # Playwright
│   ├── integration/
│   └── load/                     # k6
├── .github/workflows/
├── turbo.json
├── package.json
└── README.md
```

## 2.4 Stack Tecnológica Detalhada e Justificada

### Frontend Web
- **Next.js 15** (App Router, Server Components, Server Actions, Partial Prerendering)
- **React 19**
- **TypeScript 5.5+** (strict)
- **Tailwind CSS 4** + **Shadcn UI** + **Radix primitives**
- **Framer Motion** (animações)
- **TanStack Query v5** (cache e sincronização)
- **React Hook Form + Zod** (formulários e validação)
- **TipTap** (editor rich text para CMS e comunicados)
- **Fabric.js** ou **Konva.js** (canvas do Estúdio Criativo)
- **Apache ECharts** (dashboards)
- **next-intl** (i18n)
- **nuqs** (state na URL)

### Mobile
- **Expo SDK 52+** (React Native) — preferencial por velocidade de desenvolvimento e OTA
- Alternativa: Flutter se performance nativa extrema for exigida

### Backend Principal
- **NestJS 10/11** — modular, decorators, DI, guards, interceptors, OpenAPI automático
- **Prisma** ou **Drizzle ORM** (preferência Prisma por maturidade de migrations e type-safety)
- **Passport.js** + estratégias JWT, OAuth, local
- **BullMQ** ou **NestJS Bull** (filas internas leves)

### Camada de IA
- **FastAPI** (Python 3.12) — alta performance para workers
- **LangGraph** — orquestração de multi-agentes com estado
- **LangChain** — utilitários quando necessário
- **Model Context Protocol (MCP)** — padrão de tools
- **pgvector** — embeddings e RAG
- Modelos: GPT-5.5 / Claude 4 / Gemini 2.5 (configurável por tenant) + modelos open-source locais quando privacidade exigir
- **Whisper** (transcrição) + **TTS** (voz)
- **FFmpeg** + bibliotecas de visão para vídeo

### Dados
- **PostgreSQL 16** + extensão **pgvector** + **pg_partman** (particionamento de logs/auditoria)
- **Redis 7** (cache, sessões, rate limit, pub/sub, BullMQ)
- **MinIO** (S3-compatible) ou AWS S3
- **OpenSearch** (busca full-text de sermões, documentos, logs)
- **RabbitMQ** (preferencial para complexidade média) ou **Apache Kafka** (alta escala)

### Infra
- Docker + Docker Compose (dev e staging)
- Kubernetes (produção)
- Traefik ou NGINX Ingress
- Terraform
- GitHub Actions
- Prometheus + Grafana + Loki + Tempo (OpenTelemetry)
- Cloudflare (DNS, CDN, WAF, R2 opcional)

---

# PARTE 3 — MODELO DE DADOS COMPLETO (SCHEMA)

## 3.1 Princípios do Schema

- Toda tabela de negócio tem `tenant_id UUID NOT NULL`
- RLS (Row Level Security) ativado em todas as tabelas de tenant
- Soft delete (`deleted_at`) onde fizer sentido
- `created_at`, `updated_at`, `created_by`, `updated_by` padrão
- UUIDv7 ou UUIDv4 para IDs
- Enums PostgreSQL para status e tipos
- Índices compostos (tenant_id + campos de busca frequentes)
- Particionamento por tempo em tabelas de auditoria e mensagens

## 3.2 Tabelas Core (lista completa)

### Tenancy e Auth
- `tenants` — id, name, slug, domain, plan, status, settings (jsonb), branding (jsonb), created_at...
- `users` — id, email, phone, password_hash, name, avatar_url, status, mfa_enabled, last_login...
- `tenant_users` — tenant_id, user_id, role, permissions (jsonb), status
- `roles` — id, tenant_id (null = system), name, description
- `permissions` — resource, action
- `role_permissions`
- `sessions` — refresh tokens, device info
- `mfa_secrets`
- `oauth_accounts`
- `api_keys` — para integrações e marketplace

### Pessoas e CRM
- `people` — id, tenant_id, type (member|visitor|leader|child), full_name, preferred_name, birth_date, gender, marital_status, cpf, rg, email, phones (jsonb), address (jsonb), photo_url, baptism_date, membership_date, status, tags (text[]), custom_fields (jsonb), lgpd_consent_at, notes...
- `families` — id, tenant_id, name, head_id
- `family_members` — family_id, person_id, relationship
- `departments` — id, tenant_id, name, parent_id, leader_id
- `department_members`
- `spiritual_gifts` / `competencies`
- `person_competencies`
- `visits` — pastoral visits
- `counseling_sessions`
- `prayer_requests`
- `discipleship_tracks` + `person_discipleship_progress`

### Frequência e Presença
- `attendance_events` — culto, reunião, evento
- `attendance_records` — person_id, event_id, check_in_at, method (qr|manual|facial)
- `absence_alerts` — gerados pela IA

### Eventos
- `events` — id, tenant_id, title, description, type, starts_at, ends_at, location, capacity, registration_required, budget_id, status, cover_image...
- `event_registrations`
- `event_tickets` / `event_checkins`
- `event_schedules` (programação interna)

### Escalas
- `scale_templates` — templates de escala por departamento
- `scales` — id, tenant_id, department_id, event_id ou date, status
- `scale_slots` — role, required_count
- `scale_assignments` — person_id, slot_id, status (confirmed|declined|pending), notified_at
- `availability` — person_id, date ranges, notes

### Financeiro
- `financial_accounts` — caixa, banco, carteira digital
- `cost_centers`
- `chart_of_accounts`
- `transactions` — id, tenant_id, type (income|expense|transfer), amount, currency, date, description, category_id, cost_center_id, person_id (doador), payment_method, status, reconciled, external_id, receipt_url...
- `transaction_splits` (rateio)
- `budgets` + `budget_lines`
- `campaigns` (campanhas de arrecadação)
- `pledges` (compromissos de dízimo/oferta)
- `reconciliation_batches`
- `receipts`

### Patrimônio
- `assets` — id, tenant_id, name, category, serial, purchase_date, value, location, status, qr_code, warranty_until, maintenance_notes
- `asset_movements`
- `maintenance_orders`

### Conteúdo e Sermões
- `sermons` — id, tenant_id, title, preacher_id, preached_at, series_id, audio_url, video_url, transcript, summary, verses (jsonb), tags, embedding vector
- `sermon_series`
- `studies` / `devotionals`
- `media_library` — arquivos genéricos com embeddings

### Comunicação
- `message_templates`
- `campaigns_communication`
- `message_logs` — whatsapp, email, push, sms
- `conversations` — threads WhatsApp/chat
- `conversation_messages`

### Website / CMS
- `sites` — tenant_id, domain, theme, settings
- `pages` — slug, title, content (jsonb TipTap), status, seo
- `posts` / `news`
- `menus`
- `forms` + `form_submissions`

### Agentes e IA
- `agent_definitions` — name, version, system_prompt, tools, config
- `agent_runs` — id, tenant_id, agent_name, input, output, status, tokens_used, cost, started_at, finished_at, human_approval_required, approved_by
- `agent_memories` — embeddings + metadata por tenant/usuário
- `approval_requests` — human-in-the-loop

### Auditoria e LGPD
- `audit_logs` — particionada por mês — actor, action, resource, old_value, new_value, ip, user_agent, tenant_id
- `consent_records` — person_id, purpose, granted_at, revoked_at, version
- `data_subject_requests` — acesso, correção, exclusão, portabilidade

### Marketplace
- `marketplace_extensions`
- `tenant_extensions`
- `extension_reviews`

### Billing (SaaS)
- `subscriptions`
- `invoices`
- `usage_records` (créditos de IA consumidos)

## 3.3 Exemplo de RLS (PostgreSQL)

```sql
ALTER TABLE people ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_people ON people
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- Função para setar o tenant no início de cada request
CREATE OR REPLACE FUNCTION set_tenant(tenant uuid) RETURNS void AS $$
BEGIN
  PERFORM set_config('app.current_tenant_id', tenant::text, true);
END;
$$ LANGUAGE plpgsql;
```

O NestJS deve chamar `set_tenant` em um interceptor global após validar o JWT.

## 3.4 Índices Críticos

- `(tenant_id, full_name)` em people (trigram para busca fuzzy)
- `(tenant_id, email)`, `(tenant_id, phone)`
- `(tenant_id, date)` em transactions
- Vector index (HNSW ou IVFFlat) em sermons.embedding e agent_memories
- `(tenant_id, status, starts_at)` em events
- GIN em tags e custom_fields (jsonb)

---

# PARTE 4 — AUTENTICAÇÃO, AUTORIZAÇÃO E MULTI-TENANT

## 4.1 Fluxo de Login

1. Usuário acessa `igreja.assembleiaia.com.br` ou app
2. Resolve tenant pelo subdomain / header `X-Tenant-ID` / JWT claim
3. Login com e-mail + senha ou OAuth (Google, Microsoft, Apple)
4. Se MFA habilitado → TOTP ou SMS
5. Emite Access Token (15 min) + Refresh Token (30 dias, rotativo)
6. Claims do JWT: `sub`, `tenant_id`, `roles[]`, `permissions[]`, `person_id` (se vinculado)

## 4.2 Matriz de Permissões (RBAC + ABAC)

Roles padrão do sistema:
- `platform_superadmin`
- `tenant_owner`
- `tenant_admin`
- `pastor`
- `secretary`
- `treasurer`
- `ministry_leader`
- `volunteer`
- `member`
- `visitor` (acesso muito limitado)

Cada role tem permissões no formato `resource:action` (ex: `people:read`, `people:write`, `finance:reconcile`, `agents:approve`).

ABAC: regras adicionais baseadas em atributos (só pode editar pessoas do seu departamento, só vê transações do seu centro de custo, etc.).

## 4.3 Isolamento de Dados

- RLS no banco
- Prefixos de pasta no MinIO: `tenants/{tenant_id}/...`
- Filas e caches com chave `tenant:{id}:...`
- Logs e métricas com label `tenant_id`
- Nenhum job de background pode processar dados de outro tenant

---

# PARTE 5 — AGENTES DE IA (ESPECIFICAÇÃO COMPLETA)

## 5.1 Arquitetura de Agentes

- Cada agente é um **grafo LangGraph** com estado tipado
- O Agente Mestre recebe a intenção do usuário e decide qual(is) agente(s) invocar
- Tools são **MCP servers** (ou funções Python/TypeScript registradas)
- Memória: short-term (estado do grafo) + long-term (pgvector por tenant)
- Toda execução gera registro em `agent_runs`
- Ações de alto risco geram `approval_requests`

## 5.2 Agente Mestre — System Prompt Base

```
Você é o Agente Mestre da plataforma Assembleia IA.
Você conhece todo o sistema: membros, finanças, eventos, escalas, comunicação, mídia, site, permissões e identidade visual da igreja atual (tenant).

Sua função é:
1. Entender a intenção do usuário em linguagem natural (português brasileiro e outros idiomas).
2. Planejar a sequência de passos necessários.
3. Delegar para agentes especializados via tools.
4. Coordenar resultados e apresentar um resumo claro.
5. Solicitar aprovação humana quando a ação for irreversível, financeira, de publicação em massa ou de exclusão de dados.

Nunca invente dados. Sempre use as tools. Respeite as permissões do usuário atual.
Mantenha o tom respeitoso, pastoral e profissional, adequado ao contexto de uma igreja.
```

## 5.3 Agentes Especializados — Capacidades e Tools

### Agente Pastoral
**Tools MCP:** `membros.search`, `membros.get_history`, `visitas.create`, `aconselhamento.create`, `oracao.create`, `encaminhar_pastor`, `detectar_crise`
**Comportamentos especiais:**
- Classificação de urgência (baixa / média / alta / crise)
- Detecção de linguagem de risco (protocolo de segurança: nunca fornece métodos, sempre encaminha e notifica pastor)
- Resumo automático de longas conversas
- Sugestão de acompanhamento e conteúdo

### Agente Financeiro
**Tools:** `financeiro.lancar`, `financeiro.consultar_saldo`, `financeiro.conciliar`, `financeiro.gerar_relatorio`, `financeiro.emitir_recibo`, `financeiro.prever_caixa`, `financeiro.detectar_anomalia`
**Regras:**
- Toda saída acima de threshold configurável exige aprovação
- Conciliação tenta matching automático por valor + data + descrição
- Relatórios em linguagem natural + gráficos

### Agente Secretaria
**Tools:** `membros.criar`, `membros.atualizar`, `documentos.emitir`, `batismo.registrar`, `casamento.registrar`, `transferencia.registrar`, `frequencia.registrar`

### Agente Escalas
**Algoritmo de geração:**
1. Carregar template do departamento
2. Buscar voluntários elegíveis (competência + disponibilidade + não férias)
3. Aplicar restrições (não escalar a mesma pessoa N semanas seguidas, equilíbrio de carga, preferências)
4. Otimizar (heurística ou ILP simples)
5. Gerar proposta → notificar → aguardar confirmações → fechar escala

### Agente Designer IA
**Pipeline:**
1. Recebe briefing (texto ou referência)
2. Carrega branding do tenant (logo, cores, fontes, guidelines)
3. Gera prompt otimizado para o modelo de imagem
4. Gera N variações
5. Usuário escolhe ou pede ajustes
6. Exporta nos formatos necessários (PNG, PDF, MP4 estático, etc.)
7. Opcionalmente publica

### Agente Vídeo IA
**Pipeline de culto típico:**
1. Upload do vídeo bruto (ou link de gravação)
2. Transcrição (Whisper)
3. Detecção de segmentos (silêncio, mudança de cena, palavras-chave)
4. Geração automática de:
   - Versão full editada (cortes de silêncio, correção de áudio)
   - 5–15 shorts/reels com legendas
   - Highlights
   - Thumbnail
5. Revisão humana opcional
6. Publicação multi-canal com um clique

### Agente Sermões + RAG
- Ingestão: áudio/vídeo → transcrição → chunking → embedding → pgvector
- Indexação de referências bíblicas (parser de versículos)
- Busca híbrida (keyword + semântica)
- Geração de resumo, esboço, estudo bíblico, série sugerida

### Agente Analytics
- Converte pergunta em SQL seguro (somente SELECT, com tenant_id forçado)
- Ou consulta índices OpenSearch
- Gera resposta + tabela + gráfico (ECharts config)
- Exemplos de perguntas suportadas listados na seção 5 do documento original

### Agente Jurídico / LGPD
- Gestão de bases legais e consentimentos
- Atendimento a direitos do titular (acesso, correção, exclusão, portabilidade)
- Relatórios de conformidade
- Alertas de retenção expirada

### Agente Comunicação + Social Media
- Criação de textos com tom da igreja
- Agendamento e publicação
- Resposta a comentários (com aprovação quando sensível)
- Análise de engajamento e sugestões

### Agente RH Ministerial + Eventos
- Cadastro de dons e competências
- Sugestão de pessoas para funções
- Organização completa de eventos (já descrita no Agente Mestre)

## 5.4 Human-in-the-Loop

Configurável por tenant e por tipo de ação:
- Publicar em redes sociais
- Enviar mensagem em massa (> N destinatários)
- Lançar despesa acima de valor X
- Excluir pessoa ou dados
- Alterar escala já publicada
- Qualquer ação marcada como `requires_approval: true` no tool

Fluxo: agente cria `approval_request` → notifica aprovadores (WhatsApp + painel) → timeout configurável → executa ou cancela.

---

# PARTE 6 — WHATSAPP COMO CENTRO DE OPERAÇÕES

## 6.1 Arquitetura

- Número oficial da igreja (WABA) vinculado ao tenant
- Webhook Meta → NestJS → valida assinatura → enfileira → AI Gateway interpreta
- Sessão de conversa por `wa_id` + `tenant_id`
- Suporte a:
  - Texto
  - Áudio (transcreve)
  - Imagem
  - Documento
  - Localização
  - Botões e listas interativas
  - Templates aprovados (para mensagens proativas)

## 6.2 Exemplos de Comandos e Respostas Esperadas

| Comando do usuário | Ação do sistema |
|--------------------|-----------------|
| "Cadastre o visitante João Silva, 11999999999" | Cria person type=visitor, confirma dados, oferece criar família |
| "Quem está escalado no louvor domingo?" | Consulta escala, responde lista formatada |
| "Quanto entrou de dízimo esta semana?" | Soma transactions, responde valor + comparativo |
| "Faça um banner para o culto de domingo" | Chama Designer, gera opções, envia imagens no WhatsApp |
| "Organize um retiro de casais em março" | Inicia fluxo do Agente Mestre (evento completo) |
| "Envie lembrete para os inscritos no congresso" | Lista inscritos, envia template, reporta quantos enviados |

## 6.3 Segurança no Canal

- Apenas números autorizados (mapeados a users/people com permissão) podem executar ações administrativas
- Membros comuns só consultam seus próprios dados e fazem pedidos de oração/inscrição
- Rate limit por número
- Todas as mensagens logadas

---

# PARTE 7 — PORTAIS E EXPERIÊNCIA DO USUÁRIO

## 7.1 Portal Administrativo (Web)

**Layout:** Sidebar + Topbar + Conteúdo
**Módulos do menu:**
- Visão Geral (dashboard)
- Pessoas (membros, visitantes, famílias)
- Ministérios e Departamentos
- Escalas
- Eventos
- Financeiro
- Patrimônio
- Comunicação
- Mídia e Conteúdo
- Site
- Agentes de IA (histórico, aprovações, configurações)
- Relatórios
- Configurações (igreja, usuários, integrações, branding, LGPD)

**Dashboard:** cards de KPIs + gráficos + feed de atividades dos agentes + pendências de aprovação + agenda do dia.

## 7.2 Portal do Membro

- Home com próximos eventos, escala pessoal, pedidos de oração
- Meu perfil e família
- Contribuições e comprovantes
- Inscrições
- Conteúdo (sermões, estudos)
- Solicitar atendimento
- Carteirinha digital (QR Code)

## 7.3 Website Institucional por Igreja

- Editor visual (blocos)
- Temas e branding automático
- Páginas: Home, Sobre, Ministérios, Eventos, Sermões, Contato, Doação
- Formulários inteligentes
- Integração com streaming
- SEO e performance (Core Web Vitals)

## 7.4 Aplicativo Mobile

Telas principais:
- Home
- Agenda / Escala
- Contribuição (PIX copia-cola + cartão)
- Mídia
- Chat / Pedidos
- Perfil / Carteirinha
- Notificações

Offline-first para carteirinha e conteúdos baixados.

---

# PARTE 8 — ESTÚDIOS DE MÍDIA

## 8.1 Estúdio Criativo (Imagem)

- Canvas Fabric.js/Konva
- Camadas, textos, formas, imagens
- Geração por prompt com branding automático
- Remoção de fundo, upscale, restauração
- Templates da igreja + marketplace
- Exportação multi-formato
- Histórico de versões

## 8.2 Editor de Vídeo IA

- Timeline
- Importação de cultos longos
- Detecção automática de cortes
- Legendas editáveis (Whisper)
- Narração TTS / clonagem de voz (com consentimento)
- Templates de intro/outro da igreja
- Botão Publicar com checkboxes de canais
- Fila de processamento (worker-video) com status em tempo real

---

# PARTE 9 — FINANCEIRO E PATRIMONIAL (DETALHES)

## 9.1 Fluxos Financeiros Críticos

1. **Recebimento de dízimo/oferta via PIX**
   - Gateway gera QR / copia-cola
   - Webhook de confirmação
   - Cria transaction automaticamente
   - Emite recibo (PDF + WhatsApp)
   - Atualiza dashboard

2. **Conciliação bancária**
   - Importa OFX / Open Finance / CSV
   - Matching automático (valor + data ±2 dias + fuzzy descrição)
   - Usuário resolve divergências
   - Fecha lote

3. **Prestação de contas mensal**
   - Agente gera balancete + DRE + gráficos
   - PDF + apresentação
   - Envia para conselho / assembleia

## 9.2 Patrimônio

- Cadastro com foto e QR Code
- Empréstimo de equipamentos (check-out / check-in)
- Ordens de manutenção
- Inventário periódico (app mobile com leitura de QR)
- Depreciação automática (opcional)

---

# PARTE 10 — SEGURANÇA, PRIVACIDADE E CONFORMIDADE

## 10.1 Controles Técnicos

- TLS 1.3 em trânsito
- Criptografia em repouso (discos + campos sensíveis)
- Secrets em vault (HashiCorp Vault ou cloud secret manager)
- MFA obrigatório para roles administrativas
- Rotação de chaves
- WAF + rate limiting + bot protection
- Backup diário + PITR
- Testes de penetração periódicos

## 10.2 LGPD

- Base legal registrada por finalidade
- Consentimento granular
- Direitos do titular (portal + processo interno)
- DPIA para features de alto risco
- DPO (ou equivalente) configurável
- Retenção automática e exclusão
- Registro de atividades de tratamento

## 10.3 Auditoria

- Toda mutação de dados de negócio gera audit_log
- Logs de autenticação e de agentes
- Imutabilidade (append-only + assinatura)
- Retenção configurável (mínimo 5 anos para dados financeiros)

---

# PARTE 11 — APIs PÚBLICAS E WEBHOOKS

## 11.1 Estilo

- REST (OpenAPI 3.1 gerado automaticamente pelo NestJS)
- Versionamento por URL (`/v1/`)
- Autenticação: Bearer JWT ou API Key
- Paginação cursor-based
- Filtros e ordenação padronizados
- Idempotency-Key header em POSTs financeiros

## 11.2 Principais Grupos de Endpoints

- `/auth/*`
- `/people/*`
- `/families/*`
- `/events/*`
- `/scales/*`
- `/finance/transactions/*`
- `/finance/reports/*`
- `/media/*`
- `/agents/run`
- `/agents/approvals/*`
- `/webhooks/whatsapp`
- `/webhooks/payments`
- `/sites/*`
- `/admin/tenants/*` (apenas platform)

## 11.3 Webhooks de Saída

Tenant pode cadastrar endpoints para receber:
- person.created / updated
- transaction.confirmed
- event.registration
- scale.published
- agent.run.completed

Assinatura HMAC-SHA256.

---

# PARTE 12 — OBSERVABILIDADE E OPERAÇÕES

- OpenTelemetry traces em todos os serviços
- Métricas: latência, taxa de erro, tokens de IA consumidos, custo estimado, filas
- Logs estruturados (JSON) → Loki
- Alertas: erro rate, fila parada, custo de IA anormal, falha de webhook Meta, disco, etc.
- Runbooks para incidentes comuns
- Status page pública

---

# PARTE 13 — TESTES E QUALIDADE

- Unit tests (Jest / Vitest / Pytest) — cobertura > 80% no core
- Integration tests (banco real em container)
- E2E (Playwright) dos fluxos críticos
- Contract tests das APIs
- Load tests (k6) antes de cada release maior
- Testes de segurança (SAST, DAST, dependency scanning)
- Testes dos agentes com datasets de exemplos e avaliação de qualidade (LLM-as-judge quando aplicável)

---

# PARTE 14 — DEPLOYMENT E AMBIENTES

| Ambiente | Propósito | Dados |
|----------|-----------|-------|
| local | desenvolvimento | seed |
| staging | QA e demos | anonymized |
| production | clientes | reais |

- Blue/green ou canary no Kubernetes
- Migrations automáticas com lock
- Feature flags (Unleash ou similar)
- Rollback em < 5 minutos

---

# PARTE 15 — MARKETPLACE DE AGENTES E EXTENSÕES

- Desenvolvedores terceiros podem publicar agentes e integrações
- Review process + sandbox
- Monetização (revenue share)
- Instalação com um clique por tenant
- Versionamento e permissões declaradas

---

# PARTE 16 — INTERNACIONALIZAÇÃO E ACESSIBILIDADE

- i18n completo (pt-BR, en, es, no mínimo)
- Datas, moedas, formatos locais
- Suporte a múltiplas traduções bíblicas
- WCAG 2.2 AA
- Suporte a leitores de tela
- Alto contraste opcional

---

# PARTE 17 — BACKLOG DETALHADO POR FASES

### FASE 0 — Fundação (2–3 semanas)
- [ ] Monorepo Turborepo + packages base
- [ ] Schema Prisma/Drizzle completo + RLS policies
- [ ] NestJS auth multi-tenant (JWT + MFA + OAuth)
- [ ] Interceptor de tenant + set_config
- [ ] Docker Compose (postgres, redis, minio, rabbitmq, mailhog)
- [ ] CI GitHub Actions (lint, test, build)
- [ ] Design system Shadcn básico
- [ ] Skeleton do Portal Admin (layout + auth)
- [ ] Seed de igreja demo

### FASE 1 — Core + Agente Mestre + WhatsApp (3–4 semanas)
- [ ] CRUD de people + families
- [ ] FastAPI + LangGraph skeleton
- [ ] Agente Mestre com tools básicas (membros, agenda)
- [ ] MCP servers: postgres, filesystem, memory, membros
- [ ] Webhook WhatsApp + sessão de conversa
- [ ] Comandos básicos via WhatsApp
- [ ] Dashboard com KPIs reais
- [ ] Auditoria básica

### FASE 2 — Operações Essenciais (4 semanas)
- [ ] Agente Secretaria completo
- [ ] Agente Escalas + algoritmo de geração
- [ ] Agente Financeiro (lançamentos + relatórios simples)
- [ ] Agente Analytics (NL → SQL seguro)
- [ ] Portal do Membro
- [ ] Controle de frequência (QR)
- [ ] Emissão de documentos (PDF)

### FASE 3 — Mídia e Comunicação (4 semanas)
- [ ] Agente Comunicação + Social Media
- [ ] Agente Designer + Estúdio Criativo
- [ ] Pipeline de vídeo básico (FFmpeg + Whisper + cortes)
- [ ] Publicação multi-canal
- [ ] CMS + Website por tenant
- [ ] Newsletter e campanhas

### FASE 4 — Pastoral e Avançado (3–4 semanas)
- [ ] Agente Pastoral + detecção de crise
- [ ] Agente Sermões + RAG completo
- [ ] Agente RH Ministerial
- [ ] Agente Eventos (orquestração completa)
- [ ] Agente Jurídico/LGPD
- [ ] App Mobile MVP (Expo)
- [ ] Human-in-the-loop polido

### FASE 5 — Escala, Marketplace e Polish (contínuo)
- [ ] Marketplace
- [ ] API pública documentada
- [ ] Observabilidade completa
- [ ] i18n
- [ ] Testes de carga e hardening
- [ ] White-label
- [ ] Documentação para clientes finais
- [ ] Onboarding guiado por IA

---

# PARTE 18 — SCRIPTS DE MCP (LINHA DE COMANDO)

Arquivo `scripts/install-mcps.sh` (expandido):

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "=== Assembleia IA — Instalação de Model Context Protocol Servers ==="

# Dependências globais
npm install -g @modelcontextprotocol/sdk 2>/dev/null || true

# MCPs oficiais úteis
npx -y @modelcontextprotocol/server-filesystem "$(pwd)"
npx -y @modelcontextprotocol/server-memory
npx -y @modelcontextprotocol/server-sequential-thinking
npx -y @modelcontextprotocol/server-fetch
npx -y @modelcontextprotocol/server-puppeteer

# PostgreSQL (ajuste a connection string)
# npx -y @modelcontextprotocol/server-postgres "$DATABASE_URL"

echo ""
echo "MCPs customizados devem ser desenvolvidos em packages/mcp-servers/"
echo "Estrutura esperada de cada MCP:"
echo "  packages/mcp-servers/<nome>/"
echo "    ├── package.json"
echo "    ├── src/index.ts"
echo "    ├── src/tools/"
echo "    └── README.md"
echo ""
echo "Após build, registre no arquivo de configuração do cliente MCP"
echo "(claude_desktop_config.json, .cursor/mcp.json, antigravity config, etc.)"
echo ""
echo "Lista obrigatória de MCPs a implementar:"
echo "  1. mcp-whatsapp"
echo "  2. mcp-membros"
echo "  3. mcp-financeiro"
echo "  4. mcp-escalas"
echo "  5. mcp-designer"
echo "  6. mcp-video"
echo "  7. mcp-calendar"
echo "  8. mcp-email"
echo "  9. mcp-storage"
echo " 10. mcp-analytics"
echo " 11. mcp-lgpd"
echo " 12. mcp-social"
echo " 13. mcp-eventos"
echo " 14. mcp-sermoes"
echo ""
echo "Cada MCP deve expor tools com nomes estáveis, schemas Zod/JSON Schema"
echo "e documentação de erros."
```

---

# PARTE 19 — REQUISITOS NÃO FUNCIONAIS (EXPANDIDOS)

| Categoria | Requisito | Meta |
|-----------|-----------|------|
| Disponibilidade | Uptime mensal | 99.9% (Essencial/Crescer), 99.95% (Impactar/Dominar) |
| Latência | API p95 | < 200 ms (leitura), < 500 ms (escrita) |
| Latência IA | Comando simples WhatsApp | < 8 s até primeira resposta útil |
| Throughput | Requisições | 5.000+ RPS sustentados no core |
| Escala | Tenants | 10.000+ igrejas |
| Escala | Usuários concurrent | 100.000+ |
| RPO | Perda de dados | ≤ 15 minutos |
| RTO | Recuperação | ≤ 1 hora |
| Segurança | MFA | Obrigatório para admin |
| Privacidade | LGPD | 100% das bases legais mapeadas |
| Acessibilidade | WCAG | 2.2 AA |
| Performance web | Lighthouse | ≥ 90 em Performance e Accessibility |
| Custo de IA | Controle | Budget por tenant + alertas |

---

# PARTE 20 — RISCOS E MITIGAÇÕES

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Alucinação de agente em dados financeiros | Alto | Tools somente leitura + aprovação humana + validação de schema |
| Vazamento cross-tenant | Crítico | RLS + testes automatizados de isolamento + review de código |
| Banimento Meta (WhatsApp) | Alto | Templates aprovados, opt-in, rate limit, fallback para e-mail/SMS |
| Custo explosivo de tokens | Médio | Caching de embeddings, modelos menores para tarefas simples, budgets |
| Resistência de usuários a IA | Médio | Human-in-the-loop generoso no início, transparência, treinamento |
| Complexidade de vídeo | Médio | Pipeline assíncrono, filas, status claro, fallback manual |

---

# PARTE 21 — GLOSSÁRIO

- **Tenant**: uma igreja (ou organização) cliente da plataforma
- **Agente Mestre**: orquestrador central de IA
- **MCP**: Model Context Protocol — padrão de tools para agentes
- **HITL**: Human-in-the-Loop
- **RLS**: Row Level Security do PostgreSQL
- **WABA**: WhatsApp Business Account
- **RAG**: Retrieval-Augmented Generation

---

# PARTE 22 — INSTRUÇÕES FINAIS AO AGENTE DE DESENVOLVIMENTO

1. Leia este documento completo antes de qualquer código.
2. Crie o monorepo exatamente na estrutura da Parte 2.
3. Implemente o schema da Parte 3 com RLS desde o primeiro migration.
4. Faça o auth multi-tenant funcionar de ponta a ponta.
5. Só então avance para o Agente Mestre e WhatsApp.
6. Cada agente deve ter:
   - System prompt versionado
   - Lista de tools (MCPs)
   - Exemplos de input/output
   - Testes de regressão
7. Documente decisões de arquitetura em `/docs/adr/`.
8. Mantenha o README atualizado com como rodar localmente em < 10 minutos.
9. Nunca commit secrets.
10. Ao concluir uma fase, marque os checkboxes e abra PR descritivo.

**Você está autorizado e esperado a gerar milhares de linhas de código de alta qualidade, migrations, testes, Dockerfiles, manifests Kubernetes, scripts e documentação.**

Comece pela Fase 0 agora.

---

**FIM DA ESPECIFICAÇÃO v2.0.0 — ASSEMBLEIA IA**

Este documento substitui a versão 1.0.0 e é a especificação oficial para implementação.
