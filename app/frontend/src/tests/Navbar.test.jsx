import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navbar from '../components/Navbar';
import * as AuthContext from '../context/AuthContext';

// We will spy on the useAuth hook
vi.spyOn(AuthContext, 'useAuth');

describe('Navbar Component', () => {
  it('renders the branding title NEIC', () => {
    // Setup mock for logged out user
    AuthContext.useAuth.mockReturnValue({
      currentUser: null,
      logout: vi.fn()
    });

    render(<Navbar />);
    expect(screen.getByText('NEIC')).toBeInTheDocument();
  });

  it('shows the Login button when user is not logged in', () => {
    AuthContext.useAuth.mockReturnValue({
      currentUser: null,
      logout: vi.fn()
    });

    render(<Navbar />);
    // In our mock, Link renders as <a>, and translation returns the key or text
    const loginLink = screen.getByText('Login');
    expect(loginLink).toBeInTheDocument();
  });

  it('shows user display name when logged in', () => {
    AuthContext.useAuth.mockReturnValue({
      currentUser: { displayName: 'John Doe' },
      logout: vi.fn()
    });

    render(<Navbar />);
    expect(screen.getByText(/Hi, John Doe/i)).toBeInTheDocument();
  });
});
