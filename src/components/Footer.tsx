import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const navigationLinks = [
    { path: '/', label: 'Home' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contato', label: 'Contato' },
    { path: '/modulos', label: 'Módulos' },
    { path: '/integrantes', label: 'Integrantes' },
  ]

  const contactInfo = [
    { icon: Mail, text: 'contato@turmabem.org' },
    { icon: Phone, text: '(11) 99999-9999' },
    { icon: MapPin, text: 'São Paulo/SP' },
  ]

  return (
    <footer className="bg-surface-container border-t border-surface-container-high">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-turma-green to-turma-green-dark flex items-center justify-center shadow-md">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-turma-green">Turma do Bem</span>
            </Link>
            <p className="text-sm text-on-surface-variant max-w-xs">
              Conectando pacientes a dentistas voluntários desde 1995
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-semibold text-turma-green uppercase tracking-wider mb-4">
              Navegação
            </h3>
            <nav className="grid grid-cols-2 gap-x-8 gap-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-on-surface-variant hover:text-turma-yellow transition-colors duration-300 py-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-semibold text-turma-green uppercase tracking-wider mb-4">
              Contato
            </h3>
            <div className="flex flex-col gap-3">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-sm text-on-surface-variant"
                >
                  <item.icon className="w-4 h-4 text-turma-green" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        <div className="py-6 border-t border-surface-container-high">
          <p className="text-sm text-on-surface-variant text-center">
            © 2026 Turma do Bem. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
