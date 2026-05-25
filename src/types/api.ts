export type PapelUsuario = 'paciente' | 'dentista_voluntario' | 'administrador'

export type StatusUsuario = 'ativo' | 'inativo' | 'pendente'

export type StatusMatch = 'pendente' | 'confirmado' | 'cancelado'

export type CanalComunicacao = 'whatsapp' | 'email' | 'sms'

export type StatusAgendamento = 'agendada' | 'confirmada' | 'concluida' | 'cancelada'

export type TurnoDisponibilidade = 'manha' | 'tarde' | 'noite' | 'fim_de_semana'

export type GravidadeCondicao = 'leve' | 'moderada' | 'grave'

export type StatusTratamento = 'aguardando' | 'em_tratamento' | 'concluido'

export interface ApiErrorPayload {
  code: string
  message: string
  details?: Record<string, string>
  timestamp?: string
}

export interface AuthResponse {
  userId: number
  nomeCompleto: string
  email: string
  papel: PapelUsuario
  tokenType: string
}

export interface EnderecoRequest {
  cep: string
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string
}

export interface UsuarioRequest {
  nomeCompleto: string
  email: string
  senha: string
  papel: PapelUsuario
  status?: StatusUsuario
  telefone: string
  cpf: string
  dataNascimento: string
  endereco?: EnderecoRequest
  especialidadeId?: number
  prioridade?: 'baixa' | 'media' | 'alta'
  descricaoNecessidade?: string
  aceitaDeslocamento?: boolean
  cro?: string
  nomeClinica?: string
  turnoPreferencial?: TurnoDisponibilidade
  aceitaNovosPacientes?: boolean
  notaDisponibilidade?: string
}

export interface UsuarioResponse {
  id: number
  nomeCompleto: string
  email: string
  papel: PapelUsuario
  status: StatusUsuario
  telefone: string
  cpf: string
  dataNascimento: string
}

export interface EspecialidadeResponse {
  id: number
  nome: string
  descricao: string
}

export interface DashboardSummaryResponse {
  totalUsuarios: number
  usuariosPorPapel: Record<string, number>
  matchesConfirmados: number
  comunicacoesNaoLidas: number
  agendamentosPorStatus: Record<string, number>
}

export interface MatchResponse {
  id: number
  pacienteUsuarioId: number
  dentistaUsuarioId: number
  percentualCompatibilidade: number
  pontuacaoLocalizacao: number
  pontuacaoEspecialidade: number
  status: StatusMatch
  observacoes: string | null
}

export interface MatchRequest {
  pacienteUsuarioId: number
  dentistaUsuarioId: number
  percentualCompatibilidade: number
  pontuacaoLocalizacao: number
  pontuacaoEspecialidade: number
  observacoes?: string
}

export interface DentistRecommendationResponse {
  dentistaUsuarioId: number
  nomeCompleto: string
  especialidade: string
  percentualCompatibilidade: number
  pontuacaoLocalizacao: number
  pontuacaoEspecialidade: number
}

export interface ComunicacaoResponse {
  id: number
  matchId: number | null
  remetenteUsuarioId: number | null
  canal: CanalComunicacao
  categoria: string
  assunto: string
  resumo: string
  conteudo: string
  urgente: boolean | null
  lida: boolean | null
}

export interface AgendamentoResponse {
  id: number
  matchId: number
  dataAgendada: string
  turno: TurnoDisponibilidade
  status: StatusAgendamento
  observacoes: string | null
}

export interface RegistroAtendimentoRequest {
  agendamentoId: number
  dataAtendimento: string
  procedimento: string
  condicaoPaciente: string
  gravidade: GravidadeCondicao
  observacoes?: string
  proximaConsulta?: string
  status?: StatusTratamento
}

export interface RegistroAtendimentoResponse {
  id: number
  agendamentoId: number
  dataAtendimento: string
  procedimento: string
  condicaoPaciente: string
  gravidade: GravidadeCondicao
  observacoes: string | null
  proximaConsulta: string | null
  status: StatusTratamento | null
}
