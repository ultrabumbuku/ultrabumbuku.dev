import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import PlayerList from './PlayerList'
import { PlayerType, MenuItem } from '../types/types'

/**
 * 無作為抽出寿司ゲームのメインコンポーネント
 * スシローのメニューからランダムに寿司を選び、プレイヤー間で楽しむゲーム
 */
const RandomSushiGame = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [players, setPlayers] = useState<PlayerType[]>([])
  const [currentRolls, setCurrentRolls] = useState<Record<string, MenuItem>>({})
  const [newPlayerName, setNewPlayerName] = useState('')
  const router = useRouter()
  
  const LOCAL_STORAGE_KEY = 'sushiGamePlayers'
  
  // メニューデータ取得
  const fetchMenu = useCallback(async (storeName: string) => {
    if (!storeName.trim()) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/menu?storeName=${encodeURIComponent(storeName.trim())}`)
      const data = await response.json()
      
      if (response.ok) {
        setMenuItems(data)
      } else {
        setError(data.error || 'メニューの取得に失敗しました')
      }
    } catch (err) {
      setError('メニューの取得中にエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }, [])
  
  // プレイヤー追加
  const addPlayer = useCallback(() => {
    if (newPlayerName.trim()) {
      const playerExists = players.some(p => p.name === newPlayerName.trim())
      
      if (playerExists) {
        setError('同じ名前のプレイヤーが既に存在します')
        return
      }
      
      setPlayers(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          name: newPlayerName.trim(),
          orders: [],
          totalAmount: 0,
          showTotal: true
        }
      ])
      setNewPlayerName('')
      setError(null)
    }
  }, [newPlayerName, players])
  
  // プレイヤー削除
  const removePlayer = useCallback((playerId: string) => {
    setPlayers(prev => prev.filter(p => p.id !== playerId))
    setCurrentRolls(prev => {
      const newRolls = { ...prev }
      const player = players.find(p => p.id === playerId)
      if (player) delete newRolls[player.name]
      return newRolls
    })
  }, [players])
  
  // 寿司をランダムに選択する
  const rollSushi = useCallback(() => {
    if (menuItems.length === 0) {
      setError('メニューデータが取得できていません')
      return
    }
    
    if (players.length === 0) {
      setError('先にプレイヤーを追加してください')
      return
    }
    
    setCurrentRolls(
      players.reduce((acc, player) => {
        const randomItem = menuItems[Math.floor(Math.random() * menuItems.length)]
        acc[player.name] = randomItem
        return acc
      }, {} as Record<string, MenuItem>)
    )
  }, [menuItems, players])
  
  // 寿司を選択する
  const selectSushi = useCallback((playerName: string) => {
    if (!currentRolls[playerName]) return
    
    setPlayers(prev => 
      prev.map(player => {
        if (player.name === playerName) {
          const selectedItem = currentRolls[playerName]
          return {
            ...player,
            orders: [...player.orders, selectedItem],
            totalAmount: player.totalAmount + selectedItem.price
          }
        }
        return player
      })
    )
    
    setCurrentRolls(prev => {
      const newRolls = { ...prev }
      delete newRolls[playerName]
      return newRolls
    })
  }, [currentRolls])
  
  // 寿司をスキップする
  const skipSushi = useCallback((playerName: string) => {
    setCurrentRolls(prev => {
      const newRolls = { ...prev }
      delete newRolls[playerName]
      return newRolls
    })
  }, [])
  
  // 初回ロード時のみlocalStorageから復元
  useEffect(() => {
    const savedPlayers = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers))
    }
    fetchMenu('つくば学園の森店')
    // eslint-disable-next-line
  }, [])
  
  // playersが空でない場合のみlocalStorageに保存
  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(players))
    }
  }, [players])
  
  // ゲームリセット
  const resetGame = useCallback(() => {
    if (window.confirm('ゲームをリセットしますか？すべての注文履歴がクリアされます。')) {
      setPlayers(prev =>
        prev.map(player => ({
          ...player,
          orders: [],
          totalAmount: 0
        }))
      )
      setCurrentRolls({})
      localStorage.removeItem(LOCAL_STORAGE_KEY) // localStorageもクリア
    }
  }, [])
  
  // 金額表示切り替え
  const togglePlayerTotal = useCallback((playerId: string) => {
    setPlayers(prev => 
      prev.map(player => {
        if (player.id === playerId) {
          return { ...player, showTotal: !player.showTotal }
        }
        return player
      })
    )
  }, [])
  
  // お会計/結果表示
  const handleCheckout = useCallback(() => {
    if (players.length === 0) {
      setError('プレイヤーが追加されていません')
      return
    }
    
    if (players.every(p => p.orders.length === 0)) {
      setError('まだ注文がありません')
      return
    }
    
    const resultData = players.map(player => ({
      id: player.id,
      playerName: player.name,
      orders: player.orders,
      totalAmount: player.totalAmount
    }))
    
    localStorage.setItem('sushiGameResults', JSON.stringify(resultData))
    router.push('/result')
  }, [players, router])
  
  // Enter キーでプレイヤー追加
  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addPlayer()
    }
  }, [addPlayer])
  
  return (
    <div className="random-sushi-game">
      <div className="store-selector-container mb-6">
        <div className="store-title">店舗: つくば学園の森店</div>
        <p>※店舗は「つくば学園の森店」に固定されています。</p>
        {isLoading && <div className="loading mt-2">メニューを読み込み中...</div>}
      </div>
      
      {error && (
        <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="player-form flex mb-4">
        <input
          type="text"
          value={newPlayerName}
          onChange={e => setNewPlayerName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="プレイヤー名を入力"
          className="flex-grow p-2 border rounded mr-2"
          aria-label="プレイヤー名"
        />
        <button 
          onClick={addPlayer}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          プレイヤーを追加
        </button>
      </div>
      
      <div className="game-controls flex mb-6 space-x-2">
        <button 
          onClick={rollSushi}
          disabled={menuItems.length === 0 || players.length === 0}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          aria-label="寿司を回す"
        >
          回す
        </button>
        <button 
          onClick={resetGame}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          リセット
        </button>
        <button 
          onClick={handleCheckout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          お会計
        </button>
      </div>
      
      <PlayerList 
        players={players}
        currentRolls={currentRolls}
        onSelectSushi={selectSushi}
        onSkipSushi={skipSushi}
        onRemovePlayer={removePlayer}
        onToggleTotal={togglePlayerTotal}
      />
    </div>
  )
}

export default RandomSushiGame 