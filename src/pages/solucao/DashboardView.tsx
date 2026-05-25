import { useEffect, useMemo, useState } from 'react'
import { Users, HeartHandshake, MessageSquare, Calendar, Circle, RefreshCw, ShieldCheck } from 'lucide-react'
import { api, getApiErrorMessage } from '../../lib/api'
import type { DashboardSummaryResponse } from '../../types/api'

const DashboardView = () => {
  const [data, setData] = useState<DashboardSummaryResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const loadDashboard = async () => {
    try {
      setError('')
      setIsLoading(true)
      setData(await api.getDashboardSummary())
    } catch (loadError) {
      setError(getApiErrorMessage(loadError))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadDashboard()
  }, [])

  const totalAppointments = useMemo(() => {
    if (!data) {
      return 0
    }

    return Object.values(data.agendamentosPorStatus).reduce((total, count) => total + count, 0)
  }, [data])

  const roleEntries = useMemo(() => {
    if (!data) {
      return []
    }

    const totalUsers = Math.max(data.totalUsuarios, 1)

    return [
      { key: 'paciente', label: 'Pacientes', value: data.usuariosPorPapel.paciente ?? 0, color: 'bg-primary' },
      { key: 'dentista_voluntario', label: 'Dentistas voluntários', value: data.usuariosPorPapel.dentista_voluntario ?? 0, color: 'bg-secondary-container' },
      { key: 'administrador', label: 'Administradores', value: data.usuariosPorPapel.administrador ?? 0, color: 'bg-turma-yellow' },
    ].map((item) => ({
      ...item,
      percent: Math.round((item.value / totalUsers) * 100),
    }))
  }, [data])

  const appointmentEntries = useMemo(() => {
    if (!data) {
      return []
    }

    return [
      { key: 'agendada', label: 'Agendadas', value: data.agendamentosPorStatus.agendada ?? 0, accent: 'border-primary' },
      { key: 'confirmada', label: 'Confirmadas', value: data.agendamentosPorStatus.confirmada ?? 0, accent: 'border-secondary-container' },
      { key: 'concluida', label: 'Concluídas', value: data.agendamentosPorStatus.concluida ?? 0, accent: 'border-turma-green-dark' },
      { key: 'cancelada', label: 'Canceladas', value: data.agendamentosPorStatus.cancelada ?? 0, accent: 'border-error' },
    ]
  }, [data])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-on-surface-variant">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 bg-surface min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-on-surface-variant font-medium">
            Administração Global
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-on-surface mt-1">
            Dashboard de Operações
          </h1>
          <p className="text-on-surface-variant mt-3 max-w-2xl">
            Resumo em tempo real baseado em `/api/dashboard/summary`, usando apenas os indicadores efetivamente expostos pelo backend.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm border border-on-background/5">
            <Circle className="w-2.5 h-2.5 fill-primary text-primary" />
            <span className="text-sm font-medium text-on-surface">Sistema online</span>
          </div>
          <button
            onClick={() => void loadDashboard()}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors duration-300"
          >
            <RefreshCw className="w-4 h-4" />
            Atualizar
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {data && (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6 xl:col-span-5 bg-surface-container-lowest rounded-lg shadow-[0_8px_32px_0_rgba(26,28,25,0.04)] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-on-surface">Usuários</h2>
                <p className="text-sm text-on-surface-variant">Distribuição por papel</p>
              </div>
            </div>

            <div className="flex items-end gap-3 mb-8">
              <span className="text-5xl font-black text-on-surface">{data.totalUsuarios.toLocaleString('pt-BR')}</span>
              <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-medium mb-2">
                total cadastrado
              </span>
            </div>

            <div className="space-y-5">
              {roleEntries.map((entry) => (
                <div key={entry.key}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-on-surface-variant">{entry.label}</span>
                    <span className="text-sm font-medium text-on-surface">
                      {entry.value.toLocaleString('pt-BR')} • {entry.percent}%
                    </span>
                  </div>
                  <div className="h-2.5 bg-surface-container rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${entry.color}`} style={{ width: `${entry.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 xl:col-span-4 bg-primary rounded-lg p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-on-primary" />
                </div>
                <div>
                  <h2 className="font-bold text-xl text-on-primary">Matches</h2>
                  <p className="text-sm text-on-primary/70">Indicador consolidado do backend</p>
                </div>
              </div>

              <span className="text-6xl font-black text-on-primary block mb-4">
                {data.matchesConfirmados.toLocaleString('pt-BR')}
              </span>
              <p className="text-on-primary/80 mb-6">matches confirmados no resumo operacional</p>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <span className="text-2xl font-bold text-on-primary">{roleEntries[0]?.value ?? 0}</span>
                  <p className="text-xs text-on-primary/70 whitespace-nowrap">Pacientes</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-on-primary">{roleEntries[1]?.value ?? 0}</span>
                  <p className="text-xs text-on-primary/70 whitespace-nowrap">Dentistas</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-on-primary">{data.comunicacoesNaoLidas}</span>
                  <p className="text-xs text-on-primary/70 whitespace-nowrap">Não lidas</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 xl:col-span-3 bg-surface-container-lowest rounded-lg shadow-[0_8px_32px_0_rgba(26,28,25,0.04)] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-on-surface">Comunicação</h2>
                <p className="text-sm text-on-surface-variant">Fila de atenção</p>
              </div>
            </div>

            <div className="flex items-end gap-3 mb-4">
              <span className="text-4xl font-black text-on-surface">{data.comunicacoesNaoLidas}</span>
              <span className="px-2 py-1 rounded-full bg-error-container text-error text-xs font-semibold mb-1">
                pendentes
              </span>
            </div>

            <p className="text-sm text-on-surface-variant mb-6">
              Quantidade de comunicações ainda não marcadas como lidas.
            </p>

            <div className="rounded-2xl bg-surface-container p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-2">Leitura operacional</p>
              <p className="text-sm text-on-surface">
                Use o módulo de comunicação para abrir mensagens, marcar leitura e limpar a fila do time.
              </p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest rounded-lg shadow-[0_8px_32px_0_rgba(26,28,25,0.04)] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-on-surface">Agendamentos</h2>
                <p className="text-sm text-on-surface-variant">Distribuição por status</p>
              </div>
            </div>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-5xl font-black text-on-surface">{totalAppointments.toLocaleString('pt-BR')}</span>
              <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-medium mb-2">
                total monitorado
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {appointmentEntries.map((entry) => (
                <div key={entry.key} className={`border-l-4 ${entry.accent} pl-4`}>
                  <span className="text-2xl font-bold text-on-surface">{entry.value.toLocaleString('pt-BR')}</span>
                  <p className="text-sm text-on-surface-variant">{entry.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest rounded-lg shadow-[0_8px_32px_0_rgba(26,28,25,0.04)] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-turma-green/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-turma-green" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-on-surface">Resumo operacional</h2>
                <p className="text-sm text-on-surface-variant">Leitura rápida do momento</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-surface-container p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-2">Base de usuários</p>
                <p className="text-sm text-on-surface">
                  {roleEntries[0]?.value ?? 0} pacientes e {roleEntries[1]?.value ?? 0} dentistas voluntários estão disponíveis na base atual.
                </p>
              </div>

              <div className="rounded-2xl bg-surface-container p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-2">Pipeline clínico</p>
                <p className="text-sm text-on-surface">
                  {appointmentEntries[1]?.value ?? 0} consultas confirmadas e {appointmentEntries[2]?.value ?? 0} concluídas alimentam os registros de atendimento.
                </p>
              </div>

              <div className="rounded-2xl bg-surface-container p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-2">Atenção imediata</p>
                <p className="text-sm text-on-surface">
                  {data.comunicacoesNaoLidas} comunicações não lidas ainda exigem triagem pelo time da plataforma.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardView
