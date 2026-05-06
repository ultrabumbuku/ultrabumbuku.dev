import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/router'
import { ref, onValue, set, remove, update } from 'firebase/database'
import { getDb } from '../lib/firebase'
import { PlayerType, MenuItem } from '../types/types'
import PlayerList from './PlayerList'

type Store = { name: string; url: string }


const DEFAULT_CATEGORIES = ['フェア商品', 'にぎり', '軍艦・巻物', 'サイドメニュー', 'ドリンク', 'デザート']

function weightedRandom(items: MenuItem[], weights: Record<string, string>): MenuItem {
  const w = (cat: string) => Math.max(0, parseFloat(weights[cat]) || 0)
  const total = items.reduce((sum, item) => sum + w(item.category), 0)
  if (total === 0) return items[Math.floor(Math.random() * items.length)]
  let rand = Math.random() * total
  for (const item of items) {
    rand -= w(item.category)
    if (rand <= 0) return item
  }
  return items[items.length - 1]
}

const RandomSushiGame = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [players, setPlayers] = useState<PlayerType[]>([])
  const [currentRolls, setCurrentRolls] = useState<Record<string, MenuItem>>({})
  const [newPlayerName, setNewPlayerName] = useState('')

  // 店舗選択
  const [allStores, setAllStores] = useState<Store[]>([])
  const [storeInput, setStoreInput] = useState('')
  const [suggestions, setSuggestions] = useState<Store[]>([])
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const defaultWeights = Object.fromEntries(DEFAULT_CATEGORIES.map(c => [c, '1']))
  // 確定済みの倍率（rollSushiで使用）
  const [categoryWeights, setCategoryWeights] = useState<Record<string, string>>(defaultWeights)
  // 編集中の下書き倍率
  const [draftWeights, setDraftWeights] = useState<Record<string, string>>(defaultWeights)
  const [showWeights, setShowWeights] = useState(false)
  const [weightsApplied, setWeightsApplied] = useState(false)

  const router = useRouter()

  // 店舗一覧を初回取得
  useEffect(() => {
    fetch('/api/stores')
      .then(r => r.json())
      .then((data: Store[]) => setAllStores(data))
      .catch(() => setError('店舗一覧の取得に失敗しました'))
  }, [])

  // 入力変化で前方一致フィルタリング
  const handleStoreInputChange = useCallback((value: string) => {
    setStoreInput(value)
    setSelectedStore(null)
    if (value.trim()) {
      setSuggestions(allStores.filter(s => s.name.startsWith(value.trim())).slice(0, 10))
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [allStores])


  // 店舗を選択して Firebase に保存 → 全クライアントが同期
  const selectStore = useCallback((store: Store) => {
    setStoreInput(store.name)
    setSuggestions([])
    setShowSuggestions(false)
    setCategoryWeights(Object.fromEntries(DEFAULT_CATEGORIES.map(c => [c, '1'])))
    setDraftWeights(Object.fromEntries(DEFAULT_CATEGORIES.map(c => [c, '1'])))
    set(ref(getDb(), 'game/selectedStore'), store)
  }, [])

  // サジェスト外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Firebase リアルタイム同期
  useEffect(() => {
    const unsubStore = onValue(ref(getDb(), 'game/selectedStore'), snapshot => {
      const store: Store | null = snapshot.val()
      if (!store) return
      setSelectedStore(store)
      setStoreInput(store.name)
      setMenuItems([])
      setIsLoading(true)
      fetch(`/api/menu?storeName=${encodeURIComponent(store.name)}`)
        .then(r => r.json())
        .then(data => { setMenuItems(data); setIsLoading(false) })
        .catch(() => { setError('メニューの取得中にエラーが発生しました'); setIsLoading(false) })
    })
    const unsubPlayers = onValue(ref(getDb(), 'game/players'), snapshot => {
      const val = snapshot.val()
      if (!val) { setPlayers([]); return }
      setPlayers(Object.values(val).map((p: unknown) => {
        const player = p as PlayerType
        return { ...player, orders: player.orders ?? [] }
      }))
    })
    const unsubRolls = onValue(ref(getDb(), 'game/currentRolls'), snapshot => {
      setCurrentRolls(snapshot.val() ?? {})
    })
    const unsubWeights = onValue(ref(getDb(), 'game/categoryWeights'), snapshot => {
      const val = snapshot.val()
      if (!val) return
      setCategoryWeights(val)
      setDraftWeights(val)
    })
    return () => { unsubStore(); unsubPlayers(); unsubRolls(); unsubWeights() }
  }, [])

  // プレイヤー追加
  const addPlayer = useCallback(() => {
    if (!newPlayerName.trim()) return
    if (players.some(p => p.name === newPlayerName.trim())) {
      setError('同じ名前のプレイヤーが既に存在します')
      return
    }
    const newPlayer: PlayerType = { id: Date.now().toString(), name: newPlayerName.trim(), orders: [], totalAmount: 0 }
    set(ref(getDb(), `game/players/${newPlayer.id}`), { id: newPlayer.id, name: newPlayer.name, totalAmount: 0 })
    setNewPlayerName('')
    setError(null)
  }, [newPlayerName, players])

  // プレイヤー削除
  const removePlayer = useCallback((playerId: string) => {
    const player = players.find(p => p.id === playerId)
    remove(ref(getDb(), `game/players/${playerId}`))
    if (player) remove(ref(getDb(), `game/currentRolls/${player.name}`))
  }, [players])

  // 寿司をランダムに選択する（重み付き）
  const rollSushi = useCallback(() => {
    if (menuItems.length === 0) { setError('メニューデータが取得できていません'); return }
    if (players.length === 0) { setError('先にプレイヤーを追加してください'); return }
    const newRolls = players.reduce((acc, player) => {
      acc[player.name] = weightedRandom(menuItems, categoryWeights)
      return acc
    }, {} as Record<string, MenuItem>)
    set(ref(getDb(), 'game/currentRolls'), newRolls)
  }, [menuItems, players, categoryWeights])

  // 寿司を選択する
  const selectSushi = useCallback((playerName: string) => {
    if (!currentRolls[playerName]) return
    const item = currentRolls[playerName]
    const player = players.find(p => p.name === playerName)
    if (!player) return
    const updatedOrders = [...player.orders, item]
    const updates: Record<string, unknown> = {
      [`game/players/${player.id}/orders`]: updatedOrders,
      [`game/players/${player.id}/totalAmount`]: player.totalAmount + item.price,
      [`game/currentRolls/${playerName}`]: null,
    }
    update(ref(getDb()), updates)
  }, [currentRolls, players])

  // 寿司をスキップする
  const skipSushi = useCallback((playerName: string) => {
    remove(ref(getDb(), `game/currentRolls/${playerName}`))
  }, [])

  // ゲームリセット
  const resetGame = useCallback(() => {
    if (window.confirm('ゲームをリセットしますか？すべての注文履歴がクリアされます。')) {
      const updates: Record<string, unknown> = { 'game/currentRolls': null }
      players.forEach(p => {
        updates[`game/players/${p.id}/orders`] = null
        updates[`game/players/${p.id}/totalAmount`] = 0
      })
      update(ref(getDb()), updates)
    }
  }, [players])

  // お会計
  const handleCheckout = useCallback(() => {
    if (players.length === 0) { setError('プレイヤーが追加されていません'); return }
    if (players.every(p => p.orders.length === 0)) { setError('まだ注文がありません'); return }
    const resultData = players.map(p => ({ id: p.id, playerName: p.name, orders: p.orders, totalAmount: p.totalAmount }))
    localStorage.setItem('sushiGameResults', JSON.stringify(resultData))
    router.push('/result')
  }, [players, router])

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addPlayer()
  }, [addPlayer])

  return (
    <div className="random-sushi-game">

      {/* 店舗選択 */}
      <div className="store-selector-container">
        <label className="block font-medium mb-2">店舗を選択</label>
        <div className="relative" ref={suggestionsRef}>
          <input
            type="text"
            value={storeInput}
            onChange={e => handleStoreInputChange(e.target.value)}
            onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true) }}
            placeholder="店舗名を入力（例: つくば）"
            className="w-full"
            aria-label="店舗名"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-52 overflow-y-auto mt-1 p-1 flex flex-col gap-1">
              {suggestions.map(store => (
                <div
                  key={store.url}
                  onMouseDown={() => selectStore(store)}
                  className="px-4 py-3 border border-gray-200 rounded cursor-pointer hover:bg-blue-50 hover:border-blue-400 text-sm"
                >
                  {store.name}
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedStore && (
          <p className="mt-1 text-sm text-green-700">選択中: {selectedStore.name}</p>
        )}
        {isLoading && <p className="mt-1 text-sm text-gray-500">メニューを読み込み中...</p>}
        {selectedStore && !isLoading && menuItems.length > 0 && (
          <p className="mt-1 text-sm text-gray-500">メニュー {menuItems.length} 品取得済み</p>
        )}
        {selectedStore && !isLoading && menuItems.length === 0 && error && (
          <button
            onClick={() => {
              setError(null)
              setIsLoading(true)
              fetch(`/api/menu?storeName=${encodeURIComponent(selectedStore.name)}`)
                .then(r => r.json())
                .then(data => { setMenuItems(data); setIsLoading(false) })
                .catch(() => { setError('メニューの取得中にエラーが発生しました'); setIsLoading(false) })
            }}
            className="mt-1 text-sm text-blue-500 hover:text-blue-700 underline"
            style={{ margin: 0, background: 'none', boxShadow: 'none', padding: 0, fontWeight: 'normal' }}
          >
            再試行
          </button>
        )}
      </div>

      <hr className="my-5 border-gray-100" />

      {/* カテゴリ倍率 */}
      <div>
        <button
          onClick={() => setShowWeights(v => !v)}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          {showWeights ? 'カテゴリ倍率を閉じる ▲' : 'カテゴリ倍率を設定する ▼'}
        </button>
        {showWeights && (
          <div className="mt-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left font-medium pb-3 pr-4">カテゴリ</th>
                  <th className="text-left font-medium pb-3">倍率</th>
                </tr>
              </thead>
              <tbody>
                {DEFAULT_CATEGORIES.map(cat => (
                  <tr key={cat}>
                    <td className="pr-4 py-2 whitespace-nowrap">{cat}</td>
                    <td className="py-2">
                      <input
                        type="number"
                        min={0}
                        step={0.1}
                        value={draftWeights[cat] ?? '1'}
                        onChange={e => setDraftWeights(prev => ({ ...prev, [cat]: e.target.value }))}
                        onBlur={e => {
                          if (e.target.value === '' || isNaN(parseFloat(e.target.value))) {
                            setDraftWeights(prev => ({ ...prev, [cat]: '1' }))
                          }
                        }}
                        className="w-24"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => {
                  set(ref(getDb(), 'game/categoryWeights'), { ...draftWeights })
                  setWeightsApplied(true)
                  setTimeout(() => setWeightsApplied(false), 2000)
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm"
              >
                適用
              </button>
              {weightsApplied && <span className="text-green-600 text-sm">✓ 適用しました</span>}
            </div>
            <p className="text-xs text-gray-400 mt-2">出現率をn倍にします</p>
          </div>
        )}
      </div>

      <hr className="my-5 border-gray-100" />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-5">
          {error}
        </div>
      )}

      {/* プレイヤー追加 */}
      <div className="player-form flex gap-2 mb-5">
        <input
          type="text"
          value={newPlayerName}
          onChange={e => setNewPlayerName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="プレイヤー名を入力"
          className="flex-grow"
          aria-label="プレイヤー名"
          style={{ margin: 0 }}
        />
        <button
          onClick={addPlayer}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded whitespace-nowrap"
          style={{ margin: 0 }}
        >
          追加
        </button>
      </div>

      {/* ゲームコントロール */}
      <div className="game-controls flex gap-2 mb-6">
        <button
          onClick={rollSushi}
          disabled={menuItems.length === 0 || players.length === 0}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded disabled:opacity-50"
          style={{ margin: 0 }}
          aria-label="寿司を回す"
        >
          回す
        </button>
        <button
          onClick={resetGame}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
          style={{ margin: 0 }}
        >
          リセット
        </button>
        <button
          onClick={handleCheckout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded"
          style={{ margin: 0 }}
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
      />
    </div>
  )
}

export default RandomSushiGame
