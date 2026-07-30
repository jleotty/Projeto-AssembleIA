from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from agents.hf_agent import HuggingFaceAgent
import os

app = FastAPI(title="AssembleIA AI Worker — Hugging Face & LangGraph Engine")
hf_agent = HuggingFaceAgent()

class ChatRequest(BaseModel):
    message: str
    context: str = ""
    sender_phone: str = ""

@app.get("/")
def read_root():
    return {
        "status": "online",
        "engine": "Hugging Face Inference API",
        "model": os.getenv("HF_MODEL", "meta-llama/Llama-3.1-8B-Instruct"),
        "max_tokens": 300,
        "temperature": 0.3
    }

@app.post("/chat")
def chat_endpoint(req: ChatRequest):
    try:
        reply = hf_agent.reply(req.message, req.context)
        return {"success": True, "reply": reply}
    except Exception as e:
        return {"success": False, "reply": "No momento não consigo processar. Tente novamente."}
