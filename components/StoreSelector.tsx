import { useState } from 'react';

export const StoreSelector: React.FC<{
  onStoreSelect: (storeName: string) => void;
}> = ({ onStoreSelect }) => {
  const [storeName, setStoreName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (storeName.trim()) {
      onStoreSelect(storeName.trim());
      setError(null); // エラーをクリア
    } else {
      setError('店舗名を入力してください');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
        placeholder="店舗名を入力"
      />
      <button type="submit">検索</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};