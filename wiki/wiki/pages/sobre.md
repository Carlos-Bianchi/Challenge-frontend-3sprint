# Sobre - Página Institucional

Página institucional com informações sobre a história, missão, visão, valores, programas e reconhecimentos da Turma do Bem.

## Localização
- **Arquivo:** `src/pages/Sobre.tsx`
- **Tipo:** Componente React funcional
- **Rota:** `/sobre`

## Estrutura da Página

### 1. Hero Section
- Background gradiente verde (#006422 → #007a29 → #008c30)
- Título: "A maior rede de voluntariado odontológico do mundo"
- Subtítulo com números: 18 mil+ dentistas, 12 países
- ~~CTA: "Seja um Voluntário"~~ **REMOVIDO em 2026-04-11**
- Badge: "Transformando sorrisos desde 1995"

### 2. Quem Somos Section
- História corrigida (1995, não 2009)
- Origem: Dr. Fábio Bibancos escreveu "Um Sorriso Feliz para seu Filho"
- Fundação com 15 dentistas voluntários
- Oficialização em 2002 como OSCIP
- Badge "20+ Anos"

### 3. Missão, Visão e Valores Section
Cards com os três pilares:

**Missão:**
> Mudar a percepção da sociedade sobre a questão da saúde bucal e da classe odontológica com relação ao impacto socioambiental de sua atividade.

**Visão:**
> Ser a maior rede de voluntariado especializado do mundo, garantindo acesso à saúde bucal para todos que mais precisam.

**Valores:**
- Fazer pelo outro o que faríamos pelo nosso filho
- Realizar com estética e alegria
- Eficácia e transparência na gestão

### 4. Nossos Programas Section

**Dentista do Bem:**
- Público-alvo: Jovens 11-17 anos em vulnerabilidade social
- Critérios: Graves problemas bucais, sem condições financeiras
- Atendimento: Gratuito até completar 18 anos
- Local: Consultório do dentista voluntário mais próximo

**Apolônias do Bem:**
- Público-alvo: Mulheres cis/trans vítimas de violência de gênero
- Critérios: Dentição afetada por agressões
- Seleção: Exame oral não invasivo + ferramenta científica de qualidade de vida

### 5. Reconhecimentos Section

Grid de prêmios e conquistas:

| Prêmio | Ano | Descrição |
|--------|-----|-----------|
| Schwab Foundation | 2006 | Empreendedor Social - Fórum Econômico Mundial |
| Ashoka | 2007 | Fellow Ashoka |
| Saúde Oral | 2011 | Portugal - Categoria Solidariedade Social |
| Epic Foundation | 2015 | Portfólio (selecionada entre 1.400 organizações) |
| Fundación Mapfre | 2018 | Espanha - Melhor Ação Social |

**Destaque adicional:**
- Dr. Fábio Bibancos recebido pelo Papa Francisco no Vaticano
- Recebido pela Rainha da Espanha em Madri

### 6. Impacto Section (Stats)

```typescript
const impactStats = [
  { icon: Users, value: '+90 mil', label: 'Jovens Atendidos' },
  { icon: Baby, value: '+1,2 mil', label: 'Mulheres Atendidas' },
  { icon: Smile, value: '+18 mil', label: 'Dentistas Voluntários' },
  { icon: Globe, value: '12', label: 'Países Atuantes' },
]
```

## Ícones Utilizados (lucide-react)
- `Heart` - Hero e impacto
- `Eye` - Visão
- `Target` - Missão
- `Sparkles` - Valores
- `Users` - Estatísticas
- `Smile` - Programas
- `Baby` - Estatísticas
- `Globe` - Alcance internacional
- `Trophy` - Reconhecimentos
- `Award` - Prêmios
- ~~`ArrowRight`~~ - CTA (removido)

## Componentes Internos

### missionCards
```typescript
const missionCards = [
  { icon: Target, title: 'Missão', description: '...' },
  { icon: Eye, title: 'Visão', description: '...' },
  { icon: Sparkles, title: 'Valores', description: '...' },
]
```

### impactStats
Array de estatísticas renderizadas no grid de impacto.

## Estilo Visual
- Fundo alternado: branco / #fafaf5 / branco / dark (#1a1c19)
- Cards com sombras sutis e bordas arredondadas
- Gradientes verdes na seção hero
- Ícones em círculos coloridos
- Tipografia: Tailwind font-bold, font-extrabold

## Backlinks

- [Overview](../../overview.md)
- [FAQ](./faq.md)
- [Integrantes](./integrantes.md)
- [Index](../../index.md)

---

**Atualizado em:** 2026-04-11
