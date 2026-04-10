import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function Contato() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>()

  const onSubmit = (data: ContactFormData) => {
    console.log('Formulário enviado:', data)
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 5000)
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E7E34] text-gray-800 text-sm bg-white'

  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1'

  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Título */}
        <section className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ✉️ Entre em Contato
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Adoraríamos ouvir de você! Envie suas dúvidas, sugestões ou feedback.
            Nossa equipe responderá o mais breve possível.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Formulário */}
          <Card>
            <h2 className="text-xl font-bold text-gray-800 mb-6">💬 Envie sua Mensagem</h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-xl text-green-700 text-sm font-medium">
                ✅ Mensagem enviada com sucesso! Responderemos em breve.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

              {/* Nome */}
              <div>
                <label className={labelClass}>Nome Completo *</label>
                <input
                  type="text"
                  placeholder="Digite seu nome completo"
                  className={`${inputClass} ${errors.name ? 'border-red-400 focus:ring-red-400' : ''}`}
                  {...register('name', {
                    required: 'O nome é obrigatório.',
                    minLength: { value: 3, message: 'O nome deve ter pelo menos 3 caracteres.' },
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>E-mail *</label>
                <input
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  className={`${inputClass} ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
                  {...register('email', {
                    required: 'O e-mail é obrigatório.',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Por favor, insira um e-mail válido.',
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Assunto */}
              <div>
                <label className={labelClass}>Assunto *</label>
                <select
                  className={`${inputClass} ${errors.subject ? 'border-red-400 focus:ring-red-400' : ''}`}
                  {...register('subject', { required: 'Por favor, selecione um assunto.' })}
                >
                  <option value="">Selecione um assunto</option>
                  <option value="duvida">Dúvida Geral</option>
                  <option value="sugestao">Sugestão de Melhoria</option>
                  <option value="bug">Reportar Problema/Bug</option>
                  <option value="outro">Outro Assunto</option>
                </select>
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                )}
              </div>

              {/* Mensagem */}
              <div>
                <label className={labelClass}>Mensagem *</label>
                <textarea
                  rows={5}
                  placeholder="Digite sua mensagem aqui... (mínimo 10 caracteres)"
                  className={`${inputClass} resize-none ${errors.message ? 'border-red-400 focus:ring-red-400' : ''}`}
                  {...register('message', {
                    required: 'A mensagem é obrigatória.',
                    minLength: { value: 10, message: 'A mensagem deve ter pelo menos 10 caracteres.' },
                  })}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Enviar Mensagem ✈️
              </Button>
            </form>
          </Card>

          {/* Informações */}
          <div className="space-y-4">
            <Card>
              <h2 className="text-xl font-bold text-gray-800 mb-4">🏢 Informações de Contato</h2>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex gap-3">
                  <span className="text-xl">📧</span>
                  <div>
                    <p className="font-semibold text-gray-800">E-mail de Suporte</p>
                    <p>placeholder@projeto.com.br</p>
                    <p className="text-xs text-gray-400">Resposta em até 24 horas úteis</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">📞</span>
                  <div>
                    <p className="font-semibold text-gray-800">Telefone</p>
                    <p>(11) 9999-9999</p>
                    <p className="text-xs text-gray-400">Segunda a Sexta, 9h às 18h</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="font-semibold text-gray-800">Endereço</p>
                    <p>Av. Exemplo, 1234 - Sala 567</p>
                    <p>Centro — São Paulo/SP, CEP: 01234-567</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">🕐</span>
                  <div>
                    <p className="font-semibold text-gray-800">Horário de Atendimento</p>
                    <p>Segunda a Sexta: 9h às 18h</p>
                    <p>Sábado: 9h às 13h</p>
                    <p className="text-xs text-gray-400">Domingo e Feriados: Fechado</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-[#1E7E34] text-white text-center">
              <div className="text-3xl mb-2">🗺️</div>
              <p className="font-semibold">Localização no Mapa</p>
              <p className="text-green-100 text-sm mt-1">São Paulo, SP — Brasil</p>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}
