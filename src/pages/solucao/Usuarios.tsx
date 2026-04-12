import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

interface Usuario {
  id: number
  nome: string
  email: string
  tipo: 'paciente' | 'voluntario' | 'admin'
  status: 'ativo' | 'inativo' | 'pendente'
  telefone: string
  dataCadastro: string
  ultimoAcesso: string
  permissoes: string[]
}

const usuariosMock: Usuario[] = [
  {
    id: 1,
    nome: 'Ana Silva',
    email: 'ana.silva@email.com',
    tipo: 'paciente',
    status: 'ativo',
    telefone: '(11) 98765-4321',
    dataCadastro: '2024-01-15',
    ultimoAcesso: '2024-03-20',
    permissoes: ['visualizar_match', 'enviar_mensagem']
  },
  {
    id: 2,
    nome: 'Carlos Souza',
    email: 'carlos.souza@email.com',
    tipo: 'voluntario',
    status: 'ativo',
    telefone: '(11) 91234-5678',
    dataCadastro: '2024-02-01',
    ultimoAcesso: '2024-03-19',
    permissoes: ['visualizar_match', 'enviar_mensagem', 'criar_sessa']
  },
  {
    id: 3,
    nome: 'Maria Santos',
    email: 'maria.santos@email.com',
    tipo: 'paciente',
    status: 'pendente',
    telefone: '(11) 99876-5432',
    dataCadastro: '2024-03-05',
    ultimoAcesso: '2024-03-05',
    permissoes: ['visualizar_match']
  },
  {
    id: 4,
    nome: 'João Oliveira',
    email: 'joao.oliveira@email.com',
    tipo: 'voluntario',
    status: 'inativo',
    telefone: '(11) 95678-1234',
    dataCadastro: '2023-12-10',
    ultimoAcesso: '2024-01-15',
    permissoes: ['visualizar_match']
  },
  {
    id: 5,
    nome: 'Fernanda Lima',
    email: 'fernanda.lima@email.com',
    tipo: 'admin',
    status: 'ativo',
    telefone: '(11) 93456-7890',
    dataCadastro: '2023-11-20',
    ultimoAcesso: '2024-03-21',
    permissoes: ['todos']
  },
  {
    id: 6,
    nome: 'Pedro Costa',
    email: 'pedro.costa@email.com',
    tipo: 'paciente',
    status: 'ativo',
    telefone: '(21) 98765-1234',
    dataCadastro: '2024-02-20',
    ultimoAcesso: '2024-03-18',
    permissoes: ['visualizar_match', 'enviar_mensagem']
  },
  {
    id: 7,
    nome: 'Juliana Martins',
    email: 'juliana.martins@email.com',
    tipo: 'voluntario',
    status: 'ativo',
    telefone: '(21) 91234-5678',
    dataCadastro: '2024-01-10',
    ultimoAcesso: '2024-03-21',
    permissoes: ['visualizar_match', 'enviar_mensagem', 'criar_sessa']
  },
  {
    id: 8,
    nome: 'Ricardo Mendes',
    email: 'ricardo.mendes@email.com',
    tipo: 'paciente',
    status: 'inativo',
    telefone: '(31) 99876-5432',
    dataCadastro: '2023-10-15',
    ultimoAcesso: '2023-12-20',
    permissoes: ['visualizar_match']
  }
]

const Usuarios = () => {
  const navigate = useNavigate()
  const [busca, setBusca] = useState('')
  const [filtroTipo, setFiltroTipo] = useState<string>('todos')
  const [filtroStatus, setFiltroStatus] = useState<string>('todos')
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosMock)
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null)
  const [modalExcluir, setModalExcluir] = useState(false)

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((usuario) => {
      const matchBusca = 
        usuario.nome.toLowerCase().includes(busca.toLowerCase()) ||
        usuario.email.toLowerCase().includes(busca.toLowerCase())
      const matchTipo = filtroTipo === 'todos' || usuario.tipo === filtroTipo
      const matchStatus = filtroStatus === 'todos' || usuario.status === filtroStatus
      return matchBusca && matchTipo && matchStatus
    })
  }, [usuarios, busca, filtroTipo, filtroStatus])

  const estatisticas = useMemo(() => {
    return {
      total: usuarios.length,
      ativos: usuarios.filter(u => u.status === 'ativo').length,
      inativos: usuarios.filter(u => u.status === 'inativo').length,
      pendentes: usuarios.filter(u => u.status === 'pendente').length,
      pacientes: usuarios.filter(u => u.tipo === 'paciente').length,
      voluntarios: usuarios.filter(u => u.tipo === 'voluntario').length,
      admins: usuarios.filter(u => u.tipo === 'admin').length
    }
  }, [usuarios])

  const alternarStatus = (id: number) => {
    setUsuarios(prev => prev.map(u => {
      if (u.id === id) {
        const novoStatus = u.status === 'ativo' ? 'inativo' : 'ativo'
        return { ...u, status: novoStatus }
      }
      return u
    }))
  }

  const confirmarExclusao = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario)
    setModalExcluir(true)
  }

  const excluirUsuario = () => {
    if (usuarioSelecionado) {
      setUsuarios(prev => prev.filter(u => u.id !== usuarioSelecionado.id))
      setModalExcluir(false)
      setUsuarioSelecionado(null)
    }
  }

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      paciente: 'Paciente',
      voluntario: 'Voluntário',
      admin: 'Administrador'
    }
    return labels[tipo] || tipo
  }

  const getTipoColor = (tipo: string) => {
    const colors: Record<string, string> = {
      paciente: 'bg-green-100 text-green-800',
      voluntario: 'bg-blue-100 text-blue-800',
      admin: 'bg-red-100 text-red-800'
    }
    return colors[tipo] || 'bg-gray-100 text-gray-800'
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      ativo: 'bg-green-100 text-green-800',
      inativo: 'bg-gray-100 text-gray-800',
      pendente: 'bg-yellow-100 text-yellow-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Usuários</h1>
        <p className="mt-2 text-gray-600">
          Painel administrativo para visualização e gestão de usuários da plataforma.
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900">{estatisticas.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Ativos</p>
          <p className="text-2xl font-bold text-green-600">{estatisticas.ativos}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-gray-400">
          <p className="text-sm text-gray-500">Inativos</p>
          <p className="text-2xl font-bold text-gray-600">{estatisticas.inativos}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">Pendentes</p>
          <p className="text-2xl font-bold text-yellow-600">{estatisticas.pendentes}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-400">
          <p className="text-sm text-gray-500">Pacientes</p>
          <p className="text-2xl font-bold text-gray-900">{estatisticas.pacientes}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-400">
          <p className="text-sm text-gray-500">Voluntários</p>
          <p className="text-2xl font-bold text-gray-900">{estatisticas.voluntarios}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <p className="text-sm text-gray-500">Admins</p>
          <p className="text-2xl font-bold text-gray-900">{estatisticas.admins}</p>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="todos">Todos</option>
              <option value="paciente">Paciente</option>
              <option value="voluntario">Voluntário</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="todos">Todos</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
              <option value="pendente">Pendente</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setBusca('')
                setFiltroTipo('todos')
                setFiltroStatus('todos')
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Tabela de Usuários */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cadastro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Acesso
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-container flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {usuario.nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{usuario.nome}</div>
                        <div className="text-sm text-gray-500">{usuario.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTipoColor(usuario.tipo)}`}>
                      {getTipoLabel(usuario.tipo)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(usuario.status)}`}>
                      {usuario.status.charAt(0).toUpperCase() + usuario.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(usuario.dataCadastro).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(usuario.ultimoAcesso).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/solucao/usuarios/${usuario.id}`)}
                        className="text-primary hover:text-primary-container transition-colors"
                        title="Ver detalhes"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => alternarStatus(usuario.id)}
                        className={`transition-colors ${
                          usuario.status === 'ativo' 
                            ? 'text-yellow-600 hover:text-yellow-800' 
                            : 'text-green-600 hover:text-green-800'
                        }`}
                        title={usuario.status === 'ativo' ? 'Desativar' : 'Ativar'}
                      >
                        {usuario.status === 'ativo' ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => confirmarExclusao(usuario)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Excluir"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {usuariosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="mt-4 text-gray-500">Nenhum usuário encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {modalExcluir && usuarioSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmar Exclusão</h3>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir o usuário <strong>{usuarioSelecionado.nome}</strong>? 
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setModalExcluir(false)
                  setUsuarioSelecionado(null)
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={excluirUsuario}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Usuarios
