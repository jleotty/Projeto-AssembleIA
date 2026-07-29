# ASSEMBLEIA IA — VOLUME 2: APÊNDICES TÉCNICOS

**Complemento obrigatório da Especificação v2.0.0 (Volume 1)**  
Leia em conjunto com `ASSEMBLEIA_IA_ESPECIFICACAO_COMPLETA.md`.

---

# APÊNDICE A — SCHEMA SQL COMPLETO (DDL)

Traduzir para Prisma/Drizzle. Aplicar RLS em toda tabela com `tenant_id`.

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

CREATE TYPE tenant_status AS ENUM ('trial', 'active', 'suspended', 'cancelled');
CREATE TYPE person_type AS ENUM ('member', 'visitor', 'leader', 'child', 'volunteer');
CREATE TYPE person_status AS ENUM ('active', 'inactive', 'transferred', 'deceased', 'archived');
CREATE TYPE transaction_type AS ENUM ('income', 'expense', 'transfer');
CREATE TYPE payment_method AS ENUM ('pix', 'cash', 'credit_card', 'debit_card', 'bank_transfer', 'boleto', 'other');
CREATE TYPE event_status AS ENUM ('draft', 'published', 'cancelled', 'completed');
CREATE TYPE scale_assignment_status AS ENUM ('pending', 'confirmed', 'declined', 'replaced');
CREATE TYPE agent_run_status AS ENUM ('pending', 'running', 'waiting_approval', 'completed', 'failed', 'cancelled');
CREATE TYPE consent_purpose AS ENUM ('membership', 'marketing', 'pastoral_care', 'media', 'analytics');

CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  custom_domain TEXT UNIQUE,
  plan TEXT NOT NULL DEFAULT 'essencial',
  status tenant_status NOT NULL DEFAULT 'trial',
  settings JSONB NOT NULL DEFAULT '{}',
  branding JSONB NOT NULL DEFAULT '{}',
  whatsapp_phone_number_id TEXT,
  whatsapp_business_account_id TEXT,
  trial_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  password_hash TEXT,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  mfa_enabled BOOLEAN NOT NULL DEFAULT false,
  mfa_secret TEXT,
  email_verified_at TIMESTAMPTZ,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE tenant_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  permissions JSONB NOT NULL DEFAULT '[]',
  person_id UUID,
  status TEXT NOT NULL DEFAULT 'active',
  invited_at TIMESTAMPTZ,
  joined_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, user_id)
);

CREATE TABLE people (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  type person_type NOT NULL DEFAULT 'member',
  status person_status NOT NULL DEFAULT 'active',
  full_name TEXT NOT NULL,
  preferred_name TEXT,
  birth_date DATE,
  gender TEXT,
  marital_status TEXT,
  cpf TEXT,
  rg TEXT,
  email TEXT,
  phones JSONB NOT NULL DEFAULT '[]',
  address JSONB,
  photo_url TEXT,
  baptism_date DATE,
  membership_date DATE,
  transfer_from TEXT,
  transfer_to TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  custom_fields JSONB NOT NULL DEFAULT '{}',
  notes TEXT,
  lgpd_consent_at TIMESTAMPTZ,
  lgpd_consent_version TEXT,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_people_name_trgm ON people USING gin (full_name gin_trgm_ops);
CREATE INDEX idx_people_tenant_email ON people(tenant_id, email) WHERE email IS NOT NULL;
CREATE INDEX idx_people_tenant_status ON people(tenant_id, status);
CREATE INDEX idx_people_tags ON people USING gin (tags);

CREATE TABLE families (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  head_id UUID REFERENCES people(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE family_members (
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  relationship TEXT NOT NULL,
  PRIMARY KEY (family_id, person_id)
);

CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  parent_id UUID REFERENCES departments(id),
  leader_id UUID REFERENCES people(id),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, slug)
);

CREATE TABLE department_members (
  department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  role TEXT,
  joined_at DATE,
  PRIMARY KEY (department_id, person_id)
);

CREATE TABLE competencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT,
  UNIQUE(tenant_id, name)
);

CREATE TABLE person_competencies (
  person_id UUID NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  competency_id UUID NOT NULL REFERENCES competencies(id) ON DELETE CASCADE,
  level INT DEFAULT 1,
  PRIMARY KEY (person_id, competency_id)
);

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  type TEXT,
  status event_status NOT NULL DEFAULT 'draft',
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  location TEXT,
  location_details JSONB,
  capacity INT,
  registration_required BOOLEAN NOT NULL DEFAULT false,
  cover_image_url TEXT,
  budget_id UUID,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, slug)
);

CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  person_id UUID REFERENCES people(id),
  guest_name TEXT,
  guest_email TEXT,
  guest_phone TEXT,
  status TEXT NOT NULL DEFAULT 'registered',
  checked_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE scale_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  department_id UUID REFERENCES departments(id),
  name TEXT NOT NULL,
  slots JSONB NOT NULL
);

CREATE TABLE scales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  department_id UUID REFERENCES departments(id),
  event_id UUID REFERENCES events(id),
  date DATE NOT NULL,
  title TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE scale_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scale_id UUID NOT NULL REFERENCES scales(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES people(id),
  role TEXT NOT NULL,
  status scale_assignment_status NOT NULL DEFAULT 'pending',
  notified_at TIMESTAMPTZ,
  responded_at TIMESTAMPTZ,
  notes TEXT
);

CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  starts_on DATE NOT NULL,
  ends_on DATE NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT false,
  reason TEXT
);

CREATE TABLE financial_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'BRL',
  initial_balance NUMERIC(15,2) NOT NULL DEFAULT 0,
  current_balance NUMERIC(15,2) NOT NULL DEFAULT 0,
  bank_code TEXT,
  agency TEXT,
  account_number TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE cost_centers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT,
  parent_id UUID REFERENCES cost_centers(id)
);

CREATE TABLE chart_of_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  parent_id UUID REFERENCES chart_of_accounts(id),
  UNIQUE(tenant_id, code)
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  type transaction_type NOT NULL,
  amount NUMERIC(15,2) NOT NULL CHECK (amount > 0),
  currency TEXT NOT NULL DEFAULT 'BRL',
  date DATE NOT NULL,
  description TEXT,
  account_id UUID REFERENCES financial_accounts(id),
  category_id UUID REFERENCES chart_of_accounts(id),
  cost_center_id UUID REFERENCES cost_centers(id),
  person_id UUID REFERENCES people(id),
  payment_method payment_method,
  status TEXT NOT NULL DEFAULT 'confirmed',
  reconciled BOOLEAN NOT NULL DEFAULT false,
  reconciliation_batch_id UUID,
  external_id TEXT,
  receipt_url TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_tx_tenant_date ON transactions(tenant_id, date);
CREATE INDEX idx_tx_tenant_person ON transactions(tenant_id, person_id);

CREATE TABLE budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  year INT NOT NULL,
  month INT,
  status TEXT NOT NULL DEFAULT 'draft'
);

CREATE TABLE budget_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_id UUID NOT NULL REFERENCES budgets(id) ON DELETE CASCADE,
  category_id UUID REFERENCES chart_of_accounts(id),
  cost_center_id UUID REFERENCES cost_centers(id),
  planned_amount NUMERIC(15,2) NOT NULL,
  notes TEXT
);

CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT,
  serial_number TEXT,
  purchase_date DATE,
  purchase_value NUMERIC(15,2),
  current_value NUMERIC(15,2),
  location TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  qr_code TEXT UNIQUE,
  warranty_until DATE,
  photo_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE sermon_series (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  cover_url TEXT
);

CREATE TABLE sermons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  series_id UUID REFERENCES sermon_series(id),
  title TEXT NOT NULL,
  preacher_id UUID REFERENCES people(id),
  preached_at TIMESTAMPTZ,
  audio_url TEXT,
  video_url TEXT,
  transcript TEXT,
  summary TEXT,
  verses JSONB NOT NULL DEFAULT '[]',
  tags TEXT[] NOT NULL DEFAULT '{}',
  embedding vector(1536),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sermons_embedding ON sermons USING hnsw (embedding vector_cosine_ops);

CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,
  external_id TEXT,
  person_id UUID REFERENCES people(id),
  user_id UUID REFERENCES users(id),
  status TEXT NOT NULL DEFAULT 'open',
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE conversation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  direction TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'text',
  content TEXT,
  media_url TEXT,
  agent_run_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE agent_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  user_id UUID REFERENCES users(id),
  person_id UUID REFERENCES people(id),
  channel TEXT,
  input JSONB NOT NULL,
  output JSONB,
  status agent_run_status NOT NULL DEFAULT 'pending',
  tokens_input INT,
  tokens_output INT,
  cost_estimate NUMERIC(10,6),
  error TEXT,
  requires_approval BOOLEAN NOT NULL DEFAULT false,
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  finished_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE approval_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  agent_run_id UUID REFERENCES agent_runs(id),
  action_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  requested_to UUID[] NOT NULL,
  resolved_by UUID REFERENCES users(id),
  resolved_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE agent_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  person_id UUID REFERENCES people(id),
  content TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}',
  embedding vector(1536),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_memories_embedding ON agent_memories USING hnsw (embedding vector_cosine_ops);

CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE UNIQUE,
  domain TEXT,
  theme JSONB NOT NULL DEFAULT '{}',
  settings JSONB NOT NULL DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft',
  seo JSONB NOT NULL DEFAULT '{}',
  published_at TIMESTAMPTZ,
  UNIQUE(site_id, slug)
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID,
  actor_user_id UUID,
  actor_type TEXT,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_tenant_created ON audit_logs(tenant_id, created_at DESC);

CREATE TABLE consent_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  purpose consent_purpose NOT NULL,
  granted BOOLEAN NOT NULL,
  version TEXT NOT NULL,
  granted_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  evidence JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE attendance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id),
  person_id UUID NOT NULL REFERENCES people(id),
  check_in_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  method TEXT NOT NULL DEFAULT 'manual',
  UNIQUE(event_id, person_id)
);

ALTER TABLE people ENABLE ROW LEVEL SECURITY;
CREATE POLICY people_tenant_isolation ON people
  USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid);

CREATE OR REPLACE FUNCTION set_current_tenant(p_tenant_id UUID) RETURNS void AS $$
BEGIN
  PERFORM set_config('app.current_tenant_id', p_tenant_id::text, true);
END;
$$ LANGUAGE plpgsql;
```

Repetir RLS em todas as tabelas com `tenant_id`. NestJS interceptor chama `set_current_tenant` após validar JWT.

---

# APÊNDICE B — ENDPOINTS REST (CATÁLOGO)

Base `/api/v1`. Bearer JWT. Tenant via claim ou subdomain.

**Auth:** POST register, login, refresh, logout, mfa/enable, mfa/verify, forgot-password, reset-password | GET me

**Tenant:** GET/PATCH current, PATCH branding, GET users, POST users/invite, PATCH/DELETE users/:id

**People:** GET (filtros), POST, GET/:id, PATCH/:id, DELETE/:id, POST import, GET/:id/history, POST/:id/photo

**Families, Departments, Competencies:** CRUD + vínculos de membros e competências

**Events:** CRUD + publish, registrations, check-in

**Scales:** GET, POST generate, POST publish, POST assignments respond, GET my

**Finance:** accounts, transactions (CRUD/bulk), reconcile, reports (summary, cashflow, generate), receipts

**Assets:** CRUD + movements + inventory-scan

**Sermons/Media:** CRUD, transcribe, search semântico, library

**Agents:** POST run, GET runs, GET runs/:id, GET approvals, POST approvals/:id/resolve

**Webhooks:** whatsapp (GET verify + POST), payments/:provider

**CMS:** sites/current, pages CRUD, publish

**Mobile:** me/card, me/scale, me/prayer-requests, me/contributions

---

# APÊNDICE C — USER STORIES ESSENCIAIS

1. **Visitante via WhatsApp** — secretária cadastra por mensagem; extrai dados; confirma; cria visitor.
2. **Escala automática** — líder pede geração; sistema equilibra carga; notifica; confirma; publica.
3. **Prestação de contas** — tesoureiro solicita período; PDF + gráficos + vs orçamento.
4. **Alerta de ausência** — 4 semanas sem presença → alerta pastor + agente pastoral opcional.
5. **Shorts de culto** — upload → 10 shorts + legendas → aprovação → Instagram/YouTube.
6. **Pedido de oração** — membro no app; equipe notificada; status acompanhável.
7. **PIX dízimo** — gera QR; webhook confirma; transaction + recibo WhatsApp.
8. **Crise pastoral** — detecção de risco; empatia sem métodos; encaminha pastor; prioridade crise.
9. **Busca de sermão** — “perdão últimos 2 anos”; busca híbrida; trechos + links.
10. **Onboarding igreja** — wizard branding + WhatsApp + plano de contas; operacional < 30 min.

Expandir para 100+ no backlog durante implementação.

---

# APÊNDICE D — SYSTEM PROMPTS

**Mestre:** Orquestra. Entende intenção. Delega. Nunca inventa dados. HITL para ações críticas. Tom pastoral pt-BR. Resume ao final.

**Pastoral:** Acolhe e tria. Crise → empatia, sem métodos, encaminha pastor, notifica. Confidencial.

**Financeiro:** Precisão total. Threshold de aprovação. Só com permissão. Alerta anomalias.

**Designer:** Aplica branding obrigatório (logo, cores, fontes). Pergunta formato se faltar.

**Escalas:** Justiça e equilíbrio. Draft → notify → confirm → publish.

**Vídeo:** Whisper → cortes → shorts → thumbs → publish multi-canal com aprovação configurável.

**Analytics:** NL → SQL seguro (SELECT + tenant_id forçado). Sem mutação.

**Jurídico/LGPD:** Consentimentos, direitos do titular, retenção legal.

---

# APÊNDICE E — STATE MACHINES

- **Escala:** draft → generating → proposed → notifying → partially_confirmed → confirmed → published → archived
- **Evento:** draft → published → registration_open → registration_closed → in_progress → completed
- **Agent Run:** pending → running → waiting_approval → completed | failed | cancelled
- **Transaction:** pending → confirmed → reconciled | cancelled | refunded

---

# APÊNDICE F — ERROS PADRÃO

AUTH_001 401 | AUTH_002 403 | TENANT_001 404 | TENANT_002 403 | VALIDATION_001 422 | FINANCE_001 402 | AGENT_001 429 | AGENT_002 503 | WHATSAPP_001 502 | CONFLICT_001 409

Body: `{ "error": { "code", "message", "details", "request_id" } }`

---

# APÊNDICE G — GO-LIVE CHECKLIST

Branding | Admins + MFA | WhatsApp + templates | Contas + plano de contas | Departamentos | Evento teste | Privacidade/termos | Consentimentos LGPD | Backup/monitoramento | Treinamento

---

# APÊNDICE H — MODELOS IA

Orquestração: GPT-5.5 / Claude 4  
SQL: modelo forte + validador  
Embeddings: text-embedding-3-large  
Imagem: Flux / Ideogram  
Transcrição: Whisper large-v3  
TTS: ElevenLabs / OpenAI  
Visão: GPT-4o / Gemini  
BYOK nos planos superiores.

---

# APÊNDICE I — CUSTO IA

Registrar por run: tokens, model, cost_usd, latency. Agregar por tenant/dia. Budgets e alertas.

---

# APÊNDICE J — ESCALA

Particionar logs/mensagens | Read replicas | Redis cache | CDN mídia | Workers vídeo auto-scale | PgBouncer | Rate limit por tenant  
Meta: API p95 < 200ms | WhatsApp simples < 8s

---

# APÊNDICE K — install-mcps.sh

```bash
#!/usr/bin/env bash
set -euo pipefail
npx -y @modelcontextprotocol/server-filesystem "$(pwd)"
npx -y @modelcontextprotocol/server-memory
npx -y @modelcontextprotocol/server-sequential-thinking
npx -y @modelcontextprotocol/server-fetch
npx -y @modelcontextprotocol/server-puppeteer
echo "Custom MCPs em packages/mcp-servers/: whatsapp membros financeiro escalas designer video calendar email storage analytics lgpd social eventos sermoes"
```

---

# APÊNDICE L — FASES (LEMBRETE)

0 Fundação → 1 Core+Mestre+WhatsApp → 2 Operações → 3 Mídia → 4 Pastoral → 5 Marketplace/Escala

Cada fase: testes OK, README, demo, segurança.

---

**FIM VOLUME 2**
