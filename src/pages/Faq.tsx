import { useState } from 'react'
import { ChevronDown, Search, HelpCircle, Users, CreditCard, Heart, Mail, Baby, Sparkles, Award, Globe } from 'lucide-react'

interface FaqItem {
  id: number
  icon: React.ElementType
  pergunta: string
  resposta: string
  categoria: string
}

const faqData: FaqItem[] = [
  {
    id: 1,
    icon: HelpCircle,
    pergunta: 'O que é a Turma do Bem e qual sua missão?',
    resposta: 'A Turma do Bem é uma OSCIP (Organização da Sociedade Civil de Interesse Público) certificada pelo Ministério da Justiça desde 2002. Gerenciamos a maior rede de voluntariado especializado do mundo, com mais de 18 mil dentistas atuando em 12 países. Nossa missão é mudar a percepção da sociedade sobre a questão da saúde bucal e da classe odontológica com relação ao impacto socioambiental de sua atividade, oferecendo atendimento odontológico gratuito à população de baixa renda em condição de vulnerabilidade social.',
    categoria: 'Sobre',
  },
  {
    id: 2,
    icon: Baby,
    pergunta: 'Quem pode ser atendido pelo programa Dentista do Bem?',
    resposta: 'O Dentista do Bem atende crianças e adolescentes em situação de vulnerabilidade social na faixa dos 11 a 17 anos. Os beneficiários possuem graves problemas bucais e não têm condições financeiras de pagar pelo tratamento. Após serem selecionados através de triagens em escolas da rede pública ou instituições sociais, os jovens recebem atendimento odontológico gratuito - independente da complexidade dos casos - até completarem 18 anos.',
    categoria: 'Beneficiários',
  },
  {
    id: 3,
    icon: Heart,
    pergunta: 'O que é o programa Apolônias do Bem?',
    resposta: 'As Apolônias do Bem oferecem tratamento odontológico gratuito para mulheres cis e trans que vivenciaram situações de violência e tiveram a dentição afetada pelas agressões. As beneficiárias são selecionadas através de triagens em que passam por um rápido exame oral, não invasivo, e respondem a uma ferramenta científica que mede o impacto da saúde bucal na qualidade de vida.',
    categoria: 'Programas',
  },
  {
    id: 4,
    icon: Users,
    pergunta: 'Como funciona o processo de triagem e seleção?',
    resposta: 'Os pacientes são selecionados por grau de necessidade, determinado por uma triagem realizada em escolas da rede pública ou instituições sociais. Jovens e crianças com problemas bucais graves, os que possuem menores condições econômicas e os mais próximos do primeiro emprego têm prioridade no atendimento. Os selecionados recebem uma carta com a indicação do cirurgião-dentista voluntário mais próximo de sua casa.',
    categoria: 'Processo',
  },
  {
    id: 5,
    icon: Sparkles,
    pergunta: 'Como posso me tornar um dentista voluntário?',
    resposta: 'Qualquer cirurgião-dentista regularmente registrado no Conselho Regional de Odontologia (CRO) pode se tornar voluntário. De acordo com a ONU, o voluntário é aquele que doa seu tempo e conhecimento para prestar serviços não-remunerados em benefício da comunidade. O tratamento é realizado no consultório do próprio dentista voluntário e é de caráter curativo, preventivo e educativo. Nossos voluntários estão espalhados em mais de 1,3 mil municípios brasileiros, 12 países da América Latina e Portugal.',
    categoria: 'Voluntários',
  },
  {
    id: 6,
    icon: Award,
    pergunta: 'Quais são os números de impacto da Turma do Bem?',
    resposta: 'Em mais de 20 anos de atuação, a Turma do Bem já impactou mais de 90 mil jovens atendidos, mais de 1,2 mil mulheres atendidas pelo programa Apolônias do Bem, e conta com mais de 18 mil dentistas voluntários espalhados pelo mundo. O escritório da TdB faz a ligação entre todos os envolvidos no programa (o jovem beneficiado, sua família, a escola e o cirurgião-dentista voluntário) e faz o acompanhamento dos atendimentos.',
    categoria: 'Impacto',
  },
  {
    id: 7,
    icon: Globe,
    pergunta: 'Qual a história e reconhecimento da Turma do Bem?',
    resposta: 'A Turma do Bem nasceu em 1995 quando o Dr. Fábio Bibancos uniu 15 colegas dentistas para atender gratuitamente casos graves em seus consultórios. Foi oficializada em 2002. O fundador é reconhecido internacionalmente como Empreendedor Social pela Schwab Foundation (ligada ao Fórum Econômico Mundial de Davos) e pela Ashoka. Em 2011, recebeu o prêmio Saúde Oral na categoria Solidariedade Social em Portugal. Em 2015, foi selecionada entre 1.400 organizações sociais de todo o mundo para integrar o primeiro portfólio da Epic Foundation. Em 2018, ganhou o prêmio da Fundación Mapfre de melhor ação social na Espanha.',
    categoria: 'Sobre',
  },
  {
    id: 8,
    icon: CreditCard,
    pergunta: 'Como posso fazer uma doação para a Turma do Bem?',
    resposta: 'Aceitamos doações de pessoas físicas e jurídicas. Você pode contribuir financeiramente através do link doa.re/jMAw. As doações são usadas para manter a plataforma, capacitar voluntários e expandir nossa atuação. Também aceitamos doações de materiais odontológicos, equipamentos e insumos. Além disso, é possível fazer doação através da Nota Fiscal, direcionando parte dos impostos para a organização.',
    categoria: 'Doações',
  },
  {
    id: 9,
    icon: HelpCircle,
    pergunta: 'Quais são os valores da Turma do Bem?',
    resposta: 'Nossos valores fundamentais são: Fazer pelo outro o que faríamos pelo nosso filho; Realizar com estética e alegria; Eficácia e transparência na gestão. A organização tem um modelo inovador de gestão baseado no voluntariado e caracterizado pela fácil replicabilidade, buscando sempre promover soluções de acesso a tratamentos odontológicos, valorizar e mobilizar os profissionais para uma nova conduta socioambiental, e influenciar políticas públicas.',
    categoria: 'Sobre',
  },
  {
    id: 10,
    icon: Mail,
    pergunta: 'Como posso entrar em contato com a Turma do Bem?',
    resposta: 'Você pode acessar nosso site em turmadobem.org.br e preencher o formulário de contato disponível na página "Contato". Para parcerias corporativas, entre em contato através dos canais disponíveis no site. Siga-nos também nas redes sociais: Facebook (facebook.com/turmadobem), Instagram (@ongturmadobem), LinkedIn e Twitter.',
    categoria: 'Contato',
  },
]

const Faq = () => {
  const [openId, setOpenId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('Todos')

  const categories = ['Todos', ...Array.from(new Set(faqData.map((faq) => faq.categoria)))]

  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch =
      faq.pergunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.resposta.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'Todos' || faq.categoria === activeCategory
    return matchesSearch && matchesCategory
  })

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-turma-green via-turma-green-light to-turma-green py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Perguntas Frequentes
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre a Turma do Bem
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-background/40" />
          <input
            type="text"
            placeholder="Buscar pergunta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-on-background/10 shadow-sm focus:outline-none focus:ring-2 focus:ring-turma-green focus:border-transparent transition-all duration-300"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-turma-green text-white shadow-md'
                  : 'bg-white text-on-background/70 hover:bg-turma-green/10 hover:text-turma-green border border-on-background/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-on-background/10">
              <HelpCircle className="w-12 h-12 text-on-background/30 mx-auto mb-4" />
              <p className="text-on-background/60">Nenhuma pergunta encontrada. Tente outro termo de busca.</p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const Icon = faq.icon
              const isOpen = openId === faq.id
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-turma-green shadow-lg shadow-turma-green/10'
                      : 'border-on-background/10 hover:border-turma-green/30'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 flex items-center gap-4 text-left"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        isOpen ? 'bg-turma-green text-white' : 'bg-surface text-on-background/60'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="flex-1 font-semibold text-on-background pr-4">{faq.pergunta}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-on-background/40 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-5 pt-0 pl-20">
                      <p className="text-on-background/70 leading-relaxed">{faq.resposta}</p>
                      <span className="inline-block mt-3 px-3 py-1 bg-surface rounded-full text-xs font-medium text-on-background/50">
                        {faq.categoria}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 p-8 bg-gradient-to-br from-[#1a1c19] to-[#2d2f2c] rounded-2xl text-center">
          <h3 className="text-xl font-bold text-white mb-2">Não encontrou o que procurava?</h3>
          <p className="text-white/60 mb-6">Nossa equipe está pronta para ajudar você</p>
          <a
            href="mailto:contato@turmadobem.org.br"
            className="inline-flex items-center gap-2 px-6 py-3 bg-turma-green text-white font-semibold rounded-xl hover:bg-turma-green-light transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            Entre em Contato
          </a>
        </div>
      </div>
    </div>
  )
}

export default Faq