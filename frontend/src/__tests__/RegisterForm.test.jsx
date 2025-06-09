import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'
import { authService } from '../services/auth'
import { fields } from '../constants/fields';

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

const validValues = {
  username: 'testuser',
  email: 'testuser@example.com',
  first_name: 'Test',
  last_name: 'User',
  phone: '',
  password: 'testpassword',
  confirm_password: 'testpassword',
  phone: '', // Campo opcional
};

const requiredFields = fields.filter(f => f.required);

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
    for (const field of fields) {
      if (field.testId) {
        fireEvent.change(screen.getByTestId(field.testId), { target: { value: validValues[field.name] } });
      } else {
        fireEvent.change(screen.getByLabelText(new RegExp(field.label, 'i')), { target: { value: validValues[field.name] } });
      }
    }

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }))

    const expectedRegisterData = Object.fromEntries(
      fields
          .filter(f => f.name !== 'confirm_password')
          .map(f => [f.name, validValues[f.name]])
    );

    await waitFor(() => {
      expect(authService.register).toHaveBeenCalledWith(expectedRegisterData);
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
      for (const f of fields) {
        if (f.name === field.name) continue;
        if (f.testId) {
          fireEvent.change(screen.getByTestId(f.testId), { target: { value: validValues[f.name] } });
        } else {
          fireEvent.change(screen.getByLabelText(new RegExp(f.label, 'i')), { target: { value: validValues[f.name] } });
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