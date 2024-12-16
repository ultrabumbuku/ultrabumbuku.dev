import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execPromise = promisify(exec);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { storeUrl } = req.query;

  if (!storeUrl || typeof storeUrl !== 'string') {
    return res.status(400).json({ error: '店舗URLが必要です' });
  }

  try {
    const scriptPath = path.join(process.cwd(), 'components/sushiro_scrape.py');
    const { stdout } = await execPromise(`python3 "${scriptPath}" "${storeUrl}"`);
    const menuData = JSON.parse(stdout);
    res.status(200).json(menuData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'メニューの取得に失敗しました' });
  }
}