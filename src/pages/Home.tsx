import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="flex flex-col items-center text-center hover:shadow-lg transition-shadow">
      <span className="text-4xl mb-4">{icon}</span>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </Card>
  )
}

interface StatCardProps {
  value: string
  label: string
  icon: string
}

function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <Card className="flex flex-col items-center text-center">
      <span className="text-3xl mb-2">{icon}</span>
      <p className="text-3xl font-bold text-[#1E7E34] my-1">{value}</p>
      <p className="text-gray-500 text-sm">{label}</p>
    </Card>
  )
}

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#1E7E34] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🦷</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Sistema de Gestão — Turma do Bem
          </h1>
          <p className="text-base md:text-lg text-green-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Plataforma integrada para otimizar e centralizar a operação da ONG,
            conectando voluntários e pacientes de forma eficiente. Transformando
            sorrisos e vidas através da tecnologia e solidariedade.
          </p>
          <Link to="/solucao">
            <Button variant="primary" className="text-base md:text-lg">
              Conhecer Solução →
            </Button>
          </Link>
        </div>
      </section>

      {/* Módulos Principais */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
          Nossos Módulos Principais
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon="👥"
            title="Gestão de Cadastros"
            description="Sistema completo para cadastro e gerenciamento de pacientes, dentistas voluntários e funcionários da ONG com controle de acesso personalizado."
          />
          <FeatureCard
            icon="🤝"
            title="Sistema de Match"
            description="Algoritmo inteligente que conecta pacientes aos voluntários mais adequados baseado em localização, disponibilidade e necessidade."
          />
          <FeatureCard
            icon="💬"
            title="Comunicação"
            description="Centralização de toda comunicação, garantindo visibilidade organizada e direcionamento eficiente das mensagens para as áreas correspondentes."
          />
        </div>
      </section>

      {/* Funcionalidades do Sistema */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            Funcionalidades do Sistema
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon="📅"
              title="Agendamento Online"
              description="Sistema inteligente de agendamento que otimiza a disponibilidade dos voluntários com as necessidades dos pacientes."
            />
            <FeatureCard
              icon="📊"
              title="Dashboard Analítico"
              description="Visualização em tempo real de métricas e indicadores de desempenho, permitindo tomada de decisões baseadas em dados concretos."
            />
            <FeatureCard
              icon="🔒"
              title="Segurança de Dados"
              description="Proteção completa com repositórios locais, backup automatizado e criptografia para garantir a privacidade das informações."
            />
            <FeatureCard
              icon="📋"
              title="Prontuário Eletrônico"
              description="Registro digital completo do histórico de atendimento, tratamentos realizados e acompanhamento de cada paciente."
            />
            <FeatureCard
              icon="📱"
              title="Acesso Mobile"
              description="Interface responsiva que permite acesso completo ao sistema em qualquer dispositivo, a qualquer hora e lugar."
            />
            <FeatureCard
              icon="📈"
              title="Criação de Relatórios"
              description="Módulo responsável pela criação de relatórios personalizados com base nas informações do sistema que o usuário desejar."
            />
          </div>
        </div>
      </section>

      {/* Impacto da ONG */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
          Impacto da ONG
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon="👨‍👩‍👧" value="80.000+" label="Mulheres, crianças e adolescentes atendidos" />
          <StatCard icon="🦷" value="18.000+" label="Dentistas voluntários cadastrados" />
          <StatCard icon="🌍" value="12" label="Países com atuação ativa" />
        </div>
      </section>
    </div>
  )
}
