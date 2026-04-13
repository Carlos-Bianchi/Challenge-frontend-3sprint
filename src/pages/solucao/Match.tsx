import { useState } from 'react'
import {
  Sparkles,
  MapPin,
  Stethoscope,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  History,
  Bell
} from 'lucide-react'

const locations = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Curitiba']
const specialties = ['Cardiologia', 'Pediatria', 'Ortopedia', 'Neurologia', 'Dermatologia']
const availabilities = ['Manhã', 'Tarde', 'Noite', 'Fim de semana']

interface Patient {
  id: number
  name: string
  location: string
  specialty: string
  isActive?: boolean
}

interface DentistRecommendation {
  id: number
  name: string
  clinic: string
  matchPercentage: number
  locationScore: number
  specialtyScore: number
}

interface RecentMatch {
  id: number
  patientName: string
  patientInitials: string
  dentistName: string
  requestDate: string
  status: 'Pendente' | 'Confirmado' | 'Cancelado'
}

const waitingPatients: Patient[] = [
  { id: 1, name: 'Maria Santos', location: 'São Paulo', specialty: 'Ortodontia', isActive: true },
  { id: 2, name: 'João Oliveira', location: 'Rio de Janeiro', specialty: 'Implantes', isActive: false },
  { id: 3, name: 'Ana Costa', location: 'Belo Horizonte', specialty: 'Estética', isActive: false },
]

const dentistRecommendations: DentistRecommendation[] = [
  { id: 1, name: 'Dr. Ricardo Mendes', clinic: 'Clínica Sorriso', matchPercentage: 98, locationScore: 95, specialtyScore: 100 },
  { id: 2, name: 'Dra. Juliana Costa', clinic: 'Centro Odonto', matchPercentage: 92, locationScore: 88, specialtyScore: 96 },
  { id: 3, name: 'Dr. Felipe Oliveira', clinic: 'Oral Care', matchPercentage: 85, locationScore: 82, specialtyScore: 88 },
]

const recentMatches: RecentMatch[] = [
  { id: 1, patientName: 'Carlos Silva', patientInitials: 'CS', dentistName: 'Dr. Ricardo Mendes', requestDate: '15/01/2024', status: 'Confirmado' },
  { id: 2, patientName: 'Lucia Ferreira', patientInitials: 'LF', dentistName: 'Dra. Juliana Costa', requestDate: '14/01/2024', status: 'Pendente' },
  { id: 3, patientName: 'Pedro Santos', patientInitials: 'PS', dentistName: 'Dr. Felipe Oliveira', requestDate: '13/01/2024', status: 'Cancelado' },
  { id: 4, patientName: 'Marina Lima', patientInitials: 'ML', dentistName: 'Dr. Roberto Alves', requestDate: '12/01/2024', status: 'Confirmado' },
]

interface FormState {
  location: string
  specialty: string
  availability: string
}

type FilterTab = 'Todos' | 'Pendentes' | 'Confirmados'

const Match = () => {
  const [form, setForm] = useState<FormState>({
    location: '',
    specialty: '',
    availability: '',
  })

  const [activeFilterTab, setActiveFilterTab] = useState<FilterTab>('Todos')

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    console.log('Buscando com filtros:', form)
  }

  const handleCriarMatch = (dentistId: number) => {
    console.log('Criando match com dentista:', dentistId)
  }

  const getStatusBadge = (status: RecentMatch['status']) => {
    switch (status) {
      case 'Confirmado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            Confirmado
          </span>
        )
      case 'Pendente':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <AlertCircle className="w-3 h-3" />
            Pendente
          </span>
        )
      case 'Cancelado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <XCircle className="w-3 h-3" />
            Cancelado
          </span>
        )
    }
  }

  const filteredMatches = recentMatches.filter(match => {
    if (activeFilterTab === 'Todos') return true
    if (activeFilterTab === 'Pendentes') return match.status === 'Pendente'
    if (activeFilterTab === 'Confirmados') return match.status === 'Confirmado'
    return true
  })

  return (
    <div className="p-6 bg-surface min-h-screen">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-card shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-xl text-on-background font-sans">Fila de Espera</h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary text-white">
                <Bell className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="whitespace-nowrap">12 Pendentes</span>
              </span>
            </div>
            <p className="text-sm text-on-surface-variant mb-6">Prioridade e necessidades</p>

            <div className="space-y-4">
              {waitingPatients.map((patient) => (
                <div
                  key={patient.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    patient.isActive
                      ? 'border-primary bg-green-50/50'
                      : 'border-outline-variant bg-surface-container-lowest hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-on-background">{patient.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1 text-sm text-on-surface-variant">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{patient.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mb-4">
                    <Stethoscope className="w-3.5 h-3.5 text-secondary" />
                    <span className="text-sm font-medium text-secondary">{patient.specialty}</span>
                  </div>
                  <button className="w-full py-2.5 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center gap-2">
                    Ver Detalhes
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 rounded-xl bg-surface-container text-on-surface font-medium text-sm hover:bg-surface-container-high transition-colors duration-300 flex items-center justify-center gap-2">
              Ver Fila Completa
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded-card shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-xl text-on-background font-sans">TOP 3 Recomendados</h2>
                  <p className="text-sm text-on-surface-variant">Baseado no perfil do paciente</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg text-sm font-medium bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors duration-300">
                  Todos
                </button>
                <button className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white">
                  Para Você
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {dentistRecommendations.map((dentist) => (
                <div
                  key={dentist.id}
                  className="border border-outline-variant rounded-xl p-5 hover:shadow-lg transition-all duration-300 bg-surface-container-lowest"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold text-lg">
                      {dentist.matchPercentage}%
                    </span>
                  </div>

                  <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center mb-3 mx-auto">
                    <Stethoscope className="w-6 h-6 text-primary" />
                  </div>

                  <div className="text-center mb-4">
                    <h3 className="font-semibold text-on-background">{dentist.name}</h3>
                    <p className="text-sm text-on-surface-variant">{dentist.clinic}</p>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="flex items-center gap-1 text-on-surface-variant">
                          <MapPin className="w-3.5 h-3.5" />
                          Localização
                        </span>
                        <span className="font-medium text-on-background">{dentist.locationScore}%</span>
                      </div>
                      <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${dentist.locationScore}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="flex items-center gap-1 text-on-surface-variant">
                          <Stethoscope className="w-3.5 h-3.5" />
                          Especialidade
                        </span>
                        <span className="font-medium text-on-background">{dentist.specialtyScore}%</span>
                      </div>
                      <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                        <div
                          className="h-full bg-secondary rounded-full transition-all duration-500"
                          style={{ width: `${dentist.specialtyScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCriarMatch(dentist.id)}
                    className="w-full py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    Criar Match
                  </button>
                  <button className="w-full mt-2 py-2.5 rounded-xl text-primary font-medium text-sm hover:bg-primary/5 transition-colors duration-300">
                    Detalhes do Dentista
                  </button>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-card shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-6"
          >
            <h3 className="font-bold text-lg text-on-background mb-4 font-sans">Filtros</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-on-surface-variant mb-1.5">
                  Localização
                </label>
                <select
                  id="location"
                  value={form.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full border border-outline rounded-lg px-3 py-2.5 bg-surface-container-lowest text-on-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                >
                  <option value="">Selecione...</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-on-surface-variant mb-1.5">
                  Especialidade
                </label>
                <select
                  id="specialty"
                  value={form.specialty}
                  onChange={(e) => handleChange('specialty', e.target.value)}
                  className="w-full border border-outline rounded-lg px-3 py-2.5 bg-surface-container-lowest text-on-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                >
                  <option value="">Selecione...</option>
                  {specialties.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-on-surface-variant mb-1.5">
                  Disponibilidade
                </label>
                <select
                  id="availability"
                  value={form.availability}
                  onChange={(e) => handleChange('availability', e.target.value)}
                  className="w-full border border-outline rounded-lg px-3 py-2.5 bg-surface-container-lowest text-on-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                >
                  <option value="">Selecione...</option>
                  {availabilities.map((avail) => (
                    <option key={avail} value={avail}>{avail}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-300"
              >
                Buscar
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
                <h2 className="font-bold text-xl text-on-background font-sans">Matches Recentes</h2>
                <p className="text-sm text-on-surface-variant">Últimas solicitações</p>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              {(['Todos', 'Pendentes', 'Confirmados'] as FilterTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilterTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-300 ${
                    activeFilterTab === tab
                      ? 'bg-primary text-white'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {tab}
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
                      <span className="text-sm font-bold text-primary">{match.patientInitials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-on-background text-sm truncate">{match.patientName}</h4>
                      <p className="text-xs text-on-surface-variant truncate">{match.dentistName}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-on-surface-variant">{match.requestDate}</span>
                    {getStatusBadge(match.status)}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 rounded-xl bg-surface-container text-on-surface font-medium text-sm hover:bg-surface-container-high transition-colors duration-300 flex items-center justify-center gap-2">
              Ver Histórico Completo
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Match