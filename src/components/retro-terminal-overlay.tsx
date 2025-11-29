"use client";

import React, { useState, useEffect, useRef } from 'react';

const messages = [
  { en: "All models are wrong, some are useful", jp: "すべてのモデルは間違っているが、いくつかは役に立つ" },
  { en: "Speak Friend, and Enter", jp: "唱えよ、友、そして入れ" },
  { en: "Flow, Pressure, Finish", jp: "流れ、圧、極め" },
  { en: "Keep Training", jp: "練習を続けろ" },
  { en: "Don't Quit", jp: "諦めるな" },
  { en: "Mindful Practice", jp: "意識しながら練習" },
  { en: "Switch your brain on", jp: "脳をオンにしろ" },
  { en: "Think. Practice. Repeat", jp: "思考。練習。反復。" },
  { en: "Theory is nothing without mat time", jp: "マット時間なければ理論だけは役に立たない" },
  { en: "Read less, roll more", jp: "見学よりも、動こう" },
  { en: "Daily beats Perfect", jp: "完璧より毎日" },
  { en: "Mat Time > Screen Time", jp: "マット時間 > スクリーン時間" },
  { en: "Keep Showing up", jp: "現れ続けろ" },
  { en: "Don't let thinking replace doing", jp: "考えることで行動を置き換えるな" },
  { en: "Breathe, feel, adjust", jp: "呼吸、感覚、調整" },
  { en: "Build those neuromuscular pathways", jp: "神経筋経路を構築せよ" },
  { en: "Etch Grappling Grooves in your brain", jp: "脳にグラップリングの溝を刻め" },
  { en: "Proof of Work on the mats", jp: "マット上でも作業証明" },
  { en: "Take care of your training partners", jp: "練習相手を大切に" }
];

const PROMPT = 'root@grapplingprimitives:~$';
const MSG_COUNT = messages.length;
const TYPING_SPEED = 40;
const DISPLAY_TIME = 2000;
const CURSOR_BLINK = 500;

export const RetroTerminalOverlay: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [msgIndex, setMsgIndex] = useState(0);
  const [text, setText] = useState('');
  const [cursor, setCursor] = useState(true);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!visible) return;

    // Cursor blink
    const cursorTimer = setInterval(() => setCursor(c => !c), CURSOR_BLINK);

    // Clear text when message index changes
    if (msgIndex > 0) {
      setText('');
    }

    // Type out current message (English and Japanese)
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

    // Handle keyboard, scroll, and wheel events
    const handleInteraction = (e: Event) => {
      if (e.type === 'keydown' || e.type === 'scroll' || e.type === 'wheel') {
        setVisible(false);
      }
    };
    
    const events = ['keydown', 'scroll', 'wheel'];
    events.forEach(event => window.addEventListener(event, handleInteraction, { once: true }));

    return () => {
      clearInterval(cursorTimer);
      if (timer.current) clearTimeout(timer.current);
      events.forEach(event => window.removeEventListener(event, handleInteraction));
    };
  }, [visible, msgIndex]);

  // Handle click to dismiss
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(false);
  };

  // Handle touch to dismiss
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/85 text-white z-[9999] flex items-center justify-center font-mono cursor-pointer"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
    >
      <div className="w-[600px] text-left font-mono text-lg">
        {/* Fixed prompt line - stays in place */}
        <div className="text-white whitespace-nowrap mb-2">
          {PROMPT}
        </div>
        {/* Message area - only one message at a time */}
        <div className="text-green-500 min-h-[4rem] break-words whitespace-pre-wrap leading-relaxed">
          {text}
          {cursor && <span className="text-green-500">|</span>}
        </div>
        {/* Mobile-friendly click hint */}
        <div className="absolute bottom-4 right-4 text-sm text-white/60 italic">
          Click anywhere to continue
        </div>
      </div>
    </div>
  );
};

