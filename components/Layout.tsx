import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

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
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
