import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { 
  User, 
  Calendar, 
  Stethoscope, 
  Heart, 
  ClipboardList,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileText,
  Phone,
  Mail,
  MapPin,
  Plus,
  ChevronDown
} from 'lucide-react'

interface PatientFormData {
  patientName: string
  patientAge: number
  patientPhone: string
  patientEmail: string
  patientAddress: string
  attendanceDate: string
  procedure: string
  condition: string
  severity: 'leve' | 'moderada' | 'grave'
  observations: string
  nextAppointment: string
  status: 'concluido' | 'em_tratamento' | 'aguardando'
}

interface PatientRecord extends PatientFormData {
  id: string
  createdAt: string
}

const procedureOptions = [
  'Consulta Inicial',
  'Limpeza',
  'Restauração',
  'Extração',
  'Tratamento de Canal',
  'Prótese',
  'Ortodontia',
  'Cirurgia',
  'Outro'
]

const conditionOptions = [
  'Cárie',
  'Gengivite',
  'Periodontite',
  'Sensibilidade',
  'Mal Oclusão',
  'Edentulismo',
  'Trauma',
  'Outra'
]

const Relatorios = () => {
  const [records, setRecords] = useState<PatientRecord[]>([
    {
      id: '1',
      patientName: 'Ana Silva',
      patientAge: 28,
      patientPhone: '(11) 98765-4321',
      patientEmail: 'ana.silva@email.com',
      patientAddress: 'Rua das Flores, 123 - São Paulo',
      attendanceDate: '2024-01-15',
      procedure: 'Restauração',
      condition: 'Cárie',
      severity: 'moderada',
      observations: 'Paciente relatou dor ao mastigar. Realizada restauração no molar superior direito.',
      nextAppointment: '2024-02-15',
      status: 'concluido',
      createdAt: '2024-01-15T10:30:00'
    },
    {
      id: '2',
      patientName: 'Carlos Souza',
      patientAge: 35,
      patientPhone: '(11) 91234-5678',
      patientEmail: 'carlos.souza@email.com',
      patientAddress: 'Av. Paulista, 1000 - São Paulo',
      attendanceDate: '2024-01-10',
      procedure: 'Limpeza',
      condition: 'Gengivite',
      severity: 'leve',
      observations: 'Limpeza profissional realizada. Orientado sobre técnica de escovação.',
      nextAppointment: '2024-04-10',
      status: 'concluido',
      createdAt: '2024-01-10T14:00:00'
    }
  ])
  
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<PatientFormData>({
    defaultValues: {
      severity: 'leve',
      status: 'concluido'
    }
  })

  const onSubmit = (data: PatientFormData) => {
    const newRecord: PatientRecord = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    
    setRecords([newRecord, ...records])
    setSubmitSuccess(true)
    
    setTimeout(() => {
      setSubmitSuccess(false)
      reset()
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido':
        return 'bg-green-100 text-green-700'
      case 'em_tratamento':
        return 'bg-blue-100 text-blue-700'
      case 'aguardando':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'concluido':
        return 'Concluído'
      case 'em_tratamento':
        return 'Em Tratamento'
      case 'aguardando':
        return 'Aguardando'
      default:
        return status
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'leve':
        return 'bg-green-100 text-green-700 border-green-300'
      case 'moderada':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'grave':
        return 'bg-red-100 text-red-700 border-red-300'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-turma-green rounded-xl flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-on-background">Registrar Atendimento</h1>
            <p className="text-on-background/60">
              Registre os pacientes atendidos e seus tratamentos realizados
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-on-background/5 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-on-background flex items-center gap-2">
                <Plus className="w-5 h-5 text-turma-green" />
                Novo Atendimento
              </h2>
              {submitSuccess && (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Registrado com sucesso!
                </span>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-turma-green uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Dados do Paciente
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-on-background/70 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      {...register('patientName', { 
                        required: 'Nome é obrigatório',
                        minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                      })}
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                        errors.patientName 
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                          : 'border-on-background/10 focus:border-turma-green focus:ring-2 focus:ring-turma-green/20'
                      }`}
                      placeholder="Digite o nome do paciente"
                    />
                    {errors.patientName && (
                      <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.patientName.message}
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-on-background/70 mb-2">
                      Idade *
                    </label>
                    <input
                      type="number"
                      {...register('patientAge', { 
                        required: 'Idade é obrigatória',
                        min: { value: 0, message: 'Idade inválida' },
                        max: { value: 120, message: 'Idade inválida' }
                      })}
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                        errors.patientAge 
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                          : 'border-on-background/10 focus:border-turma-green focus:ring-2 focus:ring-turma-green/20'
                      }`}
                      placeholder="Ex: 25"
                    />
                    {errors.patientAge && (
                      <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.patientAge.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-on-background/70 mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Telefone *
                    </label>
                    <input
                      {...register('patientPhone', { 
                        required: 'Telefone é obrigatório',
                        pattern: { 
                          value: /^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/, 
                          message: 'Formato: (XX) XXXXX-XXXX'
                        }
                      })}
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                        errors.patientPhone 
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                          : 'border-on-background/10 focus:border-turma-green focus:ring-2 focus:ring-turma-green/20'
                      }`}
                      placeholder="(11) 98765-4321"
                    />
                    {errors.patientPhone && (
                      <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.patientPhone.message}
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-on-background/70 mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    <input
                      type="email"
                      {...register('patientEmail', { 
                        pattern: { 
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                          message: 'Email inválido'
                        }
                      })}
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                        errors.patientEmail 
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                          : 'border-on-background/10 focus:border-turma-green focus:ring-2 focus:ring-turma-green/20'
                      }`}
                      placeholder="paciente@email.com"
                    />
                    {errors.patientEmail && (
                      <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.patientEmail.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-background/70 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Endereço
                  </label>
                  <input
                    {...register('patientAddress')}
                    className="w-full px-4 py-3 rounded-xl border border-on-background/10 focus:border-turma-green focus:ring-2 focus:ring-turma-green/20 outline-none transition-all"
                    placeholder="Rua, número, bairro, cidade"
                  />
                </div>
              </div>

              <div className="border-t border-on-background/10 pt-6 space-y-4">
                <h3 className="text-sm font-semibold text-turma-green uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Dados do Atendimento
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-on-background/70 mb-2">
                      Data do Atendimento *
                    </label>
                    <input
                      type="date"
                      {...register('attendanceDate', { required: 'Data é obrigatória' })}
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                        errors.attendanceDate 
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                          : 'border-on-background/10 focus:border-turma-green focus:ring-2 focus:ring-turma-green/20'
                      }`}
                    />
                    {errors.attendanceDate && (
                      <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.attendanceDate.message}
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-on-background/70 mb-2">
                      Próxima Consulta
                    </label>
                    <input
                      type="date"
                      {...register('nextAppointment')}
                      className="w-full px-4 py-3 rounded-xl border border-on-background/10 focus:border-turma-green focus:ring-2 focus:ring-turma-green/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-on-background/70 mb-2">
                      Procedimento Realizado *
                    </label>
                    <div className="relative">
                      <select
                        {...register('procedure', { required: 'Procedimento é obrigatório' })}
                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all appearance-none bg-white ${
                          errors.procedure 
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                            : 'border-on-background/10 focus:border-turma-green focus:ring-2 focus:ring-turma-green/20'
                        }`}
                      >
                        <option value="">Selecione...</option>
                        {procedureOptions.map(proc => (
                          <option key={proc} value={proc}>{proc}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-background/40 pointer-events-none" />
                    </div>
                    {errors.procedure && (
                      <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.procedure.message}
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-on-background/70 mb-2">
                      Condição / Diagnóstico *
                    </label>
                    <div className="relative">
                      <select
                        {...register('condition', { required: 'Condição é obrigatória' })}
                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all appearance-none bg-white ${
                          errors.condition 
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                            : 'border-on-background/10 focus:border-turma-green focus:ring-2 focus:ring-turma-green/20'
                        }`}
                      >
                        <option value="">Selecione...</option>
                        {conditionOptions.map(cond => (
                          <option key={cond} value={cond}>{cond}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-background/40 pointer-events-none" />
                    </div>
                    {errors.condition && (
                      <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.condition.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-background/70 mb-3">
                    Gravidade da Condição *
                  </label>
                  <div className="flex gap-3">
                    {['leve', 'moderada', 'grave'].map((severity) => (
                      <label
                        key={severity}
                        className={`flex-1 cursor-pointer`}
                      >
                        <input
                          type="radio"
                          value={severity}
                          {...register('severity', { required: true })}
                          className="sr-only"
                        />
                        <div className={`p-3 rounded-xl border-2 text-center transition-all ${
                          watch('severity') === severity
                            ? getSeverityColor(severity)
                            : 'border-on-background/10 hover:border-turma-green/30'
                        }`}>
                          <span className="text-sm font-medium capitalize">{severity}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-background/70 mb-2">
                    Observações e Detalhes do Atendimento
                  </label>
                  <textarea
                    {...register('observations', { 
                      maxLength: { value: 1000, message: 'Máximo 1000 caracteres' }
                    })}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none ${
                      errors.observations 
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                        : 'border-on-background/10 focus:border-turma-green focus:ring-2 focus:ring-turma-green/20'
                    }`}
                    placeholder="Descreva os detalhes do atendimento, procedimentos realizados, orientações dadas ao paciente..."
                  />
                  {errors.observations && (
                    <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.observations.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-background/70 mb-3">
                    Status do Tratamento *
                  </label>
                  <div className="flex gap-3">
                    {[
                      { value: 'concluido', label: 'Concluído', color: 'bg-green-100 text-green-700 border-green-300' },
                      { value: 'em_tratamento', label: 'Em Tratamento', color: 'bg-blue-100 text-blue-700 border-blue-300' },
                      { value: 'aguardando', label: 'Aguardando', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' }
                    ].map((status) => (
                      <label
                        key={status.value}
                        className={`flex-1 cursor-pointer`}
                      >
                        <input
                          type="radio"
                          value={status.value}
                          {...register('status', { required: true })}
                          className="sr-only"
                        />
                        <div className={`p-3 rounded-xl border-2 text-center transition-all ${
                          watch('status') === status.value
                            ? status.color
                            : 'border-on-background/10 hover:border-turma-green/30'
                        }`}>
                          <span className="text-sm font-medium">{status.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-turma-green text-white font-semibold rounded-xl hover:bg-turma-green-light transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Registrar Atendimento
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface-container rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-on-background flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-turma-green" />
                Atendimentos Registrados
              </h2>
              <span className="text-sm text-on-background/60 bg-white px-3 py-1 rounded-full">
                {records.length} registros
              </span>
            </div>

            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
              {records.map((record) => (
                <div 
                  key={record.id} 
                  className="bg-white rounded-xl p-5 shadow-sm border border-on-background/5 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-turma-green/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-turma-green" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-on-background">{record.patientName}</h3>
                        <p className="text-sm text-on-background/60">{record.patientAge} anos</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {getStatusLabel(record.status)}
                    </span>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-on-background/70">
                      <Stethoscope className="w-4 h-4 text-turma-green" />
                      <span>{record.procedure}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-on-background/70">
                      <Heart className="w-4 h-4 text-turma-green" />
                      <span>{record.condition}</span>
                      <span className={`px-2 py-0.5 rounded text-xs border ${getSeverityColor(record.severity)}`}>
                        {record.severity}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-on-background/70">
                      <Calendar className="w-4 h-4 text-turma-green" />
                      <span>{record.attendanceDate}</span>
                    </div>
                  </div>

                  {record.observations && (
                    <div className="mt-3 pt-3 border-t border-on-background/10">
                      <p className="text-sm text-on-background/60 line-clamp-2">
                        <FileText className="w-4 h-4 inline mr-1" />
                        {record.observations}
                      </p>
                    </div>
                  )}

                  {record.nextAppointment && (
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-turma-green" />
                      <span className="text-on-background/70">
                        Próxima: {record.nextAppointment}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-turma-green to-turma-green rounded-2xl p-6 text-white">
            <h3 className="font-semibold text-lg mb-4">Resumo</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">Total de Atendimentos:</span>
                <span className="font-medium text-xl">{records.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Concluídos:</span>
                <span className="font-medium">{records.filter(r => r.status === 'concluido').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Em Tratamento:</span>
                <span className="font-medium">{records.filter(r => r.status === 'em_tratamento').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Aguardando:</span>
                <span className="font-medium">{records.filter(r => r.status === 'aguardando').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Relatorios
