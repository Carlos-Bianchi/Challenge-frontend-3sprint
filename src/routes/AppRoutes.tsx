import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Sobre from '../pages/Sobre'
import Faq from '../pages/Faq'
import Contato from '../pages/Contato'
import Integrantes from '../pages/Integrantes'
import Login from '../pages/Login'
import Registro from '../pages/Registro'
import Solucao from '../pages/Solucao'
import Match from '../pages/solucao/Match'
import Comunicacao from '../pages/solucao/Comunicacao'
import Usuarios from '../pages/solucao/Usuarios'
import UsuarioDetalhes from '../pages/solucao/UsuarioDetalhes'
import DashboardView from '../pages/solucao/DashboardView'
import Relatorios from '../pages/solucao/Relatorios'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/integrantes" element={<Integrantes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/solucao" element={<Solucao />}>
          <Route index element={<SolucaoIndex />} />
          <Route path="match" element={<Match />} />
          <Route path="comunicacao" element={<Comunicacao />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="usuarios/:id" element={<UsuarioDetalhes />} />
          <Route path="dashboard" element={<DashboardView />} />
          <Route path="relatorios" element={<Relatorios />} />
        </Route>
      </Route>
    </Routes>
  )
}

const SolucaoIndex = () => (
  <div className="rounded-2xl bg-white p-8 shadow-sm border border-on-background/5">
    <span className="text-xs uppercase tracking-[0.2em] text-on-surface-variant font-medium">
      Ambiente autenticado
    </span>
    <h2 className="text-3xl font-bold text-on-background mt-2 mb-3">Bem-vindo à solução</h2>
    <p className="text-on-surface-variant">
      Acesse os módulos no menu principal para acompanhar dashboard, usuários, comunicações, matches e atendimentos.
    </p>
  </div>
)

export default AppRoutes
