# Guia de Estilo - Turma do Bem ONG

## 📋 Índice
1. [Paleta de Cores](#paleta-de-cores)
2. [Tipografia](#tipografia)
3. [Bibliotecas e Dependências](#bibliotecas-e-dependências)
4. [Componentes Reutilizáveis](#componentes-reutilizáveis)
5. [Espaçamentos](#espaçamentos)
6. [Sombras e Bordas](#sombras-e-bordas)
7. [Animações](#animações)
8. [Responsividade](#responsividade)
9. [Estrutura de Arquivos](#estrutura-de-arquivos)

---

## 🎨 Paleta de Cores

### Cores Principais
```css
--cor-fundo: #eaeab4;          /* Amarelo claro - Fundo principal */
--cor-secundaria: #1e7e34;     /* Verde escuro - Elementos secundários */
--cor-primaria: #ffae1a;       /* Laranja - Elementos de destaque */
--cor-texto: #343A40;          /* Cinza escuro - Texto principal */
--cor-branco: #ffffff;         /* Branco - Fundos de cards */
--cor-cinza-claro: #f8f9fa;    /* Cinza claro - Elementos sutis */
```

### Cores de Status
```css
/* Prioridades */
--priority-high: linear-gradient(135deg, #dc3545, #c82333);    /* Vermelho */
--priority-medium: linear-gradient(135deg, #ffc107, #e0a800);  /* Amarelo */
--priority-low: linear-gradient(135deg, #28a745, #1e7e34);     /* Verde */

/* Status */
--status-active: linear-gradient(135deg, #28a745, #20c997);    /* Verde ativo */
--status-pending: linear-gradient(135deg, #ffc107, #fd7e14);   /* Laranja pendente */
--status-inactive: linear-gradient(135deg, #6c757d, #495057);  /* Cinza inativo */
```

### Uso das Cores
- **Fundo Principal**: `#eaeab4` - Usado no body da página
- **Verde Escuro**: `#1e7e34` - Header, footer, botões secundários, navegação ativa
- **Laranja**: `#ffae1a` - Botões primários, ícones de destaque, hover states
- **Branco**: `#ffffff` - Cards, formulários, áreas de conteúdo
- **Texto**: `#343A40` - Cor padrão para textos

---

## 📝 Tipografia

### Fontes (Web-Safe Fonts)
**IMPORTANTE:** O projeto utiliza apenas fontes do sistema (web-safe fonts) para evitar dependências externas.

```css
--fonte-titulo: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
--fonte-corpo: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

### Hierarquia de Títulos
```css
h1: 2.5rem (40px) - font-weight: 700
h2: 2rem (32px) - font-weight: 600
h3: 1.5rem (24px) - font-weight: 600
```

### Justificativa
As fontes escolhidas são **web-safe fonts** disponíveis nativamente nos sistemas operacionais:
- **Segoe UI**: Fonte padrão do Windows (moderna e legível)
- **Helvetica Neue**: Fonte padrão do macOS
- **Arial/Tahoma/Verdana**: Fontes de fallback universais

**Vantagens:**
- ✅ Sem dependência de CDNs externos
- ✅ Carregamento instantâneo (já instaladas no sistema)
- ✅ Compatível com as regras da SPRINT 02
- ✅ Excelente legibilidade e aparência profissional

---

## 📚 Bibliotecas e Dependências

### Font Awesome
**Versão**: 6.5.1
**Localização**: Local (vendors/fontawesome/)
**Importação**:
```html
<link rel="stylesheet" href="vendors/fontawesome/css/all.min.css">
```

**⚠️ IMPORTANTE**: O projeto utiliza apenas arquivos locais. Não é permitido o uso de CDNs ou recursos externos.

### Ícones Utilizados
- **Logo**: `fa-solid fa-tooth` (dente)
- **Home**: `fa-solid fa-house`
- **Sobre**: `fa-solid fa-circle-info`
- **FAQ**: `fa-solid fa-circle-question`
- **Contato**: `fa-solid fa-envelope`
- **Módulos**: `fa-solid fa-cubes`
- **Match**: `fa-solid fa-handshake`
- **Comunicação**: `fa-solid fa-comments`
- **Usuários**: `fa-solid fa-users-gear`
- **Dashboard**: `fa-solid fa-chart-line`
- **Relatórios**: `fa-solid fa-file-medical`
- **Integrantes**: `fa-solid fa-users`

---

## 🧩 Componentes Reutilizáveis

### Botões

#### Botão Primário
```css
.btn-primary {
    background-color: var(--cor-primaria);
    color: var(--cor-texto);
    padding: var(--espacamento-medio) var(--espacamento-grande);
    border-radius: var(--borda-radius);
    transition: all 0.3s ease;
}
```

#### Botão Secundário
```css
.btn-secondary {
    background-color: var(--cor-secundaria);
    color: var(--cor-branco);
    padding: var(--espacamento-medio) var(--espacamento-grande);
    border-radius: var(--borda-radius);
}
```

#### Botão Outline
```css
.btn-outline {
    background-color: transparent;
    border: 2px solid var(--cor-secundaria);
    color: var(--cor-secundaria);
}
```

### Cards
```css
.card {
    background-color: var(--cor-branco);
    border-radius: var(--borda-radius);
    padding: var(--espacamento-grande);
    box-shadow: var(--sombra-leve);
    transition: all 0.3s ease;
}
```

### Badges de Prioridade
```css
.priority-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Variações */
.priority-high    /* Vermelho com animação pulse */
.priority-medium  /* Amarelo com animação pulse */
.priority-low     /* Verde sem animação */
```

### Badges de Status
```css
.status-badge {
    /* Mesma estrutura dos priority-badge */
}

/* Variações */
.status-active    /* Verde com animação pulse */
.status-pending   /* Laranja com animação pulse */
.status-inactive  /* Cinza sem animação */
```

### Círculos de Notificação
```css
.notification-circle {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
}

/* Variações */
.notification-circle.red     /* #dc3545 com pulse */
.notification-circle.green   /* #28a745 */
.notification-circle.yellow  /* #ffc107 com pulse */
```

### Dropdown Menu
```css
.dropdown {
    position: relative;
}

.dropdown-menu {
    position: absolute;
    top: calc(100% + 1rem);
    right: 0;
    background-color: var(--cor-branco);
    min-width: 220px;
    box-shadow: var(--sombra-media);
    border-radius: var(--borda-radius);
}
```

### FAQ Accordion
```css
.faq-item {
    background-color: var(--cor-branco);
    border-radius: var(--borda-radius);
    margin-bottom: var(--espacamento-medio);
    box-shadow: var(--sombra-leve);
}

.faq-question {
    width: 100%;
    padding: var(--espacamento-grande);
    background-color: var(--cor-branco);
    border: none;
    text-align: left;
}
```

### Formulários
```css
.form-group {
    margin-bottom: var(--espacamento-grande);
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: var(--espacamento-medio);
    border: 1px solid #ddd;
    border-radius: var(--borda-radius);
    transition: all 0.3s ease;
}
```

---

## 📏 Espaçamentos

### Variáveis de Espaçamento
```css
--espacamento-pequeno: 0.5rem;      /* 8px */
--espacamento-medio: 1rem;          /* 16px */
--espacamento-grande: 2rem;         /* 32px */
--espacamento-extra-grande: 3rem;   /* 48px */
```

### Classes Utilitárias
```css
.mt-2 { margin-top: var(--espacamento-grande); }
.mb-2 { margin-bottom: var(--espacamento-grande); }
.pt-2 { padding-top: var(--espacamento-grande); }
.pb-2 { padding-bottom: var(--espacamento-grande); }
```

---

## 🎭 Sombras e Bordas

### Sombras
```css
--sombra-leve: 0 2px 4px rgba(0,0,0,0.1);
--sombra-media: 0 4px 8px rgba(0,0,0,0.15);
--sombra-forte: 0 8px 16px rgba(0,0,0,0.2);
```

### Bordas
```css
--borda-radius: 8px;
```

---

## ✨ Animações

### Animações de Pulse
```css
@keyframes pulse-high {
    0%, 100% { box-shadow: var(--sombra-leve); }
    50% { box-shadow: 0 0 20px rgba(220, 53, 69, 0.4); }
}

@keyframes pulse-medium {
    0%, 100% { box-shadow: var(--sombra-leve); }
    50% { box-shadow: 0 0 15px rgba(255, 193, 7, 0.3); }
}
```

### Transições Padrão
```css
transition: all 0.3s ease;
```

### Efeitos de Hover
- **Cards**: `transform: translateY(-5px)` + sombra forte
- **Botões**: `transform: translateY(-2px)` + sombra média
- **Links sociais**: `transform: translateY(-3px)`

---

## 📱 Responsividade

### Breakpoint Principal
```css
@media (max-width: 768px) {
    /* Ajustes para mobile */
}
```

### Grids Responsivos
```css
.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--espacamento-grande);
}
```

---

## 📁 Estrutura de Arquivos

### Arquivos HTML
- `index.html` - Página inicial
- `sobre.html` - Sobre a ONG
- `faq.html` - Perguntas frequentes
- `contato.html` - Formulário de contato
- `integrantes.html` - Equipe
- `sistema-match.html` - Sistema de matching
- `comunicacao.html` - Centro de comunicação
- `usuarios.html` - Gestão de usuários
- `dashboard.html` - Dashboard analítico
- `relatorios.html` - Upload de relatórios

### Arquivos CSS
- `styles.css` - Arquivo principal de estilos

---

## 🎯 Padrões de Nomenclatura

### Classes CSS
- **Componentes**: `.card`, `.btn`, `.badge`
- **Modificadores**: `.btn-primary`, `.status-active`, `.priority-high`
- **Estados**: `.active`, `.hover`
- **Utilitários**: `.text-center`, `.mt-2`, `.fade-in`

### IDs
- **Específicos**: `#btn-conhecer`
- **Seções**: `#hero`, `#about`, `#contact`

---

## 🔧 Boas Práticas

### CSS
1. Usar variáveis CSS para cores e espaçamentos
2. Aplicar `box-sizing: border-box` globalmente
3. Usar transições suaves (0.3s ease)
4. Implementar hover states consistentes
5. Manter hierarquia visual clara

### HTML
1. Usar estrutura semântica (`header`, `main`, `footer`)
2. Incluir ícones Font Awesome localmente
3. Manter navegação consistente entre páginas
4. Usar classes descritivas e reutilizáveis

### Acessibilidade
1. Manter contraste adequado entre cores
2. Usar `alt` em imagens
3. Estruturar conteúdo com headings apropriados
4. Garantir navegação por teclado

---

## 🚫 Restrições do Projeto

### Dependências Externas
**PROIBIDO o uso de:**
- ❌ CDNs (Content Delivery Networks)
- ❌ Frameworks JavaScript externos (React, Vue, Angular, etc.)
- ❌ Bibliotecas CSS externas via CDN (Bootstrap, Tailwind, etc.)
- ❌ Recursos hospedados externamente
- ❌ APIs de terceiros sem aprovação

**PERMITIDO:**
- ✅ Arquivos locais no diretório `vendors/`
- ✅ CSS e JavaScript nativos
- ✅ HTML5 semântico
- ✅ Recursos auto-hospedados no projeto

---

## 📝 Notas Importantes

- **Linguagem**: Todo o conteúdo deve estar em português brasileiro (pt-BR)
- **Tema**: Focado em saúde dental e trabalho voluntário
- **Público**: Dentistas voluntários, pacientes e administradores da ONG
- **Objetivo**: Conectar pacientes que precisam de cuidados dentais com dentistas voluntários

---

*Última atualização: Outubro 2024*
*Versão: 1.0*
