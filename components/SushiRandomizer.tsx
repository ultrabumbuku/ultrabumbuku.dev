import { useState, useCallback } from 'react'
import styles from '../styles/SushiRandomizer.module.css'
import { useRouter } from 'next/router' 
import { privateDecrypt } from 'crypto';
const menuItems = [
    {
        "name": "厚切り天然インド鮪6貫盛り",
        "price": 1080
    },
    {
        "name": "大とろ",
        "price": 120
    },
    {
        "name": "馬刺しねぎとろ包み",
        "price": 100
    },
    {
        "name": "塩麹漬けまぐろ",
        "price": 180
    },
    {
        "name": "あん肝軍艦",
        "price": 180
    },
    {
        "name": "たら白子軍艦",
        "price": 180
    },
    {
        "name": "スシロー海鮮巻き重ね（冬）",
        "price": 260
    },
    {
        "name": "厳選まぐろ赤身と中とろの手巻",
        "price": 360
    },
    {
        "name": "本ずわい蟹の手巻",
        "price": 360
    },
    {
        "name": "天然ぶり胡麻醤油漬け",
        "price": 120
    },
    {
        "name": "北海道産にしん酢〆の炙り",
        "price": 120
    },
    {
        "name": "北海道産サクラマス",
        "price": 180
    },
    {
        "name": "塩麹漬け赤えび",
        "price": 180
    },
    {
        "name": "炙り赤えびバター醤油",
        "price": 180
    },
    {
        "name": "活〆蒸し穴子",
        "price": 180
    },
    {
        "name": "濃厚うに包み",
        "price": 180
    },
    {
        "name": "炙り白子と筋子包み",
        "price": 260
    },
    {
        "name": "本ずわい蟹食べ比べ（ボイル・炙り）",
        "price": 360
    },
    {
        "name": "神戸牛のにぎり",
        "price": 360
    },
    {
        "name": "鶏塩らーめん",
        "price": 460
    },
    {
        "name": "とろ玉明太あんかけうどん",
        "price": 360
    },
    {
        "name": "かつお香る もずくとおくらの赤だし",
        "price": 240
    },
    {
        "name": "かつお香る もずくとおくらの味噌汁",
        "price": 240
    },
    {
        "name": "サーモンのカルパッチョ風サラダパフェ",
        "price": 250
    },
    {
        "name": "えびのカルパッチョ風サラダパフェ",
        "price": 250
    },
    {
        "name": "冬の山海の幸 天ぷら盛り（えび天）",
        "price": 410
    },
    {
        "name": "冬の山海の幸 天ぷら盛り（上えび天）",
        "price": 460
    },
    {
        "name": "ピスタチオ＆ベリーのケーキ ピスタチオアイス添え",
        "price": 330
    },
    {
        "name": "懐かしの和梨シャーベット",
        "price": 130
    },
    {
        "name": "厳選まぐろ赤身",
        "price": 120
    },
    {
        "name": "一本釣りかつお",
        "price": 120
    },
    {
        "name": "サーモン",
        "price": 120
    },
    {
        "name": "オニオンサーモン",
        "price": 120
    },
    {
        "name": "焼とろサーモン",
        "price": 120
    },
    {
        "name": "おろし焼とろサーモン",
        "price": 120
    },
    {
        "name": "サーモンちーず",
        "price": 120
    },
    {
        "name": "炙りサーモンバジルチーズ",
        "price": 120
    },
    {
        "name": "えんがわ",
        "price": 120
    },
    {
        "name": "〆さば",
        "price": 120
    },
    {
        "name": "〆さば（ごまネギ）",
        "price": 120
    },
    {
        "name": "赤えび",
        "price": 120
    },
    {
        "name": "生えび",
        "price": 120
    },
    {
        "name": "えび",
        "price": 120
    },
    {
        "name": "えびチーズ",
        "price": 120
    },
    {
        "name": "えびバジルチーズ",
        "price": 120
    },
    {
        "name": "えびアボカド",
        "price": 120
    },
    {
        "name": "甘えび",
        "price": 120
    },
    {
        "name": "えび天にぎり",
        "price": 120
    },
    {
        "name": "黒みる貝",
        "price": 120
    },
    {
        "name": "いか",
        "price": 120
    },
    {
        "name": "いか塩レモン",
        "price": 120
    },
    {
        "name": "数の子",
        "price": 120
    },
    {
        "name": "煮あなご",
        "price": 120
    },
    {
        "name": "たまご",
        "price": 120
    },
    {
        "name": "オムライすし",
        "price": 120
    },
    {
        "name": "豚塩カルビ",
        "price": 120
    },
    {
        "name": "まるごとハンバーグにぎり",
        "price": 120
    },
    {
        "name": "生ハム",
        "price": 120
    },
    {
        "name": "まぐろ・たまご",
        "price": 120
    },
    {
        "name": "えび・サーモン",
        "price": 120
    },
    {
        "name": "えび・いか",
        "price": 120
    },
    {
        "name": "えび・たまご",
        "price": 120
    },
    {
        "name": "サーモン・焼とろサーモン",
        "price": 120
    },
    {
        "name": "サーモン・いか",
        "price": 120
    },
    {
        "name": "サーモン・たまご",
        "price": 120
    },
    {
        "name": "えび・生えび",
        "price": 120
    },
    {
        "name": "活〆寒ぶり",
        "price": 150
    },
    {
        "name": "サーモンのサラダ寿司",
        "price": 150
    },
    {
        "name": "たいのサラダ寿司",
        "price": 150
    },
    {
        "name": "たこのサラダ寿司",
        "price": 150
    },
    {
        "name": "特ネタ中とろ",
        "price": 180
    },
    {
        "name": "びんとろ",
        "price": 180
    },
    {
        "name": "生サーモン",
        "price": 180
    },
    {
        "name": "サーモンアボカド",
        "price": 180
    },
    {
        "name": "サーモンバジルカマンベール",
        "price": 180
    },
    {
        "name": "活〆真鯛",
        "price": 180
    },
    {
        "name": "活〆ぶりとろ",
        "price": 180
    },
    {
        "name": "天然〆いわし",
        "price": 180
    },
    {
        "name": "天然〆いわし（ネギ・生姜）",
        "price": 180
    },
    {
        "name": "大えび",
        "price": 180
    },
    {
        "name": "上えび天にぎり",
        "price": 180
    },
    {
        "name": "ボイル本ずわい蟹1貫",
        "price": 180
    },
    {
        "name": "ほたて貝柱",
        "price": 180
    },
    {
        "name": "大つぶ貝",
        "price": 180
    },
    {
        "name": "たこ",
        "price": 180
    },
    {
        "name": "うなぎの蒲焼き",
        "price": 180
    },
    {
        "name": "生ハムバジルカマンベール",
        "price": 180
    },
    {
        "name": "ほたて食べ比べ（焦がし醤油・生レモン・天ぷら）",
        "price": 260
    },
    {
        "name": "ぷちローセット",
        "price": 480
    },
    {
        "name": "軍艦ねぎまぐろ",
        "price": 120
    },
    {
        "name": "まぐろ山かけ",
        "price": 120
    },
    {
        "name": "まぐろユッケ(卵黄醤油)",
        "price": 120
    },
    {
        "name": "まぐたく軍艦",
        "price": 120
    },
    {
        "name": "軍艦甘えび",
        "price": 120
    },
    {
        "name": "かにみそ",
        "price": 120
    },
    {
        "name": "たらマヨ",
        "price": 120
    },
    {
        "name": "数の子松前漬け",
        "price": 120
    },
    {
        "name": "コーン",
        "price": 120
    },
    {
        "name": "ツナサラダ",
        "price": 120
    },
    {
        "name": "シーサラダ",
        "price": 120
    },
    {
        "name": "カニ風サラダ",
        "price": 120
    },
    {
        "name": "たまごサラダ",
        "price": 120
    },
    {
        "name": "うずらフライ軍艦",
        "price": 120
    },
    {
        "name": "小粒納豆",
        "price": 120
    },
    {
        "name": "小粒納豆巻(ねぎ抜き)",
        "price": 120
    },
    {
        "name": "きゅうり巻",
        "price": 120
    },
    {
        "name": "海老フライアボカドロール",
        "price": 120
    },
    {
        "name": "いなり",
        "price": 120
    },
    {
        "name": "鉄火巻",
        "price": 180
    },
    {
        "name": "まぐたく巻",
        "price": 180
    },
    {
        "name": "天然筋子包み",
        "price": 180
    },
    {
        "name": "いくら",
        "price": 180
    },
    {
        "name": "本ずわい蟹軍艦",
        "price": 180
    },
    {
        "name": "サーモンいくら軍艦",
        "price": 260
    },
    {
        "name": "海鮮3貫盛り（甘えび・いくら・本ずわいがに）",
        "price": 260
    },
    {
        "name": "コク旨まぐろ醤油ラーメン",
        "price": 390
    },
    {
        "name": "濃厚えび味噌ワンタンメン",
        "price": 390
    },
    {
        "name": "鯛だし塩ラーメン",
        "price": 390
    },
    {
        "name": "きつねうどん",
        "price": 330
    },
    {
        "name": "えび天うどん",
        "price": 330
    },
    {
        "name": "上えび天うどん",
        "price": 380
    },
    {
        "name": "かけうどん",
        "price": 180
    },
    {
        "name": "かつお香る 魚のアラの赤だし",
        "price": 220
    },
    {
        "name": "かつお香る あおさと海苔の赤だし",
        "price": 220
    },
    {
        "name": "かつお香る あおさと海苔の味噌汁",
        "price": 220
    },
    {
        "name": "かつお香る あさりの赤だし",
        "price": 220
    },
    {
        "name": "かつお香る あさりの味噌汁",
        "price": 220
    },
    {
        "name": "茶碗蒸し",
        "price": 230
    },
    {
        "name": "枝豆の茶碗蒸し",
        "price": 240
    },
    {
        "name": "枝豆のあんかけ茶碗蒸し",
        "price": 240
    },
    {
        "name": "まるごと海老の柚子こしょう天ぷら",
        "price": 360
    },
    {
        "name": "赤いかの唐揚げ",
        "price": 360
    },
    {
        "name": "フライドチキン（2個）",
        "price": 180
    },
    {
        "name": "フライドチキン（5個）",
        "price": 360
    },
    {
        "name": "フライドポテト",
        "price": 150
    },
    {
        "name": "どんぶりポテト",
        "price": 390
    },
    {
        "name": "かぼちゃの天ぷら",
        "price": 150
    },
    {
        "name": "生ビール　ジョッキ",
        "price": 590
    },
    {
        "name": "生ビール　グラス",
        "price": 430
    },
    {
        "name": "生貯蔵酒",
        "price": 480
    },
    {
        "name": "翠（SUI）",
        "price": 400
    },
    {
        "name": "レモンサワー",
        "price": 400
    },
    {
        "name": "角ハイボール",
        "price": 400
    },
    {
        "name": "オールフリー（ﾉﾝｱﾙｺｰﾙﾋﾞｰﾙ）",
        "price": 440
    },
    {
        "name": "ペプシコーラ",
        "price": 200
    },
    {
        "name": "ポップメロンソーダ",
        "price": 200
    },
    {
        "name": "さわやか白ぶどう",
        "price": 200
    },
    {
        "name": "さわやか白ぶどうソーダ",
        "price": 200
    },
    {
        "name": "ホワイトウォーター",
        "price": 200
    },
    {
        "name": "ホワイトソーダ",
        "price": 200
    },
    {
        "name": "ウーロン茶",
        "price": 200
    },
    {
        "name": "りんごジュース国産100％果汁",
        "price": 170
    },
    {
        "name": "アイスコーヒー",
        "price": 170
    },
    {
        "name": "ホットコーヒー",
        "price": 170
    },
    {
        "name": "アイスカフェラテ",
        "price": 200
    },
    {
        "name": "ホットカフェラテ",
        "price": 200
    },
    {
        "name": "アップルジュース",
        "price": 130
    },
    {
        "name": "オレンジジュース",
        "price": 130
    },
    {
        "name": "ストロベリーバニラパフェ",
        "price": 300
    },
    {
        "name": "ショコラケーキリッチ",
        "price": 230
    },
    {
        "name": "北海道ミルクレープ",
        "price": 230
    },
    {
        "name": "カタラーナアイスブリュレ",
        "price": 230
    },
    {
        "name": "わらび餅と大学芋のどっちも盛り",
        "price": 230
    },
    {
        "name": "大学いも",
        "price": 130
    },
    {
        "name": "京都峯嵐堂のわらびもち",
        "price": 150
    },
    {
        "name": "フローズンマンゴー",
        "price": 150
    },
    {
        "name": "気まぐれダブルアイス／シャーベット",
        "price": 150
    },
    {
        "name": "懐かしのメロンシャーベット",
        "price": 130
    },
    {
        "name": "北海道バニラアイス",
        "price": 130
    },

    {
        "name": "粉末緑茶18本入り",
        "price": 120
    },
    {
        "name": "赤だし(カップ)",
        "price": 200
    },
    {
        "name": "スシロー合わせ醤油",
        "price": 330
    },
    {
        "name": "スシロー合わせ醤油(甘口)",
        "price": 330
    },
    {
        "name": "甘だれ230ml",
        "price": 320
    },
    {
        "name": "厚切り天然インド鮪6貫盛り",
        "price": 1080
    },
    {
        "name": "大とろ",
        "price": 120
    },
    {
        "name": "馬刺しねぎとろ包み",
        "price": 100
    },
    {
        "name": "塩麹漬けまぐろ",
        "price": 180
    },
    {
        "name": "あん肝軍艦",
        "price": 180
    },
    {
        "name": "たら白子軍艦",
        "price": 180
    },
    {
        "name": "スシロー海鮮巻き重ね（冬）",
        "price": 260
    },
    {
        "name": "厳選まぐろ赤身と中とろの手巻",
        "price": 360
    },
    {
        "name": "本ずわい蟹の手巻",
        "price": 360
    },
    {
        "name": "天然ぶり胡麻醤油漬け",
        "price": 120
    },
    {
        "name": "北海道産にしん酢〆の炙り",
        "price": 120
    },
    {
        "name": "北海道産サクラマス",
        "price": 180
    },
    {
        "name": "塩麹漬け赤えび",
        "price": 180
    },
    {
        "name": "炙り赤えびバター醤油",
        "price": 180
    },
    {
        "name": "活〆蒸し穴子",
        "price": 180
    },
    {
        "name": "濃厚うに包み",
        "price": 180
    },
    {
        "name": "炙り白子と筋子包み",
        "price": 260
    },
    {
        "name": "本ずわい蟹食べ比べ（ボイル・炙り）",
        "price": 360
    },
    {
        "name": "神戸牛のにぎり",
        "price": 360
    },
    {
        "name": "鶏塩らーめん",
        "price": 460
    },
    {
        "name": "とろ玉明太あんかけうどん",
        "price": 360
    },
    {
        "name": "かつお香る もずくとおくらの赤だし",
        "price": 240
    },
    {
        "name": "かつお香る もずくとおくらの味噌汁",
        "price": 240
    },
    {
        "name": "サーモンのカルパッチョ風サラダパフェ",
        "price": 250
    },
    {
        "name": "えびのカルパッチョ風サラダパフェ",
        "price": 250
    },
    {
        "name": "冬の山海の幸 天ぷら盛り（えび天）",
        "price": 410
    },
    {
        "name": "冬の山海の幸 天ぷら盛り（上えび天）",
        "price": 460
    },
    {
        "name": "ピスタチオ＆ベリーのケーキ ピスタチオアイス添え",
        "price": 330
    },
    {
        "name": "懐かしの和梨シャーベット",
        "price": 130
    },
    {
        "name": "厳選まぐろ赤身",
        "price": 120
    },
    {
        "name": "一本釣りかつお",
        "price": 120
    },
    {
        "name": "サーモン",
        "price": 120
    },
    {
        "name": "オニオンサーモン",
        "price": 120
    },
    {
        "name": "焼とろサーモン",
        "price": 120
    },
    {
        "name": "おろし焼とろサーモン",
        "price": 120
    },
    {
        "name": "サーモンちーず",
        "price": 120
    },
    {
        "name": "炙りサーモンバジルチーズ",
        "price": 120
    },
    {
        "name": "えんがわ",
        "price": 120
    },
    {
        "name": "〆さば",
        "price": 120
    },
    {
        "name": "〆さば（ごまネギ）",
        "price": 120
    },
    {
        "name": "赤えび",
        "price": 120
    },
    {
        "name": "生えび",
        "price": 120
    },
    {
        "name": "えび",
        "price": 120
    },
    {
        "name": "えびチーズ",
        "price": 120
    },
    {
        "name": "えびバジルチーズ",
        "price": 120
    },
    {
        "name": "えびアボカド",
        "price": 120
    },
    {
        "name": "甘えび",
        "price": 120
    },
    {
        "name": "えび天にぎり",
        "price": 120
    },
    {
        "name": "黒みる貝",
        "price": 120
    },
    {
        "name": "いか",
        "price": 120
    },
    {
        "name": "いか塩レモン",
        "price": 120
    },
    {
        "name": "数の子",
        "price": 120
    },
    {
        "name": "煮あなご",
        "price": 120
    },
    {
        "name": "たまご",
        "price": 120
    },
    {
        "name": "オムライすし",
        "price": 120
    },
    {
        "name": "豚塩カルビ",
        "price": 120
    },
    {
        "name": "まるごとハンバーグにぎり",
        "price": 120
    },
    {
        "name": "生ハム",
        "price": 120
    },
    {
        "name": "まぐろ・たまご",
        "price": 120
    },
    {
        "name": "えび・サーモン",
        "price": 120
    },
    {
        "name": "えび・いか",
        "price": 120
    },
    {
        "name": "えび・たまご",
        "price": 120
    },
    {
        "name": "サーモン・焼とろサーモン",
        "price": 120
    },
    {
        "name": "サーモン・いか",
        "price": 120
    },
    {
        "name": "サーモン・たまご",
        "price": 120
    },
    {
        "name": "えび・生えび",
        "price": 120
    },
    {
        "name": "活〆寒ぶり",
        "price": 150
    },
    {
        "name": "サーモンのサラダ寿司",
        "price": 150
    },
    {
        "name": "たいのサラダ寿司",
        "price": 150
    },
    {
        "name": "たこのサラダ寿司",
        "price": 150
    },
    {
        "name": "特ネタ中とろ",
        "price": 180
    },
    {
        "name": "びんとろ",
        "price": 180
    },
    {
        "name": "生サーモン",
        "price": 180
    },
    {
        "name": "サーモンアボカド",
        "price": 180
    },
    {
        "name": "サーモンバジルカマンベール",
        "price": 180
    },
    {
        "name": "活〆真鯛",
        "price": 180
    },
    {
        "name": "活〆ぶりとろ",
        "price": 180
    },
    {
        "name": "天然〆いわし",
        "price": 180
    },
    {
        "name": "天然〆いわし（ネギ・生姜）",
        "price": 180
    },
    {
        "name": "大えび",
        "price": 180
    },
    {
        "name": "上えび天にぎり",
        "price": 180
    },
    {
        "name": "ボイル本ずわい蟹1貫",
        "price": 180
    },
    {
        "name": "ほたて貝柱",
        "price": 180
    },
    {
        "name": "大つぶ貝",
        "price": 180
    },
    {
        "name": "たこ",
        "price": 180
    },
    {
        "name": "うなぎの蒲焼き",
        "price": 180
    },
    {
        "name": "生ハムバジルカマンベール",
        "price": 180
    },
    {
        "name": "ほたて食べ比べ（焦がし醤油・生レモン・天ぷら）",
        "price": 260
    },
    {
        "name": "ぷちローセット",
        "price": 480
    },
    {
        "name": "軍艦ねぎまぐろ",
        "price": 120
    },
    {
        "name": "まぐろ山かけ",
        "price": 120
    },
    {
        "name": "まぐろユッケ(卵黄醤油)",
        "price": 120
    },
    {
        "name": "まぐたく軍艦",
        "price": 120
    },
    {
        "name": "軍艦甘えび",
        "price": 120
    },
    {
        "name": "かにみそ",
        "price": 120
    },
    {
        "name": "たらマヨ",
        "price": 120
    },
    {
        "name": "数の子松前漬け",
        "price": 120
    },
    {
        "name": "コーン",
        "price": 120
    },
    {
        "name": "ツナサラダ",
        "price": 120
    },
    {
        "name": "シーサラダ",
        "price": 120
    },
    {
        "name": "カニ風サラダ",
        "price": 120
    },
    {
        "name": "たまごサラダ",
        "price": 120
    },
    {
        "name": "うずらフライ軍艦",
        "price": 120
    },
    {
        "name": "小粒納豆",
        "price": 120
    },
    {
        "name": "小粒納豆巻(ねぎ抜き)",
        "price": 120
    },
    {
        "name": "きゅうり巻",
        "price": 120
    },
    {
        "name": "海老フライアボカドロール",
        "price": 120
    },
    {
        "name": "いなり",
        "price": 120
    },
    {
        "name": "鉄火巻",
        "price": 180
    },
    {
        "name": "まぐたく巻",
        "price": 180
    },
    {
        "name": "天然筋子包み",
        "price": 180
    },
    {
        "name": "いくら",
        "price": 180
    },
    {
        "name": "本ずわい蟹軍艦",
        "price": 180
    },
    {
        "name": "サーモンいくら軍艦",
        "price": 260
    },
    {
        "name": "海鮮3貫盛り（甘えび・いくら・本ずわいがに）",
        "price": 260
    },
    {
        "name": "コク旨まぐろ醤油ラーメン",
        "price": 390
    },
    {
        "name": "濃厚えび味噌ワンタンメン",
        "price": 390
    },
    {
        "name": "鯛だし塩ラーメン",
        "price": 390
    },
    {
        "name": "きつねうどん",
        "price": 330
    },
    {
        "name": "えび天うどん",
        "price": 330
    },
    {
        "name": "上えび天うどん",
        "price": 380
    },
    {
        "name": "かけうどん",
        "price": 180
    },
    {
        "name": "かつお香る 魚のアラの赤だし",
        "price": 220
    },
    {
        "name": "かつお香る あおさと海苔の赤だし",
        "price": 220
    },
    {
        "name": "かつお香る あおさと海苔の味噌汁",
        "price": 220
    },
    {
        "name": "かつお香る あさりの赤だし",
        "price": 220
    },
    {
        "name": "かつお香る あさりの味噌汁",
        "price": 220
    },
    {
        "name": "茶碗蒸し",
        "price": 230
    },
    {
        "name": "枝豆の茶碗蒸し",
        "price": 240
    },
    {
        "name": "枝豆のあんかけ茶碗蒸し",
        "price": 240
    },
    {
        "name": "まるごと海老の柚子こしょう天ぷら",
        "price": 360
    },
    {
        "name": "赤いかの唐揚げ",
        "price": 360
    },
    {
        "name": "フライドチキン（2個）",
        "price": 180
    },
    {
        "name": "フライドチキン（5個）",
        "price": 360
    },
    {
        "name": "フライドポテト",
        "price": 150
    },
    {
        "name": "どんぶりポテト",
        "price": 390
    },
    {
        "name": "かぼちゃの天ぷら",
        "price": 150
    },
    {
        "name": "生ビール　ジョッキ",
        "price": 590
    },
    {
        "name": "生ビール　グラス",
        "price": 430
    },
    {
        "name": "生貯蔵酒",
        "price": 480
    },
    {
        "name": "翠（SUI）",
        "price": 400
    },
    {
        "name": "レモンサワー",
        "price": 400
    },
    {
        "name": "角ハイボール",
        "price": 400
    },
    {
        "name": "オールフリー（ﾉﾝｱﾙｺｰﾙﾋﾞｰﾙ）",
        "price": 440
    },
    {
        "name": "ペプシコーラ",
        "price": 200
    },
    {
        "name": "ポップメロンソーダ",
        "price": 200
    },
    {
        "name": "さわやか白ぶどう",
        "price": 200
    },
    {
        "name": "さわやか白ぶどうソーダ",
        "price": 200
    },
    {
        "name": "ホワイトウォーター",
        "price": 200
    },
    {
        "name": "ホワイトソーダ",
        "price": 200
    },
    {
        "name": "ウーロン茶",
        "price": 200
    },
    {
        "name": "りんごジュース国産100％果汁",
        "price": 170
    },
    {
        "name": "アイスコーヒー",
        "price": 170
    },
    {
        "name": "ホットコーヒー",
        "price": 170
    },
    {
        "name": "アイスカフェラテ",
        "price": 200
    },
    {
        "name": "ホットカフェラテ",
        "price": 200
    },
    {
        "name": "アップルジュース",
        "price": 130
    },
    {
        "name": "オレンジジュース",
        "price": 130
    },
    {
        "name": "ストロベリーバニラパフェ",
        "price": 300
    },
    {
        "name": "ショコラケーキリッチ",
        "price": 230
    },
    {
        "name": "北海道ミルクレープ",
        "price": 230
    },
    {
        "name": "カタラーナアイスブリュレ",
        "price": 230
    },
    {
        "name": "わらび餅と大学芋のどっちも盛り",
        "price": 230
    },
    {
        "name": "大学いも",
        "price": 130
    },
    {
        "name": "京都峯嵐堂のわらびもち",
        "price": 150
    },
    {
        "name": "フローズンマンゴー",
        "price": 150
    },
    {
        "name": "気まぐれダブルアイス／シャーベット",
        "price": 150
    },
    {
        "name": "懐かしのメロンシャーベット",
        "price": 130
    },
    {
        "name": "北海道バニラアイス",
        "price": 130
    }
];

interface Player {
    name: string;
    orders: { name: string; price: number }[];
    totalAmount: number;
  }
  
  const SushiRandomizer: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [currentRoll, setCurrentRoll] = useState<Record<string, { name: string; price: number }>>({});
    const [newPlayerName, setNewPlayerName] = useState('');
    const router = useRouter();  // ルーターを使用
  
    const addPlayer = useCallback(() => {
      if (newPlayerName.trim()) {
        setPlayers(prevPlayers => [...prevPlayers, { name: newPlayerName, orders: [], totalAmount: 0 }]);
        setNewPlayerName(''); // 入力フィールドをクリア
      }
    }, [newPlayerName]);
  
    const removePlayer = useCallback((index: number) => {
      setPlayers(prevPlayers => prevPlayers.filter((_, i) => i !== index));
    }, []);
  
    const rollSushi = useCallback(() => {
      setCurrentRoll(players.reduce((acc, player) => {
        const randomItem = menuItems[Math.floor(Math.random() * menuItems.length)];
        acc[player.name] = randomItem;
        return acc;
      }, {} as Record<string, { name: string; price: number }>));
    }, [players]);
  
    const selectSushi = useCallback((playerName: string) => {
      setPlayers(prevPlayers => prevPlayers.map(player => {
        if (player.name === playerName) {
          const selectedItem = currentRoll[playerName];
          return {
            ...player,
            orders: [...player.orders, selectedItem],
            totalAmount: player.totalAmount + selectedItem.price
          };
        }
        return player;
      }));
      setCurrentRoll(prev => ({ ...prev, [playerName]: undefined })); // 選択後にそのプレイヤーの寿司をクリア
    }, [currentRoll]);
  
    const resetGame = useCallback(() => {
      setPlayers(prevPlayers => prevPlayers.map(player => ({ ...player, orders: [], totalAmount: 0 })));
      setCurrentRoll({});
    }, []);
  
    const handleCheckout = useCallback(() => {
      const resultData = players.map(player => ({
        playerName: player.name,
        orders: player.orders,
        totalAmount: player.totalAmount
      }));
      localStorage.setItem('resultData', JSON.stringify(resultData));
      router.push('/result');  // 結果ページに遷移
    }, [players, router]);
  
    return (
      <div className={styles.container}>
        <div className={styles.addPlayerForm}>
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="プレイヤー名を入力"
          />
          <button onClick={addPlayer}>プレイヤーを追加</button>
        </div>
        <button onClick={rollSushi}>回す</button>
        <button onClick={resetGame}>リセット</button>
        <button onClick={handleCheckout}>お会計</button>
        
        {players.map((player, index) => (
          <PlayerComponent 
            key={player.name}
            player={player}
            currentRoll={currentRoll[player.name]}
            onRemove={() => removePlayer(index)}
            onSelect={() => selectSushi(player.name)}
          />
        ))}
      </div>
    );
  };
  
  interface PlayerComponentProps {
    player: Player;
    currentRoll?: { name: string; price: number };
    onRemove: () => void;
    onSelect: () => void;
  }
  
  const PlayerComponent: React.FC<PlayerComponentProps> = ({ player, currentRoll, onRemove, onSelect }) => (
    <div className={styles.player}>
      <span>{player.name}</span>
      <button onClick={onRemove}>削除</button>
      {currentRoll && (
        <>
          <span>{currentRoll.name} ({currentRoll.price}円)</span>
          <button onClick={onSelect}>選択</button>
        </>
      )}
      <div>合計: {player.totalAmount}円</div>
    </div>
  );
  
  export default SushiRandomizer;
