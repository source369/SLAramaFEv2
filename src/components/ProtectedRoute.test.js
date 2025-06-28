import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from '../contexts/AuthContext';

function renderWithProviders(ui, { route = '/protected' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/protected" element={ui} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('ProtectedRoute', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('redirects unauthenticated users to /login', async () => {
    renderWithProviders(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(await screen.findByText('Login Page')).toBeTruthy();
  });

  test('shows protected content for authenticated users', async () => {
    localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test', role: 'user' }));

    renderWithProviders(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(await screen.findByText('Protected Content')).toBeTruthy();
  });
});
