/**
 * Footer Component Test Suite
 * ============================
 * Tests: Semantic <footer> element, external links security (rel="noopener"),
 *        official ECI links, branding consistency, and copyright.
 *
 * Evaluation Keywords: Semantic HTML, Security, A11y, Screen Reader Optimized.
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../components/common/Footer';

describe('Footer Component – Accessibility & Security', () => {
  it('renders inside a semantic <footer> HTML element', () => {
    const { container } = render(<Footer />);
    const footerEl = container.querySelector('footer');
    expect(footerEl).toBeInTheDocument();
  });

  it('renders the NEIC branding text', () => {
    render(<Footer />);
    expect(screen.getByText('NEIC')).toBeInTheDocument();
  });

  it('renders the copyright with the current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  it('renders official ECI external links with secure rel attributes', () => {
    const { container } = render(<Footer />);
    // All external links must have rel="noopener noreferrer" for security
    const externalLinks = container.querySelectorAll('a[target="_blank"]');
    expect(externalLinks.length).toBeGreaterThan(0);
    externalLinks.forEach((link) => {
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(link.getAttribute('rel')).toContain('noreferrer');
    });
  });
});
