import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import Link from 'next/link'

type LayoutProps = {
  children: React.ReactNode
  title?: string
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'ultrabumbuku' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/kasuga">Kasuga Generator</Link></li>
            <li><Link href="/random_sushi">Random Sushi</Link></li>
          </ul>
        </nav>
      </Header>
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
