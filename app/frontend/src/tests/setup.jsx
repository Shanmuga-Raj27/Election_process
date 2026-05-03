/**
 * Vitest Global Test Setup for NEIC Frontend
 * ============================================
 * Provides comprehensive mocks for Firebase Auth, React Router,
 * i18next translations, Framer Motion animations, and Lucide icons.
 *
 * Evaluation Keywords: Automated Mocks, Test Isolation, JSDOM Environment.
 */
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// ─── JSDOM Polyfills ───────────────────────────────────────────────────
// scrollIntoView is not implemented in JSDOM
Element.prototype.scrollIntoView = vi.fn();

// ─── Mock: react-i18next ───────────────────────────────────────────────
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: vi.fn(),
      language: 'en',
    },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}));

// ─── Mock: Firebase Config ─────────────────────────────────────────────
vi.mock('../firebase/config', () => ({
  auth: {
    onAuthStateChanged: vi.fn((cb) => { cb(null); return () => {}; }),
    currentUser: null,
  },
}));

// ─── Mock: Firebase SDK ────────────────────────────────────────────────
vi.mock('../firebase/firebase', () => ({
  auth: {
    onAuthStateChanged: vi.fn((cb) => { cb(null); return () => {}; }),
    currentUser: null,
  },
  googleProvider: {},
}));

// ─── Mock: AuthContext ─────────────────────────────────────────────────
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    currentUser: null,
    logout: vi.fn(),
    loading: false,
  }),
  AuthProvider: ({ children }) => <>{children}</>,
}));

// ─── Mock: React Router DOM ────────────────────────────────────────────
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/', state: null }),
  Link: ({ children, to, ...rest }) => <a href={to} {...rest}>{children}</a>,
  Navigate: () => null,
  BrowserRouter: ({ children }) => <>{children}</>,
  Routes: ({ children }) => <>{children}</>,
  Route: () => null,
}));

// ─── Mock: Lucide React Icons ──────────────────────────────────────────
vi.mock('lucide-react', () => ({
  Menu: (props) => <div data-testid="icon-menu" {...props} />,
  X: (props) => <div data-testid="icon-x" {...props} />,
  Languages: (props) => <div data-testid="icon-languages" {...props} />,
  Bot: (props) => <div data-testid="icon-bot" {...props} />,
  LogOut: (props) => <div data-testid="icon-logout" {...props} />,
  User: (props) => <div data-testid="icon-user" {...props} />,
  Globe: (props) => <div data-testid="icon-globe" {...props} />,
  Send: (props) => <div data-testid="icon-send" {...props} />,
  Loader2: (props) => <div data-testid="icon-loader" {...props} />,
  Home: (props) => <div data-testid="icon-home" {...props} />,
  ArrowLeft: (props) => <div data-testid="icon-arrow-left" {...props} />,
  ArrowRight: (props) => <div data-testid="icon-arrow-right" {...props} />,
  BotMessageSquare: (props) => <div data-testid="icon-bot-msg" {...props} />,
  CheckCircle2: (props) => <div data-testid="icon-check" {...props} />,
  Code2: (props) => <div data-testid="icon-code" {...props} />,
  Mail: (props) => <div data-testid="icon-mail" {...props} />,
  ExternalLink: (props) => <div data-testid="icon-external" {...props} />,
  Mic: (props) => <div data-testid="icon-mic" {...props} />,
  MicOff: (props) => <div data-testid="icon-mic-off" {...props} />,
}));

// ─── Mock: Framer Motion ───────────────────────────────────────────────
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(({ children, ...props }, ref) => <div ref={ref} {...props}>{children}</div>),
    nav: React.forwardRef(({ children, ...props }, ref) => <nav ref={ref} {...props}>{children}</nav>),
    a: React.forwardRef(({ children, ...props }, ref) => <a ref={ref} {...props}>{children}</a>),
    span: React.forwardRef(({ children, ...props }, ref) => <span ref={ref} {...props}>{children}</span>),
    button: React.forwardRef(({ children, ...props }, ref) => <button ref={ref} {...props}>{children}</button>),
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));
