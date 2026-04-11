import ProfileCard from '../components/ui/ProfileCard'

interface Integrante {
  name: string
  rm: string
  turma: string
  photo?: string
  linkedin: string
  github: string
}

const integrantes: Integrante[] = [
  {
    name: 'Carlos Aurelio Tolosa Bianchi',
    rm: '567897',
    turma: '1TDSPS-2025',
    linkedin: 'https://www.linkedin.com/in/carlos-bianchi-6608a3272/',
    github: 'https://github.com/Carlos-Bianchi',
  },
  {
    name: 'Vinicius Morrone Lustosa',
    rm: '566884',
    turma: '1TDSPS-2025',
    linkedin: 'https://www.linkedin.com/in/vinícius-morrone-lustosa',
    github: 'https://www.github.com/viniciusmorrone',
  },
  {
    name: 'Caio Vinícius Silva Araujo',
    rm: '567610',
    turma: '1TDSPS-2025',
    linkedin: 'https://www.linkedin.com/in/caio-vinicius-silva-araujo',
    github: 'https://github.com/caiovinicius',
  },
]

export default function Integrantes() {
  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Título */}
        <section className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            👥 Nossa Equipe
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Conheça os talentos por trás deste projeto. Uma equipe dedicada e apaixonada por
            desenvolvimento web e inovação tecnológica.
          </p>
        </section>

        {/* Grid de cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {integrantes.map((integrante) => (
            <ProfileCard
              key={integrante.rm}
              name={integrante.name}
              rm={integrante.rm}
              turma={integrante.turma}
              photo={integrante.photo}
              linkedin={integrante.linkedin}
              github={integrante.github}
            />
          ))}
        </section>

      </div>
    </div>
  )
}
