import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <header>
      <div className="header-content">
        <h1>ultrabumbuku</h1>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/musakui">無作為</Link></li>
            <li><Link href="/kasuga">春日</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header