import { useNavigate, Outlet, useLocation, Link } from 'react-router-dom'

interface NavCard {
  title: string
  description: string
  path: string
}

const navCards: NavCard[] = [
  {
    title: 'Match',
    description: 'Gerencie e acompanhe os matches da plataforma',
    path: 'match',
  },
  {
    title: 'Comunicação',
    description: 'Canais de comunicação e mensagens',
    path: 'comunicacao',
  },
  {
    title: 'Usuários',
    description: 'Gestão de usuários e permissões',
    path: 'usuarios',
  },
  {
    title: 'Dashboard',
    description: 'Visualização de dados e métricas',
    path: 'dashboard',
  },
  {
    title: 'Relatórios',
    description: 'Relatórios e análises detalhadas',
    path: 'relatorios',
  },
]

const Solucao = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isRootPath = location.pathname === '/solucao'

  const handleCardClick = (path: string) => {
    navigate(path)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Solução do Projeto
            </h1>
            <nav className="flex space-x-4">
              {navCards.map((card) => (
                <Link
                  key={card.path}
                  to={card.path}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md transition-colors duration-300"
                >
                  {card.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isRootPath ? (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Módulos do Sistema
              </h2>
              <p className="mt-2 text-gray-600">
                Selecione um módulo para acessar suas funcionalidades
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {navCards.map((card) => (
                <div
                  key={card.path}
                  onClick={() => handleCardClick(card.path)}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600">{card.description}</p>
                  <div className="mt-4 flex items-center text-blue-600 font-medium">
                    <span>Acessar</span>
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  )
}

export default Solucao
