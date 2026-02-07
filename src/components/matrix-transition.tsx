"use client";

import React, { useEffect, useRef, useState } from 'react';

interface MatrixTransitionProps {
    isActive?: boolean;
    variant?: 'surge' | 'reboot';
    onComplete?: () => void;
}

export function MatrixTransition({ isActive: propsActive, variant: propsVariant, onComplete: propsOnComplete }: MatrixTransitionProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isActive, setIsActive] = useState(propsActive || false);
    const [variant, setVariant] = useState(propsVariant || 'surge');
    const [onComplete, setOnComplete] = useState<(() => void) | undefined>(() => propsOnComplete);
    const [showOverlay, setShowOverlay] = useState(false);

    // Sync with props if provided (for backward compatibility or direct usage)
    useEffect(() => {
        if (propsActive !== undefined) setIsActive(propsActive);
        if (propsVariant !== undefined) setVariant(propsVariant);
        if (propsOnComplete !== undefined) setOnComplete(() => propsOnComplete);
    }, [propsActive, propsVariant, propsOnComplete]);

    // Global Event Listener
    useEffect(() => {
        const handleTransition = (e: any) => {
            const { variant: v, onComplete: oc } = e.detail || {};
            setVariant(v || 'surge');
            setOnComplete(() => oc);
            setIsActive(true);
        };

        window.addEventListener('dispatch-transition', handleTransition);
        return () => window.removeEventListener('dispatch-transition', handleTransition);
    }, []);

    useEffect(() => {
        if (isActive) {
            setShowOverlay(true);
            const duration = variant === 'reboot' ? 1000 : 1500;
            const timer = setTimeout(() => {
                if (onComplete) onComplete();
                setIsActive(false); // Auto-deactivate after completion
            }, duration);

            return () => clearTimeout(timer);
        } else if (showOverlay) {
            const fadeTimer = setTimeout(() => {
                setShowOverlay(false);
            }, 500);
            return () => clearTimeout(fadeTimer);
        }
    }, [isActive, onComplete, showOverlay, variant]);

    useEffect(() => {
        if (!showOverlay || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = "01田由甲申电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const fontSize = variant === 'reboot' ? 30 : 24;
        const columns = canvas.width / fontSize;
        const rows = canvas.height / fontSize;
        const drops: number[] = [];

        if (variant === 'reboot') {
            for (let i = 0; i < rows; i++) {
                drops[i] = -Math.random() * 10;
            }
        } else {
            for (let i = 0; i < columns; i++) {
                drops[i] = -Math.random() * 20;
            }
        }

        let animationFrameId: number;

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `bold ${fontSize}px monospace`;

            if (variant === 'reboot') {
                // Horizontal sweep for reboot
                for (let i = 0; i < drops.length; i++) {
                    const text = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillStyle = "#FFF";
                    ctx.fillText(text, drops[i] * fontSize, i * fontSize);

                    ctx.fillStyle = "rgba(34, 197, 94, 0.5)";
                    for (let j = 1; j < 8; j++) {
                        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], (drops[i] - j) * fontSize, i * fontSize);
                    }

                    drops[i] += 4; // Fast horizontal sweep
                }
            } else {
                // Classic vertical surge
                for (let i = 0; i < drops.length; i++) {
                    const text = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillStyle = "#FFF";
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                    ctx.fillStyle = "#0F0";
                    for (let j = 1; j < 5; j++) {
                        ctx.fillStyle = `rgba(34, 197, 94, ${0.8 - (j * 0.15)})`;
                        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, (drops[i] - j) * fontSize);
                    }

                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                        drops[i] = 0;
                    }
                    drops[i] += 2.5;
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, [showOverlay, variant]);

    if (!showOverlay) return null;

    return (
        <div className={`fixed inset-0 z-[100] pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-black/60"></div>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />

            {/* Matrix Pulse Flash */}
            <div className={`absolute inset-0 bg-green-500/20 mix-blend-screen transition-opacity duration-300 ${isActive ? 'animate-pulse opacity-100' : 'opacity-0'}`}></div>

            {/* Reboot Text Overlay */}
            {variant === 'reboot' && isActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-10 py-4 bg-black border-2 border-green-500 shadow-[0_0_50px_rgba(34,197,94,0.4)] animate-pulse">
                        <span className="font-mono text-2xl font-black text-green-500 tracking-[0.5em] italic">SYSTEM_REBOOT</span>
                    </div>
                </div>
            )}

            {/* Cyber Glitch Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,0.25) 50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none animate-scan opacity-30"></div>

            {/* Direct Connection Surge Ring */}
            {variant === 'surge' && (
                <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-1000 ${isActive ? 'scale-150 opacity-100' : 'scale-50 opacity-0'}`}>
                    <div className="w-[50vw] h-[50vw] rounded-full border-[20px] border-green-500/20 blur-3xl animate-pulse"></div>
                </div>
            )}
        </div>
    );
}
