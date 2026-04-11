import { useState } from 'react'

interface Report {
  id: number
  date: string
  patient: string
  dentist: string
  status: 'concluido' | 'pendente' | 'em_analise'
  type: string
}

const mockReports: Report[] = [
  { id: 1, date: '2024-01-15', patient: 'Ana Silva', dentist: 'Dr. Ricardo Mendes', status: 'concluido', type: 'Raio-X' },
  { id: 2, date: '2024-01-14', patient: 'Carlos Souza', dentist: 'Dra. Juliana Costa', status: 'em_analise', type: 'Tomografia' },
  { id: 3, date: '2024-01-13', patient: 'Maria Santos', dentist: 'Dr. Felipe Oliveira', status: 'concluido', type: 'Panorâmica' },
  { id: 4, date: '2024-01-12', patient: 'João Oliveira', dentist: 'Dra. Amanda Silva', status: 'pendente', type: 'Raio-X' },
  { id: 5, date: '2024-01-11', patient: 'Fernanda Lima', dentist: 'Dr. Ricardo Mendes', status: 'concluido', type: 'Documentação' },
]

const Relatorios = () => {
  const [isDragging, setIsDragging] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido':
        return 'bg-turma-green/10 text-turma-green'
      case 'pendente':
        return 'bg-turma-yellow/10 text-turma-yellow'
      case 'em_analise':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'concluido':
        return 'Concluído'
      case 'pendente':
        return 'Pendente'
      case 'em_analise':
        return 'Em Análise'
      default:
        return status
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">Relatórios</h1>
      <p className="mt-2 text-gray-600">
        Gestão de relatórios médicos e documentação
      </p>

      {/* Upload Area */}
      <div
        className={`mt-6 border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-400 hover:border-gray-500 hover:bg-gray-50'
        }`}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDrop={() => setIsDragging(false)}
      >
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="mt-4 text-lg font-medium text-gray-700">
          Arraste e solte arquivos aqui
        </p>
        <p className="mt-1 text-sm text-gray-500">
          ou clique para selecionar arquivos
        </p>
        <p className="mt-2 text-xs text-gray-400">
          Suporta: PDF, JPG, PNG (max. 10MB)
        </p>
        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
          Selecionar Arquivo
        </button>
      </div>

      {/* Reports List */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Relatórios Recentes
        </h2>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paciente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dentista
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-300">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {report.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {report.patient}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {report.dentist}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {report.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          report.status
                        )}`}
                      >
                        {getStatusLabel(report.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        Visualizar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-turma-green transition-all duration-300 hover:shadow-md">
          <p className="text-sm font-medium text-gray-500">Concluídos</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {mockReports.filter((r) => r.status === 'concluido').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm font-medium text-gray-500">Em Análise</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {mockReports.filter((r) => r.status === 'em_analise').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-turma-yellow transition-all duration-300 hover:shadow-md">
          <p className="text-sm font-medium text-gray-500">Pendentes</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {mockReports.filter((r) => r.status === 'pendente').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-gray-500">
          <p className="text-sm font-medium text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {mockReports.length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Relatorios
