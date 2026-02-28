'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [cursorText, setCursorText] = useState<string | null>(null);

  useEffect(() => {
    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let rafId = 0;
    let isHover = false;
    let isClick = false;
    let activeText: string | null = null;

    const setDot = (x: number, y: number) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const setRing = (x: number, y: number) => {
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const applyRingState = () => {
      if (!ringRef.current) return;
      if (activeText) {
        // Expand massively to contain text
        ringRef.current.style.width = '80px';
        ringRef.current.style.height = '80px';
        ringRef.current.style.background = 'var(--off-white)';
        ringRef.current.style.borderColor = 'transparent';
        ringRef.current.style.opacity = '0.9';
        ringRef.current.style.marginLeft = '-40px';
        ringRef.current.style.marginTop = '-40px';
      } else if (isClick) {
        ringRef.current.style.width = '36px';
        ringRef.current.style.height = '36px';
        ringRef.current.style.background = 'transparent';
        ringRef.current.style.borderColor = 'rgba(240,237,232,1)';
        ringRef.current.style.opacity = '1';
        ringRef.current.style.marginLeft = '-18px';
        ringRef.current.style.marginTop = '-18px';
      } else if (isHover) {
        ringRef.current.style.width = '52px';
        ringRef.current.style.height = '52px';
        ringRef.current.style.background = 'transparent';
        ringRef.current.style.borderColor = 'rgba(201,169,110,0.9)';
        ringRef.current.style.opacity = '1';
        ringRef.current.style.marginLeft = '-26px';
        ringRef.current.style.marginTop = '-26px';
      } else {
        ringRef.current.style.width = '28px';
        ringRef.current.style.height = '28px';
        ringRef.current.style.background = 'transparent';
        ringRef.current.style.borderColor = 'rgba(240,237,232,0.55)';
        ringRef.current.style.opacity = '0.7';
        ringRef.current.style.marginLeft = '-14px';
        ringRef.current.style.marginTop = '-14px';
      }

      // hide/show dot depending on text state
      if (dotRef.current) {
        dotRef.current.style.opacity = activeText ? '0' : '1';
      }
    };

    const loop = () => {
      // Lerp ring toward mouse
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      setRing(ringX, ringY);
      rafId = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setDot(mouseX, mouseY);

      let target = e.target as HTMLElement | null;
      let targetText = null;

      // Traverse up to see if any parent has the cursor-text attribute
      while (target && target !== document.body) {
        if (target.hasAttribute('data-cursor-text')) {
          targetText = target.getAttribute('data-cursor-text');
          break;
        }
        target = target.parentElement;
      }

      if (targetText !== activeText) {
        activeText = targetText;
        setCursorText(activeText);
        applyRingState();
      }

      const hov = !!(e.target as HTMLElement).closest('a, button, [data-cursor="hover"], video, [role="button"]');
      if (hov !== isHover && !isClick) {
        isHover = hov;
        applyRingState();
      }
    };

    const onDown = () => {
      isClick = true;
      applyRingState();
      // Ripple
      const el = document.createElement('div');
      el.style.cssText = `
        position:fixed;left:${mouseX}px;top:${mouseY}px;
        width:4px;height:4px;border-radius:50%;
        transform:translate(-50%,-50%) scale(1);
        background:radial-gradient(circle,rgba(201,169,110,0.55) 0%,transparent 70%);
        pointer-events:none;z-index:9997;
        animation:cRipple 0.55s ease-out forwards;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 600);
    };

    const onUp = () => {
      isClick = false;
      applyRingState();
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    rafId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes cRipple {
          to { transform:translate(-50%,-50%) scale(22); opacity:0; }
        }
      `}</style>

      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '5px', height: '5px',
          borderRadius: '50%',
          background: 'var(--off-white)',
          pointerEvents: 'none',
          zIndex: 10000,
          willChange: 'transform',
          marginLeft: '-2.5px',
          marginTop: '-2.5px',
          transition: 'opacity 0.2s',
        }}
      />

      {/* Ring — lerps smoothly */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '28px', height: '28px',
          borderRadius: '50%',
          border: '1px solid rgba(240,237,232,0.55)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0.7,
          transition: 'width 0.3s cubic-bezier(0.22, 1, 0.36, 1), height 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease, background 0.3s ease, opacity 0.3s ease, margin-left 0.3s cubic-bezier(0.22, 1, 0.36, 1), margin-top 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform',
          marginLeft: '-14px',
          marginTop: '-14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />

      {/* Floating Text Container linked to ring */}
      <div
        ref={textRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          pointerEvents: 'none',
          zIndex: 10001, // highly critical to be above ring
          willChange: 'transform',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: cursorText ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        {cursorText && (
          <span style={{
            color: 'var(--black)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textAlign: 'center',
          }}>
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
