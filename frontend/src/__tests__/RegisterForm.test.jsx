import React from 'react';
import { describe, it, expect, vi } from 'vitest'
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

describe('RegisterForm', () => {
  it('envía los datos y realiza login tras el registro', async () => {
    authService.register.mockResolvedValueOnce({})
    authService.login.mockResolvedValueOnce({ access: 'fake-token', refresh: 'fake-refresh' })

    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    )

    fireEvent.change(screen.getByLabelText(/Usuario */i), { target: { value: 'testuser' } })
    fireEvent.change(screen.getByLabelText(/Email */i), { target: { value: 'testuser@example.com' } })
    fireEvent.change(screen.getByLabelText(/Nombre */i), { target: { value: 'Test' } })
    fireEvent.change(screen.getByLabelText(/Apellidos */i), { target: { value: 'User' } })
    fireEvent.change(screen.getByTestId(/password/i), { target: { value: 'testpassword' } })
    fireEvent.change(screen.getByTestId(/confirm/i), { target: { value: 'testpassword' } })

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
})