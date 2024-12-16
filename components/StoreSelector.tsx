import { useState } from 'react';

interface StoreSelectProps {
  onStoreSelect: (menuData: any) => void;
}

export const StoreSelector: React.FC<StoreSelectProps> = ({ onStoreSelect }) => {
  const [storeName, setStoreName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);  // 追加：ローディング状態

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName.trim()) {
      setError('店舗名を入力してください');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/menu?storeName=${encodeURIComponent(storeName.trim())}`);
      const data = await response.json();
      
      if (response.ok) {
        onStoreSelect(data);
      } else {
        setError(data.error || 'エラーが発生しました');
      }
    } catch (err) {
      setError('メニューの取得に失敗しました');
      console.error('Error fetching menu:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="store-selector">
      <input
        type="text"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
        placeholder="店舗名を入力"
        disabled={isLoading}
      />
      {isLoading && <span>読み込み中...</span>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};