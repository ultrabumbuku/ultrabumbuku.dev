import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>ウルトラぶんぶくのサイト</title>
        <meta name="description" content="ultrabumbuku" />
      </Head>

      <main className="main">
        <section id="about">
          <h2>About Me</h2>
          <ul>
            <li>筑波大学 知識情報・図書館学類 4年</li>
            <li>KASYS（知識獲得システム研究室）所属</li>
          </ul>
        </section>

        <section id="interests">
          <h3>興味</h3>
          <ul>
            <li>図書館情報学</li>
            <li>情報検索</li>
            <li>情報組織化</li>
          </ul>
        </section>

        <section id="likes">
          <h3>好き</h3>
          <ul>
            <li>ぼっち・ざ・ろっく！</li>
            <li>涼宮ハルヒの憂鬱</li>
            <li>ミュージアム</li>
            <li>図書館</li>
          </ul>
        </section>
      </main>
    </Layout>
  )
}