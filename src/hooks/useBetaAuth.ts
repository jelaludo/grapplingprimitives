import { useState, useEffect } from 'react';

export const useBetaAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('betaAuthToken');
    if (token) {
      // Verify token with backend
      verifyToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the backend API for authentication
      const response = await fetch('/api/auth/beta-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        // Store the JWT token from the backend
        localStorage.setItem('betaAuthToken', data.token);
        setIsAuthenticated(true);
        return true;
      } else {
        setError(data.error || 'Invalid password');
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Authentication failed. Please check your connection.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint
      await fetch('/api/auth/beta-logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('betaAuthToken')}`,
        },
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('betaAuthToken');
      setIsAuthenticated(false);
      setError(null);
    }
  };

  const verifyToken = async (): Promise<boolean> => {
    const token = localStorage.getItem('betaAuthToken');
    if (!token) {
      setIsLoading(false);
      return false;
    }

    try {
      const response = await fetch('/api/auth/beta-verify', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      } else {
        localStorage.removeItem('betaAuthToken');
        setIsAuthenticated(false);
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      console.error('Token verification error:', err);
      localStorage.removeItem('betaAuthToken');
      setIsAuthenticated(false);
      setIsLoading(false);
      return false;
    }
  };

  return {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    verifyToken
  };
}; 