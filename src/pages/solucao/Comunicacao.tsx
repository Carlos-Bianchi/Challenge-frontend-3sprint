import React, { useState } from 'react'
import {
  Inbox,
  MessageCircle,
  Mail,
  Smartphone,
  Settings,
  Search,
  Filter,
  Star,
  Trash2,
  BarChart3,
  AlertTriangle,
  Archive,
  CheckCircle,
  Reply,
  User,
  Heart,
  Calendar,
  X,
  ChevronRight
} from 'lucide-react'

// Types
interface Notification {
  id: number
  sender: string
  source: 'whatsapp' | 'email' | 'sms'
  category: string
  subject: string
  preview: string
  content: string
  time: string
  date: string
  read: boolean
  urgent?: boolean
  tags: string[]
}

interface Channel {
  id: string
  name: string
  icon: 'whatsapp' | 'email' | 'sms' | 'inbox'
  badge: number
  section: 'whatsapp' | 'email' | 'sms' | 'inbox'
  disabled?: boolean
}

// Mock Data
const channels: Channel[] = [
  { id: 'inbox', name: 'Inbox', icon: 'inbox', badge: 32, section: 'inbox' },
  { id: 'whatsapp-doacoes', name: 'WhatsApp - Doações', icon: 'whatsapp', badge: 12, section: 'whatsapp' },
  { id: 'whatsapp-juridico', name: 'WhatsApp - Jurídico', icon: 'whatsapp', badge: 5, section: 'whatsapp' },
  { id: 'email-atendimento', name: 'Email - Atendimento', icon: 'email', badge: 8, section: 'email' },
  { id: 'email-financeiro', name: 'Email - Financeiro', icon: 'email', badge: 3, section: 'email' },
  { id: 'sms-urgentes', name: 'SMS - Alertas Urgentes', icon: 'sms', badge: 4, section: 'sms' },
  { id: 'sms-gerais', name: 'SMS - Comunicados Gerais', icon: 'sms', badge: 0, section: 'sms', disabled: true },
]

const notifications: Notification[] = [
  {
    id: 1,
    sender: 'Ana Clara Souza',
    source: 'whatsapp',
    category: 'Doações',
    subject: 'Urgente: Paciente precisa de ajuda',
    preview: 'Olá, preciso de ajuda com um paciente que precisa...',
    content: 'Olá, preciso de ajuda com um paciente que precisa urgentemente de tratamento ortodôntico. O caso é bastante urgente e requiere atención inmediata.',
    time: '09:42',
    date: 'Hoje',
    read: false,
    urgent: true,
    tags: ['Urgente', 'Pacientes']
  },
  {
    id: 2,
    sender: 'Instituto Jurídico Dental',
    source: 'email',
    category: 'Jurídico',
    subject: 'Processo n° 12345/2024',
    preview: 'Referente ao processo de cobrança...',
    content: 'Prezados, comunicamos que o processo de cobrança referente ao paciente Carlos Silva está em fase de conclusão. Solicitamos документация adicional para prosseguir.',
    time: '08:15',
    date: 'Hoje',
    read: true,
    tags: ['Jurídico']
  },
  {
    id: 3,
    sender: 'Campanha Sorriso Social',
    source: 'whatsapp',
    category: 'Doações',
    subject: 'Campanha dia 15/12',
    preview: 'Venha participar da nossa campanha...',
    content: 'Venha participar da nossa campanha de doação para crianças carentes. Precisamos de apoio para continuar nuestro trabajo.',
    time: '17:30',
    date: 'Ontem',
    read: true,
    tags: ['Doações']
  },
  {
    id: 4,
    sender: 'Fornecedor OrthoSupply',
    source: 'email',
    category: 'Logística',
    subject: 'Entrega confirmada',
    preview: 'Sua encomenda foi enviada...',
    content: 'Sua encomenda foi enviada e chegará em até 3 dias úteis. Código de rastreio: ORTHO123456789.',
    time: '14:20',
    date: 'Ontem',
    read: true,
    tags: ['Logística']
  },
]

// Icon mapping
const getIcon = (icon: string, className: string = "w-5 h-5"): React.ReactNode => {
  const icons: Record<string, React.ReactNode> = {
    inbox: <Inbox className={className} />,
    whatsapp: <MessageCircle className={className} />,
    email: <Mail className={className} />,
    sms: <Smartphone className={className} />,
  
    settings: <Settings className={className} />,
    search: <Search className={className} />,
    filter: <Filter className={className} />,
    star: <Star className={className} />,
    trash: <Trash2 className={className} />,
    chart: <BarChart3 className={className} />,
    alert: <AlertTriangle className={className} />,
    archive: <Archive className={className} />,
    check: <CheckCircle className={className} />,
    reply: <Reply className={className} />,
    user: <User className={className} />,
    heart: <Heart className={className} />,
    calendar: <Calendar className={className} />,
    chevron: <ChevronRight className={className} />,
  }
  return icons[icon] || <Inbox className={className} />
}

// Badge color mapping
const getBadgeColor = (source: string, count: number, disabled?: boolean) => {
  if (disabled) return 'bg-gray-200 text-gray-400'
  if (count === 0) return 'bg-gray-100 text-gray-500'
  
  switch (source) {
    case 'whatsapp':
      return 'bg-green-100 text-green-700'
    case 'email':
      return 'bg-blue-100 text-blue-700'
    case 'sms':
      return 'bg-orange-100 text-orange-700'
    default:
      return 'bg-turma-green/10 text-turma-green'
  }
}

// Source icon color
const getSourceIconColor = (source: string) => {
  switch (source) {
    case 'whatsapp':
      return 'text-green-600 bg-green-50'
    case 'email':
      return 'text-blue-600 bg-blue-50'
    case 'sms':
      return 'text-orange-600 bg-orange-50'
    default:
      return 'text-turma-green bg-turma-green/10'
  }
}

const Comunicacao = () => {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [activeChannel, setActiveChannel] = useState('inbox')
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const handleSelectNotification = (notification: Notification) => {
    setSelectedNotification(notification)
    if (!notification.read) {
      notification.read = true
    }
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <div className="flex">
        {/* Sidebar - Left */}
        <aside className="hidden lg:flex flex-col w-72 fixed left-0 top-16 lg:top-20 bottom-0 bg-white border-r border-gray-200/50 overflow-y-auto">
          {/* Nav Items */}
          <nav className="flex-1 p-4 space-y-6">
            {/* Main Inbox */}
            <div>
              <button
                onClick={() => setActiveChannel('inbox')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                  activeChannel === 'inbox'
                    ? 'bg-turma-green text-white shadow-md'
                    : 'hover:bg-gray-50 text-gray-700 hover:translate-x-1'
                }`}
              >
                <div className="flex items-center gap-3">
                  {getIcon('inbox', 'w-5 h-5')}
                  <span className="font-medium">Inbox</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  activeChannel === 'inbox'
                    ? 'bg-white/20 text-white'
                    : 'bg-turma-green/10 text-turma-green'
                }`}>
                  32
                </span>
              </button>
            </div>

            {/* WhatsApp Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
                WhatsApp
              </h3>
              <div className="space-y-1">
                {channels
                  .filter((c) => c.section === 'whatsapp')
                  .map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => setActiveChannel(channel.id)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-left transition-all duration-300 hover:translate-x-1 ${
                        activeChannel === channel.id
                          ? 'bg-turma-green/10 text-turma-green'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {getIcon('whatsapp', 'w-4 h-4')}
                        <span className="text-sm">{channel.name}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeColor('whatsapp', channel.badge)}`}>
                        {channel.badge}
                      </span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Email Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
                Email
              </h3>
              <div className="space-y-1">
                {channels
                  .filter((c) => c.section === 'email')
                  .map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => setActiveChannel(channel.id)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-left transition-all duration-300 hover:translate-x-1 ${
                        activeChannel === channel.id
                          ? 'bg-turma-green/10 text-turma-green'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {getIcon('email', 'w-4 h-4')}
                        <span className="text-sm">{channel.name}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeColor('email', channel.badge)}`}>
                        {channel.badge}
                      </span>
                    </button>
                  ))}
              </div>
            </div>

            {/* SMS Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
                SMS
              </h3>
              <div className="space-y-1">
                {channels
                  .filter((c) => c.section === 'sms')
                  .map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => !channel.disabled && setActiveChannel(channel.id)}
                      disabled={channel.disabled}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-left transition-all duration-300 ${
                        channel.disabled
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:translate-x-1'
                      } ${
                        activeChannel === channel.id
                          ? 'bg-turma-green/10 text-turma-green'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {getIcon('sms', 'w-4 h-4')}
                        <span className="text-sm">{channel.name}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeColor('sms', channel.badge, channel.disabled)}`}>
                        {channel.badge}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </nav>

          {/* Analytics Link */}
          <div className="p-4 border-t border-gray-100">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-300 hover:translate-x-1">
              {getIcon('chart', 'w-5 h-5')}
              <span className="font-medium">Analytics</span>
              {getIcon('chevron', 'w-4 h-4 ml-auto')}
            </button>
          </div>
        </aside>

        {/* Main Content - Central Feed */}
        <main className="flex-1 lg:ml-72 xl:mr-96 min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)]">
          <div className="max-w-4xl mx-auto p-6">
            {/* Search and Filter */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar notificações..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-turma-green/20 focus:border-turma-green transition-all"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all">
                <Filter className="w-5 h-5" />
                <span className="hidden sm:inline">Filtrar</span>
              </button>
            </div>

            {/* Notifications by Date */}
            <div className="space-y-6">
              {/* Hoje */}
              <div>
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Hoje</h2>
                <div className="space-y-3">
                  {notifications
                    .filter((n) => n.date === 'Hoje')
                    .map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => handleSelectNotification(notification)}
                        onMouseEnter={() => setHoveredCard(notification.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className={`relative bg-white rounded-xl p-4 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${
                          !notification.read ? 'border-l-4 border-turma-yellow' : 'border-l-4 border-transparent'
                        } ${selectedNotification?.id === notification.id ? 'ring-2 ring-turma-green/20' : ''}`}
                      >
                        {/* Unread indicator */}
                        {!notification.read && (
                          <span className="absolute top-4 right-4 w-2 h-2 bg-turma-green rounded-full" />
                        )}

                        <div className="flex items-start gap-4">
                          {/* Source Icon */}
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getSourceIconColor(notification.source)}`}>
                            {getIcon(notification.source, 'w-5 h-5')}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                                {notification.sender}
                              </span>
                              <span className="text-xs text-gray-400">{notification.time}</span>
                            </div>
                            <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-800 font-medium'} truncate`}>
                              {notification.subject}
                            </p>
                            <p className="text-sm text-gray-400 truncate mt-0.5">{notification.preview}</p>

                            {/* Tags */}
                            <div className="flex items-center gap-2 mt-2">
                              {notification.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                    tag === 'Urgente'
                                      ? 'bg-red-50 text-red-600'
                                      : tag === 'Pacientes'
                                      ? 'bg-blue-50 text-blue-600'
                                      : tag === 'Jurídico'
                                      ? 'bg-purple-50 text-purple-600'
                                      : tag === 'Doações'
                                      ? 'bg-green-50 text-green-600'
                                      : 'bg-gray-50 text-gray-600'
                                  }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Hover Actions */}
                        <div className={`absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 transition-opacity duration-200 ${hoveredCard === notification.id ? 'opacity-100' : 'opacity-0'}`}>
                          <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
                            <Archive className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Ontem */}
              <div>
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Ontem</h2>
                <div className="space-y-3">
                  {notifications
                    .filter((n) => n.date === 'Ontem')
                    .map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => handleSelectNotification(notification)}
                        onMouseEnter={() => setHoveredCard(notification.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className={`relative bg-white rounded-xl p-4 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md border-l-4 border-transparent ${
                          selectedNotification?.id === notification.id ? 'ring-2 ring-turma-green/20' : ''
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Source Icon */}
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getSourceIconColor(notification.source)}`}>
                            {getIcon(notification.source, 'w-5 h-5')}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-700">{notification.sender}</span>
                              <span className="text-xs text-gray-400">{notification.time}</span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">{notification.subject}</p>
                            <p className="text-sm text-gray-400 truncate mt-0.5">{notification.preview}</p>

                            {/* Tags */}
                            <div className="flex items-center gap-2 mt-2">
                              {notification.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                    tag === 'Urgente'
                                      ? 'bg-red-50 text-red-600'
                                      : tag === 'Pacientes'
                                      ? 'bg-blue-50 text-blue-600'
                                      : tag === 'Jurídico'
                                      ? 'bg-purple-50 text-purple-600'
                                      : tag === 'Doações'
                                      ? 'bg-green-50 text-green-600'
                                      : tag === 'Logística'
                                      ? 'bg-orange-50 text-orange-600'
                                      : 'bg-gray-50 text-gray-600'
                                  }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Hover Actions */}
                        <div className={`absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 transition-opacity duration-200 ${hoveredCard === notification.id ? 'opacity-100' : 'opacity-0'}`}>
                          <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
                            <Archive className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Details Panel - Hidden on mobile */}
        <aside className="hidden xl:flex flex-col w-96 fixed right-0 top-16 lg:top-20 bottom-0 bg-white border-l border-gray-200/50 overflow-y-auto">
          {selectedNotification ? (
            <div className="p-6">
              {/* Close button */}
              <button
                onClick={() => setSelectedNotification(null)}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getSourceIconColor(selectedNotification.source)}`}>
                  {getIcon(selectedNotification.source, 'w-6 h-6')}
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">{selectedNotification.sender}</h2>
                  <p className="text-sm text-gray-500">Paciente Ativo</p>
                </div>
              </div>

              {/* Source Badge */}
              <div className="mb-6">
                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${getSourceIconColor(selectedNotification.source)}`}>
                  {getIcon(selectedNotification.source, 'w-4 h-4')}
                  {selectedNotification.source === 'whatsapp' && 'WhatsApp'}
                  {selectedNotification.source === 'email' && 'Email'}
                  {selectedNotification.source === 'sms' && 'SMS'}
                </span>
              </div>

              {/* Subject */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedNotification.subject}</h3>
                <p className="text-sm text-gray-400 mt-1">{selectedNotification.time} • {selectedNotification.date}</p>
              </div>

              {/* Message Content */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-gray-700 leading-relaxed">{selectedNotification.content}</p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Última Consulta</span>
                  <p className="font-medium text-gray-900 mt-1">15/11/2024</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Tratamento</span>
                  <p className="font-medium text-gray-900 mt-1">Ortodontia</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedNotification.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      tag === 'Urgente'
                        ? 'bg-red-50 text-red-600'
                        : tag === 'Pacientes'
                        ? 'bg-blue-50 text-blue-600'
                        : tag === 'Jurídico'
                        ? 'bg-purple-50 text-purple-600'
                        : tag === 'Doações'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-gray-50 text-gray-600'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-turma-yellow text-gray-900 font-medium hover:bg-turma-yellow-dark transition-all">
                  <AlertTriangle className="w-4 h-4" />
                  Priorizar
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all">
                  <Archive className="w-4 h-4" />
                  Arquivar
                </button>
              </div>

              {/* Reply */}
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-turma-green text-white font-medium hover:bg-turma-green-dark transition-all mt-3">
                <Reply className="w-4 h-4" />
                Responder
              </button>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">Selecione uma notificação</p>
                <p className="text-sm text-gray-400 mt-1">Clique em uma mensagem para ver os detalhes</p>
              </div>
            </div>
          )}
        </aside>
      </div>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 px-4 py-2 text-turma-green">
            <Inbox className="w-6 h-6" />
            <span className="text-xs font-medium">Inbox</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-4 py-2 text-gray-500 hover:text-turma-green">
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs font-medium">Canais</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-4 py-2 text-gray-500 hover:text-turma-green">
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Comunicacao