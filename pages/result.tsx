import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface PlayerResult {
  playerName: string;
  orders: { name: string; price: number }[];
  totalAmount: number;
}

const ResultPage: React.FC = () => {
  const [results, setResults] = useState<PlayerResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    const resultData = JSON.parse(localStorage.getItem('resultData') || '[]');
    setResults(resultData);
  }, []);

  const handleBack = () => {
    localStorage.removeItem('resultData');
    router.push('/');
  };

  return (
    <div>
      <h1>結果発表</h1>
      {results.map((result, index) => (
        <div key={index} className="player-result">
          <h2>{result.playerName}の注文</h2>
          <table className="order-table">
            <thead>
              <tr>
                <th>メニュー</th>
                <th>価格</th>
              </tr>
            </thead>
            <tbody>
              {result.orders.map((order, idx) => (
                <tr key={idx}>
                  <td>{order.name}</td>
                  <td>{order.price}円</td>
                </tr>
              ))}
              <tr>
                <td>合計金額</td>
                <td>{result.totalAmount}円</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      <button onClick={handleBack}>戻る</button>
    </div>
  );
};

export default ResultPage;
