import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth'; // Asegúrate de tener un servicio de registro
import { getUser } from '../services/api'; // Asegúrate de que la ruta sea correcta
import { useUser } from '../context/UserContext'; // Asegúrate de que la ruta sea correcta

const fields = [
  { name: 'username', label: 'Usuario', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'first_name', label: 'Nombre', type: 'text', required: true },
  { name: 'last_name', label: 'Apellidos', type: 'text', required: true },
  { name: 'phone', label: 'Teléfono', type: 'text', required: false },
  { name: 'password', label: 'Contraseña', type: 'password', required: true },
  { name: 'confirm_password', label: 'Confirmar contraseña', type: 'password', required: true },
];
const requiredFields = fields.filter(f => f.required).map(f => f.name);


function RegisterForm() {
    const [form, setForm] = useState(
      Object.fromEntries(fields.map(f => [f.name, ''])),
    );
    const [error, setError] = useState(null);
    const { setUser } = useUser(); // Usamos el contexto para manejar el usuario
    const navigate = useNavigate();

    const requiredRefs = useRef(
         Object.fromEntries(fields.filter(f => f.required).map(f => [f.name, React.createRef()]))
    );

    const handleChange = (e) => {
        setForm({...form, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        // Validación de campos obligatorios
        for (const field of fields.filter(f => f.required)) {
            if (!form[field.name]) {
                setError(`El campo "${field.label}" es obligatorio`);
                requiredRefs.current[field.name].current.focus(); // Enfoca el campo requerido
                return;
            }
        }
        if (form.password !== form.confirm_password) {
            setError('Las contraseñas no coinciden');
            return;
        }
        // Verificación por consola de los datos del formulario
        console.log('Datos del formulario:', {
            username: form.username,
            email: form.email,
            first_name: form.first_name,
            last_name: form.last_name,
            phone: form.phone,
            password: form.password
        });
        try {
            await authService.register({
                username: form.username,
                email: form.email,  
                first_name: form.first_name,
                last_name: form.last_name,
                phone: form.phone,
                password: form.password
            });
            // Login automático después del registro
            await authService.login(form.username, form.password);
            // Redirigir al usuario a la página principal o donde desees
            const userData = await getUser();
            localStorage.setItem('user_data', JSON.stringify(userData));
            setUser(userData); // Actualiza el contexto o estado global con los datos del usuario
            navigate('/'); // Redirige al usuario a la página principal
        } catch (error) {
            setError('Error al registrar el usuario. Por favor, inténtalo de nuevo.');
            
        }
    }

    return (
        <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-auto mt-10 flex flex-col gap-3" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">Registro de usuario</h2>
            {error && <div className="text-red-600 text-center">{error}</div>}
            <div>
                {fields.map(field => (
                    <div key={field.name}>
                        <label className="block text-gray-700 mb-1" htmlFor={field.name}>
                        {field.label} {field.required && <span className="text-red-600">*</span>}
                        </label>
                        <input
                        id={field.name}
                        type={field.type}
                        value={form[field.name]}
                        onChange={handleChange}
                        ref={field.required ? requiredRefs.current[field.name] : null}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Introduce tu ${field.label.toLowerCase()}`}
                        // Puedes añadir data-testid si lo necesitas para los tests
                        data-testid={['password', 'confirm_password'].includes(field.name) ? field.name : undefined}
                        />
                    </div>
                    ))}
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