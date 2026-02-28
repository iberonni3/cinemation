'use client';

import { useEffect, useState, useRef } from 'react';

const CHARACTERS = '!<>-_\\/[]{}—=+*^?#_';

interface ScrambleTextProps {
    text: string;
    speed?: number; // iterations per character
    delay?: number; // ms delay before starting
    className?: string;
    style?: React.CSSProperties;
}

export default function ScrambleText({
    text,
    speed = 3,
    delay = 0,
    className,
    style
}: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState<string>('');
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (hasAnimated.current) return;

        let timeout: NodeJS.Timeout;
        let frame: number;

        const startAnimation = () => {
            hasAnimated.current = true;
            let iteration = 0;
            const length = text.length;

            const animate = () => {
                const newText = text.split('').map((char, index) => {
                    if (char === ' ') return ' ';
                    if (index < Math.floor(iteration / speed)) {
                        return text[index];
                    }
                    return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                }).join('');

                setDisplayText(newText);

                if (iteration < length * speed) {
                    iteration += 1;
                    frame = requestAnimationFrame(animate);
                } else {
                    setDisplayText(text); // Ensure exactly final text
                }
            };

            frame = requestAnimationFrame(animate);
        };

        timeout = setTimeout(startAnimation, delay);

        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(frame);
        };
    }, [text, delay, speed]);

    return (
        <span className={className} style={{ ...style, display: 'inline-block' }}>
            {displayText || text.replace(/./g, ' ')}
        </span>
    );
}
