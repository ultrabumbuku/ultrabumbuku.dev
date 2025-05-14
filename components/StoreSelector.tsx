/**
 * 注意: このコンポーネントは現在使用されていません。
 * RandomSushiGameコンポーネントは自動でメニューを取得するようになり、
 * この店舗選択コンポーネントは不要になりました。
 * 互換性のため残していますが、将来的に削除される可能性があります。
 */

import { useState } from 'react';

interface StoreSelectorProps {
  onStoreSelect: (storeName: string) => void;
  isLoading: boolean;
}

const FIXED_STORE_NAME = 'つくば学園の森店';

const StoreSelector: React.FC<StoreSelectorProps> = ({ onStoreSelect, isLoading }) => {
  return (
    <div className="store-selector text-center mb-4">
      <h2 className="text-xl font-semibold mb-2">店舗: {FIXED_STORE_NAME}</h2>
      <button
        onClick={() => onStoreSelect(FIXED_STORE_NAME)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? '読み込み中...' : 'メニュー取得'}
      </button>
      <p className="text-sm text-gray-600 mt-2">
        ※店舗は「つくば学園の森店」に固定されています。
      </p>
    </div>
  );
};

export default StoreSelector;