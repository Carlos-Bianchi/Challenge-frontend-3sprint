import { useState } from 'react'

interface Message {
  id: number
  sender: string
  subject: string
  preview: string
  content: string
  date: string
  read: boolean
}

interface Folder {
  id: string
  name: string
  icon: string
}

const messages: Message[] = [
  { id: 1, sender: 'Ana Silva', subject: 'Dúvida sobre agendamento', preview: 'Olá, gostaria de saber...', content: 'Olá, gostaria de saber como funciona o agendamento de consultas.', date: '2024-01-15', read: false },
  { id: 2, sender: 'Carlos Souza', subject: 'Confirmação de match', preview: 'Match confirmado com...', content: 'Match confirmado com sucesso! Entrarei em contato em breve.', date: '2024-01-14', read: true },
  { id: 3, sender: 'Maria Santos', subject: 'Agradecimento', preview: 'Muito obrigada pela...', content: 'Muito obrigada pela ajuda! Foi muito útil.', date: '2024-01-13', read: true },
]

const folders: Folder[] = [
  { id: 'inbox', name: 'Inbox', icon: '📥' },
  { id: 'outbox', name: 'Outbox', icon: '📤' },
  { id: 'sent', name: 'Enviadas', icon: '✓' },
]

const Comunicacao = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [activeFolder, setActiveFolder] = useState<string>('inbox')

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Comunicação</h1>
          <p className="mt-1 text-gray-600">
            Mensagens e notificações
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2">
          <span>+</span> Nova Mensagem
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 p-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Pastas
            </h2>
            <div className="space-y-1">
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => setActiveFolder(folder.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors duration-300 ${
                    activeFolder === folder.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{folder.icon}</span>
                  <span>{folder.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={`p-4 cursor-pointer transition-colors duration-300 border-l-4 ${
                  selectedMessage?.id === message.id
                    ? 'bg-blue-50 border-l-blue-500'
                    : 'hover:bg-gray-50 border-l-transparent'
                }`}
              >
                <div className="flex items-start gap-3">
                  {!message.read && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={`text-sm truncate ${message.read ? 'text-gray-600' : 'text-gray-800 font-medium'}`}>
                        {message.sender}
                      </span>
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {message.date}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${message.read ? 'text-gray-500' : 'text-gray-700 font-medium'}`}>
                      {message.subject}
                    </p>
                    <p className="text-xs text-gray-400 truncate mt-1">
                      {message.preview}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-2/3">
          {selectedMessage ? (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {selectedMessage.subject}
                </h2>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="font-medium">{selectedMessage.sender}</span>
                  <span className="text-gray-400">•</span>
                  <span>{selectedMessage.date}</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedMessage.content}
              </p>
              <div className="mt-6 pt-4 border-t border-gray-200 flex gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300">
                  Responder
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-300">
                  Encaminhar
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-300">
                  Arquivar
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center min-h-[400px]">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-4">📧</div>
                <p className="text-lg font-medium">Selecione uma mensagem</p>
                <p className="text-sm mt-1">Clique em uma mensagem para ler seu conteúdo</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comunicacao