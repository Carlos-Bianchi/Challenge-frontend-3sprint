import { Link } from 'react-router-dom'
import Accordion from '../components/ui/Accordion'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

interface FaqItem {
  title: string
  content: string
}

const faqItems: FaqItem[] = [
  {
    title: 'O que é este projeto e qual seu principal objetivo?',
    content:
      'Nosso projeto visa auxiliar a ONG Turma do Bem na gestão de voluntários e pacientes através de uma aplicação web responsável por manter e organizar os dados (desde informações sobre os indivíduos, até as consultas e triagens), usar esses dados para auxiliar a operação da ONG e centralizar os meios de comunicação.',
  },
  {
    title: 'Quais tecnologias foram utilizadas no desenvolvimento?',
    content:
      'O projeto foi construído com React + Vite + TypeScript para a interface moderna e componentizada, TailwindCSS para estilização responsiva, React Router DOM para navegação SPA e React Hook Form para validação de formulários. A stack foi migrada da Sprint 02 (HTML/CSS estático) para esta arquitetura moderna na Sprint 03.',
  },
  {
    title: 'O projeto é responsivo e funciona em dispositivos móveis?',
    content:
      'Sim! O projeto utiliza TailwindCSS com breakpoints responsivos, garantindo que o layout se adapte corretamente em Mobile (até 480px), Tablet (768px) e Desktop (992px+). Grids mudam de 1 coluna para múltiplas, menus colapsam em hambúrguer e tipografia escala conforme o dispositivo.',
  },
  {
    title: 'O projeto segue padrões de acessibilidade web?',
    content:
      'Sim, a acessibilidade é uma prioridade. Implementamos estrutura HTML semântica com tags apropriadas, atributos ARIA onde necessário (como aria-expanded no accordion), contraste de cores adequado seguindo WCAG AA e navegação por teclado funcional.',
  },
  {
    title: 'Quais são os próximos passos e futuras implementações?',
    content:
      'O projeto segue um roadmap em 4 fases: (1) Estrutura — arquitetura base e identidade visual; (2) Criação dos Módulos — cadastro, match, comunicação e relatórios; (3) Integrações e Testes — conexão ao banco de dados e testes completos; (4) Expansão e Manutenção — novas funcionalidades com base no feedback da ONG.',
  },
  {
    title: 'Como funciona o Sistema de Match da plataforma?',
    content:
      'O Sistema de Match utiliza um algoritmo inteligente que conecta pacientes aos voluntários dentistas mais adequados, levando em conta parâmetros como localização geográfica, disponibilidade de horário e nível de necessidade do paciente. O objetivo é otimizar o atendimento e reduzir o tempo de espera.',
  },
]

export default function FAQ() {
  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Título */}
        <section className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ❓ Perguntas Frequentes
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nosso projeto.
            Clique em qualquer pergunta para ver a resposta detalhada.
          </p>
        </section>

        {/* Accordion */}
        <section className="space-y-3">
          {faqItems.map((item, index) => (
            <Accordion key={index} title={item.title} content={item.content} />
          ))}
        </section>

        {/* CTA */}
        <Card className="text-center bg-[#1E7E34] text-white">
          <div className="text-4xl mb-4">🎧</div>
          <h2 className="text-xl md:text-2xl font-bold mb-2">Ainda tem dúvidas?</h2>
          <p className="text-green-100 leading-relaxed mb-6">
            Não encontrou a resposta que procurava? Nossa equipe está pronta para ajudar!
            Entre em contato e responderemos o mais breve possível.
          </p>
          <Link to="/contato">
            <Button variant="primary">Fale Conosco</Button>
          </Link>
        </Card>

      </div>
    </div>
  )
}
