"use client";

import React, { useEffect, useRef } from 'react';

interface MatrixAnimationProps {
    color?: string;
    fontSize?: number;
    speed?: number;
    density?: number; // 0 to 1, probability of a new drop starting/continuing
    glowColor?: string;
    isVibrant?: boolean;
    variant?: 'rain' | 'segmented';
}

/**
 * Matrix Animation component with enhanced visual effects.
 * Supports glowing heads, twinkling characters, and density control.
 */
export const MatrixAnimation: React.FC<MatrixAnimationProps> = ({
    color = "#0F0",
    fontSize = 14,
    speed = 33,
    density = 0.975,
    glowColor = "#FFF",
    isVibrant = false,
    variant = "rain"
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Force a robust initial size calculation
        const getParentSize = () => {
            const parent = canvas.parentElement;
            return {
                width: Math.max(parent?.clientWidth || 0, window.innerWidth),
                height: Math.max(parent?.clientHeight || 0, window.innerHeight)
            };
        };

        const initialSize = getParentSize();
        let width = canvas.width = initialSize.width;
        let height = canvas.height = initialSize.height;

        const charSet = "01".split("");
        const matrixChars = "田由甲申电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐".split("");
        const chars = isVibrant ? matrixChars : charSet;

        let columns: number[] = [];
        let segments: { length: number; current: number }[] = [];

        const initColumns = (w: number, h: number) => {
            const columnCount = Math.ceil(w / fontSize);
            const newColumns = [];
            const newSegments = [];

            for (let i = 0; i < columnCount; i++) {
                newColumns[i] = columns[i] ?? Math.random() * h;
                newSegments[i] = segments[i] ?? {
                    length: Math.floor(Math.random() * 5) + 3,
                    current: 0
                };
            }
            columns = newColumns;
            segments = newSegments;
        };

        initColumns(width, height);

        const step = () => {
            // Fading effect - Slightly different for vibrant vs soft
            ctx.fillStyle = isVibrant ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.15)';
            ctx.fillRect(0, 0, width, height);

            ctx.font = `${fontSize}px monospace`;

            const glowingChars: {x: number, yPos: number, character: string}[] = [];

            ctx.fillStyle = color;
            ctx.shadowBlur = 0;

            columns.forEach((yPos, xIndex) => {
                const character = chars[Math.floor(Math.random() * chars.length)];
                const x = xIndex * fontSize;

                // Draw the character
                // Head of the column is glowing
                if (Math.random() > 0.98) {
                    glowingChars.push({x, yPos, character});
                } else {
                    ctx.fillText(character, x, yPos);
                }

                // Move down logic
                if (variant === "segmented") {
                    segments[xIndex].current++;

                    if (yPos > height) {
                        columns[xIndex] = 0;
                        segments[xIndex].current = 0;
                    } else if (segments[xIndex].current >= segments[xIndex].length) {
                        // Jump a gap to create the segmented effect
                        const gap = Math.floor(Math.random() * 3) + 2;
                        columns[xIndex] = yPos + (fontSize * gap);
                        segments[xIndex].current = 0;
                        segments[xIndex].length = Math.floor(Math.random() * 5) + 3;
                    } else {
                        columns[xIndex] = yPos + fontSize;
                    }
                } else {
                    // Classic rain
                    if (yPos > height || (yPos > 100 && Math.random() > density)) {
                        columns[xIndex] = 0;
                    } else {
                        columns[xIndex] = yPos + fontSize;
                    }
                }
            });

            if (glowingChars.length > 0) {
                ctx.fillStyle = glowColor;
                if (isVibrant) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = color;
                }
                glowingChars.forEach(gc => {
                    ctx.fillText(gc.character, gc.x, gc.yPos);
                });
                if (isVibrant) {
                    ctx.shadowBlur = 0; // Reset
                }
            }
        };

        // Use ResizeObserver for robust layout tracking
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width: newW, height: newH } = entry.contentRect;
                // If contentRect is 0 (can happen with display: none or early mount), 
                // fallback to parent clientWidth or window
                const actualW = newW || canvas.parentElement?.clientWidth || window.innerWidth;
                const actualH = newH || canvas.parentElement?.clientHeight || window.innerHeight;

                if (actualW !== width || actualH !== height) {
                    width = canvas.width = actualW;
                    height = canvas.height = actualH;
                    initColumns(width, height);
                }
            }
        });

        let isVisible = true;
        const intersectionObserver = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                isVisible = entry.isIntersecting;
            }
        }, { rootMargin: "100px" });

        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
            intersectionObserver.observe(canvas.parentElement);
        }

        let animationFrameId: number;
        let lastTime = 0;

        const loop = (time: number) => {
            animationFrameId = requestAnimationFrame(loop);
            if (isVisible && time - lastTime >= speed) {
                lastTime = time;
                step();
            }
        };

        animationFrameId = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
        };
    }, [color, fontSize, speed, density, glowColor, isVibrant, variant]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
        />
    );
};

