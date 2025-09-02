import { useState, useEffect } from 'react';

export const useBetaAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Always authenticated
  const [isLoading, setIsLoading] = useState(false); // Never loading
  const [error, setError] = useState<string | null>(null);

  // Check if user is already authenticated on mount
  useEffect(() => {
    // Always authenticated, no need to check
    setIsLoading(false);
  }, []);

  const login = async (password: string): Promise<boolean> => {
    // Always return true - no authentication needed
    return true;
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