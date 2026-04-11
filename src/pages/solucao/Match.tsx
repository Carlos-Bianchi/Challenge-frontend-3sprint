import { useState } from 'react'

const locations = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Curitiba']
const specialties = ['Cardiologia', 'Pediatria', 'Ortopedia', 'Neurologia', 'Dermatologia']
const availabilities = ['Manhã', 'Tarde', 'Noite', 'Fim de semana']

const volunteers = [
  { id: 1, name: 'Dr. Ricardo Mendes', specialty: 'Cardiologia', location: 'São Paulo', availability: 'Manhã', rating: 4.8 },
  { id: 2, name: 'Dra. Juliana Costa', specialty: 'Pediatria', location: 'Rio de Janeiro', availability: 'Tarde', rating: 4.9 },
  { id: 3, name: 'Dr. Felipe Oliveira', specialty: 'Ortopedia', location: 'Belo Horizonte', availability: 'Manhã', rating: 4.7 },
]

interface FormState {
  location: string
  specialty: string
  availability: string
}

const Match = () => {
  const [form, setForm] = useState<FormState>({
    location: '',
    specialty: '',
    availability: '',
  })

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    console.log('Buscando com filtros:', form)
  }

  const handleSolicitarMatch = (volunteerId: number) => {
    console.log('Solicitando match com voluntário:', volunteerId)
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalf = rating % 1 >= 0.5
    const stars = []

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
      } else if (i === fullStars && hasHalf) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
            <path fill={`url(#half-${i})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
      }
    }

    return <div className="flex items-center gap-0.5">{stars}</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">Match</h1>
      <p className="mt-2 text-gray-600">
        Encontre voluntários disponíveis para atender pacientes
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-white rounded-lg shadow-md p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Localização
            </label>
            <select
              id="location"
              value={form.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Selecione...</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
              Especialidade
            </label>
            <select
              id="specialty"
              value={form.specialty}
              onChange={(e) => handleChange('specialty', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Selecione...</option>
              {specialties.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
              Disponibilidade
            </label>
            <select
              id="availability"
              value={form.availability}
              onChange={(e) => handleChange('availability', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded transition-colors duration-150"
          >
            Buscar
          </button>
        </div>
      </form>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {volunteers.map((volunteer) => (
          <div
            key={volunteer.id}
            className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500 hover:shadow-lg transition-shadow duration-150"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{volunteer.name}</h3>
                <p className="text-sm text-green-600 font-medium mt-1">{volunteer.specialty}</p>
              </div>
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                {renderStars(volunteer.rating)}
                <span className="text-sm font-medium text-gray-700 ml-1">{volunteer.rating}</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{volunteer.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{volunteer.availability}</span>
              </div>
            </div>

            <button
              onClick={() => handleSolicitarMatch(volunteer.id)}
              className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded transition-colors duration-150"
            >
              Solicitar Match
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Match