import { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execPromise = promisify(exec);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { storeName } = req.query;

  if (!storeName || typeof storeName !== 'string') {
    return res.status(400).json({ error: '店舗名が必要です' });
  }

  try {
    const scriptPath = path.join(process.cwd(), 'api/sushiro_scrape.py');
    const storeUrl = `https://akindo-sushiro.co.jp/menu/menu_detail/?s_id=${storeName}`;

    const pythonCmd = 'python3'; // Vercelの環境でPython3が利用可能であることを前提としています
    console.log(`Executing command: ${pythonCmd} "${scriptPath}" "${storeUrl}"`);
    const { stdout, stderr } = await execPromise(`${pythonCmd} "${scriptPath}" "${storeUrl}"`);

    if (stderr) {
      console.error(`Python script error: ${stderr}`);
      return res.status(500).json({ error: `Python実行エラー: ${stderr}` });
    }

    let menuData;
    try {
      menuData = JSON.parse(stdout);
    } catch (parseError) {
      console.error(`JSON parse error: ${parseError}`);
      return res.status(500).json({ error: 'JSONの解析に失敗しました', details: parseError.message });
    }

    if ('error' in menuData) {
      console.error(`Menu data error: ${menuData.error}`);
      return res.status(404).json(menuData);
    }

    return res.status(200).json(menuData);

  } catch (error) {
    console.error('System error:', error);
    return res.status(500).json({
      error: 'メニューの取得に失敗しました',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}