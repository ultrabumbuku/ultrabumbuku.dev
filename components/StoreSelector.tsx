import { useState, useEffect } from 'react';

interface Store {
  prefecture_id: number;
  name: string;
  url: string;
}

export const StoreSelector: React.FC<{
  onStoreSelect: (storeUrl: string) => void;
}> = ({ onStoreSelect }) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // sushiro_all_shops.jsonを読み込む
    fetch('/sushiro_data/sushiro_all_shops.json')
      .then(res => res.json())
      .then(data => setStores(data));
  }, []);

  const filteredStores = stores.filter(store => 
    store.name.includes(searchTerm) && store.name !== ''
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="店舗を検索"
      />
      <select onChange={(e) => onStoreSelect(e.target.value)}>
        <option value="">店舗を選択してください</option>
        {filteredStores.map((store, index) => (
          <option key={index} value={store.url}>
            {store.name}
          </option>
        ))}
      </select>
    </div>
  );
};