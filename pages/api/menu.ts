import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { MenuItem } from '../../types/types';

type MenuResponse = MenuItem[] | { error: string };

// 除外するキーワード一覧
const EXCLUDE_KEYWORDS = [
  '特上セット',
  'スシローセット',
  'まぐろサーモンセット',
  'スシロー手巻セット',
  '粉末緑茶',
  '赤だし（カップ）',
  '甘だれ'
];

function isTakeoutSet(name: string): boolean {
  return EXCLUDE_KEYWORDS.some(keyword => name.includes(keyword));
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<MenuResponse>
) {
  // 店舗は「つくば学園の森店」に固定
  const menuUrl = 'https://www.akindo-sushiro.co.jp/menu/menu_detail/?s_id=528';

  try {
    const menuResponse = await axios.get(menuUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'ja-JP,ja;q=0.9',
      },
    });

    const $ = cheerio.load(menuResponse.data);
    const menuItems = $('.menu-item');

    if (menuItems.length === 0) {
      return res.status(404).json({ error: 'メニュー情報が見つかりませんでした' });
    }

    const menuList: MenuItem[] = [];
    
    menuItems.each((_, element) => {
      const name = $(element).find('.menu-item__name').text().trim();
      if (!name || isTakeoutSet(name)) return; // 除外
      const priceText = $(element).find('.menu-item__price').text().replace(/\s+/g, '').trim();
      // 価格テキストから数値のみを抽出
      const cleanedPrice = priceText.replace(/[^0-9]/g, '');
      const price = parseInt(cleanedPrice, 10);
      if (name && !isNaN(price)) {
        menuList.push({ name, price });
      }
    });

    if (menuList.length === 0) {
      return res.status(404).json({ error: 'メニュー情報の解析に失敗しました' });
    }

    res.status(200).json(menuList);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'メニューの取得中にエラーが発生しました' });
  }
}