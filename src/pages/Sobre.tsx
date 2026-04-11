import Card from '../components/ui/Card'

export default function Sobre() {
  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Título */}
        <section className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ℹ️ Sobre o Projeto
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Conheça mais sobre nossa jornada, tecnologias utilizadas e o que planejamos para o futuro.
          </p>
        </section>

        {/* Ideia & Objetivo */}
        <Card>
          <h2 className="text-xl md:text-2xl font-bold text-[#1E7E34] mb-3">
            💡 Ideia &amp; Objetivo
          </h2>
          <p className="text-gray-700 leading-relaxed">
            O projeto foi desenvolvido como uma aplicação web, desenhada para otimizar e centralizar a operação
            e gestão interna da ONG Turma do Bem. Nosso projeto atua como um hub para a coordenação de voluntários
            e pacientes, garantindo que o fluxo de trabalho seja eficiente e centralizado em uma só plataforma.
          </p>
        </Card>

        {/* Tecnologias */}
        <Card>
          <h2 className="text-xl md:text-2xl font-bold text-[#1E7E34] mb-3">
            💻 Tecnologias Utilizadas
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <span className="font-semibold text-gray-800">React + Vite + TypeScript</span> — Estrutura moderna de SPA com componentização, tipagem estrita e build otimizado.
            </li>
            <li>
              <span className="font-semibold text-gray-800">TailwindCSS</span> — Estilização responsiva e consistente em toda a interface, sem CSS externo.
            </li>
            <li>
              <span className="font-semibold text-gray-800">React Router DOM</span> — Navegação entre páginas sem recarregamento, com rotas estáticas e dinâmicas.
            </li>
            <li>
              <span className="font-semibold text-gray-800">React Hook Form</span> — Gerenciamento e validação de formulários com TypeScript aplicado.
            </li>
          </ul>
          <div className="mt-6 p-4 bg-gray-100 rounded-xl">
            <p className="text-sm text-gray-600 leading-relaxed">
              ✨ <strong>Nota:</strong> As tecnologias refletem a evolução do projeto na Sprint 03, migrando do HTML/CSS estático para uma stack moderna baseada em React.
            </p>
          </div>
        </Card>

        {/* Roadmap */}
        <Card>
          <h2 className="text-xl md:text-2xl font-bold text-[#1E7E34] mb-3">
            🛣️ Roadmap do Projeto
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Nosso projeto segue um roadmap em fases, buscando manter a organização para um projeto limpo.
          </p>
          <ol className="space-y-6">
            {[
              {
                fase: 'Fase 1 — Estrutura',
                desc: 'Foco em estabelecer a estrutura fundamental do projeto e sua identidade visual, a arquitetura dos diferentes módulos e o planejamento de como fazer a integração dos mesmos.',
              },
              {
                fase: 'Fase 2 — Criação dos Módulos',
                desc: 'Desenvolvimento dos módulos centrais: cadastro (Pacientes, Dentistas, Funcionários), Módulo de Relatórios, Centro de Comunicações e a interface do Módulo de Recomendação (Match), definindo os parâmetros iniciais de prioridade, disponibilidade e região.',
              },
              {
                fase: 'Fase 3 — Integrações e Testes',
                desc: 'Integração dos módulos desenvolvidos, conexão ao banco de dados e ativação da troca de informações entre os módulos. Após a integração, foco em testes para garantir funcionamento correto.',
              },
              {
                fase: 'Fase 4 — Expansão e Manutenção',
                desc: 'Implementação de novas funcionalidades com base no feedback da ONG, seguida de testes das mudanças aplicadas.',
              },
            ].map((item, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1E7E34] text-white flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">{item.fase}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>

      </div>
    </div>
  )
}
