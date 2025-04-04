import Link from 'next/link'
import styles from '../styles/Header.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1>ultrabumbuku</h1>
        <nav>
          <ul className={styles.navList}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/musakui">無作為</Link></li>
            <li><Link href="/kasuga">春日</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header