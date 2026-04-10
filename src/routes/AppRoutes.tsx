import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import Sobre from '../pages/Sobre'
import FAQ from '../pages/FAQ'
import Contato from '../pages/Contato'
import Integrantes from '../pages/Integrantes'
import Solucao from '../pages/Solucao'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/solucao" element={<Solucao />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
