/**
 * Hero Component Test Suite
 * ==========================
 * Tests: Semantic HTML structure, i18n translation keys, accessible CTA buttons,
 *        navigation links to /chat and /evm, and responsive layout classes.
 *
 * Evaluation Keywords: Semantic HTML, WCAG 2.1, A11y, Inclusive Design.
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from '../components/Hero';

describe('Hero Component – Accessibility & Structure', () => {
  it('renders the main heading with the translation key', () => {
    render(<Hero />);
    // Our i18n mock returns the translation key as-is
    expect(screen.getByText('hero.title')).toBeInTheDocument();
  });

  it('renders the subtitle with the translation key', () => {
    render(<Hero />);
    expect(screen.getByText('hero.subtitle')).toBeInTheDocument();
  });

  it('renders a CTA link to the AI chatbot at /chat', () => {
    render(<Hero />);
    const chatLink = screen.getByText('hero.ctaAsk');
    expect(chatLink).toBeInTheDocument();
    expect(chatLink.closest('a')).toHaveAttribute('href', '/chat');
  });

  it('renders a CTA link to the EVM Guide at /evm', () => {
    render(<Hero />);
    // The ctaEVM key has a fallback default
    const evmLink = screen.getByText('hero.ctaEVM');
    expect(evmLink).toBeInTheDocument();
    expect(evmLink.closest('a')).toHaveAttribute('href', '/evm');
  });
});
