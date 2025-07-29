import React, { useState, useRef } from 'react';

// Reuse RetroMessage styling for consistency
const OVERLAY_STYLE = {
  position: 'fixed' as const,
  top: 0, left: 0, width: '100vw', height: '100vh',
  background: 'rgba(0,0,0,0.85)',
  color: '#fff',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'auto' as const, // Allow interaction for login
  fontFamily: 'monospace',
  fontSize: '1.1rem', // Smaller font
};

const CONTAINER_STYLE = {
  pointerEvents: 'auto' as const,
  width: '600px',
  minHeight: '320px', // Changed to minHeight for flexibility
  padding: '20px',
  paddingLeft: '40px', // More to the left
  textAlign: 'left' as const,
  fontFamily: 'monospace',
  fontSize: '1.1rem', // Smaller font
  lineHeight: '1.5',
  display: 'flex',
  flexDirection: 'column' as const,
};

const PROMPT_STYLE = {
  color: '#fff',
  whiteSpace: 'nowrap' as const,
  height: '2.25em',
  lineHeight: '2.25em',
  marginBottom: '0.5em'
};

const MESSAGE_STYLE = {
  color: '#0f0',
  flex: 1, // Take remaining space
  wordWrap: 'break-word' as const,
  whiteSpace: 'pre-wrap' as const,
  lineHeight: '1.5',
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'space-between' as const
};

const INPUT_STYLE = {
  background: 'transparent',
  border: 'none',
  color: '#0f0',
  fontFamily: 'monospace',
  fontSize: '1.1rem', // Smaller font
  outline: 'none',
  width: '100%',
  caretColor: '#0f0',
  WebkitTextSecurity: 'disc' // Shows asterisks for password input
};

const PLACEHOLDER_STYLE = {
  color: '#666',
  fontFamily: 'monospace',
  fontSize: '1.1rem',
  fontStyle: 'italic'
};

const ERROR_STYLE = {
  color: '#f44336',
  fontSize: '1rem',
  marginTop: '0.5em'
};

interface BetaLoginProps {
  onLogin: (password: string) => Promise<boolean>;
  onCancel: () => void;
}

const BetaLogin: React.FC<BetaLoginProps> = ({ onLogin, onCancel }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const PROMPT = 'root@grapplingprimitives:~$';
  const MESSAGE = 'Enter beta access password:';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const success = await onLogin(password);
      if (!success) {
        setError('Invalid password. Please try again.');
        setPassword('');
        inputRef.current?.focus();
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      setPassword('');
      inputRef.current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  // Handle mobile keyboard "Done" button
  const handleInputComplete = (e: React.FormEvent) => {
    // For mobile, when user finishes typing and taps "Done"
    if (password.trim()) {
      handleSubmit(e);
    }
  };

  return (
    <div style={OVERLAY_STYLE}>
      <div style={CONTAINER_STYLE}>
        <div style={PROMPT_STYLE}>{PROMPT}</div>
        <div style={MESSAGE_STYLE}>
          {MESSAGE}
                          <form onSubmit={handleSubmit} style={{ marginTop: '0.5em' }}>
                  <input
                    ref={inputRef}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleInputComplete}
                    style={INPUT_STYLE}
                    placeholder="Enter password"
                    disabled={isLoading}
                    autoFocus
                  />
                  {isLoading && <span style={{ color: '#0f0' }}>|</span>}
                </form>
                
                {/* Mobile-friendly submit button */}
                <div style={{ marginTop: 'auto', textAlign: 'center', paddingTop: '1em' }}>
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e as any)}
                    disabled={isLoading || !password.trim()}
                    style={{
                      background: 'transparent',
                      border: '1px solid #0f0',
                      color: '#0f0',
                      fontFamily: 'monospace',
                      fontSize: '1rem',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      opacity: (!password.trim() || isLoading) ? 0.5 : 1
                    }}
                  >
                    {isLoading ? 'Logging in...' : 'Submit'}
                  </button>
                </div>
          {error && <div style={ERROR_STYLE}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default BetaLogin; 