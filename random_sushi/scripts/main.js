document.addEventListener('DOMContentLoaded', function() {
    const menuItems = [
        { name: "特ネタ中とろ ＋ まぐろ", price: 100 },
        { name: "大えび ＋ えび", price: 180 },
        { name: "上穴子 ＋ 煮穴子", price: 180 },
        { name: "天然インド鮪6貫盛り ＋ 味噌汁", price: 1080 },
        { name: "ぷちローセット + アップルジュース", price: 480 },
        { name: "ぷちローセット + オレンジジュース", price: 480 },
        { name: "あわび3貫盛り(生・蒸・煮)", price: 400 },
        { name: "天然きんきの炙り", price: 260 },
        { name: "煮はまぐりにぎり", price: 260 },
        { name: "匠の海鮮巻き重ね（夏）", price: 260 },
        { name: "コウイカ", price: 120 },
        { name: "山盛りサラダ軍艦", price: 120 },
        { name: "とろ鉄火高菜巻（中とろとねぎいくらのせ・中とろとたくあん）", price: 680 },
        { name: "大型生ずわい蟹＆かに味噌和え", price: 400 },
        { name: "炙りベビーほたてチーズ", price: 180 },
        { name: "ほたるいか醤油漬け軍艦", price: 180 },
        { name: "三陸産いわし天ぷら", price: 120 },
        { name: "オムライすし", price: 120 },
        { name: "魚介白湯塩ラーメン", price: 450 },
        { name: "味噌らーめん（生姜入り）", price: 450 },
        { name: "フライドチキン(6個)", price: 360 },
        { name: "ザックザク！ブラックモンブランパフェ", price: 330 },
        { name: "ストロベリーバニラパフェ", price: 300 },
        { name: "北海道ミルククリームのアイスエクレア", price: 150 },
        { name: "厳選めばち鮪", price: 120 },
        { name: "びん長まぐろ", price: 120 },
        { name: "サーモン", price: 120 },
        { name: "オニオンサーモン", price: 120 },
        { name: "焼とろサーモン", price: 120 },
        { name: "おろし焼とろサーモン", price: 120 },
        { name: "ジャンボとろサーモン", price: 120 },
        { name: "サーモンちーず", price: 120 },
        { name: "炙りサーモンバジルチーズ", price: 120 },
        { name: "炭焼きかつおたたき", price: 120 },
        { name: "活〆はまち1貫", price: 120 },
        { name: "えんがわ", price: 120 },
        { name: "〆さば", price: 120 },
        { name: "〆さば（ごまネギ）", price: 120 },
        { name: "〆いわし（ネギ・生姜）", price: 120 },
        { name: "生えび", price: 120 },
        { name: "えび", price: 120 },
        { name: "えびチーズ", price: 120 },
        { name: "えびバジルチーズ", price: 120 },
        { name: "えびアボカド", price: 120 },
        { name: "甘えび", price: 120 },
        { name: "えび天にぎり", price: 120 },
        { name: "ほっき貝", price: 120 },
        { name: "いか", price: 120 },
        { name: "数の子", price: 120 },
        { name: "煮あなご", price: 120 },
        { name: "たまご", price: 120 },
        { name: "牛塩カルビ", price: 120 },
        { name: "まるごとハンバーグにぎり", price: 120 },
        { name: "グリルチキン", price: 120 },
        { name: "生ハム", price: 120 },
        { name: "まぐろ・たまご", price: 120 },
        { name: "えび・サーモン", price: 120 },
        { name: "えび・いか", price: 120 },
        { name: "えび・たまご", price: 120 },
        { name: "サーモン・たまご", price: 120 },
        { name: "サーモン・焼とろサーモン", price: 120 },
        { name: "サーモン・いか", price: 120 },
        { name: "えび・生えび", price: 120 },
        { name: "えびチーズ・サーモンチーズ", price: 120 },
        { name: "えびバジルチーズ・サーモンバジルチーズ", price: 120 },
        { name: "サーモンアボカド", price: 180 },
        { name: "サーモンバジルモッツァレラ", price: 180 },
        { name: "ジャンボとろサーモン焦がし醤油", price: 180 },
        { name: "活〆真鯛", price: 180 },
        { name: "漬けごま活〆真鯛", price: 180 },
        { name: "ボイル本ずわい蟹1貫", price: 180 },
        { name: "ほたて貝柱", price: 180 },
        { name: "いか梅しそにぎり", price: 180 },
        { name: "うなぎの蒲焼き", price: 180 },
        { name: "牛塩カルビチーズ炙り", price: 180 },
        { name: "グリルチキンチーズ", price: 180 },
        { name: "生ハムアボカド", price: 180 },
        { name: "生ハムバジルモッツァレラ", price: 180 },
        { name: "ほたて食べ比べ（焦がし醤油・生レモン・天ぷら）", price: 260 },
        { name: "特ネタ大とろ", price: 360 },
        { name: "特ネタ大とろ焦がし醤油", price: 360 },
        { name: "軍艦ねぎまぐろ", price: 120 },
        { name: "まぐろ山かけ", price: 120 },
        { name: "まぐろユッケ(卵黄醤油)", price: 120 },
        { name: "まぐたく軍艦", price: 120 },
        { name: "軍艦甘えび", price: 120 },
        { name: "かにみそ", price: 120 },
        { name: "ししゃもこ軍艦(カラフトししゃも使用)", price: 120 },
        { name: "たらこ", price: 120 },
        { name: "たらマヨ", price: 120 },
        { name: "数の子松前漬け", price: 120 },
        { name: "コーン", price: 120 },
        { name: "ツナサラダ", price: 120 },
        { name: "シーサラダ", price: 120 },
        { name: "カニ風サラダ", price: 120 },
        { name: "たまごサラダ", price: 120 },
        { name: "うずらフライ軍艦", price: 120 },
        { name: "小粒納豆", price: 120 },
        { name: "梅きゅう巻", price: 120 },
        { name: "きゅうり巻", price: 120 },
        { name: "小粒納豆巻(ねぎ抜き)", price: 120 },
        { name: "海老フライアボカドロール", price: 120 },
        { name: "いなり", price: 120 },
        { name: "カニ風サラダ・シーサラダ", price: 120 },
        { name: "カニ風サラダ・コーン", price: 120 },
        { name: "シーサラダ・コーン", price: 120 },
        { name: "ツナサラダ・コーン", price: 120 },
        { name: "鉄火巻", price: 180 },
        { name: "まぐたく巻", price: 180 },
        { name: "いくら", price: 180 },
        { name: "本ずわい蟹軍艦", price: 180 },
        { name: "サーモンいくら軍艦", price: 260 },
        { name: "海鮮3貫盛り（甘えび・いくら・本ずわいがに）", price: 260 },
        { name: "コク旨まぐろ醤油ラーメン", price: 390 },
        { name: "わかめうどん", price: 330 },
        { name: "きつねうどん", price: 330 },
        { name: "えび天うどん", price: 330 },
        { name: "かけうどん", price: 180 },
        { name: "あおさと海苔の味噌汁", price: 200 },
        { name: "あさりの味噌汁", price: 200 },
        { name: "茶碗蒸し", price: 230 },
        { name: "季節の茶碗蒸し（枝豆）", price: 240 },
        { name: "フライドポテト", price: 150 },
        { name: "赤いかの唐揚げ", price: 360 },
        { name: "かぼちゃの天ぷら", price: 150 },
        { name: "店内仕込の海鮮ポテサラ（ガリ入）", price: 150 },
        { name: "生ビール　ジョッキ", price: 590 },
        { name: "生ビール　グラス", price:430 },
        { name: "大吟醸", price: 720 },
        { name: "生貯蔵酒", price: 480 },
        { name: "翠(SUI)", price: 400 },
        { name: "レモンサワー", price: 400 },
        { name: "角ハイボール", price: 400 },
        { name: "オールフリー（ﾉﾝｱﾙｺｰﾙﾋﾞｰﾙ）", price: 440 },
        { name: "りんごジュース国産100％果汁", price: 170 },
        { name: "アイスコーヒー", price: 170 },
        { name: "ホットコーヒー", price: 170 },
        { name: "アイスカフェラテ", price: 200 },
        { name: "ホットカフェラテ", price: 200 },
        { name: "アップルジュース", price: 130 },
        { name: "オレンジジュース", price: 130 },
        { name: "カタラーナアイスブリュレ", price: 230 },
        { name: "ショコラケーキリッチ", price: 230 },
        { name: "北海道ミルクレープメルバ", price: 260 },
        { name: "北海道ミルクレープ", price: 230 },
        { name: "わらび餅と大学芋どっちも盛り", price: 230 },
        { name: "大学いも", price: 130 },
        { name: "京都峯嵐堂のわらびもち", price: 150 },
        { name: "フローズンマンゴー", price: 150 },
        { name: "懐かしのメロンシャーベット", price: 130 },
        { name: "北海道バニラアイス", price: 130 }
    ];

    const addPlayerButton = document.getElementById('addPlayerButton');
    const rollButton = document.getElementById('rollButton');
    const finishButton = document.getElementById('finishButton');
    const resetButton = document.getElementById('resetButton');
    const playersDiv = document.getElementById('players');

    let playerCount = 0;
    const players = {};

    addPlayerButton.addEventListener('click', function() {
        playerCount++;
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player';
        playerDiv.id = `player${playerCount}`;

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = `プレイヤー${playerCount}の名前を入力`;

        const confirmButton = document.createElement('button');
        confirmButton.textContent = '確定';

        confirmButton.addEventListener('click', function() {
            const playerName = nameInput.value || `プレイヤー${playerCount}`;
            nameInput.style.display = 'none';
            confirmButton.style.display = 'none';
            playerLabel.textContent = `${playerName}：`;
            players[playerName] = { orders: [], totalAmount: 0 };
            removeButton.style.display = 'inline-block'; // 確定後に削除ボタンを表示
        });

        const playerLabel = document.createElement('label');
        playerLabel.textContent = `プレイヤー${playerCount}：`;

        const display = document.createElement('span');
        display.id = `menuDisplay${playerCount}`;

        const selectButton = document.createElement('button');
        selectButton.textContent = '選択';
        selectButton.className = 'select-button';
        selectButton.style.display = 'none';

        selectButton.addEventListener('click', function() {
            const playerName = playerLabel.textContent.replace('：', '');
            const selectedItem = JSON.parse(playerDiv.dataset.selectedItem || '{}');
            if (selectedItem.name) {
                players[playerName].orders.push(selectedItem);
                players[playerName].totalAmount += selectedItem.price;
                display.textContent = `${selectedItem.name} ${selectedItem.price}円（確定）`;
                selectButton.style.display = 'none';
                playerDiv.dataset.selectedItem = '';
            }
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = '削除';
        removeButton.className = 'remove-button';
        removeButton.style.display = 'none'; // 初期状態で非表示
        removeButton.addEventListener('click', function() {
            delete players[playerLabel.textContent.replace('：', '')];
            playersDiv.removeChild(playerDiv);
        });

        playerDiv.appendChild(nameInput);
        playerDiv.appendChild(confirmButton);
        playerDiv.appendChild(playerLabel);
        playerDiv.appendChild(display);
        playerDiv.appendChild(selectButton);
        playerDiv.appendChild(removeButton);
        playersDiv.appendChild(playerDiv);
    });

    rollButton.addEventListener('click', function() {
        const playerDivs = document.querySelectorAll('.player');
        playerDivs.forEach(playerDiv => {
            const display = playerDiv.querySelector('span');
            const selectButton = playerDiv.querySelector('.select-button');
            const randomIndex = Math.floor(Math.random() * menuItems.length);
            const selectedItem = menuItems[randomIndex];
            display.textContent = `${selectedItem.name} ${selectedItem.price}円`;
            playerDiv.dataset.selectedItem = JSON.stringify(selectedItem);
            selectButton.style.display = 'inline-block';
        });
    });

    finishButton.addEventListener('click', function() {
        const resultData = [];
        for (const playerName in players) {
            resultData.push({
                playerName,
                orders: players[playerName].orders,
                totalAmount: players[playerName].totalAmount
            });
        }
        localStorage.setItem('resultData', JSON.stringify(resultData));
        window.location.href = 'result.html';
    });

    resetButton.addEventListener('click', function() {
        for (const playerName in players) {
            players[playerName].orders = [];
            players[playerName].totalAmount = 0;
        }
        const playerDivs = document.querySelectorAll('.player');
        playerDivs.forEach(playerDiv => {
            const display = playerDiv.querySelector('span');
            const selectButton = playerDiv.querySelector('.select-button');
            display.textContent = '';
            selectButton.style.display = 'none';
        });
        alert("記録がリセットされました");
    });
});