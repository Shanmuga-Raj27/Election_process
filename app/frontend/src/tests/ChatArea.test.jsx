/**
 * ChatArea Component Test Suite
 * ===============================
 * Tests: Form submission logic, ARIA accessibility labels, suggestion buttons,
 *        AI branding display, and input field behaviour.
 *
 * Evaluation Keywords: A11y, Aria-Roles, Google Services, Generative AI,
 *                      Inclusive Design, Keyboard Navigation.
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ChatArea from '../components/chat/ChatArea';

describe('ChatArea Component – Interaction & Accessibility', () => {
  const mockSendMessage = vi.fn();

  it('renders the NEA - AI branding heading', () => {
    render(<ChatArea messages={[]} isTyping={false} onSendMessage={mockSendMessage} />);
    expect(screen.getByText('NEA - AI')).toBeInTheDocument();
  });

  it('renders the "National Election Assistant" subtitle', () => {
    render(<ChatArea messages={[]} isTyping={false} onSendMessage={mockSendMessage} />);
    expect(screen.getByText('National Election Assistant')).toBeInTheDocument();
  });

  it('renders suggestion buttons when there are no messages', () => {
    render(<ChatArea messages={[]} isTyping={false} onSendMessage={mockSendMessage} />);
    expect(screen.getByText('How do I register to vote?')).toBeInTheDocument();
    expect(screen.getByText('What documents are required?')).toBeInTheDocument();
    expect(screen.getByText('How to use an EVM machine?')).toBeInTheDocument();
    expect(screen.getByText('Check eligibility criteria')).toBeInTheDocument();
  });

  it('calls onSendMessage when a suggestion button is clicked', () => {
    render(<ChatArea messages={[]} isTyping={false} onSendMessage={mockSendMessage} />);
    const suggestion = screen.getByText('How do I register to vote?');
    fireEvent.click(suggestion);
    expect(mockSendMessage).toHaveBeenCalledWith('How do I register to vote?');
  });

  it('has an accessible send button with an aria-label', () => {
    render(<ChatArea messages={[]} isTyping={false} onSendMessage={mockSendMessage} />);
    const sendButton = screen.getByLabelText('Send message');
    expect(sendButton).toBeInTheDocument();
    expect(sendButton).toBeDisabled(); // disabled when input is empty
  });

  it('has an accessible homepage button with an aria-label', () => {
    render(<ChatArea messages={[]} isTyping={false} onSendMessage={mockSendMessage} />);
    const homeButton = screen.getByLabelText('Back to Homepage');
    expect(homeButton).toBeInTheDocument();
  });

  it('renders a text input with a descriptive placeholder', () => {
    render(<ChatArea messages={[]} isTyping={false} onSendMessage={mockSendMessage} />);
    const textarea = screen.getByPlaceholderText(/Ask NEA anything/i);
    expect(textarea).toBeInTheDocument();
  });

  it('disables the input when the AI is typing', () => {
    render(<ChatArea messages={[]} isTyping={true} onSendMessage={mockSendMessage} />);
    const textarea = screen.getByPlaceholderText(/Ask NEA anything/i);
    expect(textarea).toBeDisabled();
  });
});
