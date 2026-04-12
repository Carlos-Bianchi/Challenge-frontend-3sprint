# FAQ - Perguntas Frequentes

Página de perguntas frequentes sobre a Turma do Bem e seus programas, com informações extraídas do site oficial.

## Localização
- **Arquivo:** `src/pages/Faq.tsx`
- **Tipo:** Componente React funcional
- **Rota:** `/faq`

## Funcionalidades

### Interface
- Sistema de accordion para expandir/colapsar respostas
- Busca em tempo real por texto
- Filtro por categorias: Todos, Sobre, Beneficiários, Programas, Processo, Voluntários, Impacto, Doações, Contato
- Ícones categorizados usando lucide-react

### Dados (faqData)
Array de 10 perguntas frequentes com:
- `id`: número identificador
- `icon`: Componente de ícone do lucide-react
- `pergunta`: String com a pergunta
- `resposta`: String com a resposta detalhada
- `categoria`: String para filtragem

## Conteúdo Atualizado (2026-04-11)

### 1. O que é a Turma do Bem?
OSCIP desde 2002, maior rede de voluntariado odontológico do mundo com 18 mil+ dentistas em 12 países.

### 2. Quem pode ser atendido?
Jovens 11-17 anos em vulnerabilidade social, selecionados por triagens em escolas públicas.

### 3. Apolônias do Bem
Programa para mulheres cis/trans vítimas de violência que tiveram dentição afetada.

### 4. Processo de Triagem
Triagens em escolas, seleção por grau de necessidade, prioridade para casos graves e menor condição econômica.

### 5. Como ser voluntário?
Cirurgião-dentista registrado no CRO, atuação em 1.300+ municípios brasileiros e 12 países.

### 6. Números de Impacto
+90 mil jovens, +1,2 mil mulheres, +18 mil dentistas voluntários.

### 7. História e Reconhecimentos
Fundada 1995 por Dr. Fábio Bibancos. Reconhecimentos: Schwab Foundation, Ashoka, Epic Foundation, Fundación Mapfre.

### 8. Doações
Via doa.re/jMAw ou Nota Fiscal. Aceita doações financeiras e materiais odontológicos.

### 9. Valores
"Fazer pelo outro o que faríamos pelo nosso filho; Realizar com estética e alegria; Eficácia e transparência na gestão."

### 10. Contato
turmadobem.org.br - redes sociais: Facebook, Instagram @ongturmadobem, LinkedIn, Twitter.

## Ícones Utilizados
- `HelpCircle` - Informações gerais
- `Baby` - Beneficiários jovens
- `Heart` - Programas sociais
- `Users` - Processo e voluntários
- `Sparkles` - Como participar
- `Award` - Impacto e números
- `Globe` - Alcance internacional
- `CreditCard` - Doações
- `Mail` - Contato

## Estado do Componente
```typescript
const [openId, setOpenId] = useState<number | null>(null)
const [searchTerm, setSearchTerm] = useState('')
const [activeCategory, setActiveCategory] = useState<string>('Todos')
```

## Backlinks

- [Overview](../overview.md)
- [Sobre](./sobre.md)
- [Index](../index.md)

---

**Atualizado em:** 2026-04-11
