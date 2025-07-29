import { useState, useEffect, useCallback } from 'react';

interface BetaAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  error?: string;
}

// Dynamic API base URL for production vs development
const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    // In production, use relative URLs or environment variable
    return process.env.REACT_APP_API_URL || '';
  }
  return 'http://localhost:3001';
};

export const useBetaAuth = () => {
  const [authState, setAuthState] = useState<BetaAuthState>({
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  // Check for existing JWT on mount
  useEffect(() => {
    const token = localStorage.getItem('betaToken');
    if (token) {
      // Verify token with backend
      verifyToken(token);
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const verifyToken = useCallback(async (token: string) => {
    try {
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/api/auth/beta-verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } else {
        // Token invalid, remove it
        localStorage.removeItem('betaToken');
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('betaToken');
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: 'Authentication failed'
      });
    }
  }, []);

  const login = useCallback(async (password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/api/auth/beta-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });

      const data: LoginResponse = await response.json();

      if (data.success && data.token) {
        localStorage.setItem('betaToken', data.token);
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
        return true;
      } else {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          error: data.error || 'Login failed'
        });
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: 'Network error'
      });
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem('betaToken');
      if (token) {
        // Notify backend of logout
        const apiBaseUrl = getApiBaseUrl();
        await fetch(`${apiBaseUrl}/api/auth/beta-logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout notification failed:', error);
    } finally {
      localStorage.removeItem('betaToken');
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    }
  }, []);

  const getAuthHeaders = useCallback(() => {
    const token = localStorage.getItem('betaToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }, []);

  return {
    ...authState,
    login,
    logout,
    getAuthHeaders
  };
}; 