import { useState } from 'react';

export const StoreSelector: React.FC<{
    onStoreSelect: (storeName: string) => void;
  }> = ({ onStoreSelect }) => {
    const [storeName, setStoreName] = useState('');
    const [error, setError] = useState<string | null>(null);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (storeName.trim()) {
        try {
          const response = await fetch(`/api/menu?storeName=${encodeURIComponent(storeName.trim())}`);
          const data = await response.json();
          if (response.ok) {
            onStoreSelect(data);
          } else {
            setError(data.error);
          }
        } catch (err) {
          setError('エラーが発生しました');
        }
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
        {error && <p>{error}</p>}
      </form>
    );
  };