import type {
  AgendamentoResponse,
  ApiErrorPayload,
  AuthResponse,
  ComunicacaoResponse,
  DashboardSummaryResponse,
  DentistRecommendationResponse,
  EspecialidadeResponse,
  MatchRequest,
  MatchResponse,
  RegistroAtendimentoRequest,
  RegistroAtendimentoResponse,
  StatusUsuario,
  UsuarioRequest,
  UsuarioResponse,
} from '../types/api'

export class ApiClientError extends Error {
  status: number
  code: string
  details: Record<string, string>

  constructor(status: number, code: string, message: string, details: Record<string, string> = {}) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.code = code
    this.details = details
  }
}

const normalizeDetails = (value: unknown) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {}
  }

  return Object.entries(value).reduce<Record<string, string>>((acc, [key, detailValue]) => {
    if (typeof detailValue === 'string') {
      acc[key] = detailValue
    }
    return acc
  }, {})
}

const getNormalizedFieldKey = (field: string) => field.split('.').at(-1) ?? field

const parseBody = async (response: Response) => {
  if (response.status === 204) {
    return null
  }

  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  const text = await response.text()
  return text ? { message: text } : null
}

async function request<T>(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers)
  headers.set('Accept', 'application/json')

  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  let response: Response

  try {
    response = await fetch(path, {
      ...init,
      headers,
    })
  } catch {
    throw new ApiClientError(0, 'network_error', 'Não foi possível conectar ao backend. Verifique se ele está rodando em localhost:8080.')
  }

  const body = await parseBody(response)

  if (!response.ok) {
    const payload = typeof body === 'object' && body !== null ? body as ApiErrorPayload : undefined
    throw new ApiClientError(
      response.status,
      payload?.code ?? 'request_failed',
      payload?.message ?? 'A requisição falhou.',
      normalizeDetails(payload?.details),
    )
  }

  return body as T
}

export const api = {
  login: (payload: { email: string; senha: string }) => request<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  registerPatient: (payload: UsuarioRequest) => request<UsuarioResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  getDashboardSummary: () => request<DashboardSummaryResponse>('/api/dashboard/summary'),
  listSpecialties: () => request<EspecialidadeResponse[]>('/api/especialidades'),
  listUsers: () => request<UsuarioResponse[]>('/api/usuarios'),
  getUser: (id: number) => request<UsuarioResponse>(`/api/usuarios/${id}`),
  updateUserStatus: (id: number, status: StatusUsuario) => request<UsuarioResponse>(`/api/usuarios/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  }),
  deleteUser: (id: number) => request<void>(`/api/usuarios/${id}`, {
    method: 'DELETE',
  }),
  listMatches: () => request<MatchResponse[]>('/api/matches'),
  getRecommendations: (patientId: number) => request<DentistRecommendationResponse[]>(`/api/matches/recommendations?patientId=${patientId}`),
  createMatch: (payload: MatchRequest) => request<MatchResponse>('/api/matches', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  listCommunications: () => request<ComunicacaoResponse[]>('/api/comunicacoes'),
  markCommunicationRead: (id: number) => request<ComunicacaoResponse>(`/api/comunicacoes/${id}/read`, {
    method: 'PATCH',
  }),
  deleteCommunication: (id: number) => request<void>(`/api/comunicacoes/${id}`, {
    method: 'DELETE',
  }),
  listAppointments: () => request<AgendamentoResponse[]>('/api/agendamentos'),
  listTreatmentRecords: () => request<RegistroAtendimentoResponse[]>('/api/registros-atendimento'),
  createTreatmentRecord: (payload: RegistroAtendimentoRequest) => request<RegistroAtendimentoResponse>('/api/registros-atendimento', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
}

export const getApiErrorMessage = (error: unknown) => {
  if (error instanceof ApiClientError) {
    const detailMessages = Object.values(error.details)
    if (detailMessages.length > 0) {
      return `${error.message} ${detailMessages.join(' ')}`
    }
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Ocorreu um erro inesperado.'
}

export const getApiFieldErrors = (error: unknown) => {
  if (!(error instanceof ApiClientError)) {
    return {}
  }

  return Object.entries(error.details).reduce<Record<string, string>>((acc, [key, value]) => {
    acc[getNormalizedFieldKey(key)] = value
    return acc
  }, {})
}
