import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { storeName } = req.query;

  if (!storeName || typeof storeName !== 'string') {
    return res.status(400).json({ error: '店舗名を入力してください' });
  }

  const storeUrl = `https://akindo-sushiro.co.jp/menu/menu_detail/?s_id=${encodeURIComponent(storeName)}`;

  try {
    const response = await axios.get(storeUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept-Language': 'ja-JP,ja;q=0.9',
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);
    const menuItems = $('div.menu-item');

    if (menuItems.length === 0) {
      return res.status(404).json({ error: 'メニューが見つかりませんでした' });
    }

    const menuList = menuItems.map((_, element) => {
      const name = $(element).find('div.menu-item__name').text().trim();
      const priceText = $(element).find('div.menu-item__price').text().trim();

      const cleanedPrice = priceText.replace('(税込)', '').replace('円', '').replace(',', '').trim();
      const priceValue = parseInt(cleanedPrice, 10);

      if (!isNaN(priceValue)) {
        return { name, price: priceValue };
      }
      return null;
    }).get().filter(item => item !== null);

    res.status(200).json(menuList);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'メニューの取得に失敗しました' });
  }
}