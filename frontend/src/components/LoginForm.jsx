import { useState } from 'react'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí puedes manejar la autenticación
    alert(`Usuario: ${username}\nContraseña: ${password}`)
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