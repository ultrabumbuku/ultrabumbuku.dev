import Image from 'next/image'
import Link from 'next/link'
import { FaEnvelope, FaTwitter, FaGithub } from 'react-icons/fa'

const Header: React.FC = () => (
  <header>
    <div className="header-content">
      <h1>
        <Link href="/" legacyBehavior>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>ultrabumbuku</a>
        </Link>
      </h1>
      <nav aria-label="外部リンク">
        <ul className="icon-nav">
          <li>
            <a href="mailto:ultrabumbuku@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
          </li>
          <li>
            <a href="https://x.com/ultrabumbuku" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
          </li>
          <li>
            <a href="https://github.com/ultrabumbuku" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
          </li>
          <li>
            <a href="https://note.com/ultrabumbuku" target="_blank" rel="noopener noreferrer" aria-label="Note">
              <Image
                src="/images/icons/note-icon.svg"
                alt="Note"
                width={32}
                height={32}
                className="note-icon"
              />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
)

export default Header