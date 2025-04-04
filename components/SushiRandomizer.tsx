import { useState, useCallback, useEffect } from 'react'
import styles from '../styles/SushiRandomizer.module.css'
import { useRouter } from 'next/router'
import { IoCloseCircleOutline, IoCheckmarkCircleOutline, IoClose } from 'react-icons/io5'  // IoClose を追加

interface MenuItem {
  name: string
  price: number
}

interface Player {
  name: string
  orders: MenuItem[]
  totalAmount: number
}

const SushiRandomizer: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [currentRoll, setCurrentRoll] = useState<Record<string, MenuItem>>({})
  const [newPlayerName, setNewPlayerName] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menu')
        const data = await response.json()
        
        if (data.error) {
          setError(data.error)
        } else {
          setMenuItems(data)
        }
      } catch (err) {
        setError('メニューの取得に失敗しました')
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  const addPlayer = useCallback(() => {
    if (newPlayerName.trim()) {
      setPlayers(prev => [...prev, { name: newPlayerName, orders: [], totalAmount: 0 }])
      setNewPlayerName('')
    }
  }, [newPlayerName])

  const removePlayer = useCallback((index: number) => {
    setPlayers(prev => prev.filter((_, i) => i !== index))
  }, [])

  const rollSushi = useCallback(() => {
    if (menuItems.length === 0) return

    const newRoll: Record<string, MenuItem> = {}
    players.forEach(player => {
      const randomItem = menuItems[Math.floor(Math.random() * menuItems.length)]
      newRoll[player.name] = randomItem
    })
    setCurrentRoll(newRoll)
  }, [players, menuItems])

  const selectSushi = useCallback((playerName: string) => {
    setPlayers(prevPlayers => prevPlayers.map(player => {
      if (player.name === playerName) {
        const selectedItem = currentRoll[playerName]
        return {
          ...player,
          orders: [...player.orders, selectedItem],
          totalAmount: player.totalAmount + selectedItem.price
        }
      }
      return player
    }))
    setCurrentRoll(prev => {
      const updated = { ...prev }
      delete updated[playerName]
      return updated
    })
  }, [currentRoll])

  const resetGame = useCallback(() => {
    setPlayers(prev => prev.map(player => ({ ...player, orders: [], totalAmount: 0 })))
    setCurrentRoll({})
  }, [])

  const handleCheckout = useCallback(() => {
    const resultData = players.map(player => ({
      playerName: player.name,
      orders: player.orders,
      totalAmount: player.totalAmount
    }))
    localStorage.setItem('resultData', JSON.stringify(resultData))
    router.push('/result')
  }, [players, router])

  if (loading) {
    return <div className={styles.loading}>メニューを読み込み中...</div>
  }

  if (error) {
    return <div className={styles.error}>エラー: {error}</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.addPlayerForm}>
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="プレイヤー名を入力"
          className={styles.input}
        />
        <button onClick={addPlayer} className={styles.button}>追加</button>
      </div>

      {players.length > 0 && (
        <div className={styles.controls}>
          <button 
            onClick={rollSushi}
            className={styles.rollButton}
            disabled={loading || menuItems.length === 0}
          >
            回す！
          </button>
          <button onClick={resetGame} className={styles.resetButton}>
            リセット
          </button>
          <button onClick={handleCheckout} className={styles.checkoutButton}>
            お会計
          </button>
        </div>
      )}

      <div className={styles.playerList}>
        {players.map((player, index) => (
          <div key={player.name} className={styles.playerItem}>
            <div className={styles.playerInfo}>
              <span className={styles.playerName}>{player.name}</span>
              <button 
                onClick={() => removePlayer(index)}
                className={styles.deleteButton}
                aria-label={`${player.name}を削除`}
              >
                <IoCloseCircleOutline />
              </button>
            </div>
            
            {currentRoll[player.name] && (
              <div className={styles.rollResult}>
                <div className={styles.menuItem}>
                  <span className={styles.menuName}>
                    {currentRoll[player.name].name}
                  </span>
                  <span className={styles.menuPrice}>
                    {currentRoll[player.name].price}円
                  </span>
                </div>
                <div className={styles.actionButtons}>
                  <button 
                    onClick={() => selectSushi(player.name)}
                    className={styles.selectButton}
                  >
                    <IoCheckmarkCircleOutline />
                    <span>注文</span>
                  </button>
                  <button 
                    onClick={() => setCurrentRoll(prev => {
                      const updated = { ...prev };
                      delete updated[player.name];
                      return updated;
                    })}
                    className={styles.skipButton}
                  >
                    <IoClose />
                    <span>スキップ</span>
                  </button>
                </div>
              </div>
            )}

            {player.orders.length > 0 && (
              <div className={styles.orderHistory}>
                <h4>注文履歴:</h4>
                <ul>
                  {player.orders.map((order, idx) => (
                    <li key={idx}>
                      {order.name} ({order.price}円)
                    </li>
                  ))}
                </ul>
                <div className={styles.totalAmount}>
                  合計: {player.totalAmount}円
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SushiRandomizer