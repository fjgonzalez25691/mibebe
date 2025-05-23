function Header({onLoginClick}) {
  return (
    <header className="w-full flex justify-between items-center px-8 py-4 bg-white shadow">
      <span className="text-4xl font-bold text-blue-600">Mi Bebe</span>
      <button 
        onClick={onLoginClick} 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
        Iniciar sesión
      </button>
    </header>
  )
}

export default Header