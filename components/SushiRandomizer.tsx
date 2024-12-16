import { useState, useCallback, useEffect } from 'react';
import styles from '../styles/SushiRandomizer.module.css';
import { useRouter } from 'next/router';
import { StoreSelector } from './StoreSelector';

interface MenuItem {
  name: string;
  price: number;
}

interface Player {
  name: string;
  orders: MenuItem[];
  totalAmount: number;
}

const SushiRandomizer: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentRoll, setCurrentRoll] = useState<Record<string, MenuItem>>({});
  const [newPlayerName, setNewPlayerName] = useState('');
  const router = useRouter();

  const handleStoreSelect = useCallback(async (storeName: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/menu?storeName=${encodeURIComponent(storeName)}`
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setMenuItems(data);
      }
    } catch (err) {
      setError('メニューの取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addPlayer = useCallback(() => {
    if (newPlayerName.trim()) {
      setPlayers((prevPlayers) => [
        ...prevPlayers,
        {
          name: newPlayerName,
          orders: [],
          totalAmount: 0,
        },
      ]);
      setNewPlayerName('');
    }
  }, [newPlayerName]);

  const removeSushiRoll = useCallback((playerName: string) => {
    setCurrentRoll((prev) => {
      const newRoll = { ...prev };
      delete newRoll[playerName];
      return newRoll;
    });
  }, []);

  const removePlayer = useCallback((index: number) => {
    if (window.confirm('このプレイヤーを削除してもよろしいですか？')) {
      setPlayers((prevPlayers) => prevPlayers.filter((_, i) => i !== index));
    }
  }, []);

  const rollSushi = useCallback(() => {
    if (menuItems.length === 0) {
      setError('先に店舗を選択してください');
      return;
    }

    setCurrentRoll(
      players.reduce((acc, player) => {
        const randomItem =
          menuItems[Math.floor(Math.random() * menuItems.length)];
        acc[player.name] = randomItem;
        return acc;
      }, {} as Record<string, MenuItem>)
    );
  }, [players, menuItems]);

  const selectSushi = useCallback(
    (playerName: string) => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => {
          if (player.name === playerName) {
            const selectedItem = currentRoll[playerName];
            return {
              ...player,
              orders: [...player.orders, selectedItem],
              totalAmount: player.totalAmount + selectedItem.price,
            };
          }
          return player;
        })
      );
      setCurrentRoll((prev) => {
        const newRoll = { ...prev };
        delete newRoll[playerName];
        return newRoll;
      });
    },
    [currentRoll]
  );

  const resetGame = useCallback(() => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        orders: [],
        totalAmount: 0,
      }))
    );
    setCurrentRoll({});
  }, []);

  const handleCheckout = useCallback(() => {
    const resultData = players.map((player) => ({
      playerName: player.name,
      orders: player.orders,
      totalAmount: player.totalAmount,
    }));
    localStorage.setItem('resultData', JSON.stringify(resultData));
    router.push('/result');
  }, [players, router]);

  return (
    <div className={styles.container}>
      <StoreSelector onStoreSelect={handleStoreSelect} />
      {isLoading && <div>メニューを読み込み中...</div>}
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.addPlayerForm}>
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="プレイヤー名を入力"
        />
        <button onClick={addPlayer}>プレイヤーを追加</button>
      </div>

      <div className={styles.actionButtons}>
        <button onClick={rollSushi} disabled={menuItems.length === 0}>
          回す
        </button>
        <button onClick={resetGame}>リセット</button>
        <button onClick={handleCheckout}>お会計</button>
      </div>

      {players.map((player, index) => (
        <div key={player.name} className={styles.playerCard}>
          <div className={styles.playerHeader}>
            <span className={styles.playerName}>{player.name}</span>
            <button
              className={styles.removePlayerButton}
              onClick={() => removePlayer(index)}
              title="プレイヤーを削除"
            >
              ✕
            </button>
          </div>

          {currentRoll[player.name] && (
            <div className={styles.currentRoll}>
              <span>
                {currentRoll[player.name].name} (
                {currentRoll[player.name].price}円)
              </span>
              <div className={styles.rollActions}>
                <button
                  className={styles.selectButton}
                  onClick={() => selectSushi(player.name)}
                >
                  選択
                </button>
                <button
                  className={styles.removeRollButton}
                  onClick={() => removeSushiRoll(player.name)}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          <div className={styles.orderHistory}>
            <h4>注文履歴:</h4>
            {player.orders.map((order, idx) => (
              <div key={idx} className={styles.orderItem}>
                <span>{order.name}</span>
                <span>{order.price}円</span>
              </div>
            ))}
            <div className={styles.totalAmount}>
              合計: {player.totalAmount}円
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SushiRandomizer;