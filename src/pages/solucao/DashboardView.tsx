import { useState, useEffect } from 'react'
import {
  Users,
  MessageSquare,
  Calendar,
  Star,
  CheckCircle,
  Bell,
  Download,
  ChevronRight,
  Circle
} from 'lucide-react'

interface DashboardData {
  usuarios: {
    total: number
    esteMes: number
    pacientes: number
    pacientesPercent: number
    dentistas: number
    dentistasPercent: number
    ativosAgora: number
  }
  matches: {
    score: number
    total: number
    pendentes: number
    confirmados: number
    rejeitados: number
  }
  comunicacao: {
    totalMensagens: number
    hoje: number
    notificacoes: number
    naoLidas: number
  }
  consultas: {
    totalHistorico: number
    esteMes: number
    agendadas: number
    confirmadas: number
    concluidas: number
    canceladas: number
    rating: number
  }
  atividadeRecente: {
    logs: Array<{
      id: number
      user: string
      initials: string
      action: string
      time: string
    }>
  }
}

const DashboardView = () => {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'24h' | '7d'>('24h')

  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        usuarios: {
          total: 20456,
          esteMes: 340,
          pacientes: 18230,
          pacientesPercent: 89,
          dentistas: 2226,
          dentistasPercent: 11,
          ativosAgora: 1450
        },
        matches: {
          score: 92,
          total: 4890,
          pendentes: 12,
          confirmados: 4670,
          rejeitados: 208
        },
        comunicacao: {
          totalMensagens: 5600,
          hoje: 120,
          notificacoes: 890,
          naoLidas: 15
        },
        consultas: {
          totalHistorico: 12560,
          esteMes: 850,
          agendadas: 4500,
          confirmadas: 3200,
          concluidas: 4860,
          canceladas: 450,
          rating: 4.9
        },
        atividadeRecente: {
          logs: [
            { id: 1, user: 'Maria Santos', initials: 'MS', action: 'Novo paciente cadastrado', time: '2 min' },
            { id: 2, user: 'Dr. Ricardo Mendes', initials: 'RM', action: 'Consulta confirmada', time: '5 min' },
            { id: 3, user: 'Ana Costa', initials: 'AC', action: 'Match realizado com sucesso', time: '12 min' },
            { id: 4, user: 'João Oliveira', initials: 'JO', action: 'Perfil atualizado', time: '18 min' }
          ]
        }
      })
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

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

  if (!data) {
    return null
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
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Circle className="w-2.5 h-2.5 fill-primary text-primary" />
            <span className="text-sm font-medium text-on-surface">Sistema Online</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container text-on-surface font-medium text-sm hover:bg-surface-container-high transition-colors duration-300">
            <Download className="w-4 h-4" />
            Exportar Relatório
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-6 xl:col-span-5 bg-surface-container-lowest rounded-lg shadow-[0_8px_32px_0_rgba(26,28,25,0.04)] p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-xl text-on-surface">Usuários</h2>
            </div>
          </div>

          <div className="flex items-end gap-3 mb-6">
            <span className="text-5xl font-black text-on-surface">{data.usuarios.total.toLocaleString('pt-BR')}</span>
            <span className="px-2.5 py-1 rounded-full bg-secondary-container text-secondary text-xs font-medium mb-2">
              +{data.usuarios.esteMes} este mês
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-on-surface-variant">Pacientes</span>
                <span className="text-sm font-medium text-on-surface">{data.usuarios.pacientes.toLocaleString('pt-BR')}</span>
              </div>
              <div className="h-2.5 bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${data.usuarios.pacientesPercent}%` }}
                />
              </div>
              <span className="text-xs text-on-surface-variant mt-1">{data.usuarios.pacientesPercent}%</span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-on-surface-variant">Dentistas</span>
                <span className="text-sm font-medium text-on-surface">{data.usuarios.dentistas.toLocaleString('pt-BR')}</span>
              </div>
              <div className="h-2.5 bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full"
                  style={{ width: `${data.usuarios.dentistasPercent}%` }}
                />
              </div>
              <span className="text-xs text-on-surface-variant mt-1">{data.usuarios.dentistasPercent}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4 border-t border-outline-variant">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-sm text-on-surface">
              Usuários Ativos Agora: <span className="font-semibold">{data.usuarios.ativosAgora.toLocaleString('pt-BR')}</span>
            </span>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 xl:col-span-4 bg-primary rounded-lg p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-on-primary" />
              </div>
              <h2 className="font-bold text-xl text-on-primary">Matches</h2>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1.5 rounded-full bg-white/20 text-on-primary text-xs font-medium">
                {data.matches.score}% Score
              </span>
            </div>

            <span className="text-6xl font-black text-on-primary block mb-6">
              {data.matches.total.toLocaleString('pt-BR')}
            </span>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <span className="text-2xl font-bold text-on-primary">{data.matches.pendentes}</span>
                <p className="text-xs text-on-primary/70 whitespace-nowrap">Pendentes</p>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold text-on-primary">{data.matches.confirmados.toLocaleString('pt-BR')}</span>
                <p className="text-xs text-on-primary/70 whitespace-nowrap">Confirmados</p>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold text-on-primary">{data.matches.rejeitados}</span>
                <p className="text-xs text-on-primary/70 whitespace-nowrap">Rejeitados</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 xl:col-span-3 bg-surface-container-lowest rounded-lg shadow-[0_8px_32px_0_rgba(26,28,25,0.04)] p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-secondary" />
            </div>
            <h2 className="font-bold text-xl text-on-surface">Comunicação</h2>
          </div>

          <div className="flex items-end gap-3 mb-4">
            <span className="text-3xl font-black text-on-surface">{data.comunicacao.totalMensagens.toLocaleString('pt-BR')}</span>
            <span className="px-2 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-medium mb-1">
              {data.comunicacao.hoje} Hoje
            </span>
          </div>
          <p className="text-sm text-on-surface-variant mb-4">Total Mensagens</p>

          <div className="h-px bg-outline-variant my-4" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-on-surface-variant" />
                <span className="text-sm text-on-surface">Notificações</span>
              </div>
              <span className="text-sm font-semibold text-on-surface">{data.comunicacao.notificacoes.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-on-surface-variant" />
                <span className="text-sm text-on-surface">Não Lidas</span>
              </div>
              <span className="px-2 py-1 rounded-md bg-error-container text-error text-xs font-semibold">
                {data.comunicacao.naoLidas}
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 xl:col-span-9 bg-surface-container-lowest rounded-lg shadow-[0_8px_32px_0_rgba(26,28,25,0.04)] p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-bold text-xl text-on-surface">Consultas</h2>
              </div>
              <p className="text-sm text-on-surface-variant ml-13">Fluxo operacional mensal</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-on-surface">
                <span className="font-semibold">{data.consultas.totalHistorico.toLocaleString('pt-BR')}</span>
                <span className="text-on-surface-variant"> Total Histórico</span>
              </span>
              <span className="text-on-surface">
                <span className="font-semibold">{data.consultas.esteMes.toLocaleString('pt-BR')}</span>
                <span className="text-on-surface-variant"> Este Mês</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="border-l-4 border-primary pl-4">
              <span className="text-2xl font-bold text-on-surface">{data.consultas.agendadas.toLocaleString('pt-BR')}</span>
              <p className="text-sm text-on-surface-variant">Agendadas</p>
            </div>
            <div className="border-l-4 border-secondary-container pl-4">
              <span className="text-2xl font-bold text-on-surface">{data.consultas.confirmadas.toLocaleString('pt-BR')}</span>
              <p className="text-sm text-on-surface-variant">Confirmadas</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <span className="text-2xl font-bold text-on-surface">{data.consultas.concluidas.toLocaleString('pt-BR')}</span>
              <p className="text-sm text-on-surface-variant">Concluídas</p>
            </div>
            <div className="border-l-4 border-error pl-4">
              <span className="text-2xl font-bold text-error">{data.consultas.canceladas.toLocaleString('pt-BR')}</span>
              <p className="text-sm text-on-surface-variant">Canceladas</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(data.consultas.rating) ? 'fill-secondary text-secondary' : 'text-outline-variant'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-on-surface ml-1">{data.consultas.rating}/5.0</span>
            </div>
            <button className="flex items-center gap-1 text-sm text-primary font-medium hover:text-primary/80 transition-colors">
              Ver feedbacks detalhados
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="col-span-12 bg-surface-container-lowest rounded-lg shadow-[0_8px_32px_0_rgba(26,28,25,0.04)] p-8">
          <h2 className="font-bold text-xl text-on-surface mb-6">Monitoramento de Atividade em Tempo Real</h2>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('24h')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                activeTab === '24h'
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              Últimas 24h
            </button>
            <button
              onClick={() => setActiveTab('7d')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                activeTab === '7d'
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              Últimos 7 dias
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container rounded-xl p-4">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider">Novos Usuários</span>
              <div className="flex items-end justify-between h-20 mt-3 gap-1">
                {[65, 45, 78, 52, 90, 68, 85].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-primary/80 rounded-t transition-all duration-300 hover:bg-primary"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="bg-surface-container rounded-xl p-4">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider">Consultas</span>
              <div className="flex items-end justify-between h-20 mt-3 gap-1">
                {[40, 75, 55, 90, 60, 85, 70].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-secondary-container rounded-t transition-all duration-300 hover:bg-secondary"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="md:col-span-2 bg-surface-container rounded-xl p-4">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider mb-3 block">Atividade Recente</span>
              <div className="space-y-3">
                {data.atividadeRecente.logs.map((log) => (
                  <div key={log.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">{log.initials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-on-surface truncate">{log.action}</p>
                      <p className="text-xs text-on-surface-variant">{log.user} • {log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardView