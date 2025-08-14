import React, { useState, useEffect, useRef } from 'react';

const messages = [
  { en: "All models are wrong, some are useful", jp: "すべてのモデルは間違っているが、いくつかは役に立つ" },
  { en: "Speak Friend, and Enter", jp: "唱えよ、友、そして入れ" },
  { en: "Flow, Pressure, Finish", jp: "流れ、圧、極め" },
  { en: "Keep Training", jp: "練習を続けろ" },
  { en: "Don't Quit", jp: "諦めるな" },
  { en: "Mindful Practice", jp: "意識しながら練習" },
  { en: "Speak Friend, and Enter", jp: "唱えよ、友、そして入れ" },
  { en: "Switch your brain on", jp: "脳をオンにしろ" },
  { en: "Think. Practice. Repeat", jp: "思考。練習。反復。" },
  { en: "Theory is nothing without mat time", jp: "マット時間なければ理論だけは役に立たない" },
  { en: "Read less, roll more", jp: "見学よりも、動こう" },
  { en: "Daily beats Perfect", jp: "完璧より毎日" },
  { en: "Speak Friend, and Enter (yes LotR reference)", jp: "唱えよ、友、そして入れ" },
  { en: "Mat Time > Screen Time", jp: "マット時間 > スクリーン時間" },
  { en: "Keep Showing up", jp: "現れ続けろ" },
  { en: "Don't let thinking replace doing", jp: "考えることで行動を置き換えるな" },
  { en: "Speak Friend, and Enter", jp: "唱えよ、友、そして入れ" },
  { en: "Breathe, feel, adjust", jp: "呼吸、感覚、調整" },
  { en: "Build those neuromuscular pathways", jp: "神経筋経路を構築せよ" },
  { en: "Etch Grappling Grooves in your brain", jp: "脳にグラップリングの溝を刻め" },
  { en: "Speak Friend, and Enter", jp: "唱えよ、友、そして入れ" },
  { en: "Proof of Work on the mats", jp: "マット上でも作業証明" },
  { en: "Take care of your training partners", jp: "練習相手を大切に" }
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
  fontSize: '1.1rem', // Smaller font
};

const CONTAINER_STYLE = {
  pointerEvents: 'none' as const,
  width: '600px',
  height: '200px',
  padding: '20px',
  paddingLeft: '40px', // More to the left
  textAlign: 'left' as const,
  fontFamily: 'monospace',
  fontSize: '1.1rem', // Smaller font
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
  lineHeight: '1.4', // Slightly tighter line height for more content
  overflow: 'hidden' as const
};

interface RetroMessageProps {
  onFirstInteraction?: () => void;
}

const RetroMessage: React.FC<RetroMessageProps> = ({ onFirstInteraction }) => {
  const [visible, setVisible] = useState(true);
  const [msgIndex, setMsgIndex] = useState(0);
  const [text, setText] = useState('');
  const [cursor, setCursor] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
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
    const fullMessage = `${message.en}\n${message.jp}`;
    let charIndex = 0;
    
    const typeNextChar = () => {
      if (charIndex < fullMessage.length) {
        setText(fullMessage.slice(0, charIndex + 1));
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
    const hide = () => {
      if (!hasInteracted && onFirstInteraction) {
        onFirstInteraction();
        setHasInteracted(true);
      }
      setVisible(false);
    };
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