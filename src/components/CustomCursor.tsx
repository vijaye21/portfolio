import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    // Only fine pointer devices (desktops, mice) and not reduced motion
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || isReducedMotion) return;

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) {
        setVisible(true);
        document.body.classList.add('has-custom-cursor');
      }
    };

    const handleMouseEnter = () => {
      setVisible(true);
      document.body.classList.add('has-custom-cursor');
    };

    const handleMouseLeave = () => {
      setVisible(false);
      document.body.classList.remove('has-custom-cursor');
    };

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el) return;
      setHovered(
        el.closest('a, button, [role="button"], input, textarea, select, label, .tilt-card, [tabindex="0"]') !== null
      );
    };

    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top = `${pos.current.y}px`;
      }
      ring.current.x += (pos.current.x - ring.current.x) * 0.15;
      ring.current.y += (pos.current.y - ring.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousemove', checkHover);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', checkHover);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.body.classList.remove('has-custom-cursor');
      cancelAnimationFrame(raf.current);
    };
  }, [visible]);

  // Don't render on touch/mobile devices or servers
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return null;

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s ease',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${hovered ? 'hovered' : ''}`} />
    </div>
  );
}
