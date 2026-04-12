import Header from './components/Header'
import Footer from './components/Footer'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16 lg:pt-20">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App