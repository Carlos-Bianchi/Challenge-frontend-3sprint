import { useCallback, useEffect, useState } from 'react'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { api, getApiErrorMessage } from '../../lib/api'
import { formatDate, formatRole, formatUserStatus, getInitials } from '../../lib/format'
import type { StatusUsuario, UsuarioResponse } from '../../types/api'

const statusBadgeClass: Record<StatusUsuario, string> = {
  ativo: 'bg-green-100 text-green-800',
  inativo: 'bg-gray-100 text-gray-800',
  pendente: 'bg-yellow-100 text-yellow-800',
}

const UsuarioDetalhes = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [user, setUser] = useState<UsuarioResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)

  const userId = Number(id)

  const loadUser = useCallback(async () => {
    if (!Number.isFinite(userId)) {
      setError('Usuário inválido.')
      setIsLoading(false)
      return
    }

    try {
      setError('')
      setIsLoading(true)
      setUser(await api.getUser(userId))
    } catch (loadError) {
      setError(getApiErrorMessage(loadError))
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  useEffect(() => {
    void loadUser()
  }, [loadUser])

  const handleStatusChange = async (status: StatusUsuario) => {
    if (!user) {
      return
    }

    try {
      setIsUpdatingStatus(true)
      setError('')
      setUser(await api.updateUserStatus(user.id, status))
    } catch (updateError) {
      setError(getApiErrorMessage(updateError))
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  if (isLoading) {
    return <div className="p-6 text-on-surface-variant">Carregando usuário...</div>
  }

  if (!user) {
    return (
      <div className="p-6">
        <button
          onClick={() => navigate('/solucao/usuarios')}
          className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>

        <div className="bg-white rounded-lg shadow-md p-8 mt-6 text-center">
          <h2 className="text-xl font-medium text-gray-900">Usuário não encontrado</h2>
          <p className="mt-2 text-gray-500">{error || 'O usuário solicitado não existe ou foi removido.'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/solucao/usuarios')}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">Detalhes do Usuário</h1>
            <p className="text-gray-600">ID backend: {user.id}</p>
          </div>
        </div>

        <button
          onClick={() => void loadUser()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Recarregar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-on-background/5 p-6">
          <div className="w-20 h-20 rounded-full bg-primary-container mx-auto flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">{getInitials(user.nomeCompleto)}</span>
          </div>
          <h2 className="text-xl font-semibold text-center text-on-background">{user.nomeCompleto}</h2>
          <p className="text-sm text-center text-on-surface-variant mt-1">{user.email}</p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-surface px-4 py-3">
              <span className="text-sm text-on-surface-variant">Papel</span>
              <span className="text-sm font-medium text-on-background">{formatRole(user.papel)}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-surface px-4 py-3">
              <span className="text-sm text-on-surface-variant">Status</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeClass[user.status]}`}>
                {formatUserStatus(user.status)}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-on-background/5 p-6">
            <h2 className="text-lg font-semibold text-on-background mb-4">Dados disponíveis no backend</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-on-surface-variant mb-1">Telefone</p>
                <p className="text-on-background font-medium">{user.telefone}</p>
              </div>
              <div>
                <p className="text-sm text-on-surface-variant mb-1">CPF</p>
                <p className="text-on-background font-medium">{user.cpf}</p>
              </div>
              <div>
                <p className="text-sm text-on-surface-variant mb-1">Data de nascimento</p>
                <p className="text-on-background font-medium">{formatDate(user.dataNascimento)}</p>
              </div>
              <div>
                <p className="text-sm text-on-surface-variant mb-1">Email</p>
                <p className="text-on-background font-medium break-all">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-on-background/5 p-6">
            <h2 className="text-lg font-semibold text-on-background mb-4">Atualizar status</h2>
            <p className="text-sm text-on-surface-variant mb-4">
              Como o DTO de detalhe é enxuto, a edição completa foi reduzida ao fluxo que o backend suporta diretamente sem dados adicionais: alteração de status.
            </p>

            <div className="flex flex-wrap gap-3">
              {(['ativo', 'inativo', 'pendente'] as StatusUsuario[]).map((status) => (
                <button
                  key={status}
                  onClick={() => void handleStatusChange(status)}
                  disabled={isUpdatingStatus || user.status === status}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    user.status === status
                      ? 'bg-primary text-white'
                      : 'bg-surface-container text-on-background hover:bg-surface-container-high'
                  } disabled:opacity-50`}
                >
                  {isUpdatingStatus && user.status !== status ? 'Atualizando...' : formatUserStatus(status)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsuarioDetalhes
