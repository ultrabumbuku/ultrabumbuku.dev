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
          <p>最近はもっぱら読書とプログラムを書くことに楽しみを見出しています。</p>
          <p>今年はSecHack365 思索駆動コースに参加し、文書創作をより楽しめるような仕組みについて考えています。</p>
          <p>1,2年次には学園祭<sup><Link href="#note1" className="note-link">*1</Link></sup>運営<sup><Link href="#note2" className="note-link">*2</Link></sup>をやっていました。</p>
        </section>

        <section id="interests">
          <h3>Interests</h3>
          <ul>
            <li>情報インフラとしての図書館</li>
            <li>組織内における情報伝達</li>
            <li>システムはいかにして情報要求を満たすか</li>
            <li>デカい情報、デカい経済</li>
          </ul>
          <p>具体的には：</p>
          <ul>
            <li>図書館情報学</li>
            <li>情報組織化</li>
            <li>分類・索引</li>
            <li>情報検索</li>
            <li>情報行動</li>          
          </ul>
          <p>ちょっぴり興味</p>
          <ul>
            <li>機械学習</li>
            <li>大規模言語モデル</li>
            <li>広告コミュニケーション（特に広告コピー）</li>
            <li>セキュリティ</li>
          </ul>
        </section>

        <section id="likes">
          <h3>Likes</h3>
          <ul>
            <li>ぼっち・ざ・ろっく！<sup><Link href="#note3" className="note-link">*3</Link></sup></li>
            <li>涼宮ハルヒの憂鬱</li>
            <li>カメラ</li>
            <li>ミュージアム</li>
            <li>図書館</li>
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
          <p><small id="note1">*1 筑波大学学園祭『雙峰祭』</small></p>
          <p><small id="note2">*2 筑波大学学園祭実行委員会 本部企画局</small></p>
          <p><small id="note3">*3 特に伊地知虹夏さん</small></p>
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