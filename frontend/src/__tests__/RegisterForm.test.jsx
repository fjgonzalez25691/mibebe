import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'
import { authService } from '../services/auth'

// Mock del servicio de registro y login
vi.mock('../services/auth', () => ({
  authService: {
    register: vi.fn(),
    login: vi.fn(),
  },
}))

// Mock del contexto de usuario
vi.mock('../context/UserContext', () => ({
  useUser: () => ({
    setUser: vi.fn(),
  }),
}))

afterEach(() => {
  vi.clearAllMocks()
})

const requiredFields = [
  { label: 'Usuario', name: 'username', value: 'testuser' },
  { label: 'Email', name: 'email', value: 'testuser@example.com' },
  { label: 'Nombre', name: 'first_name', value: 'Test' },
  { label: 'Apellidos', name: 'last_name', value: 'User' },
  { label: 'Contraseña', name: 'password', value: 'testpassword', testId: 'password' },
  { label: 'Confirmar contraseña', name: 'confirm_password', value: 'testpassword', testId: 'confirm_password' },
];

describe('RegisterForm', () => {
  it('envía los datos y realiza login tras el registro', async () => {
    authService.register.mockResolvedValueOnce({})
    authService.login.mockResolvedValueOnce({ access: 'fake-token', refresh: 'fake-refresh' })

    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    )

    // Rellenamos el formulario usando el array
    for (const field of requiredFields) {
      if (field.testId) {
        fireEvent.change(screen.getByTestId(field.testId), { target: { value: field.value } });
      } else {
        fireEvent.change(screen.getByLabelText(new RegExp(field.label, 'i')), { target: { value: field.value } });
      }
    }

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }))

    await waitFor(() => {
      expect(authService.register).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'testuser@example.com',
        first_name: 'Test',
        last_name: 'User',
        phone: '',
        password: 'testpassword',
      })
      expect(authService.login).toHaveBeenCalledWith('testuser', 'testpassword')
    })
  })

  requiredFields.forEach((field) => {
    it(`muestra un error si falta el campo requerido "${field.name}"`, async () => {
      render(
        <BrowserRouter>
          <RegisterForm />
        </BrowserRouter>
      );

      // Rellenamos todos los campos menos el que estamos probando
      for (const f of requiredFields) {
        if (f.name === field.name) continue;
        if (f.testId) {
          fireEvent.change(screen.getByTestId(f.testId), { target: { value: f.value } });
        } else {
          fireEvent.change(screen.getByLabelText(new RegExp(f.label, 'i')), { target: { value: f.value } });
        }
      }

      fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

      await waitFor(() => {
        expect(
          screen.getByText((content) =>
            content.includes(`El campo "${field.label}" es obligatorio`)
          )
        ).toBeInTheDocument();
      });

      expect(authService.register).not.toHaveBeenCalled();
    });
  });
});