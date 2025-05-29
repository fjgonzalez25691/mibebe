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

afterEach(() => {
  vi.clearAllMocks()
})

const requiredFields = [
  { label: /Usuario */i, name: 'username', value: 'testuser' },
  { label: /Email */i, name: 'email', value: 'testuser@example.com' },
  { label: /Nombre */i, name: 'first_name', value: 'Test' },
  { label: /Apellidos */i, name: 'last_name', value: 'User' },
  { testId: 'password', name: 'password', value: 'testpassword' },
  { testId: 'confirm', name: 'confirm_password', value: 'testpassword' },
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
        fireEvent.change(screen.getByLabelText(field.label), { target: { value: field.value } });
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

  requiredFields.forEach(({ label, testId, name }) => {
    it(`muestra un error si falta el campo requerido "${name}"`, async () => {
      render(
        <BrowserRouter>
          <RegisterForm />
        </BrowserRouter>
      );

      // Rellenamos todos los campos menos el que estamos probando
      for (const field of requiredFields) {
        if (field.name === name) continue;
        if (field.testId) {
          fireEvent.change(screen.getByTestId(field.testId), { target: { value: field.value } });
        } else {
          fireEvent.change(screen.getByLabelText(field.label), { target: { value: field.value } });
        }
      }

      fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

      await waitFor(() => {
        expect(
          screen.getByText((content) =>
            content.includes(`El campo ${name} es requerido`)
          )
        ).toBeInTheDocument();
      });

      expect(authService.register).not.toHaveBeenCalled();
    });
  });
});