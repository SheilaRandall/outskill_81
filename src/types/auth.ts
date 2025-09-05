export interface SignUpFormData {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpErrors {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export interface AuthState {
  isLoading: boolean;
  error: string | null;
}