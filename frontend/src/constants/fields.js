export const fields = [
  { name: 'username', label: 'Usuario', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'first_name', label: 'Nombre', type: 'text', required: true },
  { name: 'last_name', label: 'Apellidos', type: 'text', required: true },
  { name: 'phone', label: 'Teléfono', type: 'text', required: false },
  { name: 'password', label: 'Contraseña', type: 'password', required: true, testId: 'password' },
  { name: 'confirm_password', label: 'Confirmar contraseña', type: 'password', required: true, testId: 'confirm_password' },
];