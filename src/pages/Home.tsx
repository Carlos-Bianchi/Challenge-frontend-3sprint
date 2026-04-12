import { Link } from 'react-router-dom'
import { 
  Users, 
  Heart, 
  MessageSquare, 
  CalendarCheck, 
  BarChart3, 
  ShieldCheck, 
  FileText, 
  Smartphone, 
  TrendingUp,
  Baby,
  Stethoscope,
  Globe,
  ArrowRight,
  HandHelping
} from 'lucide-react'

const Home = () => {
  const mainModules = [
    {
      icon: Users,
      title: 'Gestão de Cadastros',
      description: 'Sistema completo para cadastro e gerenciamento de pacientes, dentistas voluntários e funcionários da ONG com controle de acesso personalizado.',
    },
    {
      icon: Heart,
      title: 'Sistema de Match',
      description: 'Algoritmo inteligente que conecta pacientes aos voluntários mais adequados baseado em localização, disponibilidade e necessidade.',
    },
    {
      icon: MessageSquare,
      title: 'Comunicação',
      description: 'Centralização de toda comunicação, garantindo visibilidade organizada e direcionamento eficiente das mensagens para as áreas correspondentes.',
    },
  ]

  const features = [
    {
      icon: CalendarCheck,
      title: 'Agendamento Online',
      description: 'Sistema inteligente de agendamento que otimiza a disponibilidade dos voluntários com as necessidades dos pacientes.',
    },
    {
      icon: BarChart3,
      title: 'Dashboard Analítico',
      description: 'Visualização em tempo real de métricas e indicadores de desempenho, permitindo tomada de decisões baseadas em dados concretos.',
    },
    {
      icon: ShieldCheck,
      title: 'Segurança de Dados',
      description: 'Proteção completa com repositórios locais, backup automatizado e criptografia para garantir a privacidade das informações.',
    },
    {
      icon: FileText,
      title: 'Prontuário Eletrônico',
      description: 'Registro digital completo do histórico de atendimento, tratamentos realizados e acompanhamento de cada paciente.',
    },
    {
      icon: Smartphone,
      title: 'Acesso Mobile',
      description: 'Interface responsiva que permite acesso completo ao sistema em qualquer dispositivo, a qualquer hora e lugar.',
    },
    {
      icon: TrendingUp,
      title: 'Criação de Relatórios',
      description: 'Módulo responsável pela criação de relatórios personalizados com base nas informações do sistema que o usuário desejar.',
    },
  ]

  const impactStats = [
    {
      icon: Baby,
      value: '80.000+',
      label: 'Mulheres, crianças, e adolescentes atendidos',
    },
    {
      icon: Stethoscope,
      value: '18.000+',
      label: 'Dentistas voluntários cadastrados',
    },
    {
      icon: Globe,
      value: '12',
      label: 'Países com atuação ativa',
    },
  ]

  return (
    <div className="min-h-screen bg-surface">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-turma-green rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <HandHelping className="w-10 h-10 lg:w-12 lg:h-12 text-turma-yellow" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-turma-green mb-6">
              Sistema de Gestão - Turma do Bem
            </h1>
            <p className="text-lg lg:text-xl text-on-background mb-8 max-w-2xl mx-auto leading-relaxed">
              Plataforma integrada para otimizar e centralizar a operação da ONG, 
              conectando voluntários e pacientes de forma eficiente. Transformando sorrisos e vidas através 
              da tecnologia e solidariedade.
            </p>
            <Link
              to="/sobre"
              className="inline-flex items-center gap-2 px-8 py-4 bg-turma-yellow text-on-background font-semibold rounded-lg hover:bg-turma-yellow-dark transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <ArrowRight className="w-5 h-5" />
              Conhecer o Sistema
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-on-background text-center mb-12">
            Nossos Módulos Principais
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainModules.map((module) => (
              <div
                key={module.title}
                className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-turma-green/10 rounded-full flex items-center justify-center mb-6">
                  <module.icon className="w-8 h-8 text-turma-green" />
                </div>
                <h3 className="text-xl font-bold text-on-background mb-4">{module.title}</h3>
                <p className="text-on-background/70 leading-relaxed">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-on-background text-center mb-12">
            Funcionalidades do Sistema
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-surface rounded-lg p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-turma-green/10 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-turma-green" />
                </div>
                <h3 className="text-xl font-bold text-on-background mb-4">{feature.title}</h3>
                <p className="text-on-background/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-on-background text-center mb-12">
            Impacto da ONG
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-lg p-8 shadow-md text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-turma-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold text-turma-green mb-2">{stat.value}</h3>
                <p className="text-on-background/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
