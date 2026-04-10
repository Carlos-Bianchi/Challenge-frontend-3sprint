# 🦷 Sistema de Gestão - Turma do Bem

### Link do github: https://github.com/Carlos-Bianchi/Challenge-Frontend

## 📋 Descrição do Projeto
Sistema web completo desenvolvido para otimizar e centralizar a gestão da ONG Turma do Bem, conectando voluntários dentistas a pacientes que necessitam de cuidados odontológicos através de uma plataforma moderna e intuitiva.

## 🎯 Objetivo
Criar uma plataforma integrada que facilite o gerenciamento de voluntários, pacientes e operações da ONG, garantindo maior eficiência e organização.

## 🚀 Funcionalidades Implementadas
### 📄 Páginas principais
- **🏠 Home** - Página inicial com apresentação do sistema e navegação
- **ℹ️ Sobre** - Informações detalhadas sobre o projeto e a ONG
- **❓ FAQ** - Perguntas frequentes com sistema de accordion interativo
- **📞 Contato** - Formulário de contato com validação e informações da empresa
- **👥 Integrantes** - Apresentação da equipe de desenvolvimento

### 🧩 Módulos do Sistema
- **🤝 Sistema de Match** - Algoritmo inteligente para conectar pacientes aos voluntários mais adequados baseado em localização, especialidade e disponibilidade
- **💬 Comunicação** - Centro de comunicação com caixa de entrada, mensagens enviadas e notificações
- **👤 Usuários** - Gestão completa de usuários (dentistas, pacientes e administradores) com diferentes perfis e permissões
- **📊 Dashboard** - Painel analítico com métricas, gráficos e indicadores de performance
- **📋 Relatórios** - Sistema de upload e gestão de relatórios médicos com modelos pré-definidos

## 💻 Tecnologias Utilizadas
- **HTML5** - Estrutura semântica com tags apropriadas
- **CSS3** - Estilização com:
  - Variáveis CSS para consistência
  - Grid Layout e Flexbox para layouts responsivos
- **Font Awesome 6** - Biblioteca completa de ícones (local)

### Planejado para Futuras Implementações
- **Python + Flask** - Backend robusto
- **MySQL** - Banco de dados relacional
- **API REST** - Comunicação frontend/backend
- **JavaScript** - Funcionalidades interativas (FAQ accordion, validação de formulários)

## 🚫 Restrições do Projeto

### Dependências Externas NÃO Permitidas
Para garantir a independência e segurança do projeto, **é PROIBIDO o uso de**:

- ❌ **CDNs** (Content Delivery Networks) - Todos os recursos devem estar hospedados localmente
- ❌ **Frameworks JavaScript externos** - React, Vue, Angular, jQuery, etc.
- ❌ **Bibliotecas CSS via CDN** - Bootstrap, Tailwind, Materialize, etc.
- ❌ **Recursos externos** - Fontes, ícones, imagens de servidores externos
- ❌ **APIs de terceiros** sem aprovação prévia

### Tecnologias Permitidas
- ✅ HTML5, CSS3 e JavaScript nativos
- ✅ Arquivos locais no diretório `vendors/`
- ✅ Recursos auto-hospedados no projeto
- ✅ Google Fonts (via CSS import no arquivo styles.css)

## 🎨 Design
- Interface limpa e moderna
- Paleta de cores amarelo (#FFB700) e verde (#1E7E34)

## 🛣️ Roadmap do Projeto

### Fase 1 - Estrutura ✅
**Foco:** Estabelecer a estrutura fundamental do projeto e sua identidade visual, a arquitetura dos diferentes módulos e o planejamento de como fazer a integração dos mesmos.

**Realizações:**
- ✅ Estrutura HTML semântica
- ✅ Sistema de design com CSS
- ✅ Identidade visual da ONG
- ✅ Arquitetura dos módulos
- ✅ Planejamento de integração

### Fase 2 - Criação dos Módulos ✅
**Foco:** Desenvolvimento dos módulos centrais responsáveis pelas features da aplicação. Estrutura de cadastro (Pacientes, Dentistas, Funcionários da ONG), esqueleto do Módulo de Relatórios, Centro de Comunicações e criação da estrutura lógica e interface do Módulo de Recomendação (Match), definindo os parâmetros iniciais (prioridade, disponibilidade e região) para sugerir o voluntário mais adequado ao paciente.

**Realizações:**
- ✅ Sistema de Match com parâmetros de recomendação
- ✅ Centro de Comunicação completo
- ✅ Gestão de Usuários (Pacientes, Dentistas, Funcionários)
- ✅ Dashboard Analítico
- ✅ Sistema de Relatórios
- ✅ Interfaces de usuário preparadas para integração

### Fase 3 - Integrações e Testes 📝
**Foco:** Integração dos módulos desenvolvidos, conectando as diferentes estruturas ao banco de dados e ativando a troca de informações entre os módulos. Após a integração, testes do programa para garantir funcionamento correto.

**Planejado:**
- 📝 Integração com banco de dados
- 📝 Conexão entre módulos
- 📝 API REST para comunicação
- 📝 Testes de funcionalidade
- 📝 Testes de integração
- 📝 Validação de dados

### Fase 4 - Expansão e Manutenção 📝
**Foco:** Implementação de novas funcionalidades e alterações baseadas no feedback da ONG, seguida por testes das mudanças implementadas.

**Planejado:**
- 📝 Funcionalidades baseadas em feedback
- 📝 Melhorias de performance
- 📝 Novas integrações
- 📝 Testes das novas funcionalidades
- 📝 Manutenção contínua
- 📝 Atualizações de segurança

## 🌙 Próximas Implementações
- **Modo Escuro** - Interface noturna para melhor experiência
- **Notificações Push** - Alertas em tempo real
- **Integrações Internas** - Conexão entre módulos do sistema

## 📁 Estrutura do Projeto
```
Frontend-Challenge/
│
├── 📄 Páginas Principais
│   ├── index.html          # Página inicial
│   ├── sobre.html          # Sobre o projeto
│   ├── faq.html            # Perguntas frequentes
│   ├── contato.html        # Formulário de contato
│   └── integrantes.html    # Equipe do projeto
│
├── 🧩 Módulos do Sistema
│   ├── sistema-match.html  # Sistema de correspondência
│   ├── comunicacao.html    # Centro de comunicação
│   ├── usuarios.html       # Gestão de usuários
│   ├── dashboard.html      # Painel analítico
│   └── relatorios.html     # Sistema de relatórios
│
├── 🎨 Recursos
│   ├── styles.css          # Estilos globais e componentes
│   └── assets/             # Imagens e recursos (futuro)
│
├── 📋 Documentação
│   ├── README.md           # Este arquivo
│   └── .gitignore          # Arquivos ignorados pelo Git
│
└── 🚀 Deploy
    └── (Configurações de deploy futuras)
```

## 🚀 Como Executar
1. Clone o repositório:
   ```bash
   git clone https://github.com/Carlos-Bianchi/Challenge-Frontend.git
   ```
2. Abra o arquivo `index.html` em seu navegador

## 👥 Equipe de Desenvolvimento
- Caio Vinicius Silva Araujo
- Carlos Aurelio Tolosa Bianchi
- Vinicius Morrone Lustosa
---

# ⚠️ REGRAS E PENALIDADES - SPRINT 02

Este documento lista as penalidades estritas para a SPRINT 02. Todo o desenvolvimento deve aderir a estas regras para evitar perda de pontos.

## ⛔ PENALIDADES CRÍTICAS (ZERAM A NOTA)

> **VII. Utilização de frameworks, CDNs e/ou qualquer tipo de arquivo externo (-100,0 pontos)**
> A utilização de frameworks e/ou soluções prontas, incluindo o Bootstrap, está estritamente proibida. A utilização de CDNs (para fontes, ícones, etc.) também é considerada um arquivo externo.
> **Status: A nota da SPRINT 02 será automaticamente ZERADA se esta regra for violada.**

> **V. Entrega da solução somente com link (-100,0 pontos)**
> Não serão aceitas soluções que contenham apenas o link do repositório. É necessário o envio do arquivo `.ZIP`.

## ⛔ PENALIDADES SEVERAS

> **I. Arquivos maiores que 50 MB (-50,0 pontos)**
> O arquivo `.ZIP` final do projeto não deve exceder 50 MB.

> **V. Não entrega do link do GITHUB no README.md (-50 pontos)**
> O `README.md` deve conter o link do repositório GitHub do projeto.

> **VI. Falta do README.md (-50 pontos)**
> A não entrega do `README.md`, ou a entrega de outro tipo de arquivo em seu lugar, acarretará esta penalidade.

## ⛔ PENALIDADES DE CONTEÚDO

> **II. Falta de Páginas Obrigatórias (-20,0 pontos POR PÁGINA)**
> A ausência de qualquer uma das seguintes páginas resultará em -20 pontos por página faltante:
> * Index/Home (Página Inicial)
> * Integrantes
> * Sobre/About
> * FAQ (Perguntas Frequentes)
> * Contato

> **III. Falta da página de Integrantes (-20,0 pontos)**
> A ausência da página `integrantes.html` será penalizada.

> **IV. Itens Faltantes na Página de Integrantes (-30,0 pontos NO TOTAL)**
> A página de integrantes deve conter Nome, RM e Turma para todos os membros. A falta de qualquer um destes itens gerará penalidade:
> * Falta de Nome (-10,0 pontos)
> * Falta de RM (-10,0 pontos)
> * Falta de Turma (-10,0 pontos)

**Desenvolvido com ❤️ para transformar sorrisos**