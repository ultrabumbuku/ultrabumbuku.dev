import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <header>
      <div className="header-content">
        <h1>ultrabumbuku</h1>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header