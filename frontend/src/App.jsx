import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactlogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import djangoLogo from './assets/django_rest.svg'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import { authService } from './services/auth' 
import { useUser } from './context/UserContext' 
import RegisterForm from './components/RegisterForm'
import { useNavigate } from 'react-router-dom'

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const { setUser } = useUser() // Usamos el contexto para manejar el usuario
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null) // Limpiamos el usuario en el contexto
    setShowLogin(false);
    navigate('/');

  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header onLoginClick={() => setShowLogin(true)} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <main className="flex-1 flex items-center justify-center flex-col">
              <div className="flex items-center justify-between mb-4 gap-11">
                <a href="https://vitejs.dev" target="_blank"> 
                  <img src={viteLogo} className="h-24" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank">
                  <img src={reactlogo} className="h-24" alt="React logo" />
                </a>
                <a href="https://www.django-rest-framework.org/" target="_blank">
                  <img src={djangoLogo} className="h-24" alt="Django logo" />
                </a>
              </div>
              <h1 className="sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
                Frontend: Vite + React + Tailwind CSS
                <br className="hidden sm:block"/>
                <span className="block my-4"></span>
                Backend: Django + Django REST Framework
              </h1>
              <h6 className="text-base mt-4 text-center">
                Página en construcción
              </h6>
            </main>
          }
        />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
              onClick={() => setShowLogin(false)}
              aria-label="Cerrar"
            >
              &times;
            </button>
            <LoginForm 
              onLoginSuccess={() => {
                setShowLogin(false);
                navigate('/');
              }}
              onClose={() => setShowLogin(false)}
            />
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default App
