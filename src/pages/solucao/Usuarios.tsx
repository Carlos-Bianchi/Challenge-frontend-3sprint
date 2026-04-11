import { useNavigate } from 'react-router-dom'

const usuarios = [
  { id: 1, nome: 'Ana Silva', tipo: 'paciente' as const },
  { id: 2, nome: 'Carlos Souza', tipo: 'voluntario' as const },
  { id: 3, nome: 'Maria Santos', tipo: 'paciente' as const },
  { id: 4, nome: 'João Oliveira', tipo: 'voluntario' as const },
  { id: 5, nome: 'Fernanda Lima', tipo: 'paciente' as const },
]

const Usuarios = () => {
  const navigate = useNavigate()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">Usuários</h1>
      <p className="mt-2 text-gray-600">
        Gestão de Usuários — Administre contas e permissões.
      </p>

      <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usuarios.map((usuario, index) => (
              <tr
                key={usuario.id}
                onClick={() => navigate(`/solucao/usuarios/${usuario.id}`)}
                className={`cursor-pointer transition-colors duration-150 hover:bg-blue-50 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {usuario.nome}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      usuario.tipo === 'paciente'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {usuario.tipo === 'paciente' ? 'Paciente' : 'Voluntário'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Usuarios
