import { useState, useEffect } from 'react'
import Card from '../../components/ui/Card'

interface DashboardData {
  pacientesAtivos: number
  voluntariosAtivos: number
  matchesRealizados: number
}

const DashboardView = () => {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        pacientesAtivos: 1250,
        voluntariosAtivos: 890,
        matchesRealizados: 3420,
      })
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return null
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Visualização de Dados — Acompanhe métricas e estatísticas em tempo real.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Pacientes Ativos"
          value={data.pacientesAtivos}
          description="Total de pacientes cadastrados"
        />
        <Card
          title="Voluntários Ativos"
          value={data.voluntariosAtivos}
          description="Voluntários disponíveis"
        />
        <Card
          title="Matches Realizados"
          value={data.matchesRealizados}
          description="Conexões bem-sucedidas"
        />
      </div>
    </div>
  )
}

export default DashboardView
