import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Sparkles,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  History,
  Bell,
  UserRound,
  Stethoscope,
  BadgePercent,
} from 'lucide-react'
import { api, getApiErrorMessage } from '../../lib/api'
import { formatMatchStatus, formatRole, getInitials } from '../../lib/format'
import { useAuth } from '../../hooks/useAuth'
import type {
  DentistRecommendationResponse,
  EspecialidadeResponse,
  MatchResponse,
  StatusMatch,
  UsuarioResponse,
} from '../../types/api'

type FilterTab = 'todos' | 'pendente' | 'confirmado'

const Match = () => {
  const { user: sessionUser } = useAuth()
  const [users, setUsers] = useState<UsuarioResponse[]>([])
  const [matches, setMatches] = useState<MatchResponse[]>([])
  const [specialties, setSpecialties] = useState<EspecialidadeResponse[]>([])
  const [recommendations, setRecommendations] = useState<DentistRecommendationResponse[]>([])
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null)
  const [specialtyFilter, setSpecialtyFilter] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState<FilterTab>('todos')
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false)
  const [isCreatingMatch, setIsCreatingMatch] = useState<number | null>(null)
  const [pageError, setPageError] = useState('')
  const [actionMessage, setActionMessage] = useState('')

  const loadPage = useCallback(async () => {
    try {
      setPageError('')
      setIsLoading(true)

      const [usersResponse, matchesResponse, specialtiesResponse] = await Promise.all([
        api.listUsers(),
        api.listMatches(),
        api.listSpecialties(),
      ])

      setUsers(usersResponse)
      setMatches(matchesResponse)
      setSpecialties(specialtiesResponse)

      const patientUsers = usersResponse.filter((currentUser) => currentUser.papel === 'paciente')
      const preferredPatient = sessionUser?.papel === 'paciente'
        ? patientUsers.find((currentUser) => currentUser.id === sessionUser.userId)
        : undefined

      setSelectedPatientId((currentSelectedId) => currentSelectedId ?? preferredPatient?.id ?? patientUsers[0]?.id ?? null)
    } catch (error) {
      setPageError(getApiErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }, [sessionUser])

  useEffect(() => {
    void loadPage()
  }, [loadPage])

  useEffect(() => {
    const loadRecommendations = async () => {
      if (!selectedPatientId) {
        setRecommendations([])
        return
      }

      try {
        setPageError('')
        setIsLoadingRecommendations(true)
        setRecommendations(await api.getRecommendations(selectedPatientId))
      } catch (error) {
        setPageError(getApiErrorMessage(error))
        setRecommendations([])
      } finally {
        setIsLoadingRecommendations(false)
      }
    }

    void loadRecommendations()
  }, [selectedPatientId])

  const userById = useMemo(() => users.reduce<Record<number, UsuarioResponse>>((accumulator, currentUser) => {
    accumulator[currentUser.id] = currentUser
    return accumulator
  }, {}), [users])

  const patientUsers = useMemo(() => users.filter((currentUser) => currentUser.papel === 'paciente'), [users])

  const filteredRecommendations = useMemo(() => recommendations.filter((recommendation) => {
    if (!specialtyFilter) {
      return true
    }

    return recommendation.especialidade === specialtyFilter
  }), [recommendations, specialtyFilter])

  const filteredMatches = useMemo(() => matches
    .filter((match) => {
      if (activeFilterTab === 'todos') {
        return true
      }

      return match.status === activeFilterTab
    })
    .sort((firstMatch, secondMatch) => secondMatch.id - firstMatch.id), [matches, activeFilterTab])

  const selectedPatient = patientUsers.find((patient) => patient.id === selectedPatientId) ?? null

  const handleCreateMatch = async (recommendation: DentistRecommendationResponse) => {
    if (!selectedPatientId) {
      setPageError('Selecione um paciente antes de criar o match.')
      return
    }

    try {
      setPageError('')
      setActionMessage('')
      setIsCreatingMatch(recommendation.dentistaUsuarioId)

      const createdMatch = await api.createMatch({
        pacienteUsuarioId: selectedPatientId,
        dentistaUsuarioId: recommendation.dentistaUsuarioId,
        percentualCompatibilidade: recommendation.percentualCompatibilidade,
        pontuacaoLocalizacao: recommendation.pontuacaoLocalizacao,
        pontuacaoEspecialidade: recommendation.pontuacaoEspecialidade,
        observacoes: 'Criado pela interface web',
      })

      setMatches((currentMatches) => [createdMatch, ...currentMatches])
      setActionMessage('Match criado com sucesso.')
    } catch (error) {
      setPageError(getApiErrorMessage(error))
    } finally {
      setIsCreatingMatch(null)
    }
  }

  const getStatusBadge = (status: StatusMatch) => {
    switch (status) {
      case 'confirmado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            {formatMatchStatus(status)}
          </span>
        )
      case 'pendente':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <AlertCircle className="w-3 h-3" />
            {formatMatchStatus(status)}
          </span>
        )
      case 'cancelado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <XCircle className="w-3 h-3" />
            {formatMatchStatus(status)}
          </span>
        )
    }
  }

  if (isLoading) {
    return <div className="p-6 text-on-surface-variant">Carregando módulo de match...</div>
  }

  return (
    <div className="p-6 bg-surface min-h-screen">
      {(pageError || actionMessage) && (
        <div className={`mb-6 rounded-2xl px-5 py-4 text-sm ${pageError ? 'border border-red-200 bg-red-50 text-red-600' : 'border border-green-200 bg-green-50 text-green-700'}`}>
          {pageError || actionMessage}
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-card shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-xl text-on-background">Fila de Pacientes</h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary text-white">
                <Bell className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="whitespace-nowrap">{patientUsers.length} pacientes</span>
              </span>
            </div>
            <p className="text-sm text-on-surface-variant mb-6">Selecione quem precisa de recomendação</p>

            <div className="space-y-4">
              {patientUsers.map((patient) => {
                const isActive = patient.id === selectedPatientId

                return (
                  <button
                    key={patient.id}
                    onClick={() => setSelectedPatientId(patient.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                      isActive
                        ? 'border-primary bg-green-50/50'
                        : 'border-outline-variant bg-surface-container-lowest hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3 gap-4">
                      <div>
                        <h3 className="font-semibold text-on-background">{patient.nomeCompleto}</h3>
                        <div className="flex items-center gap-1.5 mt-1 text-sm text-on-surface-variant">
                          <UserRound className="w-3.5 h-3.5" />
                          <span>{patient.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-secondary">{formatRole(patient.papel)}</span>
                      <span className="text-xs text-on-surface-variant">{patient.status}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded-card shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-6 mb-6">
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-xl text-on-background">Recomendações reais</h2>
                  <p className="text-sm text-on-surface-variant">
                    {selectedPatient ? `Dentistas sugeridos para ${selectedPatient.nomeCompleto}` : 'Selecione um paciente para buscar'}
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-sm font-medium">
                {filteredRecommendations.length} resultados
              </div>
            </div>

            {isLoadingRecommendations ? (
              <div className="py-16 text-center text-on-surface-variant">Buscando recomendações...</div>
            ) : filteredRecommendations.length === 0 ? (
              <div className="py-16 text-center text-on-surface-variant">
                Nenhuma recomendação retornada para o paciente selecionado.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredRecommendations.map((recommendation) => (
                  <div
                    key={recommendation.dentistaUsuarioId}
                    className="border border-outline-variant rounded-xl p-5 hover:shadow-lg transition-all duration-300 bg-surface-container-lowest"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold text-lg">
                        {Math.round(recommendation.percentualCompatibilidade)}%
                      </span>
                    </div>

                    <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center mb-3 mx-auto">
                      <Stethoscope className="w-6 h-6 text-primary" />
                    </div>

                    <div className="text-center mb-4">
                      <h3 className="font-semibold text-on-background">{recommendation.nomeCompleto}</h3>
                      <p className="text-sm text-on-surface-variant">{recommendation.especialidade}</p>
                    </div>

                    <div className="space-y-3 mb-5">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="flex items-center gap-1 text-on-surface-variant">
                            <BadgePercent className="w-3.5 h-3.5" />
                            Compatibilidade
                          </span>
                          <span className="font-medium text-on-background">{Math.round(recommendation.percentualCompatibilidade)}%</span>
                        </div>
                        <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${recommendation.percentualCompatibilidade}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="flex items-center gap-1 text-on-surface-variant">Localização</span>
                          <span className="font-medium text-on-background">{recommendation.pontuacaoLocalizacao}%</span>
                        </div>
                        <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${recommendation.pontuacaoLocalizacao}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="flex items-center gap-1 text-on-surface-variant">Especialidade</span>
                          <span className="font-medium text-on-background">{recommendation.pontuacaoEspecialidade}%</span>
                        </div>
                        <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: `${recommendation.pontuacaoEspecialidade}%` }} />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => void handleCreateMatch(recommendation)}
                      disabled={isCreatingMatch === recommendation.dentistaUsuarioId}
                      className="w-full py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50"
                    >
                      {isCreatingMatch === recommendation.dentistaUsuarioId ? 'Criando...' : 'Criar Match'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="bg-white rounded-card shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-6"
          >
            <h3 className="font-bold text-lg text-on-background mb-4">Filtros</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="patientId" className="block text-sm font-medium text-on-surface-variant mb-1.5">
                  Paciente
                </label>
                <select
                  id="patientId"
                  value={selectedPatientId ?? ''}
                  onChange={(event) => setSelectedPatientId(Number(event.target.value))}
                  className="w-full border border-outline rounded-lg px-3 py-2.5 bg-surface-container-lowest text-on-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                >
                  {patientUsers.map((patient) => (
                    <option key={patient.id} value={patient.id}>{patient.nomeCompleto}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-on-surface-variant mb-1.5">
                  Especialidade sugerida
                </label>
                <select
                  id="specialty"
                  value={specialtyFilter}
                  onChange={(event) => setSpecialtyFilter(event.target.value)}
                  className="w-full border border-outline rounded-lg px-3 py-2.5 bg-surface-container-lowest text-on-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                >
                  <option value="">Todas</option>
                  {specialties.map((specialty) => (
                    <option key={specialty.id} value={specialty.nome}>{specialty.nome}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setSpecialtyFilter('')
                  setActionMessage('')
                }}
                className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-300"
              >
                Limpar filtro
              </button>
            </div>
          </form>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-card shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center">
                <History className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-on-background">Matches Recentes</h2>
                <p className="text-sm text-on-surface-variant">Histórico vindo de `/api/matches`</p>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              {(['todos', 'pendente', 'confirmado'] as FilterTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilterTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-300 ${
                    activeFilterTab === tab
                      ? 'bg-primary text-white'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {tab === 'todos' ? 'Todos' : formatMatchStatus(tab)}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredMatches.map((match) => (
                <div
                  key={match.id}
                  className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {getInitials(userById[match.pacienteUsuarioId]?.nomeCompleto ?? `P${match.pacienteUsuarioId}`)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-on-background text-sm truncate">
                        {userById[match.pacienteUsuarioId]?.nomeCompleto ?? `Paciente #${match.pacienteUsuarioId}`}
                      </h4>
                      <p className="text-xs text-on-surface-variant truncate">
                        {userById[match.dentistaUsuarioId]?.nomeCompleto ?? `Dentista #${match.dentistaUsuarioId}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-on-surface-variant">Match #{match.id}</span>
                    {getStatusBadge(match.status)}
                  </div>
                </div>
              ))}
            </div>

            {filteredMatches.length === 0 && (
              <div className="text-center py-10 text-sm text-on-surface-variant">
                Nenhum match disponível com este filtro.
              </div>
            )}

            <button
              onClick={() => void loadPage()}
              className="w-full mt-6 py-3 rounded-xl bg-surface-container text-on-surface font-medium text-sm hover:bg-surface-container-high transition-colors duration-300 flex items-center justify-center gap-2"
            >
              Recarregar histórico
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Match
