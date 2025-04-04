<<<<<<< HEAD
import type { NextApiRequest, NextApiResponse } from 'next'
import * as cheerio from 'cheerio'
import fetch from 'cross-fetch'

interface MenuItem {
  name: string
  price: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const storeUrl = 'https://akindo-sushiro.co.jp/menu/menu_detail/?s_id=528'

  try {
    const response = await fetch(storeUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ja',
        'Referer': 'https://akindo-sushiro.co.jp/',
      },
    })

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`)
      res.status(response.status).json({ error: 'メニューの取得に失敗しました' })
      return
    }

    const html = await response.text()
    
    if (!html) {
      console.error('Empty HTML response')
      res.status(500).json({ error: 'HTML の取得に失敗しました' })
      return
    }

    const $ = cheerio.load(html)
    const menuItems: MenuItem[] = []

    $('.menu-item').each((index, element) => {
      const name = $(element).find('.menu-item__name').text().trim()
      const priceText = $(element).find('.menu-item__price').text().trim()
      const priceValue = parseInt(priceText.replace(/[^\d]/g, ''), 10)

      // 持ち帰り商品とセット商品を除外
      if (name && !isNaN(priceValue) && !name.includes('特上セット')) {
        menuItems.push({ name, price: priceValue })
      }
    })

    if (menuItems.length === 0) {
      console.error('No menu items found')
      res.status(500).json({ error: 'メニュー項目が見つかりませんでした' })
      return
    }

    res.status(200).json(menuItems)
  } catch (error) {
    console.error('Error fetching menu:', error)
    res.status(500).json({ error: 'サーバーエラーが発生しました' })
=======
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
>>>>>>> 0398932218b5cb736b7bfa713bff30e63d319e52
  }
}