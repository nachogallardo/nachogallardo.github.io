"use client";

import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);

    if (!isDesktop) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);
    document.body.style.cursor = 'none';

    // Add listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Observer for dynamic elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const newElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
          newElements.forEach(el => {
            el.removeEventListener('mouseenter', handleMouseEnter);
            el.removeEventListener('mouseleave', handleMouseLeave);
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('resize', checkIsDesktop);
      document.body.style.cursor = 'auto';
      observer.disconnect();

      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isDesktop, isVisible]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Main Reticle */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-transform duration-150 ease-out mix-blend-difference`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          {/* Crosshair Lines */}
          <div className="absolute w-[1px] h-full bg-green-500/80"></div>
          <div className="absolute w-full h-[1px] bg-green-500/80"></div>

          {/* Center Dot */}
          <div className="w-1 h-1 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div>

          {/* Corners (appearing on hover) */}
          <div className={`absolute inset-0 border border-green-500/50 transition-all duration-300 ${isHovering ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-45'}`}></div>
        </div>
      </div>

      {/* Data Ghost / Trail */}
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: `translate(-50%, -50%)`,
        }}
      >
        <div className={`w-4 h-4 border border-green-500/20 rounded-full transition-all duration-500 ${isHovering ? 'opacity-0 scale-150' : 'opacity-100 scale-100'}`} />
      </div>
    </>
  );
}

