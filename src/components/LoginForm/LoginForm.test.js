import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '.';
import { validateEmail, validatePassword } from '../../utils/validation';

test('renders sign in page', () => {
  render(<LoginForm />);
  expect(screen.getByText('Sign in')).toBeInTheDocument();
});

describe('Email validation', () => {
  test('accepts a valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  test('rejects an invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false);
  });
});

describe('Password validation', () => {
  test('accepts a password meeting all requirements', () => {
    expect(validatePassword('Strong@123')).toBe(true);
  });

  test('rejects a password shorter than 8 characters', () => {
    expect(validatePassword('Ab@123')).toBe(false);
  });

  test('rejects a password without uppercase letters', () => {
    expect(validatePassword('strong@123')).toBe(false);
  });

  test('rejects a password without lowercase letters', () => {
    expect(validatePassword('STRONG@123')).toBe(false);
  });

  test('rejects a password without a digit', () => {
    expect(validatePassword('Strong@abc')).toBe(false);
  });

  test('rejects a password without a special character', () => {
    expect(validatePassword('Strong123')).toBe(false);
  });
});

describe('Login form submission', () => {
  test('shows errors when the email and password are invalid', () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'invalid-email' },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'weak' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(screen.getByText('Please enter a valid email address.'))
      .toBeInTheDocument();

    expect(screen.getByText(/password must be at least 8 characters/i))
      .toBeInTheDocument();

    expect(screen.queryByText('Login Successful')).not.toBeInTheDocument();
  });

  test('shows success message when both fields are valid', () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'user@example.com' },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Strong@123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(screen.getByText('Login Successful')).toBeInTheDocument();
  });
});