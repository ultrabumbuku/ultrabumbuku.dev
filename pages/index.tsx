import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layout'
import { FaEnvelope, FaTwitter, FaGithub } from 'react-icons/fa'

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
          <p>筑波大学 知識情報・図書館学類 4年</p>
        </section>

        <section id="interests">
          <h3>興味</h3>
          <p>図書館情報学、情報検索</p>
          <p>その他：LLM、広告コミュニケーション</p>
        </section>

        <section id="likes">
          <h3>好き</h3>
          <p>アニメ（ぼっち・ざ・ろっく！、涼宮ハルヒの憂鬱）</p>
          <p>ミュージアム、図書館</p>
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