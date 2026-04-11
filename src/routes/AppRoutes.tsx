import { Routes, Route } from 'react-router-dom'
import Solucao from '../pages/Solucao'
import Match from '../pages/solucao/Match'
import Comunicacao from '../pages/solucao/Comunicacao'
import Usuarios from '../pages/solucao/Usuarios'
import DashboardView from '../pages/solucao/DashboardView'
import Relatorios from '../pages/solucao/Relatorios'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div className="p-6">Home Page</div>} />
      <Route path="/solucao" element={<Solucao />}>
        <Route path="match" element={<Match />} />
        <Route path="comunicacao" element={<Comunicacao />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="dashboard" element={<DashboardView />} />
        <Route path="relatorios" element={<Relatorios />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
