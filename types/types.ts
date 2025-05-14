/**
 * 寿司アプリケーションで使用する型定義
 */

/**
 * メニュー項目の型定義
 */
export interface MenuItem {
  /** 商品名 */
  name: string;
  /** 価格 */
  price: number;
}

/**
 * プレイヤー情報の型定義（ゲームプレイ中）
 */
export interface PlayerType {
  /** プレイヤーの一意識別子 */
  id: string;
  /** プレイヤーの名前 */
  name: string;
  /** 注文リスト */
  orders: MenuItem[];
  /** 合計金額 */
  totalAmount: number;
  /** 金額表示するかどうか */
  showTotal: boolean;
}

/**
 * リザルト画面用のプレイヤー情報
 */
export interface PlayerResultType {
  /** プレイヤーの一意識別子 */
  id: string;
  /** プレイヤーの名前 */
  playerName: string;
  /** 注文リスト */
  orders: MenuItem[];
  /** 合計金額 */
  totalAmount: number;
} 