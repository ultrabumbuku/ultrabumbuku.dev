import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { IoArrowBack, IoShareSocialOutline } from 'react-icons/io5'
import Layout from '../components/Layout'
import { PlayerResultType } from '../types/types'

const Result = () => {
  const [results, setResults] = useState<PlayerResultType[]>([])
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('sushiGameResults')
      if (savedData) {
        setResults(JSON.parse(savedData))
      }
    } catch (err) {
      console.error('結果データの読み込みに失敗しました', err)
    }
  }, [])

  const mostExpensivePlayer = results.length > 0 
    ? results.reduce((prev, current) => 
        prev.totalAmount >= current.totalAmount ? prev : current, 
      results[0])
    : null

  const handleCopyResults = () => {
    const text = results.map(player => 
      `${player.playerName}さん\n${player.orders.map(order => order.name).join('\n')}`
    ).join('\n\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Layout title="結果">
      <section className="result-container">
        <h1 className="resultTitle">結果</h1>
        {results.length === 0 ? (
          <p>結果データが見つかりません</p>
        ) : (
          <>
            <div className="totalAmount">
              <h2>優勝者</h2>
              <p>{mostExpensivePlayer?.playerName}さん</p>
            </div>
            <div className="resultGrid">
              {results.map((player, index) => (
                <div key={index} className="playerCard">
                  <h3>{player.playerName}さん</h3>
                  <p>注文数: {player.orders.length}品</p>
                  <p>合計金額: {player.totalAmount}円</p>
                  <ul>
                    {player.orders.map((order, orderIndex) => (
                      <li key={orderIndex} className="flex justify-between">
                        <span>{order.name}</span>
                        <span>{order.price}円</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="actions flex flex-wrap justify-center space-x-0 space-y-2 md:space-x-4 md:space-y-0">
              <button
                onClick={() => router.push('/musakui')}
                className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded flex items-center justify-center"
              >
                <IoArrowBack className="mr-2" />
                もう一度遊ぶ
              </button>
              <button
                onClick={handleCopyResults}
                className="w-full md:w-auto bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded flex items-center justify-center"
              >
                <IoShareSocialOutline className="mr-2" />
                {copied ? 'コピーしました！' : '結果をコピー'}
              </button>
            </div>
          </>
        )}
      </section>
    </Layout>
  )
}

export default Result
