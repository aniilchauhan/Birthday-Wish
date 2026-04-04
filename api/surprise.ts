import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import connectDB from '../lib/mongodb';
import { Surprise } from '../lib/models/Surprise';

type SurpriseDoc = { key: string; config: unknown };
const SurpriseModel = Surprise as Model<SurpriseDoc>;

const MAX_CONFIG_BYTES = 450_000;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  try {
    await connectDB();
  } catch (e) {
    console.error('Mongo connect failed:', e);
    res.status(503).json({ error: 'Database unavailable' });
    return;
  }

  if (req.method === 'GET') {
    const k = typeof req.query.k === 'string' ? req.query.k : '';
    if (!k || k.length < 6 || k.length > 32 || !/^[A-Za-z0-9_-]+$/.test(k)) {
      res.status(400).json({ error: 'Invalid key' });
      return;
    }
    const doc = await SurpriseModel.findOne({ key: k }).lean();
    if (!doc) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    res.status(200).json({ config: doc.config });
    return;
  }

  if (req.method === 'POST') {
    const body = req.body as { config?: unknown };
    const config = body?.config;
    if (!config || typeof config !== 'object' || Array.isArray(config)) {
      res.status(400).json({ error: 'Missing or invalid config' });
      return;
    }
    const raw = JSON.stringify(config);
    if (raw.length > MAX_CONFIG_BYTES) {
      res.status(413).json({ error: 'Config too large' });
      return;
    }

    for (let attempt = 0; attempt < 6; attempt++) {
      const key = nanoid(12);
      try {
        await SurpriseModel.create({ key, config });
        res.status(200).json({ key });
        return;
      } catch (err: unknown) {
        const code = err && typeof err === 'object' && 'code' in err ? (err as { code: number }).code : 0;
        if (code === 11000) continue;
        throw err;
      }
    }
    res.status(500).json({ error: 'Could not allocate id' });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
