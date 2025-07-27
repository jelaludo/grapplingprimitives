import React, { useState, useEffect, useRef } from 'react';

const messages = [
  "All models are wrong, some are useful",
  "Keep Training",
  "Don't Quit",
  "Mindful Practice",
  "Switch your brain on",
  "Think. Practice. Repeat",
  "Theory is nothing without mat time",
  "Read less, roll more",
  "Daily beats Perfect",
  "Mat Time > Screen Time",
  "Keep Showing up",
  "Don't let thinking replace doing",
  "Breathe, feel, adjust",
  "Build those neuromuscular pathways",
  "Etch Grappling Grooves in your brain",
  "Proof of Work on the mats",
  "Take care of your training partners"
];

const PROMPT = 'root@grapplingprimitives:~$';
const MSG_COUNT = messages.length;
const TYPING_SPEED = 40;
const DISPLAY_TIME = 2000;
const CURSOR_BLINK = 500;

// Pre-computed styles for performance
const OVERLAY_STYLE = {
  position: 'fixed' as const,
  top: 0, left: 0, width: '100vw', height: '100vh',
  background: 'rgba(0,0,0,0.85)',
  color: '#fff',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none' as const,
  fontFamily: 'monospace',
  fontSize: '1.5rem',
};

const CONTAINER_STYLE = {
  pointerEvents: 'none' as const,
  width: '600px',
  height: '200px',
  padding: '20px',
  paddingLeft: '60px',
  textAlign: 'left' as const,
  fontFamily: 'monospace',
  fontSize: '1.5rem',
  lineHeight: '1.5',
  overflow: 'hidden' as const,
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
  height: 'calc(200px - 2.75em - 40px)',
  wordWrap: 'break-word' as const,
  whiteSpace: 'pre-wrap' as const,
  lineHeight: '1.5',
  overflow: 'hidden' as const
};

const RetroMessage: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [msgIndex, setMsgIndex] = useState(0);
  const [text, setText] = useState('');
  const [cursor, setCursor] = useState(true);
  const timer = useRef<NodeJS.Timeout | null>(null);

  // Single lifecycle manager - Carmack style: direct, no state machine
  useEffect(() => {
    if (!visible) return;

    // Cursor blink
    const cursorTimer = setInterval(() => setCursor(c => !c), CURSOR_BLINK);

    // Clear text when message index changes (except first load)
    if (msgIndex > 0) {
      setText('');
    }

    // Direct message cycling - no complex state transitions
    const message = messages[msgIndex];
    let charIndex = 0;
    
    const typeNextChar = () => {
      if (charIndex < message.length) {
        setText(message.slice(0, charIndex + 1));
        charIndex++;
        timer.current = setTimeout(typeNextChar, TYPING_SPEED);
      } else {
        // Message complete - wait, then cycle to next
        timer.current = setTimeout(() => {
          setMsgIndex(prev => (prev + 1) % MSG_COUNT);
        }, DISPLAY_TIME);
      }
    };

    // Start typing immediately
    typeNextChar();

    // Event listeners
    const hide = () => setVisible(false);
    const events = ['mousedown', 'keydown', 'touchstart', 'scroll', 'wheel'];
    events.forEach(event => window.addEventListener(event, hide, { once: true }));

    return () => {
      clearInterval(cursorTimer);
      if (timer.current) clearTimeout(timer.current);
      events.forEach(event => window.removeEventListener(event, hide));
    };
  }, [visible, msgIndex]);

  if (!visible) return null;

  return (
    <div style={OVERLAY_STYLE}>
      <div style={CONTAINER_STYLE}>
        <div style={PROMPT_STYLE}>{PROMPT}</div>
        <div style={MESSAGE_STYLE}>
          {text}
          {cursor && <span style={{ color: '#0f0' }}>|</span>}
        </div>
      </div>
    </div>
  );
};

export default RetroMessage; 