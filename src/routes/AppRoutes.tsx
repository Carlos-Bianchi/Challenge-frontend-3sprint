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
      <Route path="/solucao" element={<Solucao />}>
        <Route index element={<SolucaoIndex />} />
        <Route path="match" element={<Match />} />
        <Route path="comunicacao" element={<Comunicacao />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="usuarios/:id" element={<UsuarioDetalhes />} />
        <Route path="dashboard" element={<DashboardView />} />
        <Route path="relatorios" element={<Relatorios />} />
      </Route>
    </Routes>
  )
}

const SolucaoIndex = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Bem-vindo à Solução</h2>
    <p className="text-gray-600">Selecione um módulo no menu lateral para começar.</p>
  </div>
)

export default AppRoutes