import { useState } from 'react'
import {authService} from '../services/auth' // Asegúrate de que la ruta sea correcta
import { getUser } from '../services/api'; // Asegúrate de que la ruta sea correcta
import { useUser } from '../context/UserContext'; // Asegúrate de que la ruta sea correcta


function LoginForm( { onLoginSuccess } ) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const { setUser } = useUser() // Usamos el contexto para manejar el usuario

  const handleSubmit =  async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    try {
        await authService.login(username, password)
        const userData = await getUser()
        localStorage.setItem('user_data', JSON.stringify(userData))
        setUser(userData) // Actualizamos el contexto con los datos del usuario
        setSuccess(true)
        // Redirigir o mostrar un mensaje de éxito
        onLoginSuccess()
    } catch (error) {
        setError('Error al iniciar sesión. Por favor, verifica tus credenciales.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">Iniciar sesión</h2>
      <div>
        <label className="block text-gray-700 mb-1" htmlFor="username">
          Nombre de usuario
        </label>
        <input
          id="username"
          type="text"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          placeholder='Introduzca su nombre de usuario'
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          placeholder='Introduzca su contraseña'
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
      >
        Acceder
      </button>
      <div className="text-center">
        <a href="#" className="text-blue-600 hover:underline text-sm">
          ¿No tienes cuenta? Regístrate
        </a>
      </div>
    </form>
  )
}

export default LoginForm