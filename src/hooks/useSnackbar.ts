import { useState, useCallback } from 'react';

// Pre-computed constants
const DEFAULT_DURATION = 3000;

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const showMessage = useCallback((msg: string, duration: number = DEFAULT_DURATION) => {
    setMessage(msg);
    setOpen(true);
    
    // Auto-hide after duration
    setTimeout(() => setOpen(false), duration);
  }, []);

  const hideMessage = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    message,
    showMessage,
    hideMessage
  };
}; 