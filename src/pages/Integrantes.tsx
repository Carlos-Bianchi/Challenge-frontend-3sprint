import { User } from 'lucide-react'
import type { ReactNode } from 'react'

interface TeamMember {
  name: string
  role: string
  icon: ReactNode
  color: string
  githubUrl?: string
  linkedinUrl?: string
}

const developmentTeam: TeamMember[] = [
  {
    name: 'Carlos',
    role: 'Desenvolvedor',
    icon: <User className="w-10 h-10 text-turma-green" />,
    color: 'from-turma-green to-turma-green',
    githubUrl: 'https://github.com/Carlos-Bianchi',
    linkedinUrl: 'https://www.linkedin.com/in/carlos-bianchi-6608a3272/',
  },
  {
    name: 'Vinicius',
    role: 'Desenvolvedor',
    icon: <User className="w-10 h-10 text-turma-green" />,
    color: 'from-turma-green to-turma-green',
    githubUrl: 'https://github.com/viniciusmorrone',
    linkedinUrl: 'https://www.linkedin.com/in/vin%C3%ADcius-morrone-lustosa/',
  },
]

const Integrantes = () => {
  const renderMemberCard = (member: TeamMember) => (
    <div
      key={member.name}
      className="group bg-white rounded-2xl border border-on-background/10 overflow-hidden hover:border-turma-green hover:shadow-xl transition-all duration-300"
    >
      <div className={`h-24 bg-gradient-to-br ${member.color} relative`}>
        <div className="absolute -bottom-10 left-6">
          <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-white">
            {member.icon}
          </div>
        </div>
      </div>
      <div className="pt-14 pb-6 px-6">
        <h3 className="text-lg font-bold text-on-background">{member.name}</h3>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 mb-4 bg-turma-green/10 text-turma-green">
          {member.role}
        </span>
        <div className="flex items-center gap-3">
          <a
            href={member.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-on-background/5 flex items-center justify-center hover:bg-[#1a1c19] transition-all duration-300 group"
          >
            <svg className="w-5 h-5 text-on-background group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-turma-green/10 flex items-center justify-center hover:bg-turma-green transition-all duration-300 group"
          >
            <svg className="w-5 h-5 text-turma-green group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-surface">
      <section className="bg-gradient-to-br from-turma-green via-[#007a29] to-turma-green py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Nossa Equipe
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Conheça as pessoas que fazem a Turma do Bem acontecer todos os dias
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <section className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <h2 className="text-2xl font-bold text-on-background">Equipe de Desenvolvimento</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {developmentTeam.map((member) => renderMemberCard(member))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Integrantes
