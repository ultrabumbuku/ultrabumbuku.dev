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
    const shopsJsonPath = path.join(process.cwd(), 'components', 'sushiro_data', 'sushiro_all_shops.json');
    
    if (!fs.existsSync(shopsJsonPath)) {
      console.error('店舗データファイルが見つかりません:', shopsJsonPath);
      return res.status(500).json({ error: '店舗データファイルが存在しません' });
    }

    // sushiro_all_shops.jsonを読み込む
    const shopsData = JSON.parse(fs.readFileSync(shopsJsonPath, 'utf-8'));

    // 店舗名からstoreUrlを取得
    const store = shopsData.find((shop: { name: string }) => shop.name === storeName);

    if (!store) {
      console.error('店舗が見つかりません:', storeName);
      return res.status(404).json({ error: '指定された店舗が見つかりませんでした' });
    }

    const storeUrl = store.url;
    console.log('取得する店舗URL:', storeUrl);

    // sushiro_scrape.pyのパス
    const scriptPath = path.join(process.cwd(), 'components', 'sushiro_scrape.py');

    if (!fs.existsSync(scriptPath)) {
      console.error('Pythonスクリプトが見つかりません:', scriptPath);
      return res.status(500).json({ error: 'スクリプトファイルが存在しません' });
    }

    // Pythonスクリプトを実行
    const { stdout, stderr } = await execPromise(`python3 "${scriptPath}" "${storeUrl}"`);

    if (stderr) {
      console.error('Pythonスクリプトエラー:', stderr);
      return res.status(500).json({ error: `スクリプト実行エラー: ${stderr}` });
    }

    try {
      const menuData = JSON.parse(stdout);
      
      // エラーレスポンスのチェック
      if (menuData.error) {
        console.error('メニュー取得エラー:', menuData.error);
        return res.status(404).json({ error: menuData.error });
      }

      // メニューデータの存在確認
      if (!Array.isArray(menuData) || menuData.length === 0) {
        console.error('メニューデータが空です');
        return res.status(404).json({ error: 'メニューが見つかりませんでした' });
      }

      res.status(200).json(menuData);
    } catch (parseError) {
      console.error('JSON解析エラー:', parseError);
      console.error('受信したデータ:', stdout);
      return res.status(500).json({ error: 'メニューデータの解析に失敗しました' });
    }
  } catch (error) {
    console.error('予期せぬエラー:', error);
    res.status(500).json({ 
      error: 'メニューの取得に失敗しました',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}