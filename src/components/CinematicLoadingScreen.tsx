'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export default function CinematicLoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const counterRef = useRef<HTMLDivElement>(null);
    const apertureRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Precise percentage counting
            const obj = { value: 0 };
            gsap.to(obj, {
                value: 100,
                duration: 2.8,
                ease: "power2.inOut",
                onUpdate: () => setProgress(Math.floor(obj.value)),
                onComplete: () => {
                    // Slight delay at 100% for impact
                    setTimeout(onComplete, 400);
                }
            });

            // Aperture rotation
            gsap.to(apertureRef.current, {
                rotate: 270,
                duration: 3,
                ease: "power1.inOut"
            });
        });

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                y: '-100%',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 85%)',
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: '#0a0a0a',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--off-white)',
            }}
        >
            {/* Center Content */}
            <div style={{ position: 'relative', textAlign: 'center' }}>
                {/* Aperture Icon */}
                <svg
                    ref={apertureRef}
                    width="120" height="120" viewBox="0 0 100 100"
                    fill="none" xmlns="http://www.w3.org/2000/svg"
                    style={{ marginBottom: '2rem', opacity: 0.8 }}
                >
                    <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
                    {/* Aperture Blades logic */}
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                        <path
                            key={i}
                            d="M50 2 L50 25 L30 40"
                            stroke="currentColor"
                            strokeWidth="1"
                            transform={`rotate(${angle} 50 50)`}
                            strokeLinecap="round"
                        />
                    ))}
                </svg>

                {/* Counter */}
                <div style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '3rem',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    marginBottom: '0.5rem'
                }}>
                    {progress}<span style={{ fontSize: '1.2rem', marginLeft: '2px', opacity: 0.5 }}>%</span>
                </div>

                <div style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.4em',
                    opacity: 0.4
                }}>
                    Initializing Studio Context
                </div>
            </div>

            {/* Bottom Brand */}
            <div style={{
                position: 'absolute',
                bottom: '3rem',
                fontFamily: 'var(--font-serif)',
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                opacity: 0.3
            }}>
                CINEMATION / ARCHIVE v1.0
            </div>
        </motion.div>
    );
}
