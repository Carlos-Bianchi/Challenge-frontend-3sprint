import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Calendar,
  Stethoscope,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileText,
  Plus,
  ChevronDown,
} from 'lucide-react'
import { api, getApiErrorMessage, getApiFieldErrors } from '../../lib/api'
import { formatAppointmentStatus, formatDate, formatShift, formatTreatmentStatus } from '../../lib/format'
import type {
  AgendamentoResponse,
  GravidadeCondicao,
  MatchResponse,
  RegistroAtendimentoResponse,
  StatusTratamento,
  UsuarioResponse,
} from '../../types/api'

interface TreatmentFormData {
  agendamentoId: string
  dataAtendimento: string
  procedimento: string
  condicaoPaciente: string
  gravidade: GravidadeCondicao
  observacoes: string
  proximaConsulta: string
  status: StatusTratamento
}

const defaultValues: TreatmentFormData = {
  agendamentoId: '',
  dataAtendimento: '',
  procedimento: '',
  condicaoPaciente: '',
  gravidade: 'leve',
  observacoes: '',
  proximaConsulta: '',
  status: 'aguardando',
}

const Relatorios = () => {
  const [records, setRecords] = useState<RegistroAtendimentoResponse[]>([])
  const [appointments, setAppointments] = useState<AgendamentoResponse[]>([])
  const [matches, setMatches] = useState<MatchResponse[]>([])
  const [users, setUsers] = useState<UsuarioResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [pageError, setPageError] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TreatmentFormData>({
    defaultValues,
  })

  const loadPage = async () => {
    try {
      setPageError('')
      setIsLoading(true)
      const [recordsResponse, appointmentsResponse, matchesResponse, usersResponse] = await Promise.all([
        api.listTreatmentRecords(),
        api.listAppointments(),
        api.listMatches(),
        api.listUsers(),
      ])

      setRecords(recordsResponse)
      setAppointments(appointmentsResponse)
      setMatches(matchesResponse)
      setUsers(usersResponse)
    } catch (error) {
      setPageError(getApiErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadPage()
  }, [])

  const matchById = useMemo(() => matches.reduce<Record<number, MatchResponse>>((accumulator, match) => {
    accumulator[match.id] = match
    return accumulator
  }, {}), [matches])

  const userById = useMemo(() => users.reduce<Record<number, UsuarioResponse>>((accumulator, user) => {
    accumulator[user.id] = user
    return accumulator
  }, {}), [users])

  const appointmentsWithContext = useMemo(() => appointments.map((appointment) => {
    const match = matchById[appointment.matchId]
    const patient = match ? userById[match.pacienteUsuarioId] : undefined
    const dentist = match ? userById[match.dentistaUsuarioId] : undefined

    return {
      ...appointment,
      patientName: patient?.nomeCompleto ?? `Paciente #${match?.pacienteUsuarioId ?? '—'}`,
      dentistName: dentist?.nomeCompleto ?? `Dentista #${match?.dentistaUsuarioId ?? '—'}`,
      matchStatus: match?.status,
    }
  }).sort((firstAppointment, secondAppointment) => secondAppointment.id - firstAppointment.id), [appointments, matchById, userById])

  const selectableAppointments = useMemo(() => appointmentsWithContext.filter((appointment) => (
    appointment.matchStatus === 'confirmado'
    && appointment.status !== 'cancelada'
    && appointment.status !== 'concluida'
  )), [appointmentsWithContext])

  const summary = useMemo(() => ({
    total: records.length,
    aguardando: records.filter((record) => record.status === 'aguardando').length,
    emTratamento: records.filter((record) => record.status === 'em_tratamento').length,
    concluido: records.filter((record) => record.status === 'concluido').length,
  }), [records])

  const onSubmit = async (data: TreatmentFormData) => {
    try {
      setSubmitMessage('')
      setSubmitError('')

      const createdRecord = await api.createTreatmentRecord({
        agendamentoId: Number(data.agendamentoId),
        dataAtendimento: data.dataAtendimento,
        procedimento: data.procedimento.trim(),
        condicaoPaciente: data.condicaoPaciente.trim(),
        gravidade: data.gravidade,
        observacoes: data.observacoes.trim() || undefined,
        proximaConsulta: data.proximaConsulta || undefined,
        status: data.status,
      })

      setRecords((currentRecords) => [createdRecord, ...currentRecords])
      setAppointments((currentAppointments) => currentAppointments.map((appointment) => (
        appointment.id === Number(data.agendamentoId)
          ? { ...appointment, status: 'concluida' }
          : appointment
      )))
      setSubmitMessage('Atendimento registrado com sucesso!')
      reset(defaultValues)
    } catch (error) {
      setSubmitError(getApiErrorMessage(error))

      const fieldErrors = getApiFieldErrors(error)
      const allowedFields: Array<keyof TreatmentFormData> = ['agendamentoId', 'dataAtendimento', 'procedimento', 'condicaoPaciente', 'gravidade', 'observacoes', 'proximaConsulta', 'status']

      allowedFields.forEach((field) => {
        if (fieldErrors[field]) {
          setError(field, { type: 'server', message: fieldErrors[field] })
        }
      })
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {(pageError || submitError) && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          {pageError || submitError}
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-turma-green rounded-xl flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-on-background">Registrar Atendimento</h1>
            <p className="text-on-background/60">
              Fluxo real usando agendamentos e registros vinculados ao backend.
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="py-16 text-center text-on-surface-variant">Carregando atendimentos...</div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-on-background/5 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-on-background flex items-center gap-2">
                  <Plus className="w-5 h-5 text-turma-green" />
                  Novo Atendimento
                </h2>
                {submitMessage && (
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    {submitMessage}
                  </span>
                )}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-turma-green uppercase tracking-wider flex items-center gap-2">
                    <ClipboardList className="w-4 h-4" />
                    Vincular agendamento
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-on-background/70 mb-2">
                      Agendamento confirmado ou agendado *
                    </label>
                    <div className="relative">
                      <select
                        {...register('agendamentoId', { required: 'Selecione um agendamento' })}
                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all appearance-none bg-white ${
                          errors.agendamentoId
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-on-background/10 focus:border-turma-green focus:ring-2 focus:ring-turma-green/20'
                        }`}
                      >
                        <option value="">Selecione...</option>
                        {selectableAppointments.map((appointment) => (
                          <option key={appointment.id} value={appointment.id}>
                            #{appointment.id} • {appointment.patientName} • {appointment.dentistName} • {formatDate(appointment.dataAgendada)}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-background/40 pointer-events-none" />
                    </div>
                    {errors.agendamentoId && (
                      <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.agendamentoId.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t border-on-background/10 pt-6 space-y-4">
                  <h3 className="text-sm font-semibold text-turma-green uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Dados do atendimento
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-on-background/70 mb-2">
                        Data do atendimento *
                      </label>
                      <input
                        type="date"
                        {...register('dataAtendimento', { required: 'Data é obrigatória' })}
                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                          errors.dataAtendimento
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-on-background/10 focus:border-turma-green focus:ring-2 focus:ring-turma-green/20'
                        }`}
                      />
                      {errors.dataAtendimento && (
                        <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.dataAtendimento.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-on-background/70 mb-2">
                        Próxima consulta
                      </label>
                      <input
                        type="date"
                        {...register('proximaConsulta')}
                        className="w-full px-4 py-3 rounded-xl border border-on-background/10 focus:border-turma-green focus:ring-2 focus:ring-turma-green/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-on-background/70 mb-2">
                        Procedimento realizado *
                      </label>
                      <input
                        {...register('procedimento', { required: 'Procedimento é obrigatório' })}
                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                          errors.procedimento
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-on-background/10 focus:border-turma-green focus:ring-2 focus:ring-turma-green/20'
                        }`}
                        placeholder="Ex: Restauração, limpeza, extração..."
                      />
                      {errors.procedimento && (
                        <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.procedimento.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-on-background/70 mb-2">
                        Condição do paciente *
                      </label>
                      <input
                        {...register('condicaoPaciente', { required: 'Condição é obrigatória' })}
                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                          errors.condicaoPaciente
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-on-background/10 focus:border-turma-green focus:ring-2 focus:ring-turma-green/20'
                        }`}
                        placeholder="Ex: dor aguda, cárie extensa, manutenção..."
                      />
                      {errors.condicaoPaciente && (
                        <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.condicaoPaciente.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-on-background/70 mb-2">
                        Gravidade *
                      </label>
                      <div className="relative">
                        <select
                          {...register('gravidade', { required: 'Gravidade é obrigatória' })}
                          className="w-full px-4 py-3 rounded-xl border border-on-background/10 focus:border-turma-green focus:ring-2 focus:ring-turma-green/20 outline-none transition-all appearance-none bg-white"
                        >
                          <option value="leve">Leve</option>
                          <option value="moderada">Moderada</option>
                          <option value="grave">Grave</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-background/40 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-on-background/70 mb-2">
                        Status do tratamento *
                      </label>
                      <div className="relative">
                        <select
                          {...register('status', { required: 'Status é obrigatório' })}
                          className="w-full px-4 py-3 rounded-xl border border-on-background/10 focus:border-turma-green focus:ring-2 focus:ring-turma-green/20 outline-none transition-all appearance-none bg-white"
                        >
                          <option value="aguardando">Aguardando</option>
                          <option value="em_tratamento">Em tratamento</option>
                          <option value="concluido">Concluído</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-background/40 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-on-background/70 mb-2">
                      Observações
                    </label>
                    <textarea
                      {...register('observacoes')}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-on-background/10 focus:border-turma-green focus:ring-2 focus:ring-turma-green/20 outline-none transition-all resize-none"
                      placeholder="Detalhes clínicos, orientações e anotações do atendimento..."
                    />
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
                      Registrando...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Registrar atendimento
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="bg-gradient-to-br from-turma-green to-turma-green-dark rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Resumo atual</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/70 text-sm">Total</p>
                  <p className="text-2xl font-bold">{summary.total}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Concluídos</p>
                  <p className="text-2xl font-bold">{summary.concluido}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Em tratamento</p>
                  <p className="text-2xl font-bold">{summary.emTratamento}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Aguardando</p>
                  <p className="text-2xl font-bold">{summary.aguardando}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-on-background/5 p-6">
              <h2 className="text-lg font-semibold text-on-background flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-turma-green" />
                Agendamentos disponíveis
              </h2>

              <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
                {selectableAppointments.map((appointment) => (
                  <div key={appointment.id} className="rounded-2xl bg-surface p-4 border border-on-background/5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-on-background">{appointment.patientName}</p>
                        <p className="text-sm text-on-background/60">{appointment.dentistName}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-white text-xs font-medium text-on-background border border-on-background/10">
                        {formatAppointmentStatus(appointment.status)}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-on-background/60">
                      <span>{formatDate(appointment.dataAgendada)}</span>
                      <span>{formatShift(appointment.turno)}</span>
                      <span>Match #{appointment.matchId}</span>
                    </div>
                  </div>
                ))}

                {selectableAppointments.length === 0 && (
                  <div className="text-sm text-on-background/60">Nenhum agendamento elegível para registrar atendimento.</div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-on-background/5 p-6">
              <h2 className="text-lg font-semibold text-on-background flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-turma-green" />
                Atendimentos registrados
              </h2>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {records
                  .slice()
                  .sort((firstRecord, secondRecord) => secondRecord.id - firstRecord.id)
                  .map((record) => {
                    const appointment = appointmentsWithContext.find((currentAppointment) => currentAppointment.id === record.agendamentoId)

                    return (
                      <div key={record.id} className="rounded-2xl bg-surface p-4 border border-on-background/5">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <p className="font-semibold text-on-background">{appointment?.patientName ?? `Agendamento #${record.agendamentoId}`}</p>
                            <p className="text-sm text-on-background/60">{appointment?.dentistName ?? 'Dentista não localizado'}</p>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-white text-xs font-medium text-on-background border border-on-background/10">
                            {formatTreatmentStatus(record.status)}
                          </span>
                        </div>

                        <div className="space-y-2 text-sm text-on-background/70">
                          <p><strong>Procedimento:</strong> {record.procedimento}</p>
                          <p><strong>Condição:</strong> {record.condicaoPaciente}</p>
                          <p><strong>Data:</strong> {formatDate(record.dataAtendimento)}</p>
                          <p><strong>Gravidade:</strong> {record.gravidade}</p>
                          {record.observacoes && <p><strong>Observações:</strong> {record.observacoes}</p>}
                          {record.proximaConsulta && <p><strong>Próxima consulta:</strong> {formatDate(record.proximaConsulta)}</p>}
                        </div>
                      </div>
                    )
                  })}

                {records.length === 0 && (
                  <div className="text-sm text-on-background/60">Nenhum atendimento registrado até o momento.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Relatorios
