import sys
import json
import requests
from bs4 import BeautifulSoup

def get_menu_items(store_url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    try:
        response = requests.get(store_url, headers=headers)
        response.encoding = 'utf-8'
        
        if response.status_code != 200:
            print(json.dumps({'error': '店舗ページの取得に失敗しました'}))
            return
        
        soup = BeautifulSoup(response.text, 'html.parser')
        menu_items = soup.find_all('div', class_='menu-item')
        
        if not menu_items:
            print(json.dumps({'error': 'メニューが見つかりませんでした'}))
            return
        
        menu_list = []
        for item in menu_items:
            name = item.find('div', class_='menu-item__name')
            price = item.find('div', class_='menu-item__price')
            
            if name and price:
                try:
                    price_value = int(price.text.strip().replace('円', '').replace(',', ''))
                except ValueError:
                    price_value = 0  # 価格が整数に変換できない場合のデフォルト値
                
                menu_list.append({
                    'name': name.text.strip(),
                    'price': price_value
                })
        
        print(json.dumps(menu_list, ensure_ascii=False))
        
    except Exception as e:
        print(json.dumps({'error': str(e)}))

if __name__ == "__main__":
    if len(sys.argv) > 1:
        store_url = sys.argv[1]
        get_menu_items(store_url)
    else:
        print(json.dumps({'error': '店舗URLが提供されていません'}))