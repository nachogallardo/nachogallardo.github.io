"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface ScrambleTextProps {
    text: string;
    delay?: number;
    isVisible: boolean;
    triggerOnHover?: boolean;
    step?: number;
}

export function ScrambleText({ text, delay = 0, isVisible, triggerOnHover = false, step = 1 / 3 }: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const chars = "01田由甲申电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐";
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startScramble = useCallback(() => {
        let iteration = 0;
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(
                text.split("").map((char, index) => {
                    if (index < iteration) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
            iteration += step;
        }, 30);
    }, [text, step]);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(startScramble, delay);
            return () => {
                clearTimeout(timer);
                if (intervalRef.current) clearInterval(intervalRef.current);
            };
        }
    }, [isVisible, startScramble, delay]);

    return (
        <span onMouseEnter={triggerOnHover ? startScramble : undefined}>
            {displayText}
        </span>
    );
}
