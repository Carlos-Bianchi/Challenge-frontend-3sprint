import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, ChevronDown, Heart, X, Users, LayoutDashboard, FileText, Radio } from 'lucide-react'

interface NavItem {
  label: string
  path: string
}

interface ModuleItem {
  label: string
  path: string
  description: string
  icon: React.ReactNode
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isModulesDropdownOpen, setIsModulesDropdownOpen] = useState(false)
  const [isMobileModulesExpanded, setIsMobileModulesExpanded] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  const accentColorClass = 'from-turma-green to-turma-green/80'
  const accentTextClass = 'text-turma-green'
  const accentBgClass = 'bg-turma-green'
  const accentHoverClass = 'hover:bg-turma-green/10'
  const accentGlowClass = 'shadow-turma-green/20'

  const publicNavItems: NavItem[] = [
    { path: '/', label: 'Home' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contato', label: 'Contato' },
    { path: '/integrantes', label: 'Integrantes' },
  ]

  const moduleItems: ModuleItem[] = [
    {
      label: 'Match',
      path: '/solucao/match',
      description: 'Conecte pacientes a dentistas',
      icon: <Heart className="w-5 h-5" />,
    },
    {
      label: 'Hub de Comunicação',
      path: '/solucao/comunicacao',
      description: 'Central de mensagens e notificações',
      icon: <Radio className="w-5 h-5" />,
    },
    {
      label: 'Usuários',
      path: '/solucao/usuarios',
      description: 'Gerencie perfis e permissões',
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: 'Dashboard',
      path: '/solucao/dashboard',
      description: 'Métricas e análises em tempo real',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: 'Relatórios',
      path: '/solucao/relatorios',
      description: 'Relatórios e exported data',
      icon: <FileText className="w-5 h-5" />,
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsModulesDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const isModuleActive = () => location.pathname.startsWith('/solucao')

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.05)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accentColorClass} flex items-center justify-center shadow-lg ${accentGlowClass} group-hover:scale-105 transition-transform duration-300`}>
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold ${accentTextClass} tracking-tight`}>
                Turma do Bem
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {publicNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? `${accentBgClass} text-white shadow-md`
                    : `text-on-surface-variant hover:bg-surface-container hover:text-on-surface`
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsModulesDropdownOpen(!isModulesDropdownOpen)}
                onMouseEnter={() => setIsModulesDropdownOpen(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  isModuleActive()
                    ? `${accentBgClass} text-white shadow-md`
                    : `text-on-surface-variant hover:bg-surface-container hover:text-on-surface`
                }`}
              >
                Módulos
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isModulesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <div
                className={`absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-outline-variant overflow-hidden transition-all duration-300 ${
                  isModulesDropdownOpen
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 -translate-y-2 invisible pointer-events-none'
                }`}
              >
                <div className="p-2">
                  {moduleItems.map((module) => (
                    <Link
                      key={module.path}
                      to={module.path}
                      onClick={() => setIsModulesDropdownOpen(false)}
                      className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-300 group ${
                        isActive(module.path)
                          ? 'bg-primary/10'
                          : 'hover:bg-surface-container'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accentColorClass} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300`}>
                        {module.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-sm ${isActive(module.path) ? accentTextClass : 'text-on-background'}`}>
                          {module.label}
                        </p>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                          {module.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:block px-4 py-2 text-sm font-medium text-on-background hover:text-turma-green transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              to="/registro"
              className={`px-4 py-2 rounded-lg text-sm font-medium ${accentBgClass} text-white hover:bg-turma-green-dark transition-all duration-300 shadow-md hover:shadow-lg`}
            >
              Registre-se
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl ${accentHoverClass} ${accentTextClass} transition-all duration-300`}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 border-t border-outline-variant bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] -mx-4 px-4">
            <nav className="flex flex-col space-y-1 mb-4">
              {publicNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? `${accentBgClass} text-white shadow-md`
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <button
                onClick={() => setIsMobileModulesExpanded(!isMobileModulesExpanded)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isModuleActive()
                    ? `${accentBgClass} text-white shadow-md`
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span>Módulos</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMobileModulesExpanded ? 'rotate-180' : ''}`} />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isMobileModulesExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pl-4 py-2 space-y-1">
                  {moduleItems.map((module) => (
                    <Link
                      key={module.path}
                      to={module.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive(module.path)
                          ? `${accentBgClass}/10 ${accentTextClass}`
                          : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${accentBgClass}/10 flex items-center justify-center ${accentTextClass}`}>
                        {module.icon}
                      </div>
                      <span>{module.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            <div className="border-t border-outline-variant pt-4 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-on-background hover:bg-surface-container transition-all duration-300 text-center"
              >
                Login
              </Link>
              <Link
                to="/registro"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium ${accentBgClass} text-white hover:bg-turma-green-dark transition-all duration-300 text-center`}
              >
                Registre-se
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header