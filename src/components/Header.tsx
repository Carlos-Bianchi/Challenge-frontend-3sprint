import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight hover:text-blue-200 transition-colors">
          SmileMatch
        </Link>

        <button
          className="md:hidden flex flex-col gap-1 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>

        <nav
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-blue-900 md:bg-transparent z-50 md:z-auto gap-1 md:gap-6 px-4 md:px-0 pb-4 md:pb-0`}
        >
          <Link to="/" className="py-2 md:py-0 hover:text-blue-300 transition-colors font-medium" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/sobre" className="py-2 md:py-0 hover:text-blue-300 transition-colors font-medium" onClick={() => setMenuOpen(false)}>
            Sobre
          </Link>
          <Link to="/faq" className="py-2 md:py-0 hover:text-blue-300 transition-colors font-medium" onClick={() => setMenuOpen(false)}>
            FAQ
          </Link>
          <Link to="/contato" className="py-2 md:py-0 hover:text-blue-300 transition-colors font-medium" onClick={() => setMenuOpen(false)}>
            Contato
          </Link>
          <Link to="/integrantes" className="py-2 md:py-0 hover:text-blue-300 transition-colors font-medium" onClick={() => setMenuOpen(false)}>
            Integrantes
          </Link>
          <Link to="/solucao" className="py-2 md:py-0 hover:text-blue-300 transition-colors font-medium" onClick={() => setMenuOpen(false)}>
            Solução
          </Link>
        </nav>
      </div>
    </header>
  )
}
