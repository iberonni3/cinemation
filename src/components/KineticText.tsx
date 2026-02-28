'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORDS = ['Motion.', 'Emotion.', 'Precision.'];

export default function KineticText() {
    const containerRef = useRef<HTMLDivElement>(null);
    const wordsRef = useRef<HTMLDivElement[]>([]);
    const indexRef = useRef(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Initialise all words: hidden via clipPath
        wordsRef.current.forEach(el => {
            if (el) {
                gsap.set(el, { clipPath: 'inset(0 100% 0 0)', opacity: 1, scale: 1.1, filter: 'blur(5px)' });
            }
        });

        const show = (i: number) => {
            if (!wordsRef.current[i]) return;
            gsap.to(wordsRef.current[i], {
                clipPath: 'inset(0 0% 0 0)',
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.85,
                ease: 'power3.out',
            });
        };

        const hide = (i: number, cb: () => void) => {
            if (!wordsRef.current[i]) return;
            gsap.to(wordsRef.current[i], {
                opacity: 0,
                y: -20,
                filter: 'blur(4px)',
                duration: 0.45,
                ease: 'power2.in',
                onComplete: () => {
                    // Reset for future reuse
                    gsap.set(wordsRef.current[i], {
                        clipPath: 'inset(0 100% 0 0)',
                        opacity: 1,
                        y: 0,
                        scale: 1.1,
                        filter: 'blur(5px)',
                    });
                    cb();
                },
            });
        };

        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top 70%',
            once: true,
            onEnter: () => {
                show(0);
                intervalRef.current = setInterval(() => {
                    const cur = indexRef.current;
                    const next = (cur + 1) % WORDS.length;
                    hide(cur, () => show(next));
                    indexRef.current = next;
                }, 1600);
            },
        });

        return () => {
            trigger.kill();
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 8%',
            }}
        >
            {WORDS.map((word, i) => (
                <div
                    key={word}
                    ref={el => { if (el) wordsRef.current[i] = el; }}
                    className="t-kinetic"
                    style={{
                        position: 'absolute',
                        color: 'var(--off-white)',
                        willChange: 'transform, clip-path, filter',
                        // clipPath set by GSAP on mount
                    }}
                >
                    {word}
                </div>
            ))}

            {/* Decorative vertical line */}
            <div style={{
                position: 'absolute',
                left: 0,
                top: '20%',
                bottom: '20%',
                width: '1px',
                background: 'var(--champagne)',
                opacity: 0.3,
            }} />
        </div>
    );
}
