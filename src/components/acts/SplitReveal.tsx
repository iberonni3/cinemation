'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import KineticText from '@/components/KineticText';
import { useLoadingStore } from '@/store/loadingStore';

gsap.registerPlugin(ScrollTrigger);

export default function SplitReveal() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const { isFullyLoaded } = useLoadingStore();

    useEffect(() => {
        if (!sectionRef.current || !isFullyLoaded) return;

        // Set initial state via GSAP to avoid hydration/style conflicts
        gsap.set([leftRef.current, rightRef.current, dividerRef.current], { opacity: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                once: true,
            },
        });

        // Reveal divider first
        tl.fromTo(dividerRef.current,
            { scaleY: 0, opacity: 0 },
            { scaleY: 1, opacity: 1, duration: 0.6, ease: 'power3.out' }
        );

        // Left panel slides in from left
        tl.fromTo(leftRef.current,
            { x: '-8%', opacity: 0 },
            { x: '0%', opacity: 1, duration: 1.1, ease: "power3.out" },
            '-=0.2'
        );

        // Right panel fades in
        tl.fromTo(rightRef.current,
            { x: '8%', opacity: 0 },
            { x: '0%', opacity: 1, duration: 1.1, ease: "power3.out" },
            '-=0.9'
        );
    }, [isFullyLoaded]);

    return (
        <section
            ref={sectionRef}
            id="reel"
            style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                display: 'flex',
                overflow: 'hidden',
                background: 'var(--black)',
            }}
        >
            {/* Left — Video */}
            <div
                ref={leftRef}
                style={{
                    position: 'relative',
                    width: '60%',
                    height: '100%',
                    overflow: 'hidden',
                    background: '#0a0a0a', // Fallback
                }}
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'contrast(1.05) brightness(0.8)',
                    }}
                    onCanPlay={(e) => {
                        (e.target as HTMLVideoElement).play().catch(() => { });
                    }}
                >
                    <source
                        src="https://videos.pexels.com/video-files/1448735/1448735-uhd_2560_1440_24fps.mp4"
                        type="video/mp4"
                    />
                </video>

                {/* Dark vignette right edge */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, transparent 70%, var(--black) 100%)',
                    pointerEvents: 'none',
                }} />

                {/* Caption bottom left */}
                <div style={{
                    position: 'absolute',
                    bottom: '2.5rem',
                    left: '2.5rem',
                    zIndex: 2,
                }}>
                    <p className="t-label">Showreel — 2024</p>
                </div>
            </div>

            {/* Divider */}
            <div
                ref={dividerRef}
                style={{
                    width: '1px',
                    height: '100%',
                    background: 'linear-gradient(to bottom, transparent, var(--champagne), transparent)',
                    opacity: 0,
                    flexShrink: 0,
                    transformOrigin: 'top',
                    alignSelf: 'stretch',
                }}
            />

            {/* Right — Kinetic Text */}
            <div
                ref={rightRef}
                style={{
                    flex: 1,
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}
            >
                <KineticText />

                {/* Top-right label */}
                <div style={{
                    position: 'absolute',
                    top: '2.5rem',
                    right: '2.5rem',
                }}>
                    <p className="t-label">Defining Our Craft</p>
                </div>
            </div>

            {/* Light leak overlay for the whole section */}
            <div className="light-leak absolute-fill" aria-hidden="true" />
        </section>
    );
}
