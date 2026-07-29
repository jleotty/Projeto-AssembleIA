from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from agents.master_agent import MasterAgent

app = FastAPI(
    title="AssembleIA — AI Workers & LangGraph Agent Engine",
    description="Microserviço de Agentes de IA Autônomos (Agente Mestre, Pastoral, Financeiro, Escalas, Mídia)",
    version="2.0.0"
)

class AgentQueryRequest(BaseModel):
    tenant_id: str = "assembleia-sede"
    user_prompt: str
    user_role: str = "PASTOR"

@app.get("/health")
def health_check():
    return {"status": "online", "engine": "LangGraph Python", "sqlite_connected": True}

@app.post("/api/v1/agent/master")
def run_master_agent(query: AgentQueryRequest):
    try:
        agent = MasterAgent(tenant_id=query.tenant_id)
        result = agent.process_command(query.user_prompt)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
