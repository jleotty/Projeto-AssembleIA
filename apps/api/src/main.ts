import express, { Request, Response } from 'express';
import cors from 'cors';
import { db } from '@assembleia/db';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Middleware de Logs e Tenant
app.use((req: Request, res: Response, next) => {
  const tenantSlug = req.headers['x-tenant-slug'] as string || 'assembleia-sede';
  console.log(`[API] ${req.method} ${req.url} — Tenant: ${tenantSlug}`);
  next();
});

// Health Check Endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', engine: 'SQLite', timestamp: new Date().toISOString() });
});

// GET /api/v1/tenants
app.get('/api/v1/tenants', async (req: Request, res: Response) => {
  try {
    const tenants = await db.tenant.findMany();
    res.json({ success: true, data: tenants });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/members
app.get('/api/v1/members', async (req: Request, res: Response) => {
  try {
    const members = await db.member.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: members });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/financial/transactions
app.get('/api/v1/financial/transactions', async (req: Request, res: Response) => {
  try {
    const transactions = await db.financialTransaction.findMany({
      take: 50,
      orderBy: { date: 'desc' },
    });
    res.json({ success: true, data: transactions });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AssembleIA Core API executando em http://localhost:${PORT}`);
});
