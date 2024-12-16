import sys
import json
import requests
from bs4 import BeautifulSoup

def get_menu_items(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, 'html.parser')
        menu_items = soup.find_all('div', class_='menu-item')
        
        menu_list = []
        for item in menu_items:
            name = item.find('div', class_='menu-item__name')
            price = item.find('div', class_='menu-item__price')
            
            if name and price:
                menu_list.append({
                    'name': name.text.strip(),
                    'price': int(price.text.strip().replace('円', '').replace(',', ''))
                })
        
        print(json.dumps(menu_list, ensure_ascii=False))
        
    except Exception as e:
        print(json.dumps({'error': str(e)}))

if __name__ == "__main__":
    if len(sys.argv) > 1:
        store_url = sys.argv[1]
        get_menu_items(f'https://www.akindo-sushiro.co.jp/menu/{store_url}')