import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, CheckCircle, UserPlus, MapPin, Phone, FileText, AlertCircle } from 'lucide-react'
import { api, getApiErrorMessage, getApiFieldErrors } from '../lib/api'
import { digitsOnly } from '../lib/format'
import type { EspecialidadeResponse } from '../types/api'

const Registro = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    cpf: '',
    dataNascimento: '',
    especialidadeId: '',
    descricaoNecessidade: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [specialties, setSpecialties] = useState<EspecialidadeResponse[]>([])
  const [isLoadingSpecialties, setIsLoadingSpecialties] = useState(true)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    const loadSpecialties = async () => {
      try {
        setSpecialties(await api.listSpecialties())
      } catch (error) {
        setSubmitError(getApiErrorMessage(error))
      } finally {
        setIsLoadingSpecialties(false)
      }
    }

    void loadSpecialties()
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = 'Nome completo é obrigatório'
    } else if (formData.nomeCompleto.trim().length < 3) {
      newErrors.nomeCompleto = 'Nome deve ter pelo menos 3 caracteres'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória'
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres'
    }

    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem'
    }

    const normalizedPhone = digitsOnly(formData.telefone)

    if (normalizedPhone.length < 10 || normalizedPhone.length > 11) {
      newErrors.telefone = 'Telefone deve conter 10 ou 11 dígitos'
    }
    if (digitsOnly(formData.cpf).length !== 11) newErrors.cpf = 'CPF deve conter 11 dígitos'
    if (!formData.dataNascimento) newErrors.dataNascimento = 'Data de nascimento é obrigatória'
    if (!formData.especialidadeId) newErrors.especialidadeId = 'Selecione a especialidade necessária'
    if (!formData.descricaoNecessidade.trim()) newErrors.descricaoNecessidade = 'Descreva a necessidade do paciente'
    if (digitsOnly(formData.cep).length !== 8) newErrors.cep = 'CEP deve conter 8 dígitos'
    if (!formData.logradouro.trim()) newErrors.logradouro = 'Logradouro é obrigatório'
    if (!formData.numero.trim()) newErrors.numero = 'Número é obrigatório'
    if (!formData.bairro.trim()) newErrors.bairro = 'Bairro é obrigatório'
    if (!formData.cidade.trim()) newErrors.cidade = 'Cidade é obrigatória'
    if (!/^[A-Z]{2}$/.test(formData.estado.trim().toUpperCase())) newErrors.estado = 'Informe a UF com 2 letras maiúsculas'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    const normalizedPhone = digitsOnly(formData.telefone)

    setIsSubmitting(true)
    setSubmitError('')

    try {
      await api.registerPatient({
        nomeCompleto: formData.nomeCompleto.trim(),
        email: formData.email.trim(),
        senha: formData.senha,
        papel: 'paciente',
        telefone: normalizedPhone,
        cpf: digitsOnly(formData.cpf),
        dataNascimento: formData.dataNascimento,
        especialidadeId: Number(formData.especialidadeId),
        descricaoNecessidade: formData.descricaoNecessidade.trim(),
        endereco: {
          cep: digitsOnly(formData.cep),
          logradouro: formData.logradouro.trim(),
          numero: formData.numero.trim(),
          complemento: formData.complemento.trim() || undefined,
          bairro: formData.bairro.trim(),
          cidade: formData.cidade.trim(),
          estado: formData.estado.trim().toUpperCase(),
        },
      })

      navigate('/login', {
        replace: true,
        state: {
          message: 'Cadastro realizado com sucesso. Faça o login para acessar a solução.',
          email: formData.email.trim(),
        },
      })
    } catch (error) {
      setErrors((prev) => ({ ...prev, ...getApiFieldErrors(error) }))
      setSubmitError(getApiErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setSubmitError('')
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      <section className="bg-gradient-to-br from-turma-green via-turma-green-light to-turma-green py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserPlus className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Criar sua conta
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Junte-se a nós e faça parte dessa rede de solidariedade
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-on-background/5 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nomeCompleto" className="block text-sm font-medium text-on-background mb-2">
                  Nome completo
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-background/40" />
                  <input
                    type="text"
                    id="nomeCompleto"
                    name="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className={`w-full pl-12 pr-4 py-4 bg-surface rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turma-green/20 ${
                      errors.nomeCompleto ? 'border-red-400' : 'border-on-background/10 focus:border-turma-green'
                    }`}
                  />
                </div>
                {errors.nomeCompleto && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {errors.nomeCompleto}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-on-background mb-2">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-background/40" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu.email@exemplo.com"
                    className={`w-full pl-12 pr-4 py-4 bg-surface rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turma-green/20 ${
                      errors.email ? 'border-red-400' : 'border-on-background/10 focus:border-turma-green'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-on-background mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-background/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="senha"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                    className={`w-full pl-12 pr-12 py-4 bg-surface rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turma-green/20 ${
                      errors.senha ? 'border-red-400' : 'border-on-background/10 focus:border-turma-green'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-background/40 hover:text-turma-green transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.senha && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {errors.senha}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="confirmarSenha" className="block text-sm font-medium text-on-background mb-2">
                  Confirmar senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-background/40" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmarSenha"
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    placeholder="Digite a senha novamente"
                    className={`w-full pl-12 pr-12 py-4 bg-surface rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turma-green/20 ${
                      errors.confirmarSenha ? 'border-red-400' : 'border-on-background/10 focus:border-turma-green'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-background/40 hover:text-turma-green transition-colors duration-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmarSenha && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {errors.confirmarSenha}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-on-background mb-2">
                  Telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-background/40" />
                  <input
                    type="text"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="Somente números ou formato livre"
                    className={`w-full pl-12 pr-4 py-4 bg-surface rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turma-green/20 ${
                      errors.telefone ? 'border-red-400' : 'border-on-background/10 focus:border-turma-green'
                    }`}
                  />
                </div>
                {errors.telefone && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {errors.telefone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-on-background mb-2">
                  CPF
                </label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  placeholder="Somente números ou formato livre"
                  className={`w-full px-4 py-4 bg-surface rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turma-green/20 ${
                    errors.cpf ? 'border-red-400' : 'border-on-background/10 focus:border-turma-green'
                  }`}
                />
                {errors.cpf && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {errors.cpf}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="dataNascimento" className="block text-sm font-medium text-on-background mb-2">
                  Data de nascimento
                </label>
                <input
                  type="date"
                  id="dataNascimento"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-surface rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turma-green/20 ${
                    errors.dataNascimento ? 'border-red-400' : 'border-on-background/10 focus:border-turma-green'
                  }`}
                />
                {errors.dataNascimento && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {errors.dataNascimento}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="especialidadeId" className="block text-sm font-medium text-on-background mb-2">
                  Especialidade necessária
                </label>
                <select
                  id="especialidadeId"
                  name="especialidadeId"
                  value={formData.especialidadeId}
                  onChange={handleChange}
                  disabled={isLoadingSpecialties}
                  className={`w-full px-4 py-4 bg-surface rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turma-green/20 ${
                    errors.especialidadeId ? 'border-red-400' : 'border-on-background/10 focus:border-turma-green'
                  }`}
                >
                  <option value="">{isLoadingSpecialties ? 'Carregando...' : 'Selecione uma especialidade'}</option>
                  {specialties.map((specialty) => (
                    <option key={specialty.id} value={specialty.id}>{specialty.nome}</option>
                  ))}
                </select>
                {errors.especialidadeId && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {errors.especialidadeId}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="descricaoNecessidade" className="block text-sm font-medium text-on-background mb-2">
                Descreva a necessidade do paciente
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-5 w-5 h-5 text-on-background/40" />
                <textarea
                  id="descricaoNecessidade"
                  name="descricaoNecessidade"
                  value={formData.descricaoNecessidade}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Explique o tratamento ou a situação clínica que precisa de atendimento"
                  className={`w-full pl-12 pr-4 py-4 bg-surface rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turma-green/20 resize-none ${
                    errors.descricaoNecessidade ? 'border-red-400' : 'border-on-background/10 focus:border-turma-green'
                  }`}
                />
              </div>
              {errors.descricaoNecessidade && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  {errors.descricaoNecessidade}
                </p>
              )}
            </div>

            <div className="border-t border-on-background/10 pt-6 space-y-6">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-turma-green">
                <MapPin className="w-4 h-4" />
                Endereço do paciente
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cep" className="block text-sm font-medium text-on-background mb-2">CEP</label>
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    placeholder="00000000"
                    className={`w-full px-4 py-4 bg-surface rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turma-green/20 ${
                      errors.cep ? 'border-red-400' : 'border-on-background/10 focus:border-turma-green'
                    }`}
                  />
                  {errors.cep && <p className="mt-2 text-sm text-red-500 flex items-center gap-1"><CheckCircle className="w-4 h-4" />{errors.cep}</p>}
                </div>

                <div>
                  <label htmlFor="logradouro" className="block text-sm font-medium text-on-background mb-2">Logradouro</label>
                  <input
                    type="text"
                    id="logradouro"
                    name="logradouro"
                    value={formData.logradouro}
                    onChange={handleChange}
                    placeholder="Rua, avenida..."
                    className={`w-full px-4 py-4 bg-surface rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turma-green/20 ${
                      errors.logradouro ? 'border-red-400' : 'border-on-background/10 focus:border-turma-green'
                    }`}
                  />
                  {errors.logradouro && <p className="mt-2 text-sm text-red-500 flex items-center gap-1"><CheckCircle className="w-4 h-4" />{errors.logradouro}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="numero" className="block text-sm font-medium text-on-background mb-2">Número</label>
                  <input
                    type="text"
                    id="numero"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    className={`w-full px-4 py-4 bg-surface rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turma-green/20 ${
                      errors.numero ? 'border-red-400' : 'border-on-background/10 focus:border-turma-green'
                    }`}
                  />
                  {errors.numero && <p className="mt-2 text-sm text-red-500 flex items-center gap-1"><CheckCircle className="w-4 h-4" />{errors.numero}</p>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="complemento" className="block text-sm font-medium text-on-background mb-2">Complemento</label>
                  <input
                    type="text"
                    id="complemento"
                    name="complemento"
                    value={formData.complemento}
                    onChange={handleChange}
                    placeholder="Apto, bloco, referência..."
                    className="w-full px-4 py-4 bg-surface rounded-xl border border-on-background/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turma-green/20 focus:border-turma-green"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="bairro" className="block text-sm font-medium text-on-background mb-2">Bairro</label>
                  <input
                    type="text"
                    id="bairro"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                    className={`w-full px-4 py-4 bg-surface rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turma-green/20 ${
                      errors.bairro ? 'border-red-400' : 'border-on-background/10 focus:border-turma-green'
                    }`}
                  />
                  {errors.bairro && <p className="mt-2 text-sm text-red-500 flex items-center gap-1"><CheckCircle className="w-4 h-4" />{errors.bairro}</p>}
                </div>

                <div>
                  <label htmlFor="cidade" className="block text-sm font-medium text-on-background mb-2">Cidade</label>
                  <input
                    type="text"
                    id="cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    className={`w-full px-4 py-4 bg-surface rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turma-green/20 ${
                      errors.cidade ? 'border-red-400' : 'border-on-background/10 focus:border-turma-green'
                    }`}
                  />
                  {errors.cidade && <p className="mt-2 text-sm text-red-500 flex items-center gap-1"><CheckCircle className="w-4 h-4" />{errors.cidade}</p>}
                </div>

                <div>
                  <label htmlFor="estado" className="block text-sm font-medium text-on-background mb-2">UF</label>
                  <input
                    type="text"
                    id="estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    placeholder="SP"
                    maxLength={2}
                    className={`w-full px-4 py-4 bg-surface rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turma-green/20 ${
                      errors.estado ? 'border-red-400' : 'border-on-background/10 focus:border-turma-green'
                    }`}
                  />
                  {errors.estado && <p className="mt-2 text-sm text-red-500 flex items-center gap-1"><CheckCircle className="w-4 h-4" />{errors.estado}</p>}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-turma-green text-white font-semibold rounded-xl hover:bg-turma-green-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Criando conta...
                </>
              ) : (
                <>
                  Criar conta
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-on-background/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-on-background/50">ou</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-on-background/70 mb-4">
              Já tem uma conta?
            </p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-turma-green/10 text-turma-green font-semibold rounded-xl hover:bg-turma-green/20 transition-all duration-300 border border-turma-green/20"
            >
              Entrar na minha conta
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registro
