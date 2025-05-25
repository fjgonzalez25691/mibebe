import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
        password: '',
        confirm_password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        // Validación campos requeridos
        const requiredFields = ['username', 'email', 'first_name', 'last_name', 'password', 'confirm_password'];
        for (const field of requiredFields) {
            if (!form[field]) {
                setError(`El campo ${field} es requerido`);
                return;
            }
        }
        if (form.password !== form.confirm_password) {
            setError('Las contraseñas no coinciden');
            return;
        }
        try {
            // Aquí deberías llamar a tu servicio de registro
            // await authService.register(form.username, form.email, form.password);
            console.log('Registro exitoso:', form);
            // Redirigir o mostrar un mensaje de éxito
        } catch (error) {
            setError('Error al registrar el usuario. Por favor, inténtalo de nuevo.');
            console.error('Error durante el registro:', error);
        }
    }

    return (
        <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-auto mt-10 flex flex-col gap-3" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">Registro de usuario</h2>
            {error && <div className="text-red-600 text-center">{error}</div>}
            <div>
                <label className="block text-gray-700 mb-1" htmlFor="username">
                    Nombre de usuario <span className="text-red-600">*</span>
                </label>
                <input
                    id="username"
                    type="text"
                    autoComplete='username'
                    value={form.username}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Introduce tu nombre de usuario"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-1" htmlFor="email">
                    Email <span className="text-red-600">*</span>
                </label>
                <input
                    id="email"
                    type="email"
                    autoComplete='email'
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Introduce tu email"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-1" htmlFor="first_name">
                    Nombre <span className="text-red-600">*</span>
                </label>
                <input
                    id="first_name"
                    type="text"
                    autoComplete='given-name'
                    value={form.first_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Introduce tu nombre"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-1" htmlFor="last_name">
                    Apellidos <span className="text-red-600">*</span>
                </label>
                <input
                    id="last_name"
                    type="text"
                    autoComplete='family-name'
                    value={form.last_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Introduce tus apellidos"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-1" htmlFor="phone">
                    Teléfono
                </label>
                <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Introduce tu teléfono"
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-1" htmlFor="password">
                    Contraseña <span className="text-red-600">*</span>
                </label>
                <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Introduce tu contraseña"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-1" htmlFor="confirm_password">
                    Confirmar contraseña <span className="text-red-600">*</span>
                </label>
                <input
                    id="confirm_password"
                    type="password"
                    autoComplete="new-password"
                    value={form.confirm_password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Repite tu contraseña"
                    required
                />
            </div>
            <div className="text-sm text-gray-500 mb-2">
                <span className="text-red-600">*</span> Campos obligatorios
            </div>
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition font-semibold flex-1"
                >
                    Registrarse
                </button>
                <button
                    type="button"
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition font-semibold flex-1"
                    onClick={() => navigate('/')}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}

export default RegisterForm;