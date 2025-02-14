const AUTH_TOKEN_KEY = 'auth_token';

export const login = (email, password) => {
  // In a real app, you would validate credentials with a backend
  if (email === 'test@example.com' && password === 'password') {
    const token = 'fake_jwt_token';
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    return true;
  }
  return false;
};

export const signup = (name, email, password) => {
  // In a real app, you would send this data to a backend
  console.log('Signup:', { name, email, password });
  return true;
};

export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
};