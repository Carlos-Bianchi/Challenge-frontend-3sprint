import { Heart, Eye, Target, Sparkles, Users, Smile, Award, Baby, Globe, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'

const Sobre = () => {
  const impactStats = [
    { icon: Users, value: '+90 mil', label: 'Jovens Atendidos' },
    { icon: Baby, value: '+1,2 mil', label: 'Mulheres Atendidas' },
    { icon: Smile, value: '+18 mil', label: 'Dentistas Voluntários' },
    { icon: Globe, value: '12', label: 'Países Atuantes' },
  ]

  const missionCards = [
    {
      icon: Target,
      title: 'Missão',
      description: 'Mudar a percepção da sociedade sobre a questão da saúde bucal e da classe odontológica com relação ao impacto socioambiental de sua atividade.',
    },
    {
      icon: Eye,
      title: 'Visão',
      description: 'Ser a maior rede de voluntariado especializado do mundo, garantindo acesso à saúde bucal para todos que mais precisam.',
    },
    {
      icon: Sparkles,
      title: 'Valores',
      description: 'Fazer pelo outro o que faríamos pelo nosso filho; Realizar com estética e alegria; Eficácia e transparência na gestão.',
    },
  ]

  return (
    <div className="min-h-screen bg-surface">
      <section className="relative bg-gradient-to-br from-turma-green via-turma-green-light to-turma-green overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-6">
              <Heart className="w-4 h-4" />
              Transformando sorrisos desde 1995
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              A maior rede de voluntariado<br />
              <span className="text-white/90">odontológico do mundo</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              A Turma do Bem gerencia a maior rede de voluntariado especializado do mundo, 
              com mais de 18 mil dentistas atuando em 12 países. Oferecemos atendimento 
              odontológico gratuito à população de baixa renda em condição de vulnerabilidade social.
            </p>
          </div>
        </div>
        
        <div className="absolute -bottom-px left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100L60 90C120 80 240 60 360 50C480 40 600 40 720 45C840 50 960 60 1080 65C1200 70 1320 70 1380 70L1440 70V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0Z" fill="#fafaf5" className="fill-surface"/>
          </svg>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-sm font-semibold text-turma-green uppercase tracking-wider">Quem Somos</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-on-background mt-3 mb-6">
                Uma comunidade dedicada a fazer o bem
              </h2>
              <div className="space-y-4 text-on-background/70 text-lg leading-relaxed">
                <p>
                  A Turma do Bem (TdB) nasceu em 1995 quando o Dr. Fábio Bibancos escreveu seu primeiro livro, 
                  "Um Sorriso Feliz para seu Filho". Durante palestras em escolas da rede pública, as mães mostravam 
                  a grave situação bucal dos filhos - a prevenção já não adiantava mais.
                </p>
                <p>
                  Foi então que ele uniu 15 colegas dentistas e, juntos, passaram a atender gratuitamente alguns 
                  casos em seus consultórios. Assim surgiu a ideia inovadora que hoje se tornou a maior rede de 
                  voluntariado especializado do mundo: o Dentista do Bem. Em 2002, a TdB foi oficializada e recebeu 
                  a certificação do Ministério da Justiça como OSCIP.
                </p>
                <p>
                  Em mais de 20 anos de atuação, focamos em dois públicos principais: jovens de 11 a 17 anos em 
                  situação de vulnerabilidade social, e mulheres vítimas de violência de gênero que tiveram a 
                  dentição afetada, através do programa Apolônias do Bem.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-turma-green/20 to-turma-green/5 rounded-3xl flex items-center justify-center">
                <div className="w-48 h-48 lg:w-64 lg:h-64 bg-turma-green rounded-full flex items-center justify-center shadow-2xl">
                  <Heart className="w-24 h-24 lg:w-32 lg:h-32 text-white" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-on-background rounded-2xl flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <span className="text-3xl font-bold">20+</span>
                  <p className="text-sm">Anos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold text-turma-green uppercase tracking-wider">Nossa Missão</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-on-background mt-3">
              Visão, Missão e Valores
            </h2>
            <p className="text-lg text-on-background/60 mt-4">
              Os pilares que guiam cada ação da Turma do Bem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {missionCards.map((card) => (
              <div
                key={card.title}
                className="bg-surface rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-on-background/5"
              >
                <div className="w-14 h-14 bg-turma-green rounded-xl flex items-center justify-center mb-6 shadow-md">
                  <card.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-on-background mb-4">{card.title}</h3>
                <p className="text-on-background/70 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold text-turma-green uppercase tracking-wider">Nossos Programas</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-on-background mt-3">
              Dentista do Bem e Apolônias do Bem
            </h2>
            <p className="text-lg text-on-background/60 mt-4">
              Dois programas complementares que transformam vidas através da saúde bucal
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-on-background/5">
              <div className="w-14 h-14 bg-turma-green rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Smile className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-on-background mb-4">Dentista do Bem</h3>
              <p className="text-on-background/70 leading-relaxed mb-4">
                Nosso principal programa atende crianças e adolescentes de 11 a 17 anos em situação de 
                vulnerabilidade social. Os beneficiários possuem graves problemas bucais e não têm condições 
                financeiras de pagar pelo tratamento.
              </p>
              <p className="text-on-background/70 leading-relaxed">
                Após serem selecionados por triagens em escolas públicas, os jovens recebem atendimento 
                odontológico gratuito no consultório do dentista voluntário mais próximo de sua casa, 
                até completarem 18 anos.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-on-background/5">
              <div className="w-14 h-14 bg-turma-green rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-on-background mb-4">Apolônias do Bem</h3>
              <p className="text-on-background/70 leading-relaxed mb-4">
                Programa dedicado a oferecer tratamento odontológico gratuito para mulheres cis e trans 
                que vivenciaram situações de violência e tiveram a dentição afetada pelas agressões.
              </p>
              <p className="text-on-background/70 leading-relaxed">
                As beneficiárias são selecionadas através de triagens que incluem um exame oral não invasivo 
                e uma ferramenta científica que mede o impacto da saúde bucal na qualidade de vida, 
                garantindo atendimento humanizado e especializado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold text-turma-green uppercase tracking-wider">Reconhecimentos</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-on-background mt-3">
              Prêmios e Conquistas
            </h2>
            <p className="text-lg text-on-background/60 mt-4">
              Nosso trabalho é reconhecido nacional e internacionalmente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-turma-green/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-turma-green" />
              </div>
              <h4 className="font-bold text-on-background mb-2">Schwab Foundation</h4>
              <p className="text-sm text-on-background/60">Empreendedor Social - Fórum Econômico Mundial</p>
            </div>

            <div className="bg-surface rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-turma-green/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-turma-green" />
              </div>
              <h4 className="font-bold text-on-background mb-2">Ashoka</h4>
              <p className="text-sm text-on-background/60">Fellow Ashoka desde 2007</p>
            </div>

            <div className="bg-surface rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-turma-green/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-turma-green" />
              </div>
              <h4 className="font-bold text-on-background mb-2">Epic Foundation</h4>
              <p className="text-sm text-on-background/60">Portfólio 2015 - Entre 1.400 organizações</p>
            </div>

            <div className="bg-surface rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-turma-green/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-turma-green" />
              </div>
              <h4 className="font-bold text-on-background mb-2">Fundación Mapfre</h4>
              <p className="text-sm text-on-background/60">Melhor Ação Social - Espanha 2018</p>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-turma-green/5 to-turma-green/10 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-turma-green rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-on-background mb-2">Prêmio Saúde Oral 2011 - Portugal</h4>
                <p className="text-on-background/70">
                  Na categoria Solidariedade Social, reconhecendo o trabalho desenvolvido internacionalmente 
                  pela Turma do Bem. Além disso, o Dr. Fábio Bibancos foi recebido pelo Papa Francisco no 
                  Vaticano e pela Rainha da Espanha em Madri para receber premiações pelo trabalho mundial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#1a1c19] to-[#2d2f2c] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.3\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold text-turma-green uppercase tracking-wider">Nosso Impacto</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3">
              Números que transformam vidas
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-turma-green rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-4xl lg:text-5xl font-extrabold text-white block mb-2">{stat.value}</span>
                <span className="text-white/60 text-sm uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/cadastro"
              className="inline-flex items-center gap-2 px-8 py-4 bg-turma-green text-white font-semibold rounded-xl hover:bg-[#007a29] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Heart className="w-5 h-5" />
              Seja parte dessa transformação
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Sobre