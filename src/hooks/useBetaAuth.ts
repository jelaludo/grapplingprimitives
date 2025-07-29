import { useState, useEffect } from 'react';

// Simple frontend-only authentication
// In production, we'll use a hardcoded hash for the default password
const PRODUCTION_PASSWORD_HASH = '$2a$12$rNod8ETf39GcFVsUuNlZhevwrdqIJJcxhsekoGh1dgA0Ib.eqCpnm'; // kimura42

export const useBetaAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('betaAuthToken');
    if (token) {
      // Simple token validation - just check if it exists and isn't expired
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        if (tokenData.exp && tokenData.exp > Date.now() / 1000) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('betaAuthToken');
        }
      } catch {
        localStorage.removeItem('betaAuthToken');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simple password check - in production, compare with hardcoded hash
      if (process.env.NODE_ENV === 'production') {
        // For production, we'll do a simple string comparison for now
        // This is not secure but works for basic beta access
        const isValid = password === 'kimura42';
        
        if (isValid) {
          // Create a simple JWT-like token
          const tokenData = {
            password: password,
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
            iat: Math.floor(Date.now() / 1000)
          };
          
          const token = btoa(JSON.stringify(tokenData));
          localStorage.setItem('betaAuthToken', token);
          setIsAuthenticated(true);
          return true;
        } else {
          setError('Invalid password');
          return false;
        }
      } else {
        // Development mode - use local passwords
        const response = await fetch('http://localhost:3001/api/auth/beta-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        });

        const data = await response.json();
        
        if (data.success) {
          localStorage.setItem('betaAuthToken', data.token);
          setIsAuthenticated(true);
          return true;
        } else {
          setError(data.error || 'Login failed');
          return false;
        }
      }
    } catch (err) {
      setError('Authentication failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('betaAuthToken');
    setIsAuthenticated(false);
    setError(null);
  };

  const verifyToken = async (): Promise<boolean> => {
    const token = localStorage.getItem('betaAuthToken');
    if (!token) return false;

    try {
      if (process.env.NODE_ENV === 'production') {
        // Simple token validation for production
        const tokenData = JSON.parse(atob(token));
        return tokenData.exp && tokenData.exp > Date.now() / 1000;
      } else {
        // Development mode - verify with backend
        const response = await fetch('http://localhost:3001/api/auth/beta-verify', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        return data.success;
      }
    } catch {
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