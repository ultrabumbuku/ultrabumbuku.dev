import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execPromise = promisify(exec);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { storeName } = req.query;

  if (!storeName || typeof storeName !== 'string') {
    return res.status(400).json({ error: '店舗名が必要です' });
  }

  try {
    // sushiro_all_shops.jsonのパス
    const shopsJsonPath = path.join(process.cwd(), 'sushiro_data', 'sushiro_all_shops.json');
    
    if (!fs.existsSync(shopsJsonPath)) {
      return res.status(500).json({ error: '店舗データファイルが存在しません' });
    }

    // sushiro_all_shops.jsonを読み込む
    const shopsData = JSON.parse(fs.readFileSync(shopsJsonPath, 'utf-8'));

    // 店舗名からstoreUrlを取得
    const store = shopsData.find((shop: { name: string }) => shop.name === storeName);

    if (!store) {
      return res.status(404).json({ error: '指定された店舗が見つかりませんでした' });
    }

    const storeUrl = store.url;

    // sushiro_scrape.pyのパス
    const scriptPath = path.join(process.cwd(), 'components', 'sushiro_scrape.py');

    // Pythonスクリプトを実行
    const { stdout } = await execPromise(`python3 "${scriptPath}" "${storeUrl}"`);
    const menuData = JSON.parse(stdout);

    res.status(200).json(menuData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'メニューの取得に失敗しました' });
  }
}