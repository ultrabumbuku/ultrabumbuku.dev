import { AppProps } from 'next/app'
import { useEffect } from 'react'
import '../styles/globals.css'
import 'zenn-content-css'
import '../styles/custom-zenn-content.css'
import 'katex/dist/katex.min.css'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('zenn-embed-elements')
  }, [])

  return <Component {...pageProps} />
}

export default MyApp

