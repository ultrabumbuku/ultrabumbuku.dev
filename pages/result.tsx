import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { IoArrowBack, IoLogoTwitter, IoTrophyOutline } from 'react-icons/io5'

interface OrderItem {
  name: string
  price: number
}

interface PlayerResult {
  playerName: string
  orders: OrderItem[]
  totalAmount: number
}

const Result = () => {
  const [results, setResults] = useState<PlayerResult[]>([])
  const router = useRouter()

  useEffect(() => {
    const savedData = localStorage.getItem('resultData')
    if (savedData) {
      setResults(JSON.parse(savedData))
    }
  }, [])

  const totalAmount = results.reduce((sum, player) => sum + player.totalAmount, 0)

  const handleShare = () => {
    const text = `${winner.playerName}さんが優勝しました！（${winner.totalAmount}円）\n#無作為抽出寿司`
    const url = 'https://ultrabumbuku.dev/musakui'
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank')
  }

  // 優勝者（最も合計金額が低い人）を取得
  const winner = results.reduce((prev, current) => 
    prev.totalAmount <= current.totalAmount ? prev : current
  , results[0]);

  return (
    <div className="result-container">
      <h1 className="resultTitle">お会計</h1>
      
      {winner && (
        <div className="winnerSection">
          <IoTrophyOutline className="trophyIcon" />
          <div className="winnerInfo">
            <span className="winnerLabel">優勝</span>
            <span className="winnerName">{winner.playerName}</span>
            <span className="winnerAmount">{winner.totalAmount}円</span>
          </div>
        </div>
      )}

      <div className="resultGrid">
        {results.map((player, index) => (
          <div key={index} className="playerCard">
            <div className="playerHeader">
              <h2>{player.playerName}</h2>
              <span className="playerTotal">{player.totalAmount}円</span>
            </div>
            <ul className="orderList">
              {player.orders.map((order, idx) => (
                <li key={idx} className="orderItem">
                  <span>{order.name}</span>
                  <span className="orderPrice">{order.price}円</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="actions">
        <button
          onClick={() => router.push('/musakui')}
          className="backButton"
        >
          <IoArrowBack />
          <span>もう一度遊ぶ</span>
        </button>
        <button
          onClick={handleShare}
          className="shareButton"
        >
          <IoLogoTwitter />
          <span>Twitterでシェア</span>
        </button>
      </div>
    </div>
  )
}

export default Result
