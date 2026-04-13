import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Heart, CheckCircle } from 'lucide-react'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    alert('Login realizado com sucesso! (Mock)')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      <section className="bg-gradient-to-br from-turma-green via-turma-green-light to-turma-green py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Bem-vindo de volta
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Entre na sua conta para continuar transformando sorrisos
          </p>
        </div>
      </section>

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-on-background/5 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-on-background mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-background/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Sua senha"
                  className={`w-full pl-12 pr-12 py-4 bg-surface rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turma-green/20 ${
                    errors.password ? 'border-red-400' : 'border-on-background/10 focus:border-turma-green'
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
              {errors.password && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-on-background/20 text-turma-green focus:ring-turma-green"
                />
                <span className="text-sm text-on-background/70">Lembrar-me</span>
              </label>
              <Link
                to="/recuperar-senha"
                className="text-sm text-turma-green hover:text-[#007a29] font-medium transition-colors duration-300"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-turma-green text-white font-semibold rounded-xl hover:bg-turma-green-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
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
              Ainda não tem uma conta?
            </p>
            <Link
              to="/registro"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-turma-green/10 text-turma-green font-semibold rounded-xl hover:bg-turma-green/20 transition-all duration-300 border border-turma-green/20"
            >
              Criar conta gratuita
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-on-background/5 text-center">
            <Heart className="w-6 h-6 text-turma-green mx-auto mb-2" />
            <p className="text-sm font-medium text-on-background">80.000+</p>
            <p className="text-xs text-on-background/60">Vidas transformadas</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-on-background/5 text-center">
            <CheckCircle className="w-6 h-6 text-turma-green mx-auto mb-2" />
            <p className="text-sm font-medium text-on-background">100% gratuito</p>
            <p className="text-xs text-on-background/60">Para voluntários</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
