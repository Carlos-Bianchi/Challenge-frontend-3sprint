import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Power, Trash2 } from 'lucide-react'
import { api, getApiErrorMessage } from '../../lib/api'
import { formatDate, formatRole, formatUserStatus, getInitials } from '../../lib/format'
import type { PapelUsuario, StatusUsuario, UsuarioResponse } from '../../types/api'

const roleBadgeClass: Record<PapelUsuario, string> = {
  paciente: 'bg-green-100 text-green-800',
  dentista_voluntario: 'bg-blue-100 text-blue-800',
  administrador: 'bg-red-100 text-red-800',
}

const statusBadgeClass: Record<StatusUsuario, string> = {
  ativo: 'bg-green-100 text-green-800',
  inativo: 'bg-gray-100 text-gray-800',
  pendente: 'bg-yellow-100 text-yellow-800',
}

const Usuarios = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<UsuarioResponse[]>([])
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<'todos' | PapelUsuario>('todos')
  const [statusFilter, setStatusFilter] = useState<'todos' | StatusUsuario>('todos')
  const [isLoading, setIsLoading] = useState(true)
  const [pageError, setPageError] = useState('')
  const [actionError, setActionError] = useState('')
  const [selectedUser, setSelectedUser] = useState<UsuarioResponse | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [busyUserId, setBusyUserId] = useState<number | null>(null)

  const loadUsers = async () => {
    try {
      setPageError('')
      setIsLoading(true)
      setUsers(await api.listUsers())
    } catch (error) {
      setPageError(getApiErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadUsers()
  }, [])

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return users.filter((user) => {
      const matchesSearch = normalizedSearch.length === 0 || [
        user.nomeCompleto,
        user.email,
        user.telefone,
        user.cpf,
      ].some((value) => value.toLowerCase().includes(normalizedSearch))

      const matchesRole = roleFilter === 'todos' || user.papel === roleFilter
      const matchesStatus = statusFilter === 'todos' || user.status === statusFilter

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, search, roleFilter, statusFilter])

  const stats = useMemo(() => ({
    total: users.length,
    ativos: users.filter((user) => user.status === 'ativo').length,
    inativos: users.filter((user) => user.status === 'inativo').length,
    pendentes: users.filter((user) => user.status === 'pendente').length,
    pacientes: users.filter((user) => user.papel === 'paciente').length,
    dentistas: users.filter((user) => user.papel === 'dentista_voluntario').length,
    administradores: users.filter((user) => user.papel === 'administrador').length,
  }), [users])

  const handleToggleStatus = async (user: UsuarioResponse) => {
    const nextStatus: StatusUsuario = user.status === 'ativo' ? 'inativo' : 'ativo'

    try {
      setActionError('')
      setBusyUserId(user.id)
      const updatedUser = await api.updateUserStatus(user.id, nextStatus)
      setUsers((currentUsers) => currentUsers.map((currentUser) => currentUser.id === updatedUser.id ? updatedUser : currentUser))
    } catch (error) {
      setActionError(getApiErrorMessage(error))
    } finally {
      setBusyUserId(null)
    }
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) {
      return
    }

    try {
      setActionError('')
      setIsDeleting(true)
      await api.deleteUser(selectedUser.id)
      setUsers((currentUsers) => currentUsers.filter((user) => user.id !== selectedUser.id))
      setSelectedUser(null)
    } catch (error) {
      setActionError(getApiErrorMessage(error))
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="p-6 bg-surface min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-on-background">Gerenciamento de Usuários</h1>
        <p className="mt-2 text-on-surface-variant">
          Lista real de usuários fornecida pelo backend, com filtros, atualização de status e exclusão persistida.
        </p>
      </div>

      {(pageError || actionError) && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          {pageError || actionError}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Ativos</p>
          <p className="text-2xl font-bold text-green-600">{stats.ativos}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-gray-400">
          <p className="text-sm text-gray-500">Inativos</p>
          <p className="text-2xl font-bold text-gray-600">{stats.inativos}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">Pendentes</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pendentes}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-400">
          <p className="text-sm text-gray-500">Pacientes</p>
          <p className="text-2xl font-bold text-gray-900">{stats.pacientes}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-400">
          <p className="text-sm text-gray-500">Dentistas</p>
          <p className="text-2xl font-bold text-gray-900">{stats.dentistas}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <p className="text-sm text-gray-500">Admins</p>
          <p className="text-2xl font-bold text-gray-900">{stats.administradores}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <input
              type="text"
              placeholder="Buscar por nome, email, telefone ou CPF..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="w-full md:w-56">
            <label className="block text-sm font-medium text-gray-700 mb-1">Papel</label>
            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value as 'todos' | PapelUsuario)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="todos">Todos</option>
              <option value="paciente">Paciente</option>
              <option value="dentista_voluntario">Dentista voluntário</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>
          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as 'todos' | StatusUsuario)}
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
                setSearch('')
                setRoleFilter('todos')
                setStatusFilter('todos')
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="py-16 text-center text-on-surface-variant">Carregando usuários...</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Papel</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nascimento</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-container flex items-center justify-center">
                            <span className="text-white font-medium text-sm">{getInitials(user.nomeCompleto)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.nomeCompleto}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleBadgeClass[user.papel]}`}>
                          {formatRole(user.papel)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeClass[user.status]}`}>
                          {formatUserStatus(user.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.telefone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.cpf}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(user.dataNascimento)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/solucao/usuarios/${user.id}`)}
                            className="inline-flex items-center justify-center p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                            title="Ver detalhes"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => void handleToggleStatus(user)}
                            disabled={busyUserId === user.id}
                            className="inline-flex items-center justify-center p-2 rounded-lg text-yellow-700 hover:bg-yellow-50 transition-colors disabled:opacity-50"
                            title={user.status === 'ativo' ? 'Desativar usuário' : 'Ativar usuário'}
                          >
                            <Power className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="inline-flex items-center justify-center p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                            title="Excluir usuário"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Nenhum usuário encontrado com os filtros selecionados.
              </div>
            )}
          </>
        )}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmar exclusão</h3>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir o usuário <strong>{selectedUser.nomeCompleto}</strong>? Esta ação é permanente.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => void handleDeleteUser()}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Usuarios
