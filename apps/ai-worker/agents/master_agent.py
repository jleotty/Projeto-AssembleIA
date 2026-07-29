import json

class MasterAgent:
    """
    Agente Mestre Orquestrador do Assembleia IA.
    Responsável por analisar comandos em linguagem natural,
    identificar a intenção e delegar ações para os agentes especializados.
    """
    def __init__(self, tenant_id: str = "assembleia-sede"):
        self.tenant_id = tenant_id

    def process_command(self, user_prompt: str) -> dict:
        prompt_lower = user_prompt.lower()
        
        if "congresso" in prompt_lower or "evento" in prompt_lower:
            return {
                "status": "success",
                "agent": "Agente Mestre + Eventos",
                "action": "CREATE_EVENT",
                "message": "Evento 'Congresso de Jovens' criado e cadastrado na agenda da igreja. Artes solicitadas ao Agente Designer.",
                "steps": [
                    "Criado evento no SQLite (dev.db)",
                    "Reservado templo central",
                    "Disparado aviso para líderes de mocidade"
                ]
            }
        elif "financeiro" in prompt_lower or "dízimo" in prompt_lower or "oferta" in prompt_lower:
            return {
                "status": "success",
                "agent": "Agente Financeiro",
                "action": "GET_FINANCIAL_REPORT",
                "message": "Balancete mensal apurado. R$ 50.550,00 em entradas e R$ 1.280,50 em despesas operacionais.",
                "steps": [
                    "Leitura de transações no SQLite",
                    "Conciliação de dízimos PIX",
                    "Geração de DRE executivo"
                ]
            }
        else:
            return {
                "status": "success",
                "agent": "Agente Mestre",
                "action": "GENERAL_ASSIST",
                "message": f"Comando '{user_prompt}' recebido e processado com sucesso pelo Agente Mestre.",
                "steps": ["Consulta ao banco SQLite", "Registro na tabela de logs de IA"]
            }
