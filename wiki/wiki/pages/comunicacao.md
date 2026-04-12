# Comunicacao - Sistema de Notificações

Página de notificações e mensagens da plataforma.

## Arquivo
`src/pages/solucao/Comunicacao.tsx`

## Funcionalidades

### Lista de Notificações
- Cards com remetente, assunto, preview e timestamp
- Indicadores de mensagens não lidas
- Tags para categorização (Urgente, Pacientes, etc.)
- Fontes: WhatsApp, Email, Sistema

### Filtros
- Tabs: Todas, Não Lidas, Urgentes
- Filtro por fonte (WhatsApp, Email)
- Busca por texto

### Detalhes da Mensagem
- Visualização completa do conteúdo
- Ações: Responder, Arquivar, Excluir

## Dados Mockados

Exemplo de notificação:
```typescript
{
  id: 1,
  sender: 'Ana Clara Souza',
  source: 'whatsapp',
  category: 'Doações',
  subject: 'Urgente: Paciente precisa de ajuda',
  preview: 'Olá, preciso de ajuda com um paciente...',
  time: '09:42',
  date: 'Hoje',
  read: false,
  urgent: true,
  tags: ['Urgente', 'Pacientes']
}
```

## Últimas Alterações
**2026-04-11:** Removido kanji "援助" do subject de exemplo, substituído por "ajuda" em português (linha 66)

## Backlinks
- [Dashboard](./dashboard.md)
- [Index](../index.md)
