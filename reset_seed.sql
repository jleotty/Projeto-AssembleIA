-- SCRIPT DE RESET DE SEED
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
