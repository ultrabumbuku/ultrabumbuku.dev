import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <script src="https://embed.zenn.studio/js/listen-embed-event.js" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#FAD02E" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

