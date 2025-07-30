import { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';

// Import production passwords
import productionPasswords from '../data/productionPasswords.json';

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
      // Production: check against bcrypt hashes from productionPasswords.json
      if (process.env.NODE_ENV === 'production') {
        let isValid = false;
        let matchedPassword: { hash: string; password: string; created: string; usageCount: number; lastUsed: string } | null = null;
        
        // Check against all production passwords
        for (const pw of productionPasswords.passwords) {
          const isMatch = await bcrypt.compare(password, pw.hash);
          if (isMatch) {
            isValid = true;
            matchedPassword = pw;
            break;
          }
        }
        
        if (isValid && matchedPassword) {
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
        // Development mode - check against local storage passwords
        const storedPasswords = localStorage.getItem('devBetaPasswords');
        const devPasswords = storedPasswords ? JSON.parse(storedPasswords) : [{ password: 'kimura42', usageCount: 0, lastUsed: 'Never' }];
        
        const matchingPassword = devPasswords.find((p: { password: string; usageCount: number; lastUsed: string }) => p.password === password);
        if (matchingPassword) {
          // Update usage stats
          matchingPassword.usageCount += 1;
          matchingPassword.lastUsed = new Date().toLocaleString();
          localStorage.setItem('devBetaPasswords', JSON.stringify(devPasswords));
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
        // Development mode - simple token validation
        const tokenData = JSON.parse(atob(token));
        return tokenData.exp && tokenData.exp > Date.now() / 1000;
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