import { SignUpFormData, SignUpErrors } from '../types/auth';

export const validateSignUpForm = (data: SignUpFormData): SignUpErrors => {
  const errors: SignUpErrors = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Surname validation
  if (!data.surname.trim()) {
    errors.surname = 'Surname is required';
  } else if (data.surname.trim().length < 2) {
    errors.surname = 'Surname must be at least 2 characters';
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password validation
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  // Confirm password validation
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export const isFormValid = (errors: SignUpErrors): boolean => {
  return Object.keys(errors).length === 0;
};