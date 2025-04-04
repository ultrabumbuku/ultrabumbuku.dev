import sys
import json
import requests
from bs4 import BeautifulSoup
import urllib3

# 警告を無視
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def clean_price_text(price_text):
    # (税込)を除去し、数値のみを抽出
    return price_text.replace('(税込)', '').replace('円', '').replace(',', '').strip()

def get_menu_items(store_url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7',
        'Referer': 'https://akindo-sushiro.co.jp/'
    }
    
    try:
        response = requests.get(store_url, headers=headers, verify=False, timeout=10)
        response.encoding = 'utf-8'
        
        if response.status_code != 200:
            error_message = f"店舗ページの取得に失敗しました。ステータスコード: {response.status_code}"
            print(json.dumps({'error': error_message}))
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
                price_text = price.text.strip()
                cleaned_price = clean_price_text(price_text)
                
                try:
                    price_value = int(cleaned_price)
                    menu_list.append({
                        'name': name.text.strip(),
                        'price': price_value
                    })
                except ValueError:
                    print(f"価格の変換に失敗しました: '{price_text}' -> '{cleaned_price}'")
        
        print(json.dumps(menu_list, ensure_ascii=False))
        
    except Exception as e:
        print(json.dumps({'error': str(e)}))

if __name__ == "__main__":
    if len(sys.argv) > 1:
        store_url = sys.argv[1]
        get_menu_items(store_url)
    else:
        print(json.dumps({'error': '店舗URLが提供されていません'}))