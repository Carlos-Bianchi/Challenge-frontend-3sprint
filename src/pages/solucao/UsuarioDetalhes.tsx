import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

interface Usuario {
  id: number
  nome: string
  email: string
  tipo: 'paciente' | 'voluntario' | 'admin'
  status: 'ativo' | 'inativo' | 'pendente'
  telefone: string
  cpf: string
  dataNascimento: string
  dataCadastro: string
  ultimoAcesso: string
  endereco: {
    rua: string
    numero: string
    bairro: string
    cidade: string
    estado: string
    cep: string
  }
  permissoes: string[]
  bio: string
  notasAdmin: string
}

const usuariosMock: Usuario[] = [
  {
    id: 1,
    nome: 'Ana Silva',
    email: 'ana.silva@email.com',
    tipo: 'paciente',
    status: 'ativo',
    telefone: '(11) 98765-4321',
    cpf: '123.456.789-00',
    dataNascimento: '1985-03-15',
    dataCadastro: '2024-01-15',
    ultimoAcesso: '2024-03-20',
    endereco: {
      rua: 'Rua das Flores',
      numero: '123',
      bairro: 'Jardim Primavera',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01234-567'
    },
    permissoes: ['visualizar_match', 'enviar_mensagem'],
    bio: 'Paciente em tratamento de fisioterapia. Busca acompanhamento regular.',
    notasAdmin: 'Usuário ativo e engajado. Participa regularmente das sessões.'
  },
  {
    id: 2,
    nome: 'Carlos Souza',
    email: 'carlos.souza@email.com',
    tipo: 'voluntario',
    status: 'ativo',
    telefone: '(11) 91234-5678',
    cpf: '987.654.321-00',
    dataNascimento: '1990-07-22',
    dataCadastro: '2024-02-01',
    ultimoAcesso: '2024-03-19',
    endereco: {
      rua: 'Avenida Paulista',
      numero: '1000',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01310-100'
    },
    permissoes: ['visualizar_match', 'enviar_mensagem', 'criar_sessao'],
    bio: 'Voluntário fisioterapeuta com 5 anos de experiência em reabilitação.',
    notasAdmin: 'Excelente voluntário. Alta avaliação dos pacientes.'
  },
  {
    id: 3,
    nome: 'Maria Santos',
    email: 'maria.santos@email.com',
    tipo: 'paciente',
    status: 'pendente',
    telefone: '(11) 99876-5432',
    cpf: '456.789.123-00',
    dataNascimento: '1978-11-30',
    dataCadastro: '2024-03-05',
    ultimoAcesso: '2024-03-05',
    endereco: {
      rua: 'Rua dos Pinheiros',
      numero: '45',
      bairro: 'Pinheiros',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '05422-000'
    },
    permissoes: ['visualizar_match'],
    bio: 'Nova paciente. Aguardando avaliação inicial.',
    notasAdmin: 'Cadastro pendente de documentação. Entrar em contato.'
  },
  {
    id: 4,
    nome: 'João Oliveira',
    email: 'joao.oliveira@email.com',
    tipo: 'voluntario',
    status: 'inativo',
    telefone: '(11) 95678-1234',
    cpf: '789.123.456-00',
    dataNascimento: '1988-05-10',
    dataCadastro: '2023-12-10',
    ultimoAcesso: '2024-01-15',
    endereco: {
      rua: 'Rua Augusta',
      numero: '300',
      bairro: 'Consolação',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01305-000'
    },
    permissoes: ['visualizar_match'],
    bio: 'Voluntário temporariamente afastado por questões pessoais.',
    notasAdmin: 'Inativo desde jan/2024. Aguardando retorno do voluntário.'
  },
  {
    id: 5,
    nome: 'Fernanda Lima',
    email: 'fernanda.lima@email.com',
    tipo: 'admin',
    status: 'ativo',
    telefone: '(11) 93456-7890',
    cpf: '321.654.987-00',
    dataNascimento: '1982-09-25',
    dataCadastro: '2023-11-20',
    ultimoAcesso: '2024-03-21',
    endereco: {
      rua: 'Rua Oscar Freire',
      numero: '500',
      bairro: 'Jardins',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01426-001'
    },
    permissoes: ['todos'],
    bio: 'Administradora da plataforma. Responsável pelo gerenciamento geral.',
    notasAdmin: 'Acesso total ao sistema. Monitorar logs regularmente.'
  },
  {
    id: 6,
    nome: 'Pedro Costa',
    email: 'pedro.costa@email.com',
    tipo: 'paciente',
    status: 'ativo',
    telefone: '(21) 98765-1234',
    cpf: '654.321.987-00',
    dataNascimento: '1992-12-03',
    dataCadastro: '2024-02-20',
    ultimoAcesso: '2024-03-18',
    endereco: {
      rua: 'Avenida Atlântica',
      numero: '1702',
      bairro: 'Copacabana',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      cep: '22021-001'
    },
    permissoes: ['visualizar_match', 'enviar_mensagem'],
    bio: 'Paciente de ortopedia. Recuperação pós-cirúrgica.',
    notasAdmin: 'Em recuperação. Acompanhamento semanal.'
  },
  {
    id: 7,
    nome: 'Juliana Martins',
    email: 'juliana.martins@email.com',
    tipo: 'voluntario',
    status: 'ativo',
    telefone: '(21) 91234-5678',
    cpf: '147.258.369-00',
    dataNascimento: '1987-04-18',
    dataCadastro: '2024-01-10',
    ultimoAcesso: '2024-03-21',
    endereco: {
      rua: 'Rua Visconde de Pirajá',
      numero: '200',
      bairro: 'Ipanema',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      cep: '22410-000'
    },
    permissoes: ['visualizar_match', 'enviar_mensagem', 'criar_sessao'],
    bio: 'Voluntária especialista em pilates terapêutico.',
    notasAdmin: 'Voluntária muito ativa. Disponível fins de semana.'
  },
  {
    id: 8,
    nome: 'Ricardo Mendes',
    email: 'ricardo.mendes@email.com',
    tipo: 'paciente',
    status: 'inativo',
    telefone: '(31) 99876-5432',
    cpf: '369.258.147-00',
    dataNascimento: '1975-08-07',
    dataCadastro: '2023-10-15',
    ultimoAcesso: '2023-12-20',
    endereco: {
      rua: 'Avenida Afonso Pena',
      numero: '1500',
      bairro: 'Centro',
      cidade: 'Belo Horizonte',
      estado: 'MG',
      cep: '30130-000'
    },
    permissoes: ['visualizar_match'],
    bio: 'Paciente inativo. Não responde contatos desde dez/2023.',
    notasAdmin: 'Tentar contato. Se não responder, arquivar cadastro.'
  }
]

const todasPermissoes = [
  { id: 'visualizar_match', label: 'Visualizar Match' },
  { id: 'enviar_mensagem', label: 'Enviar Mensagens' },
  { id: 'criar_sessao', label: 'Criar Sessões' },
  { id: 'gerar_relatorios', label: 'Gerar Relatórios' },
  { id: 'admin_usuarios', label: 'Gerenciar Usuários' },
  { id: 'admin_config', label: 'Configurações' }
]

const UsuarioDetalhes = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [modoEdicao, setModoEdicao] = useState(false)
  const [salvando, setSalvando] = useState(false)
  const [mensagemSucesso, setMensagemSucesso] = useState('')

  const usuarioInicial = usuariosMock.find((u) => u.id === Number(id))
  const [usuario, setUsuario] = useState<Usuario | undefined>(usuarioInicial)
  const [formData, setFormData] = useState<Usuario | undefined>(usuarioInicial)

  if (!usuario) {
    return (
      <div className="p-6">
        <button
          onClick={() => navigate('/solucao/usuarios')}
          className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar
        </button>
        <div className="bg-white rounded-lg shadow-md p-8 mt-6 text-center">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h2 className="mt-4 text-xl font-medium text-gray-900">Usuário não encontrado</h2>
          <p className="mt-2 text-gray-500">O usuário solicitado não existe ou foi removido.</p>
        </div>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (formData) {
      if (name.startsWith('endereco.')) {
        const campo = name.split('.')[1]
        setFormData({
          ...formData,
          endereco: {
            ...formData.endereco,
            [campo]: value
          }
        })
      } else {
        setFormData({ ...formData, [name]: value })
      }
    }
  }

  const handlePermissaoToggle = (permissaoId: string) => {
    if (!formData) return
    
    const novasPermissoes = formData.permissoes.includes(permissaoId)
      ? formData.permissoes.filter(p => p !== permissaoId)
      : [...formData.permissoes, permissaoId]
    
    setFormData({ ...formData, permissoes: novasPermissoes })
  }

  const salvarAlteracoes = () => {
    if (!formData) return
    
    setSalvando(true)
    setTimeout(() => {
      setUsuario(formData)
      setSalvando(false)
      setModoEdicao(false)
      setMensagemSucesso('Alterações salvas com sucesso!')
      setTimeout(() => setMensagemSucesso(''), 3000)
    }, 800)
  }

  const cancelarEdicao = () => {
    setFormData(usuario)
    setModoEdicao(false)
  }

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      paciente: 'Paciente',
      voluntario: 'Voluntário',
      admin: 'Administrador'
    }
    return labels[tipo] || tipo
  }

  const getTipoColor = (tipo: string) => {
    const colors: Record<string, string> = {
      paciente: 'bg-green-100 text-green-800',
      voluntario: 'bg-blue-100 text-blue-800',
      admin: 'bg-red-100 text-red-800'
    }
    return colors[tipo] || 'bg-gray-100 text-gray-800'
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      ativo: 'bg-green-100 text-green-800',
      inativo: 'bg-gray-100 text-gray-800',
      pendente: 'bg-yellow-100 text-yellow-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Mensagem de Sucesso */}
      {mensagemSucesso && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {mensagemSucesso}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/solucao/usuarios')}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Detalhes do Usuário</h1>
            <p className="text-gray-600">ID: {usuario.id} • Cadastrado em {new Date(usuario.dataCadastro).toLocaleDateString('pt-BR')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {modoEdicao ? (
            <>
              <button
                onClick={cancelarEdicao}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={salvarAlteracoes}
                disabled={salvando}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-container transition-colors disabled:opacity-50"
              >
                {salvando ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Salvando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Salvar Alterações
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              onClick={() => setModoEdicao(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-container transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar Usuário
            </button>
          )}
        </div>
      </div>

      {/* Grid de Informações */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Esquerda - Informações Principais */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card de Informações Pessoais */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Informações Pessoais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                {modoEdicao ? (
                  <input
                    type="text"
                    name="nome"
                    value={formData?.nome || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{usuario.nome}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                {modoEdicao ? (
                  <input
                    type="email"
                    name="email"
                    value={formData?.email || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-900">{usuario.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                {modoEdicao ? (
                  <input
                    type="text"
                    name="telefone"
                    value={formData?.telefone || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-900">{usuario.telefone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                {modoEdicao ? (
                  <input
                    type="text"
                    name="cpf"
                    value={formData?.cpf || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-900">{usuario.cpf}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                {modoEdicao ? (
                  <input
                    type="date"
                    name="dataNascimento"
                    value={formData?.dataNascimento || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-900">{new Date(usuario.dataNascimento).toLocaleDateString('pt-BR')}</p>
                )}
              </div>
            </div>
          </div>

          {/* Card de Endereço */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Endereço
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rua</label>
                {modoEdicao ? (
                  <input
                    type="text"
                    name="endereco.rua"
                    value={formData?.endereco.rua || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-900">{usuario.endereco.rua}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                {modoEdicao ? (
                  <input
                    type="text"
                    name="endereco.numero"
                    value={formData?.endereco.numero || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-900">{usuario.endereco.numero}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                {modoEdicao ? (
                  <input
                    type="text"
                    name="endereco.bairro"
                    value={formData?.endereco.bairro || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-900">{usuario.endereco.bairro}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                {modoEdicao ? (
                  <input
                    type="text"
                    name="endereco.cidade"
                    value={formData?.endereco.cidade || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-900">{usuario.endereco.cidade}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                {modoEdicao ? (
                  <select
                    name="endereco.estado"
                    value={formData?.endereco.estado || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Selecione...</option>
                    {['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-900">{usuario.endereco.estado}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                {modoEdicao ? (
                  <input
                    type="text"
                    name="endereco.cep"
                    value={formData?.endereco.cep || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-900">{usuario.endereco.cep}</p>
                )}
              </div>
            </div>
          </div>

          {/* Card de Biografia */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Biografia
            </h2>
            {modoEdicao ? (
              <textarea
                name="bio"
                rows={4}
                value={formData?.bio || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            ) : (
              <p className="text-gray-700">{usuario.bio}</p>
            )}
          </div>

          {/* Card de Notas Administrativas */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-primary">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Notas Administrativas
              <span className="text-xs font-normal text-gray-500">(Visível apenas para admins)</span>
            </h2>
            {modoEdicao ? (
              <textarea
                name="notasAdmin"
                rows={3}
                value={formData?.notasAdmin || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            ) : (
              <p className="text-gray-700 italic">{usuario.notasAdmin}</p>
            )}
          </div>
        </div>

        {/* Coluna Direita - Status e Permissões */}
        <div className="space-y-6">
          {/* Card de Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Status da Conta</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Usuário</label>
                {modoEdicao ? (
                  <select
                    name="tipo"
                    value={formData?.tipo || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="paciente">Paciente</option>
                    <option value="voluntario">Voluntário</option>
                    <option value="admin">Administrador</option>
                  </select>
                ) : (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTipoColor(usuario.tipo)}`}>
                    {getTipoLabel(usuario.tipo)}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                {modoEdicao ? (
                  <select
                    name="status"
                    value={formData?.status || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                    <option value="pendente">Pendente</option>
                  </select>
                ) : (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(usuario.status)}`}>
                    {usuario.status.charAt(0).toUpperCase() + usuario.status.slice(1)}
                  </span>
                )}
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Último acesso:</span>
                  <span className="text-gray-900">{new Date(usuario.ultimoAcesso).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-gray-500">Data de cadastro:</span>
                  <span className="text-gray-900">{new Date(usuario.dataCadastro).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card de Permissões */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Permissões</h2>
            <div className="space-y-3">
              {todasPermissoes.map((permissao) => {
                const temPermissao = formData?.permissoes.includes(permissao.id) || 
                                     formData?.permissoes.includes('todos')
                return (
                  <div key={permissao.id} className="flex items-center">
                    {modoEdicao ? (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={temPermissao}
                          onChange={() => handlePermissaoToggle(permissao.id)}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700">{permissao.label}</span>
                      </label>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${temPermissao ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span className={`text-sm ${temPermissao ? 'text-gray-900' : 'text-gray-400'}`}>
                          {permissao.label}
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            {formData?.permissoes.includes('todos') && (
              <p className="mt-4 text-sm text-primary font-medium">
                Acesso total concedido (Admin)
              </p>
            )}
          </div>

          {/* Card de Ações Rápidas */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Ações Rápidas</h2>
            <div className="space-y-2">
              <button
                onClick={() => {}}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Enviar Email
              </button>
              <button
                onClick={() => {}}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Resetar Senha
              </button>
              <button
                onClick={() => {}}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Ver Histórico
              </button>
              <button
                onClick={() => {}}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                Bloquear Acesso
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsuarioDetalhes
