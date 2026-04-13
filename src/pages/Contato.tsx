import { useForm } from 'react-hook-form'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

interface FormData {
  nome: string
  email: string
  telefone: string
  assunto: string
  mensagem: string
}

const Contato = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      assunto: '',
      mensagem: '',
    },
  })

  // Watch form values to show success state
  const formValues = watch()
  const isSubmitted = formValues.nome === '' && 
                      formValues.email === '' && 
                      formValues.telefone === '' && 
                      formValues.assunto === '' && 
                      formValues.mensagem === '' &&
                      !isSubmitting

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contato@turmadobem.org.br',
      link: 'mailto:contato@turmadobem.org.br',
    },
    {
      icon: Phone,
      title: 'Telefone',
      value: '(11) 99999-9999',
      link: 'tel:+5511999999999',
    },
    {
      icon: MapPin,
      title: 'Endereço',
      value: 'Av. Paulista, 1000 - São Paulo, SP',
      link: 'https://maps.google.com/?q=Av.+Paulista,+1000+Sao+Paulo',
    },
  ]

  const subjectOptions = [
    'Quero ser voluntário',
    'Preciso de atendimento odontológico',
    'Quero fazer uma doação',
    'Parceria corporativa',
    'Dúvidas sobre o sistema',
    'Outros assuntos',
  ]

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Form data submitted:', data)
    reset()
  }

  const handleReset = () => {
    reset()
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-turma-green via-turma-green-light to-turma-green py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Fale Conosco
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Estamos prontos para ajudar você. Entre em contato pela melhor forma conveniente.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-on-background">Informações de Contato</h2>
            <div className="space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon
                return (
                  <a
                    key={info.title}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-5 bg-white rounded-xl border border-on-background/10 hover:border-turma-green hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-turma-green/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-turma-green transition-colors duration-300">
                      <Icon className="w-6 h-6 text-turma-green group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-on-background/50 mb-1">{info.title}</span>
                      <span className="font-semibold text-on-background">{info.value}</span>
                    </div>
                  </a>
                )
              })}
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-on-background/5 to-on-background/10 rounded-xl flex items-center justify-center border border-on-background/10">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-on-background/30 mx-auto mb-2" />
                <span className="text-sm text-on-background/50">São Paulo, Brasil</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-on-background/10 p-8">
              <h2 className="text-2xl font-bold text-on-background mb-6">Envie sua Mensagem</h2>

              {isSubmitted && !isSubmitting ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-turma-green" />
                  </div>
                  <h3 className="text-xl font-bold text-on-background mb-2">Mensagem Enviada!</h3>
                  <p className="text-on-background/60 mb-6">
                    Obrigado pelo contato. Responderemos em breve.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-turma-green text-white font-semibold rounded-xl hover:bg-turma-green-light transition-all duration-300"
                  >
                    Enviar Nova Mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-on-background mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        id="nome"
                        {...register('nome', { 
                          required: 'Nome é obrigatório',
                          minLength: {
                            value: 2,
                            message: 'Nome deve ter pelo menos 2 caracteres'
                          }
                        })}
                        placeholder="Seu nome completo"
                        className={`w-full px-4 py-3 bg-surface rounded-xl border ${
                          errors.nome ? 'border-red-400' : 'border-on-background/10'
                        } focus:outline-none focus:ring-2 focus:ring-turma-green focus:border-transparent transition-all duration-300`}
                      />
                      {errors.nome && <p className="mt-1 text-sm text-red-500">{errors.nome.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-on-background mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register('email', { 
                          required: 'Email é obrigatório',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Email inválido'
                          }
                        })}
                        placeholder="seu.email@exemplo.com"
                        className={`w-full px-4 py-3 bg-surface rounded-xl border ${
                          errors.email ? 'border-red-400' : 'border-on-background/10'
                        } focus:outline-none focus:ring-2 focus:ring-turma-green focus:border-transparent transition-all duration-300`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="telefone" className="block text-sm font-medium text-on-background mb-2">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        {...register('telefone', { 
                          required: 'Telefone é obrigatório',
                          minLength: {
                            value: 10,
                            message: 'Telefone deve ter pelo menos 10 caracteres'
                          }
                        })}
                        placeholder="(11) 99999-9999"
                        className={`w-full px-4 py-3 bg-surface rounded-xl border ${
                          errors.telefone ? 'border-red-400' : 'border-on-background/10'
                        } focus:outline-none focus:ring-2 focus:ring-turma-green focus:border-transparent transition-all duration-300`}
                      />
                      {errors.telefone && <p className="mt-1 text-sm text-red-500">{errors.telefone.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="assunto" className="block text-sm font-medium text-on-background mb-2">
                        Assunto *
                      </label>
                      <select
                        id="assunto"
                        {...register('assunto', { 
                          required: 'Selecione um assunto'
                        })}
                        className={`w-full px-4 py-3 bg-surface rounded-xl border ${
                          errors.assunto ? 'border-red-400' : 'border-on-background/10'
                        } focus:outline-none focus:ring-2 focus:ring-turma-green focus:border-transparent transition-all duration-300`}
                      >
                        <option value="">Selecione um assunto</option>
                        {subjectOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.assunto && <p className="mt-1 text-sm text-red-500">{errors.assunto.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mensagem" className="block text-sm font-medium text-on-background mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      id="mensagem"
                      {...register('mensagem', { 
                        required: 'Mensagem é obrigatória',
                        minLength: {
                          value: 10,
                          message: 'Mensagem deve ter pelo menos 10 caracteres'
                        }
                      })}
                      placeholder="Como podemos ajudar?"
                      rows={5}
                      className={`w-full px-4 py-3 bg-surface rounded-xl border ${
                        errors.mensagem ? 'border-red-400' : 'border-on-background/10'
                      } focus:outline-none focus:ring-2 focus:ring-turma-green focus:border-transparent transition-all duration-300 resize-none`}
                    />
                    {errors.mensagem && <p className="mt-1 text-sm text-red-500">{errors.mensagem.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-4 bg-turma-green text-white font-semibold rounded-xl hover:bg-turma-green-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-on-background/30 border-t-on-background rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contato
