import type {
  CanalComunicacao,
  PapelUsuario,
  StatusAgendamento,
  StatusMatch,
  StatusTratamento,
  StatusUsuario,
  TurnoDisponibilidade,
} from '../types/api'

export const formatDate = (value?: string | null) => {
  if (!value) {
    return '—'
  }

  return new Date(`${value}T00:00:00`).toLocaleDateString('pt-BR')
}

export const formatRole = (role: PapelUsuario) => {
  const labels: Record<PapelUsuario, string> = {
    paciente: 'Paciente',
    dentista_voluntario: 'Dentista voluntário',
    administrador: 'Administrador',
  }

  return labels[role]
}

export const formatUserStatus = (status: StatusUsuario) => {
  const labels: Record<StatusUsuario, string> = {
    ativo: 'Ativo',
    inativo: 'Inativo',
    pendente: 'Pendente',
  }

  return labels[status]
}

export const formatMatchStatus = (status: StatusMatch) => {
  const labels: Record<StatusMatch, string> = {
    pendente: 'Pendente',
    confirmado: 'Confirmado',
    cancelado: 'Cancelado',
  }

  return labels[status]
}

export const formatChannel = (channel: CanalComunicacao) => {
  const labels: Record<CanalComunicacao, string> = {
    whatsapp: 'WhatsApp',
    email: 'Email',
    sms: 'SMS',
  }

  return labels[channel]
}

export const formatAppointmentStatus = (status: StatusAgendamento) => {
  const labels: Record<StatusAgendamento, string> = {
    agendada: 'Agendada',
    confirmada: 'Confirmada',
    concluida: 'Concluída',
    cancelada: 'Cancelada',
  }

  return labels[status]
}

export const formatTreatmentStatus = (status?: StatusTratamento | null) => {
  if (!status) {
    return 'Não informado'
  }

  const labels: Record<StatusTratamento, string> = {
    aguardando: 'Aguardando',
    em_tratamento: 'Em tratamento',
    concluido: 'Concluído',
  }

  return labels[status]
}

export const formatShift = (shift: TurnoDisponibilidade) => {
  const labels: Record<TurnoDisponibilidade, string> = {
    manha: 'Manhã',
    tarde: 'Tarde',
    noite: 'Noite',
    fim_de_semana: 'Fim de semana',
  }

  return labels[shift]
}

export const getInitials = (name: string) => name
  .split(' ')
  .filter(Boolean)
  .map((part) => part[0])
  .join('')
  .slice(0, 2)
  .toUpperCase()

export const digitsOnly = (value: string) => value.replace(/\D/g, '')
