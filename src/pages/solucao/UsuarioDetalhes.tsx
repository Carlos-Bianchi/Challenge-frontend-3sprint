import { useParams, useNavigate } from 'react-router-dom'

const usuariosMock = [
  { id: 1, nome: 'Ana Silva', tipo: 'paciente' as const, email: 'ana.silva@email.com', telefone: '(11) 98765-4321' },
  { id: 2, nome: 'Carlos Souza', tipo: 'voluntario' as const, email: 'carlos.souza@email.com', telefone: '(11) 91234-5678' },
  { id: 3, nome: 'Maria Santos', tipo: 'paciente' as const, email: 'maria.santos@email.com', telefone: '(11) 99876-5432' },
  { id: 4, nome: 'João Oliveira', tipo: 'voluntario' as const, email: 'joao.oliveira@email.com', telefone: '(11) 95678-1234' },
  { id: 5, nome: 'Fernanda Lima', tipo: 'paciente' as const, email: 'fernanda.lima@email.com', telefone: '(11) 93456-7890' },
]

const UsuarioDetalhes = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const usuario = usuariosMock.find((u) => u.id === Number(id))

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
      >
        Voltar
      </button>

      {usuario ? (
        <div className="bg-white rounded-lg shadow-md p-6 mt-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Detalhes do Usuário ID: {id}
          </h2>

          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Nome</span>
              <p className="text-gray-800">{usuario.nome}</p>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-500">Tipo</span>
              <p className="mt-1">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    usuario.tipo === 'paciente'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}
                >
                  {usuario.tipo === 'paciente' ? 'Paciente' : 'Voluntário'}
                </span>
              </p>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-500">Email</span>
              <p className="text-gray-800">{usuario.email}</p>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-500">Telefone</span>
              <p className="text-gray-800">{usuario.telefone}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 mt-4">
          <p className="text-gray-600">Usuário não encontrado.</p>
        </div>
      )}
    </div>
  )
}

export default UsuarioDetalhes