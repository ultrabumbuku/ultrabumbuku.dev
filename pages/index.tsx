import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layout'
import { FaEnvelope, FaTwitter, FaGithub } from 'react-icons/fa';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>ウルトラぶんぶくのサイト</title>
        <meta name="description" content="ウルトラぶんぶくの個人サイト" />
      </Head>

      <main>
        <section id="about">
          <h2>About Me</h2>
          <p>筑波大学 知識情報・図書館学類に所属しています。大学3年生です。</p>
          <p>普段は本を読んだり、家事をしたり、計算機を触ったり、授業に出たり、TQS<sup><Link href="#note1" className="note-link">*1</Link></sup>でクイズをしたり、げんしけん<sup><Link href="#note2" className="note-link">*2</Link></sup>でアーカイブのお手伝いをしたりしています。</p>
          <p>今年はSecHack365 思索駆動コースに参加することになりました。がんばりたい！</p>
          <p>1,2年次には学園祭<sup><Link href="#note3" className="note-link">*3</Link></sup>運営<sup><Link href="#note4" className="note-link">*4</Link></sup>をやっていました。</p>
        </section>

        <section id="interests">
          <h3>Interests</h3>
          <ul>
            <li>情報と人間の関わり、そのあり方</li>
            <li>情報インフラとしての図書館</li>
            <li>組織内における情報伝達</li>
            <li>デカい情報、デカい経済</li>
          </ul>
          <p>具体的には：</p>
          <ul>
            <li>図書館情報学</li>
            <li>情報組織化</li>
            <li>索引</li>
            <li>分類</li>
            <li>情報検索</li>
            <li>情報行動</li>               
            <li>知識論（認識論）</li>
            <li>メディア論</li>
          </ul>
          <p>ちょっぴり興味<sup><Link href="#note5" className="note-link">*5</Link></sup>：</p>
          <ul>
            <li>人文情報学</li>
            <li>機械学習</li>
            <li>大規模言語モデル</li>
            <li>存在論</li>
            <li>広告コミュニケーション</li>
            <li>セキュリティ</li>
          </ul>
        </section>

        <section id="likes">
          <h3>Likes</h3>
          <ul>
            <li>ぼっち・ざ・ろっく！<sup><Link href="#note6" className="note-link">*6</Link></sup></li>
            <li>涼宮ハルヒの憂鬱</li>
            <li>カメラ</li>
            <li>ミュージアム</li>
            <li>図書館</li>
            <li>ラーメン</li>
            <li>スイーツ</li>
            <li>コーヒー</li>
          </ul>
        </section>

        <section id="not-good-at">
          <h3>Not good at</h3>
          <ul>
            <li>早起き</li>
            <li>片づけ</li>
            <li>マルチタスク</li>
          </ul>
        </section>

        <section id="notes">
          <h4>Notes</h4>
          <p><small id="note1">*1 筑波大学クイズ研究会</small></p>
          <p><small id="note2">*2 筑波大学現代視覚文化研究会 アーカイブ班</small></p>
          <p><small id="note3">*3 筑波大学学園祭『雙峰祭』</small></p>
          <p><small id="note4">*4 筑波大学学園祭実行委員会 本部企画局</small></p>
          <p><small id="note5">*5 かなり何も知らない</small></p>
          <p><small id="note6">*6 特に伊地知虹夏さん</small></p>
        </section>

        <div className="contact-icons">
          <a href="mailto:ultrabumbuku@gmail.com" aria-label="Email">
            <Image src="/images/icons/Gmail-icon.png" alt="Gmail Icon" width={38} height={30} />
          </a>
          <a href="https://x.com/ultrabumbuku" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Image src="/images/icons/x-icon.png" alt="X Icon" width={30} height={30} />
          </a>
          <a href="https://github.com/ultrabumbuku" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Image src="/images/icons/github-mark.svg" alt="GitHub Icon" width={36} height={36} />
          </a>
          <a href="https://note.com/ultrabumbuku" target="_blank" rel="noopener noreferrer" aria-label="Note">
            <Image src="/images/icons/note-icon.svg" alt="Note Icon" width={40} height={40} />
          </a>


        </div>
      </main>
    </Layout>
  )
}