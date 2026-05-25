import { useEffect, useMemo, useState } from 'react'
import {
  Inbox,
  MessageCircle,
  Mail,
  Smartphone,
  Search,
  Info,
  Archive,
  Trash2,
  Reply,
  AlertTriangle,
} from 'lucide-react'
import { api, getApiErrorMessage } from '../../lib/api'
import { formatChannel } from '../../lib/format'
import type { CanalComunicacao, ComunicacaoResponse, UsuarioResponse } from '../../types/api'

type ChannelFilter = 'inbox' | CanalComunicacao
type FeedFilter = 'todas' | 'nao_lidas' | 'urgentes'

const channelIcon = {
  inbox: Inbox,
  whatsapp: MessageCircle,
  email: Mail,
  sms: Smartphone,
}

const getChannelClasses = (channel: CanalComunicacao) => {
  switch (channel) {
    case 'whatsapp':
      return 'text-green-600 bg-green-50'
    case 'email':
      return 'text-blue-600 bg-blue-50'
    case 'sms':
      return 'text-orange-600 bg-orange-50'
  }
}

const Comunicacao = () => {
  const [communications, setCommunications] = useState<ComunicacaoResponse[]>([])
  const [users, setUsers] = useState<UsuarioResponse[]>([])
  const [selectedCommunication, setSelectedCommunication] = useState<ComunicacaoResponse | null>(null)
  const [activeChannel, setActiveChannel] = useState<ChannelFilter>('inbox')
  const [activeFilter, setActiveFilter] = useState<FeedFilter>('todas')
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [pageError, setPageError] = useState('')

  const loadPage = async () => {
    try {
      setPageError('')
      setIsLoading(true)
      const [communicationsResponse, usersResponse] = await Promise.all([
        api.listCommunications(),
        api.listUsers(),
      ])
      setCommunications(communicationsResponse)
      setUsers(usersResponse)
      setSelectedCommunication((currentSelection) => communicationsResponse.find((item) => item.id === currentSelection?.id) ?? communicationsResponse[0] ?? null)
    } catch (error) {
      setPageError(getApiErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadPage()
  }, [])

  const userById = useMemo(() => users.reduce<Record<number, UsuarioResponse>>((accumulator, user) => {
    accumulator[user.id] = user
    return accumulator
  }, {}), [users])

  const channelCounts = useMemo(() => ({
    inbox: communications.length,
    whatsapp: communications.filter((item) => item.canal === 'whatsapp').length,
    email: communications.filter((item) => item.canal === 'email').length,
    sms: communications.filter((item) => item.canal === 'sms').length,
  }), [communications])

  const filteredCommunications = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return communications.filter((communication) => {
      const matchesChannel = activeChannel === 'inbox' || communication.canal === activeChannel
      const matchesFeed = activeFilter === 'todas'
        || (activeFilter === 'nao_lidas' && !communication.lida)
        || (activeFilter === 'urgentes' && communication.urgente)
      const matchesSearch = normalizedSearch.length === 0 || [
        communication.assunto,
        communication.resumo,
        communication.categoria,
        communication.conteudo,
        userById[communication.remetenteUsuarioId ?? 0]?.nomeCompleto ?? '',
      ].some((value) => value.toLowerCase().includes(normalizedSearch))

      return matchesChannel && matchesFeed && matchesSearch
    })
  }, [activeChannel, activeFilter, communications, search, userById])

  const unreadCommunications = filteredCommunications.filter((item) => !item.lida)
  const readCommunications = filteredCommunications.filter((item) => item.lida)

  const handleSelectCommunication = async (communication: ComunicacaoResponse) => {
    setSelectedCommunication(communication)

    if (communication.lida) {
      return
    }

    try {
      const updatedCommunication = await api.markCommunicationRead(communication.id)
      setCommunications((currentCommunications) => currentCommunications.map((item) => item.id === updatedCommunication.id ? updatedCommunication : item))
      setSelectedCommunication(updatedCommunication)
    } catch (error) {
      setPageError(getApiErrorMessage(error))
    }
  }

  const handleDeleteCommunication = async (id: number) => {
    try {
      setPageError('')
      setIsDeleting(true)
      await api.deleteCommunication(id)
      setCommunications((currentCommunications) => currentCommunications.filter((item) => item.id !== id))
      setSelectedCommunication((currentSelection) => currentSelection?.id === id ? null : currentSelection)
    } catch (error) {
      setPageError(getApiErrorMessage(error))
    } finally {
      setIsDeleting(false)
    }
  }

  const renderCommunicationCard = (communication: ComunicacaoResponse) => {
    const Icon = channelIcon[communication.canal]
    const senderName = userById[communication.remetenteUsuarioId ?? 0]?.nomeCompleto ?? `Usuário #${communication.remetenteUsuarioId ?? '—'}`

    return (
      <button
        key={communication.id}
        onClick={() => void handleSelectCommunication(communication)}
        className={`w-full text-left relative bg-white rounded-xl p-4 transition-all duration-300 shadow-sm hover:shadow-md ${
          !communication.lida ? 'border-l-4 border-turma-yellow' : 'border-l-4 border-transparent'
        } ${selectedCommunication?.id === communication.id ? 'ring-2 ring-turma-green/20' : ''}`}
      >
        {!communication.lida && (
          <span className="absolute top-4 right-4 w-2 h-2 bg-turma-green rounded-full" />
        )}

        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getChannelClasses(communication.canal)}`}>
            <Icon className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-medium ${communication.lida ? 'text-gray-700' : 'text-gray-900'}`}>
                {senderName}
              </span>
              <span className="text-xs text-gray-400">#{communication.id}</span>
            </div>
            <p className={`text-sm ${communication.lida ? 'text-gray-500' : 'text-gray-800 font-medium'} truncate`}>
              {communication.assunto}
            </p>
            <p className="text-sm text-gray-400 truncate mt-0.5">{communication.resumo}</p>

            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                {communication.categoria}
              </span>
              {communication.urgente && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600">
                  Urgente
                </span>
              )}
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-turma-green/10 text-turma-green">
                {formatChannel(communication.canal)}
              </span>
            </div>
          </div>
        </div>
      </button>
    )
  }

  const renderSelectedCommunicationDetails = () => {
    if (!selectedCommunication) {
      return (
        <div className="rounded-2xl border border-gray-100 bg-white p-5 text-sm text-gray-500">
          Selecione uma comunicação para ver os detalhes.
        </div>
      )
    }

    const Icon = channelIcon[selectedCommunication.canal]
    const senderName = userById[selectedCommunication.remetenteUsuarioId ?? 0]?.nomeCompleto ?? `Usuário #${selectedCommunication.remetenteUsuarioId ?? '—'}`

    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getChannelClasses(selectedCommunication.canal)}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{selectedCommunication.assunto}</h2>
            <p className="text-sm text-gray-500">{senderName}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">Canal</p>
            <p className="text-sm font-medium text-gray-900">{formatChannel(selectedCommunication.canal)}</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">Categoria</p>
            <p className="text-sm font-medium text-gray-900">{selectedCommunication.categoria}</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">Status</p>
            <p className="text-sm font-medium text-gray-900">{selectedCommunication.lida ? 'Lida' : 'Não lida'}</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">Match</p>
            <p className="text-sm font-medium text-gray-900">{selectedCommunication.matchId ? `#${selectedCommunication.matchId}` : 'Sem vínculo'}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 p-5 mb-6">
          <p className="text-sm font-semibold text-gray-900 mb-3">Resumo</p>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{selectedCommunication.resumo}</p>
          <p className="text-sm font-semibold text-gray-900 mb-3">Conteúdo</p>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{selectedCommunication.conteudo}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface-container text-on-surface-variant border border-outline-variant">
            <Reply className="w-4 h-4" />
            Resposta indisponível nesta versão
          </div>
          <div className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface-container text-on-surface-variant border border-outline-variant">
            <Archive className="w-4 h-4" />
            Arquivamento indisponível
          </div>
          <button
            onClick={() => void handleDeleteCommunication(selectedCommunication.id)}
            disabled={isDeleting}
            className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {pageError && (
        <div className="px-6 pt-6">
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
            {pageError}
          </div>
        </div>
      )}

      <div className="flex">
        <aside className="hidden lg:flex flex-col w-72 fixed left-0 top-16 lg:top-20 bottom-0 bg-white border-r border-gray-200/50 overflow-y-auto">
          <nav className="flex-1 p-4 space-y-3">
            {(['inbox', 'whatsapp', 'email', 'sms'] as ChannelFilter[]).map((channel) => {
              const Icon = channelIcon[channel]
              const isActive = activeChannel === channel
              const label = channel === 'inbox' ? 'Inbox' : formatChannel(channel)

              return (
                <button
                  key={channel}
                  onClick={() => setActiveChannel(channel)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    isActive
                      ? 'bg-turma-green text-white shadow-md'
                      : 'hover:bg-gray-50 text-gray-700 hover:translate-x-1'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-turma-green/10 text-turma-green'
                  }`}>
                    {channelCounts[channel]}
                  </span>
                </button>
              )
            })}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 bg-gray-50">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">{channelCounts.inbox - unreadCommunications.length} já lidas</span>
            </div>
          </div>
        </aside>

        <main className="flex-1 lg:ml-72 xl:mr-96 min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)]">
          <div className="max-w-4xl mx-auto p-6">
            <div className="flex flex-col lg:flex-row gap-3 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar por assunto, categoria, conteúdo ou remetente..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-turma-green/20 focus:border-turma-green transition-all"
                />
              </div>

              <div className="flex gap-2">
                {(['todas', 'nao_lidas', 'urgentes'] as FeedFilter[]).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeFilter === filter
                        ? 'bg-turma-green text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {filter === 'todas' ? 'Todas' : filter === 'nao_lidas' ? 'Não lidas' : 'Urgentes'}
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="py-16 text-center text-on-surface-variant">Carregando comunicações...</div>
            ) : (
              <div className="space-y-6">
                <div className="xl:hidden">
                  <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-500 uppercase tracking-[0.2em]">
                    <Info className="w-4 h-4" />
                    Detalhes da seleção
                  </div>
                  {renderSelectedCommunicationDetails()}
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Não lidas</h2>
                  <div className="space-y-3">
                    {unreadCommunications.map(renderCommunicationCard)}
                    {unreadCommunications.length === 0 && (
                      <div className="rounded-xl bg-white p-5 text-sm text-gray-500">
                        Nenhuma comunicação não lida com o filtro atual.
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Já lidas</h2>
                  <div className="space-y-3">
                    {readCommunications.map(renderCommunicationCard)}
                    {readCommunications.length === 0 && (
                      <div className="rounded-xl bg-white p-5 text-sm text-gray-500">
                        Nenhuma comunicação lida com o filtro atual.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <aside className="hidden xl:flex flex-col w-96 fixed right-0 top-16 lg:top-20 bottom-0 bg-white border-l border-gray-200/50 overflow-y-auto">
          <div className="p-6">
            {renderSelectedCommunicationDetails()}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Comunicacao
