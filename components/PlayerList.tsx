import { PlayerType, MenuItem } from '../types/types';
import { FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';

interface PlayerListProps {
  players: PlayerType[];
  currentRolls: Record<string, MenuItem>;
  onSelectSushi: (playerName: string) => void;
  onSkipSushi: (playerName: string) => void;
  onRemovePlayer: (playerId: string) => void;
  onToggleTotal: (playerId: string) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({
  players,
  currentRolls,
  onSelectSushi,
  onSkipSushi,
  onRemovePlayer,
  onToggleTotal
}) => {
  if (players.length === 0) {
    return (
      <div className="text-center p-4 border border-gray-200 rounded bg-gray-50">
        プレイヤーがいません。プレイヤーを追加してください。
      </div>
    );
  }

  return (
    <div className="player-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {players.map((player) => (
        <div key={player.id} className="player-card border rounded p-4 bg-white shadow-sm">
          <div className="player-header flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold">{player.name}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => onToggleTotal(player.id)}
                className="text-gray-500 hover:text-blue-500"
                title={player.showTotal ? "金額を隠す" : "金額を表示"}
                aria-label={player.showTotal ? "金額を隠す" : "金額を表示"}
              >
                {player.showTotal ? <FaEyeSlash /> : <FaEye />}
              </button>
              <button
                onClick={() => onRemovePlayer(player.id)}
                className="text-gray-500 hover:text-red-500"
                title="プレイヤーを削除"
                aria-label="プレイヤーを削除"
              >
                <FaTrash />
              </button>
            </div>
          </div>
          
          {currentRolls[player.name] && (
            <div className="current-roll bg-yellow-50 p-3 mb-3 rounded border border-yellow-200">
              <div className="flex justify-between mb-2">
                <div className="font-medium">{currentRolls[player.name].name}</div>
                <div>{player.showTotal ? `${currentRolls[player.name].price}円` : '***円'}</div>
              </div>
              <div className="flex justify-between space-x-2">
                <button
                  onClick={() => onSelectSushi(player.name)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-sm"
                >
                  選択する
                </button>
                <button
                  onClick={() => onSkipSushi(player.name)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded text-sm"
                >
                  スキップ
                </button>
              </div>
            </div>
          )}
          
          <div className="order-history">
            <h4 className="font-medium mb-2 text-gray-700">注文履歴:</h4>
            {player.orders.length === 0 ? (
              <p className="text-gray-500 text-sm">まだ注文がありません</p>
            ) : (
              <>
                <ul className="max-h-40 overflow-y-auto mb-2">
                  {player.orders.map((order, idx) => (
                    <li 
                      key={`${player.id}-order-${idx}`} 
                      className="flex justify-between py-1 border-b border-gray-100 text-sm"
                    >
                      <span>{order.name}</span>
                      <span>{player.showTotal ? `${order.price}円` : '***円'}</span>
                    </li>
                  ))}
                </ul>
                <div className="total-amount text-right font-bold pt-2 border-t border-gray-200">
                  合計: {player.showTotal ? `${player.totalAmount}円` : '***円'}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerList; 