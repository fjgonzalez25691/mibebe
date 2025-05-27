import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactlogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import djangoLogo from './assets/django-logo-negative.svg'
import django_rest_logo from './assets/django_rest.svg'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import { authService } from './services/auth' 
import { useUser } from './context/UserContext' 
import RegisterForm from './components/RegisterForm'
import HomePage from './pages/HomePage'
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
        <Route path="/" element={<HomePage />} />
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
