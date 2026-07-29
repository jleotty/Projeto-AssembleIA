# ASSEMBLEIA IA — VOLUME 3
## ESTRUTURA ORGANIZACIONAL DA ASSEMBLEIA DE DEUS + MODELO DE DADOS COMPLETO PARA CARGOS E MEMBROS

**Versão:** 3.0.0  
**Obrigatório:** Este volume especializa a plataforma para a realidade da **Assembleia de Deus no Brasil** (CGADB, CADB, CONAMAD/Madureira e ministérios autônomos).  
**Uso:** O agente de desenvolvimento deve implementar seed de cargos, departamentos e vínculos membro↔cargo exatamente conforme este documento. Cargos são configuráveis por tenant, mas o catálogo padrão AD deve vir pré-carregado.

---

# 1. CONTEXTO DENOMINACIONAL

As Assembleias de Deus no Brasil não formam uma única igreja centralizada. São milhares de igrejas locais e ministérios, agrupados principalmente em:

| Convenção / Ramo | Observação |
|------------------|------------|
| **CGADB** — Convenção Geral das Assembleias de Deus no Brasil | “Missão” (herança sueca) |
| **CADB** — Convenção da Assembleia de Deus no Brasil | Também ligada à tradição Missão |
| **CONAMAD** — Convenção Nacional (Ministério Madureira) | Estrutura com episcopado (Bispo Primaz) |
| Ministérios e convenções estaduais/regionais autônomas | Ex.: Ministério Belém, Ministério do Belém, etc. |

**Implicação para o software:**  
Cada **tenant** = uma igreja local (templo sede + congregações) **ou** um ministério completo.  
O sistema **não impõe** uma convenção. Oferece catálogo padrão de cargos e departamentos AD, 100% customizável por tenant.

---

# 2. HIERARQUIA ESTRUTURAL TÍPICA (IGREJA LOCAL AD)

```
MINISTÉRIO / CONVENÇÃO (opcional, nível acima)
└── IGREJA SEDE (Templo Central)
    ├── Pastor Presidente / Pastor Titular
    ├── Pastores Auxiliares / Copastores
    ├── Corpo de Obreiros (Presbíteros, Evangelistas, Diáconos…)
    ├── Departamentos (Mocidade, Círculo de Oração, EBD…)
    ├── Congregações / Pontos de Pregação
    │     └── Dirigente de Congregação (+ obreiros locais)
    └── Campos Missionários / Obras Sociais
```

### Níveis territoriais suportados no sistema

| Nível | Código sugerido | Exemplo |
|-------|-----------------|---------|
| Ministério / Convenção | `ministry` | Ministério Assembleia de Deus de [Cidade] |
| Igreja Sede | `headquarters` | Templo Central |
| Congregação | `congregation` | Congregação do Bairro X |
| Ponto de Pregação / Campo | `preaching_point` | Ponto de Pregação Rua Y |
| Célula / Grupo pequeno | `cell` | Célula da Família Z |

Tabela `locations` (ou `church_units`) com `parent_id` para árvore.

---

# 3. CATÁLOGO COMPLETO DE CARGOS E FUNÇÕES DA ASSEMBLEIA DE DEUS

Todos os cargos abaixo devem existir no **seed padrão**.  
Cada cargo tem:
- `code` (único por tenant)
- `name`
- `category` (eclesiastico | administrativo | departamento | louvor | ensino | apoio | missao)
- `rank_order` (para ordenação hierárquica visual)
- `requires_consecration` (boolean — se exige consagração formal)
- `is_system` (boolean — cargos do seed não apagáveis, só desativáveis)
- `description`
- `permissions_hint` (sugestão de permissões no sistema)

## 3.1 Cargos Eclesiásticos / Ministeriais (consagração)

| Ordem | Código | Nome | Descrição resumida | Consagração |
|------:|--------|------|--------------------|:-----------:|
| 10 | `pastor_presidente` | Pastor Presidente / Pastor Titular | Líder máximo da igreja local ou ministério. Representante legal em muitos casos. | Sim |
| 20 | `pastor_auxiliar` | Pastor Auxiliar / Co-pastor | Auxilia o pastor presidente na pregação, visitação e governo. | Sim |
| 30 | `pastor` | Pastor | Ministro consagrado; pode pastorear congregação ou área. | Sim |
| 40 | `evangelista` | Evangelista | Foco em evangelização, campanhas e plantio. | Sim |
| 50 | `missionario` | Missionário / Missionária | Enviado a campo missionário (nacional ou transcultural). | Sim |
| 60 | `presbitero` | Presbítero | Ancião; maturidade espiritual; auxilia no governo e disciplina. | Sim |
| 70 | `diacono` | Diácono | Serviço, assistência, organização do culto, mesa da santa ceia. | Sim |
| 80 | `diaconisa` | Diaconisa | Equivalente feminino do diaconato (quando a igreja reconhece). | Sim |
| 90 | `obreiro` | Obreiro / Obreira | Cooperador consagrado ou reconhecido; base do corpo de obreiros. | Sim/Não* |
| 100 | `cooperador` | Cooperador / Auxiliar | Em formação; auxilia antes da consagração plena. | Não |
| 110 | `aspirante_diaconato` | Aspirante ao Diaconato | Em preparação e observação para consagração. | Não |

\*Em muitas ADs a progressão é: **Cooperador → Diácono → Presbítero → Evangelista → Pastor**.

### Observações por convenção
- **Madureira (CONAMAD):** pode haver **Bispo**, **Bispo Primaz**, estrutura episcopal.
- Incluir no catálogo opcional:

| Ordem | Código | Nome |
|------:|--------|------|
| 5 | `bispo_primaz` | Bispo Primaz |
| 8 | `bispo` | Bispo |
| 15 | `pastor_conselheiro` | Pastor Conselheiro |

## 3.2 Cargos de Direção de Unidade

| Código | Nome | Descrição |
|--------|------|-----------|
| `dirigente_congregacao` | Dirigente de Congregação | Responsável por uma congregação sob a sede |
| `dirigente_ponto` | Dirigente de Ponto de Pregação | Responsável por ponto de pregação / campo |
| `dirigente_setor` | Dirigente de Setor / Região | Coordena várias congregações (ministérios grandes) |
| `superintendente` | Superintendente | Coordenação de área (EBD, missões, etc.) |

## 3.3 Cargos Administrativos da Igreja Local

| Código | Nome | Descrição |
|--------|------|-----------|
| `secretario_geral` | Secretário(a) Geral | Atas, documentos, correspondências oficiais |
| `secretario_adjunto` | Secretário(a) Adjunto(a) | Auxilia a secretaria |
| `tesoureiro` | Tesoureiro(a) | Finanças, dízimos, prestações de contas |
| `tesoureiro_adjunto` | Tesoureiro(a) Adjunto(a) | Auxilia a tesouraria |
| `secretario_tesoureiro` | Secretário-Tesoureiro | Função combinada (igrejas menores) |
| `conselho_fiscal` | Membro do Conselho Fiscal | Fiscalização financeira |
| `conselho_administrativo` | Membro do Conselho Administrativo / Deliberativo | Governança |

## 3.4 Escola Bíblica Dominical (EBD)

| Código | Nome |
|--------|------|
| `superintendente_ebd` | Superintendente de EBD |
| `secretario_ebd` | Secretário(a) de EBD |
| `tesoureiro_ebd` | Tesoureiro(a) de EBD |
| `professor_ebd` | Professor(a) de EBD |
| `professor_ebd_infantil` | Professor(a) EBD Infantil |
| `professor_ebd_jovens` | Professor(a) EBD Jovens |
| `professor_ebd_adultos` | Professor(a) EBD Adultos |
| `auxiliar_ebd` | Auxiliar de EBD |

## 3.5 Círculo de Oração / Senhoras / Mulheres

| Código | Nome |
|--------|------|
| `dirigente_circulo_oracao` | Dirigente do Círculo de Oração |
| `vice_dirigente_circulo` | Vice-Dirigente do Círculo de Oração |
| `secretaria_circulo` | Secretária do Círculo de Oração |
| `tesoureira_circulo` | Tesoureira do Círculo de Oração |
| `dirigente_senhoras` | Dirigente de Senhoras / Departamento de Mulheres |
| `intercessora` | Intercessora |

## 3.6 Departamento de Varões / Homens

| Código | Nome |
|--------|------|
| `dirigente_varoes` | Dirigente de Varões |
| `vice_dirigente_varoes` | Vice-Dirigente de Varões |
| `secretario_varoes` | Secretário de Varões |

## 3.7 Mocidade / Jovens / Adolescentes / Crianças

| Código | Nome |
|--------|------|
| `dirigente_mocidade` | Dirigente de Mocidade / Jovens |
| `vice_dirigente_mocidade` | Vice-Dirigente de Mocidade |
| `secretario_mocidade` | Secretário de Mocidade |
| `dirigente_adolescentes` | Dirigente de Adolescentes |
| `dirigente_juvenis` | Dirigente de Juvenis |
| `dirigente_infantil` | Dirigente do Departamento Infantil |
| `dirigente_criancas` | Dirigente de Crianças |
| `auxiliar_infantil` | Auxiliar Infantil / Tia(o) do Infantil |
| `dirigente_teens` | Dirigente de Teens (quando houver) |
| `dirigente_universitarios` | Dirigente de Universitários / Profissionais |

## 3.8 Louvor, Música e Artes

| Código | Nome |
|--------|------|
| `ministro_louvor` | Ministro de Louvor / Regente |
| `dirigente_louvor` | Dirigente de Louvor |
| `regente_coral` | Regente de Coral |
| `maestro` | Maestro / Regente de Orquestra ou Banda |
| `musico` | Músico / Instrumentista |
| `vocalista` | Vocalista / Cantor(a) |
| `back_vocal` | Back Vocal |
| `tecnico_som` | Técnico de Som |
| `tecnico_iluminacao` | Técnico de Iluminação |
| `dirigente_danca` | Dirigente de Dança / Expressão Corporal (quando houver) |
| `dirigente_teatro` | Dirigente de Teatro / Drama |

## 3.9 Mídia, Comunicação e Tecnologia

| Código | Nome |
|--------|------|
| `dirigente_midia` | Dirigente de Mídia / Comunicação |
| `operador_projecao` | Operador de Projeção / Multimídia |
| `operador_camera` | Operador de Câmera |
| `editor_video` | Editor de Vídeo |
| `designer_grafico` | Designer / Arte |
| `social_media` | Responsável por Redes Sociais |
| `fotografo` | Fotógrafo(a) |

## 3.10 Recepção, Ordem e Apoio ao Culto

| Código | Nome |
|--------|------|
| `dirigente_recepcao` | Dirigente de Recepção / Boas-Vindas |
| `recepcionista` | Recepcionista / Porteiro(a) de Acolhimento |
| `porteiro` | Porteiro(a) |
| `dirigente_ordem` | Dirigente de Ordem / Disciplina no culto |
| `auxiliar_ordem` | Auxiliar de Ordem |
| `dirigente_estacionamento` | Dirigente de Estacionamento |
| `auxiliar_estacionamento` | Auxiliar de Estacionamento |
| `dirigente_limpeza` | Dirigente de Limpeza / Zeladoria |
| `zelador` | Zelador(a) |

## 3.11 Intercessão, Visitação e Ação Social

| Código | Nome |
|--------|------|
| `dirigente_intercessao` | Dirigente de Intercessão |
| `intercessor` | Intercessor(a) |
| `dirigente_visitacao` | Dirigente de Visitação |
| `visitador` | Visitador(a) |
| `dirigente_acao_social` | Dirigente de Ação Social / Assistência |
| `voluntario_social` | Voluntário(a) de Ação Social |
| `dirigente_missoes` | Dirigente de Missões |
| `dirigente_evangelismo` | Dirigente de Evangelismo |

## 3.12 Ensino, Discipulado e Cursos

| Código | Nome |
|--------|------|
| `dirigente_discipulado` | Dirigente de Discipulado |
| `discipulador` | Discipulador(a) |
| `dirigente_cursos` | Dirigente de Cursos / Escola de Líderes |
| `professor_cursos` | Professor(a) de Cursos Bíblicos |
| `conselheiro` | Conselheiro(a) Pastoral (leigo treinado) |

## 3.13 Outros cargos frequentes

| Código | Nome |
|--------|------|
| `dirigente_casais` | Dirigente de Ministério de Casais |
| `dirigente_familias` | Dirigente de Famílias |
| `dirigente_novo_convertido` | Dirigente de Novos Convertidos / Classe de Novos |
| `dirigente_batismo` | Coordenador de Preparação para Batismo |
| `dirigente_santa_ceia` | Coordenador da Mesa da Santa Ceia |
| `cerimonialista` | Cerimonialista (casamentos, eventos) |
| `dirigente_eventos` | Dirigente de Eventos |
| `voluntario_geral` | Voluntário(a) Geral |

---

# 4. DEPARTAMENTOS PADRÃO (SEED AD)

Cada departamento pode ter dirigente, vice, secretário, tesoureiro e membros.

| Código | Nome do Departamento |
|--------|----------------------|
| `ebd` | Escola Bíblica Dominical |
| `circulo_oracao` | Círculo de Oração |
| `senhoras` | Departamento de Senhoras / Mulheres |
| `varoes` | Departamento de Varões |
| `mocidade` | Mocidade / Jovens |
| `adolescentes` | Adolescentes |
| `juvenis` | Juvenis |
| `infantil` | Departamento Infantil / Crianças |
| `louvor` | Ministério de Louvor |
| `coral` | Coral |
| `orquestra_banda` | Orquestra / Banda |
| `midia` | Mídia e Comunicação |
| `recepcao` | Recepção e Boas-Vindas |
| `intercessao` | Intercessão |
| `visitacao` | Visitação |
| `acao_social` | Ação Social |
| `missoes` | Missões |
| `evangelismo` | Evangelismo |
| `discipulado` | Discipulado |
| `casais` | Ministério de Casais |
| `familias` | Ministério de Famílias |
| `novos_convertidos` | Novos Convertidos |
| `estacionamento` | Estacionamento |
| `limpeza` | Limpeza / Zeladoria |
| `ordem` | Ordem e Disciplina |
| `eventos` | Eventos |
| `secretaria` | Secretaria |
| `tesouraria` | Tesouraria |

Departamentos são hierárquicos (`parent_id`) e vinculados a `location` (sede ou congregação).

---

# 5. MODELO DE DADOS — CARGOS, VÍNCULOS E HISTÓRICO

## 5.1 Tabelas novas / expandidas

```sql
-- Catálogo de cargos (por tenant, com seed do sistema)
CREATE TABLE positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- eclesiastico, administrativo, departamento, louvor, ensino, apoio, missao
  rank_order INT NOT NULL DEFAULT 500,
  requires_consecration BOOLEAN NOT NULL DEFAULT false,
  is_system BOOLEAN NOT NULL DEFAULT false, -- seed AD
  is_active BOOLEAN NOT NULL DEFAULT true,
  description TEXT,
  permissions_hint JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, code)
);

-- Unidades da igreja (sede, congregações, pontos, células)
CREATE TABLE church_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES church_units(id),
  type TEXT NOT NULL, -- headquarters, congregation, preaching_point, cell, sector
  name TEXT NOT NULL,
  code TEXT,
  address JSONB,
  leader_person_id UUID REFERENCES people(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  opened_at DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, code)
);

-- Departamentos (já existia; expandir)
-- departments: id, tenant_id, church_unit_id, code, name, parent_id, leader_id, ...

-- Vínculo pessoa ↔ cargo (histórico completo)
CREATE TABLE person_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  position_id UUID NOT NULL REFERENCES positions(id),
  church_unit_id UUID REFERENCES church_units(id), -- onde exerce
  department_id UUID REFERENCES departments(id),   -- se cargo de departamento
  status TEXT NOT NULL DEFAULT 'active', -- active, suspended, concluded, cancelled
  is_primary BOOLEAN NOT NULL DEFAULT false, -- cargo principal exibido no perfil
  started_at DATE NOT NULL,
  ended_at DATE,
  consecrated_at DATE,          -- data da consagração (se houver)
  consecrated_by UUID REFERENCES people(id), -- quem consagrou
  document_url TEXT,            -- ata / certificado
  notes TEXT,
  appointed_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_person_positions_person ON person_positions(tenant_id, person_id);
CREATE INDEX idx_person_positions_active ON person_positions(tenant_id, status) WHERE status = 'active';

-- Credenciais / carteirinhas ministeriais
CREATE TABLE ministerial_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  position_id UUID REFERENCES positions(id),
  credential_number TEXT,
  issued_at DATE,
  expires_at DATE,
  issuing_body TEXT, -- ex: "CGADB", "Convenção Estadual", nome do ministério
  document_url TEXT,
  status TEXT NOT NULL DEFAULT 'valid', -- valid, expired, revoked
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## 5.2 Campos adicionais em `people` (membro)

Além dos campos já definidos no Volume 2:

```text
membership_number          -- número de matrícula / rol de membros
conversion_date            -- data de conversão
holy_spirit_baptism_date   -- batismo com Espírito Santo (doutrina AD)
origin_church              -- igreja de onde veio (transferência)
transfer_letter_url        -- carta de mudança
member_since               -- data de admissão no rol
member_status_detail       -- active | under_discipline | leave | transferred_out | deceased
preferred_church_unit_id   -- congregação que frequenta
is_tither                  -- dizimista (flag informativa)
spiritual_gifts            -- text[] ou relação
availability_notes         -- observações para escala
emergency_contact          -- jsonb
```

## 5.3 Regras de negócio do vínculo cargo

1. Uma pessoa pode ter **vários cargos** ao mesmo tempo (ex.: Diácono + Dirigente de Louvor + Professor EBD).
2. Apenas **um** `is_primary = true` por pessoa (cargo exibido em destaque).
3. Cargos com `requires_consecration = true` devem registrar `consecrated_at` (ou fluxo de aprovação).
4. Ao encerrar cargo (`ended_at` + status `concluded`), o histórico permanece para relatórios e carteirinha.
5. Escalas (Agente Escalas) consultam `person_positions` + `person_competencies` + `availability`.
6. Relatórios: “lista de diáconos ativos”, “obreiros da congregação X”, “histórico ministerial do membro Y”.

## 5.4 Permissões sugeridas por categoria de cargo

| Categoria | Permissões típicas no sistema |
|-----------|-------------------------------|
| Pastor Presidente | Quase total no tenant (exceto billing SaaS) |
| Pastor / Presbítero | people:read/write, pastoral, scales approve, events |
| Diácono / Obreiro | people:read, scales, attendance, prayer |
| Tesoureiro | finance:* |
| Secretário | people:*, documents, events |
| Dirigente de departamento | scales do seu depto, members do depto |
| Membro comum | me:*, prayer, contributions, events register |
| Voluntário de mídia | media:*, publish (com aprovação) |

O mapeamento exato fica em `role_permissions` + overrides por `person_positions`.

---

# 6. FLUXOS ESPECÍFICOS AD

### 6.1 Admissão de membro
1. Visitante cadastrado → acompanhamento  
2. Conversão / decisão registrada  
3. Discipulado / classe de novos convertidos  
4. Batismo nas águas (data + oficiante)  
5. Batismo com Espírito Santo (opcional, data)  
6. Admissão no rol de membros (número de matrícula)  
7. Carta de mudança (se transferência)  
8. Consentimentos LGPD  

### 6.2 Consagração de obreiro
1. Indicação / aspirante  
2. Período de observação  
3. Aprovação do pastor / conselho  
4. Culto de consagração (data, oficiantes)  
5. Registro em `person_positions` + credencial  
6. Atualização de permissões  

### 6.3 Transferência (carta de mudança)
1. Solicitação  
2. Emissão de carta (PDF com dados e cargos)  
3. Status `transferred_out`  
4. Igreja destino pode importar via código/QR (futuro inter-tenant)

### 6.4 Disciplina
1. Registro confidencial (acesso restrito a pastores)  
2. Status `under_discipline`  
3. Acompanhamento e restauração  
4. Auditoria completa  

---

# 7. SEED SQL / TYPESCRIPT (RESUMO PARA O AGENTE)

O agente deve criar:

1. Migration das tabelas `positions`, `church_units`, `person_positions`, `ministerial_credentials`
2. Seed `positions` com **todos** os códigos da seção 3 (is_system = true)
3. Seed `departments` com todos os da seção 4
4. Seed de uma `church_unit` tipo `headquarters` na criação do tenant
5. UI:  
   - Cadastro de membro com aba **Cargos e Ministérios**  
   - Filtros por cargo, departamento, congregação  
   - Relatório “Corpo de Obreiros”  
   - Carteirinha digital com cargo principal e credencial  
6. Agente Secretaria e Agente RH Ministerial devem conhecer todos esses cargos em linguagem natural  
   - Ex.: “Liste os diáconos da congregação Centro”  
   - “Consagre João Silva como presbítero em 15/03/2026”

---

# 8. EXEMPLOS DE COMANDOS EM LINGUAGEM NATURAL (WHATSAPP / CHAT)

- “Cadastre Maria Oliveira como membro, congregação Jardim, batizada em 10/01/2025”
- “Quem são os diáconos ativos?”
- “Promova Carlos a presbítero a partir de hoje”
- “Escale os músicos e o ministro de louvor para domingo”
- “Quantos membros temos na mocidade?”
- “Emita carta de mudança do membro Pedro Santos”
- “Liste o corpo de obreiros da sede”
- “Quem é o dirigente do círculo de oração?”

---

# 9. RELATÓRIOS OBRIGATÓRIOS (AD)

1. Rol de membros (ativos, por congregação)  
2. Corpo de obreiros (por cargo e unidade)  
3. Aniversariantes do mês  
4. Batismos do período  
5. Transferências emitidas/recebidas  
6. Frequência EBD e cultos  
7. Dizimistas (agregado, sem expor valores individuais indevidamente)  
8. Mapa de congregações e dirigentes  
9. Histórico ministerial individual (para credencial / currículo)

---

# 10. CHECKLIST DE IMPLEMENTAÇÃO DESTE VOLUME

- [ ] Tabelas `positions`, `church_units`, `person_positions`, `ministerial_credentials`
- [ ] Seed completo de cargos AD (seção 3)
- [ ] Seed de departamentos AD (seção 4)
- [ ] UI de vínculo membro ↔ cargo com histórico
- [ ] Filtros e relatórios por cargo
- [ ] Carteirinha digital com cargo
- [ ] Agente Secretaria/RH entendendo nomes de cargos em pt-BR
- [ ] Fluxos: admissão, consagração, transferência, disciplina
- [ ] Permissões sugeridas por categoria
- [ ] Documentação no README do módulo ministerial

---

**FIM DO VOLUME 3 — ASSEMBLEIA DE DEUS**

Este volume é parte integrante da especificação Assembleia IA e deve ser implementado integralmente para que a plataforma fale a língua real das igrejas Assembleia de Deus no Brasil.
