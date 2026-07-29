import random
from datetime import datetime, timedelta
import sqlite3

PRENOMES_MASC = ["João", "Pedro", "Lucas", "Mateus", "Gabriel", "Guilherme", "Gustavo", "Felipe", "Rafael", "Daniel", "Marcos", "Paulo", "André", "Samuel", "David", "Carlos", "Eduardo", "Rodrigo", "Fernando", "Marcelo", "Thiago", "Diego", "Alexandre", "Leonardo"]
PRENOMES_FEM = ["Maria", "Ana", "Julia", "Beatriz", "Mariana", "Camila", "Larissa", "Amanda", "Letícia", "Jessica", "Fernanda", "Patrícia", "Bruna", "Vanessa", "Aline", "Carla", "Priscila", "Renata", "Paula", "Daniela", "Gabriela", "Rafaela", "Tatiane", "Luciana", "Adriana"]
SOBRENOMES = ["Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida", "Lopes", "Soares", "Fernandes", "Vieira", "Barbosa", "Rocha", "Dias", "Nascimento", "Andrade", "Moreira"]

BAIRROS = ["Centro", "Jardim Esperança", "Vila Nova", "São José", "Monte Sinai", "Bairro das Flores", "Alto do Bosque", "Planalto", "Bela Vista", "Santa Cruz"]
LOGRADOUROS = ["Rua Principal", "Av. Brasil", "Rua das Palmeiras", "Av. Central", "Rua São Paulo", "Rua das Acácias", "Av. Getúlio Vargas", "Rua Sete de Setembro"]

TALENTOS_LISTA = ["Pregação", "Instrumentista", "Canto", "Ensino", "Administração", "Evangelismo", "Sonoplastia", "Ornamentação", "Acolhimento"]
NECESSIDADES_LISTA = ["", "", "", "", "", "Usa aparelho auditivo", "Necessita acessibilidade", "Diabético", "Visão reduzida"]

def random_date(start_year, end_year):
    start = datetime(start_year, 1, 1)
    end = datetime(end_year, 12, 31)
    return start + timedelta(days=random.randint(0, (end - start).days))

def generate_cpf(index):
    # CPF único baseado no índice do membro
    p1 = 100 + (index // 1000)
    p2 = (index * 7) % 900 + 100
    p3 = (index * 13) % 900 + 100
    p4 = (index * 3) % 90 + 10
    return f"{p1:03d}.{p2:03d}.{p3:03d}-{p4:02d}"

def generate_rg(index):
    return f"{(index % 80) + 10:02d}.{index * 11 % 900 + 100:03d}.{index * 17 % 900 + 100:03d}-{index % 10}"

def generate_phone(index):
    return f"(11) 9{8000 + (index % 1999):04d}-{1000 + (index * 3 % 8999):04d}"

def main():
    congregacao_distribution = [1]*350 + [2]*150 + [3]*120 + [4]*100 + [5]*80
    random.shuffle(congregacao_distribution)

    idades_pool = (
        [random.randint(13, 17) for _ in range(80)] +
        [random.randint(18, 30) for _ in range(200)] +
        [random.randint(31, 59) for _ in range(400)] +
        [random.randint(60, 85) for _ in range(120)]
    )
    random.shuffle(idades_pool)

    sql_statements = [
        "-- ==========================================\n"
        "-- SCRIPT DE SEED IGREJA ASSEMBLEIA DE DEUS (800 MEMBROS)\n"
        "-- ==========================================\n\n"
        "PRAGMA foreign_keys = OFF;\n\n"
        "BEGIN TRANSACTION;\n\n"
        "DELETE FROM historico_membros;\n"
        "DELETE FROM membro_ministerio;\n"
        "DELETE FROM observacoes_membro;\n"
        "DELETE FROM carteirinhas;\n"
        "DELETE FROM fotos_membros;\n"
        "DELETE FROM vida_espiritual;\n"
        "DELETE FROM filhos;\n"
        "DELETE FROM familiares;\n"
        "DELETE FROM membros;\n"
        "DELETE FROM ministerios;\n"
        "DELETE FROM congregacoes;\n"
        "DELETE FROM usuarios;\n\n"
        "-- 1. CONGREGAÇÕES\n"
        "INSERT INTO congregacoes (id, nome, endereco, telefone, pastor_responsavel) VALUES\n"
        "(1, 'Assembleia de Deus - Sede Central', 'Av. Central, 1000 - Centro', '(11) 3333-1000', 'Pastor Titular Sede'),\n"
        "(2, 'Congregação Jardim Esperança', 'Rua das Flores, 200 - Jd. Esperança', '(11) 3333-2000', 'Pastor Dirigente Esperança'),\n"
        "(3, 'Congregação Vila Nova', 'Rua Nova, 50 - Vila Nova', '(11) 3333-3000', 'Evangelista Dirigente Vila Nova'),\n"
        "(4, 'Congregação São José', 'Av. São José, 400 - São José', '(11) 3333-4000', 'Presbítero Dirigente São José'),\n"
        "(5, 'Congregação Monte Sinai', 'Rua do Monte, 12 - Monte Sinai', '(11) 3333-5000', 'Pastor Dirigente Monte Sinai');\n\n"
        "-- 2. MINISTÉRIOS / DEPARTAMENTOS (15)\n"
        "INSERT INTO ministerios (id, nome, descricao) VALUES\n"
        "(1, 'Pastorado', 'Corpo pastoral da igreja'),\n"
        "(2, 'Diaconato', 'Serviço e assistência diaconal'),\n"
        "(3, 'Presbíteros', 'Presbitério e aconselhamento'),\n"
        "(4, 'Evangelismo', 'Equipe de evangelismo pessoal e praças'),\n"
        "(5, 'Missões', 'Departamento de missões nacionais e transculturais'),\n"
        "(6, 'Louvor', 'Ministério de música, coral e orquestra'),\n"
        "(7, 'Escola Bíblica Dominical', 'Professores e alunos da EBD'),\n"
        "(8, 'Crianças', 'Departamento infantil e Tia Semeadora'),\n"
        "(9, 'Adolescentes', 'União de Adolescentes'),\n"
        "(10, 'Jovens', 'Mocidade e Juventude'),\n"
        "(11, 'Círculo de Oração', 'Círculo de Oração Coluna de Fogo'),\n"
        "(12, 'Recepção', 'Equipe de acolhimento na portaria'),\n"
        "(13, 'Mídia e Tecnologia', 'Som, iluminação e transmissão ao vivo'),\n"
        "(14, 'Ação Social', 'Assistência social e cestas básicas'),\n"
        "(15, 'Secretaria', 'Secretaria e registros ministeriais');\n\n"
        "-- 3. USUÁRIOS DO SISTEMA\n"
        "INSERT INTO usuarios (nome, email, senha_hash, perfil, ativo) VALUES\n"
        "('Administrador Geral', 'admin@assembleia.com', 'hash_admin_123', 'Administrador', 1),\n"
        "('Pastor Presidente', 'pastor@assembleia.com', 'hash_pastor_123', 'Pastor', 1),\n"
        "('Secretária Titular', 'secretaria@assembleia.com', 'hash_sec_123', 'Secretaria', 1);\n\n"
    ]

    min_counts = {i: 0 for i in range(1, 16)}
    min_targets = {1:5, 2:20, 3:15, 4:120, 5:80, 6:50, 7:300, 8:40, 9:80, 10:150, 11:180, 12:40, 13:20, 14:50, 15:10}

    current_year = 2026

    for i in range(1, 801):
        num_str = f"{i:06d}"
        num_membro = num_str
        num_carteirinha = f"AD-{num_str}"
        cong_id = congregacao_distribution[i-1]

        idade = idades_pool[i-1]
        birth_year = current_year - idade
        data_nasc = random_date(birth_year, birth_year).strftime("%Y-%m-%d")

        sexo = "Masculino" if random.random() < 0.5 else "Feminino"
        
        if idade < 18:
            estado_civil = "Solteiro"
        elif idade > 65 and random.random() < 0.3:
            estado_civil = "Viúvo"
        elif random.random() < 0.65:
            estado_civil = "Casado"
        else:
            estado_civil = "Solteiro"

        nome = f"{random.choice(PRENOMES_MASC if sexo == 'Masculino' else PRENOMES_FEM)} {random.choice(SOBRENOMES)} {random.choice(SOBRENOMES)}"
        cpf = generate_cpf(i)
        rg = generate_rg(i)
        fone = generate_phone(i)
        email = f"membro{i}@assembleia.com"
        end = f"{random.choice(LOGRADOUROS)}, {random.randint(10,999)}"
        bairro = random.choice(BAIRROS)
        cep = f"{random.randint(10000,99999):05d}-{random.randint(100,999):03d}"

        # Insert Membro
        sql_statements.append(
            f"INSERT INTO membros (id, numero_membro, congregacao_id, nome_completo, data_nascimento, sexo, estado_civil, cpf, rg, telefone, whatsapp, email, endereco, numero, bairro, cidade, estado, cep, ativo) VALUES "
            f"({i}, '{num_membro}', {cong_id}, '{nome}', '{data_nasc}', '{sexo}', '{estado_civil}', '{cpf}', '{rg}', '{fone}', '{fone}', '{email}', '{end}', '{random.randint(1,500)}', '{bairro}', 'São Paulo', 'SP', '{cep}', 1);"
        )

        # 60% tem familiares
        if random.random() < 0.6:
            pai = f"{random.choice(PRENOMES_MASC)} {nome.split()[-1]}"
            mae = f"{random.choice(PRENOMES_FEM)} {nome.split()[-1]}"
            conjuge = f"{random.choice(PRENOMES_FEM if sexo == 'Masculino' else PRENOMES_MASC)} {nome.split()[-1]}" if estado_civil == "Casado" else ""
            sql_statements.append(
                f"INSERT INTO familiares (membro_id, nome_pai, nome_mae, nome_conjuge) VALUES "
                f"({i}, '{pai}', '{mae}', '{conjuge}');"
            )

        # Casados 40% tem filhos (1 a 3)
        if estado_civil == "Casado" and random.random() < 0.4:
            num_filhos = random.randint(1, 3)
            for f_idx in range(num_filhos):
                nome_filho = f"{random.choice(PRENOMES_MASC if random.random() < 0.5 else PRENOMES_FEM)} {nome.split()[-1]}"
                idade_filho = random.randint(1, min(25, max(1, idade - 18)))
                data_filho = f"{current_year - idade_filho}-05-10"
                sql_statements.append(
                    f"INSERT INTO filhos (membro_id, nome, data_nascimento, idade) VALUES ({i}, '{nome_filho}', '{data_filho}', {idade_filho});"
                )

        # Vida Espiritual
        has_conv = 1 if random.random() < 0.8 else 0
        conv_date = random_date(max(birth_year + 10, 1990), current_year - 1).strftime("%Y-%m-%d") if has_conv else None
        
        bat_aguas = 1 if random.random() < 0.7 else 0
        bat_date = random_date(max(birth_year + 12, 1992), current_year).strftime("%Y-%m-%d") if bat_aguas else None
        igreja_bat = "Assembleia de Deus Sede" if bat_aguas else ""

        bat_espirito = 1 if random.random() < 0.55 else 0
        veio_outra = 1 if random.random() < 0.20 else 0
        igreja_ant = "Igreja Evangélica Renovada" if veio_outra else ""

        conv_str = f"'{conv_date}'" if conv_date else "NULL"
        bat_str = f"'{bat_date}'" if bat_date else "NULL"

        sql_statements.append(
            f"INSERT INTO vida_espiritual (membro_id, data_conversao, batizado_aguas, data_batismo, igreja_batismo, batismo_espirito_santo, veio_outra_igreja, igreja_anterior) VALUES "
            f"({i}, {conv_str}, {bat_aguas}, {bat_str}, '{igreja_bat}', {bat_espirito}, {veio_outra}, '{igreja_ant}');"
        )

        # Foto do membro
        sql_statements.append(
            f"INSERT INTO fotos_membros (membro_id, arquivo, caminho, extensao, principal) VALUES "
            f"({i}, '{num_str}.jpg', 'uploads/membros/{num_str}.jpg', 'jpg', 1);"
        )

        # Carteirinha
        dt_emissao = random_date(2024, 2026).strftime("%Y-%m-%d")
        dt_validade = f"{int(dt_emissao[:4]) + 5}{dt_emissao[4:]}"
        sql_statements.append(
            f"INSERT INTO carteirinhas (membro_id, numero, data_emissao, validade, arquivo) VALUES "
            f"({i}, '{num_carteirinha}', '{dt_emissao}', '{dt_validade}', 'carteirinhas/{num_carteirinha}.png');"
        )

        # Observações
        talento = random.choice(TALENTOS_LISTA)
        neces = random.choice(NECESSIDADES_LISTA)
        emerg_nome = f"Contato Emergência {i}"
        emerg_fone = generate_phone(i)
        sql_statements.append(
            f"INSERT INTO observacoes_membro (membro_id, talentos, necessidades_especiais, contato_emergencia, telefone_emergencia) VALUES "
            f"({i}, '{talento}', '{neces}', '{emerg_nome}', '{emerg_fone}');"
        )

        # Histórico
        sql_statements.append(
            f"INSERT INTO historico_membros (membro_id, usuario_id, acao, descricao) VALUES "
            f"({i}, 1, 'Abertura de cadastro', 'Cadastro inicial importado no sistema');"
        )

        # Atribuição aos ministérios
        assigned_mins = []
        if idade <= 17:
            assigned_mins.append(9)
        elif 18 <= idade <= 30:
            assigned_mins.append(10)

        if sexo == "Feminino" and idade >= 30:
            assigned_mins.append(11)

        if min_counts[7] < min_targets[7] and random.random() < 0.5:
            assigned_mins.append(7)

        for min_id in [1, 2, 3, 4, 5, 6, 8, 12, 13, 14, 15]:
            if min_counts[min_id] < min_targets[min_id] and random.random() < 0.25:
                assigned_mins.append(min_id)

        if not assigned_mins:
            assigned_mins.append(7)

        for m_id in set(assigned_mins):
            min_counts[m_id] += 1
            sql_statements.append(
                f"INSERT INTO membro_ministerio (membro_id, ministerio_id, data_inicio, ativo) VALUES "
                f"({i}, {m_id}, '2026-01-01', 1);"
            )

    sql_statements.append("\nPRAGMA foreign_keys = ON;\nCOMMIT;\n")

    with open("/home/julian/Documentos/Projeto AssembleIA/seed_igreja_assembleia.sql", "w", encoding="utf-8") as f:
        f.write("\n".join(sql_statements))

    # Reset Script
    reset_sql = """-- SCRIPT DE RESET DE SEED
PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
DELETE FROM historico_membros;
DELETE FROM membro_ministerio;
DELETE FROM observacoes_membro;
DELETE FROM carteirinhas;
DELETE FROM fotos_membros;
DELETE FROM vida_espiritual;
DELETE FROM filhos;
DELETE FROM familiares;
DELETE FROM membros;
DELETE FROM ministerios;
DELETE FROM congregacoes;
DELETE FROM usuarios;
PRAGMA foreign_keys = ON;
COMMIT;
"""
    with open("/home/julian/Documentos/Projeto AssembleIA/reset_seed.sql", "w", encoding="utf-8") as f:
        f.write(reset_sql)

    print("✅ seed_igreja_assembleia.sql e reset_seed.sql gerados com sucesso!")

if __name__ == "__main__":
    main()
