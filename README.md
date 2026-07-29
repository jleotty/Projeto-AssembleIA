# Assembleia IA — Sistema Operacional Inteligente para Igrejas (SaaS Multi-tenant)

Plataforma SaaS Multi-tenant completa para a gestão de igrejas com **Inteligência Artificial como Núcleo Operacional**, adaptada para o motor de banco de dados **SQLite** (`assembleia.db`) e desenvolvida com a **Identidade Visual Oficial** e design inspirado na Stripe.

---

## 🏛️ Estrutura do Monorepo

- `docs/` — Documentação mestre completa (PRD, Arquitetura, Playbook do Fundador, Especificação v2.0).
- `Inspiration/` — Referências de design e o **Logo Oficial do Sistema** (`lobrigatório_utilizar_logo_do_sistema.jpg`).
- `apps/web` — Portal Web em Next.js 15 (Landing Page, Dashboards Admin, Pastor, Secretaria, Financeiro, Pastoral e Agente Mestre IA).
- `apps/api` — Core REST API em Node.js/Express integrando SQLite com autenticação JWT e isolamento de Tenants.
- `apps/ai-worker` — Motor de Agentes de IA autônomos em Python 3.12 (LangGraph + FastAPI) para o Agente Mestre e Agentes Especializados.
- `packages/db` — Schema e cliente Prisma configurado para **SQLite** (`dev.db`).

---

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos
- Node.js >= 18.0.0 (Instalado via `~/.local/node/bin/node`)
- Python >= 3.10

### 2. Inicializar o Banco de Dados SQLite
```bash
# Gerar o cliente Prisma e alimentar o banco SQLite dev.db
npm run db:generate
npm run db:push
npm run db:seed
```

### 3. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```
Acesse a aplicação em `http://localhost:3000`.

---

## 🎨 Identidade Visual & Logo

O logo oficial (`Inspiration/lobrigatório_utilizar_logo_do_sistema.jpg`) está embutido em `apps/web/public/logo.jpg` e integrado no Header, Sidebar, Landing Page, Favicon e documentos do sistema. A paleta de cores é derivada do gradiente de sua chama:
- **Ciano:** `#00B2FE`
- **Azul Elétrico:** `#2B35AF`
- **Roxo Profundo:** `#522785`
- **Laranja / Vermelho Chama:** `#F04A23`
- **Amarelo Sol:** `#FEE100`
