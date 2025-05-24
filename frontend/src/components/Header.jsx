
import { useUser } from "../context/UserContext.jsx"



function Header({onLoginClick, onLogout}) {
    const { user } = useUser()

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <span className="text-4xl font-bold text-blue-600">Mi Bebé</span>
      {user ? (
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
            {user.username[0].toUpperCase()}
          </div>
          <button
            className="bg-gray-200 text-blue-600 px-4 py-2 rounded hover:bg-gray-300 transition"
            onClick={onLogout}
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={onLoginClick}
        >
          Iniciar sesión
        </button>
      )}
    </header>
  );
}

export default Header;