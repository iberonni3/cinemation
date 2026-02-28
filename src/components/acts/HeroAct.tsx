'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLoadingStore } from '@/store/loadingStore';

export default function HeroAct() {
    const { isFullyLoaded } = useLoadingStore();
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const tagline1Ref = useRef<HTMLParagraphElement>(null);
    const tagline2Ref = useRef<HTMLParagraphElement>(null);
    const leakRef = useRef<HTMLDivElement>(null);
    const scrollHintRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isFullyLoaded) return;

        const tl = gsap.timeline();

        // 1. Light leak sweep
        tl.fromTo(
            leakRef.current,
            { x: '-110%', opacity: 0 },
            { x: '210%', opacity: 1, duration: 1.4, ease: 'power2.inOut' }
        );

        // 2. Title: tracking-expand animation
        tl.fromTo(
            titleRef.current,
            { opacity: 0, filter: 'blur(10px)', letterSpacing: '0.45em' },
            {
                opacity: 1,
                filter: 'blur(0px)',
                letterSpacing: '0.12em',
                duration: 1.2,
                ease: 'power3.out',
            },
            '-=0.6'
        );

        // 3. Tagline line 1
        tl.fromTo(
            tagline1Ref.current,
            { opacity: 0, y: 14, filter: 'blur(4px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
            '+=0.2'
        );

        // 4. Tagline line 2
        tl.fromTo(
            tagline2Ref.current,
            { opacity: 0, y: 14, filter: 'blur(4px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
            '-=0.4'
        );

        // 5. Scroll hint
        tl.fromTo(
            scrollHintRef.current,
            { opacity: 0 },
            { opacity: 0.4, duration: 0.8, ease: 'power2.inOut' },
            '+=0.5'
        );

        return () => { tl.kill(); };
    }, [isFullyLoaded]);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="full-screen flex-center"
            style={{
                position: 'relative',
                background: 'var(--black)',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            {/* Light leak */}
            <div
                ref={leakRef}
                className="light-leak absolute-fill"
                aria-hidden="true"
            />

            {/* Subtle horizontal rule */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.08), transparent)',
                pointerEvents: 'none',
                transform: 'translateY(-120px)',
            }} aria-hidden="true" />

            {/* Content */}
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                {/* Label above */}
                <p className="t-label" style={{ marginBottom: '2.5rem', opacity: 0.6 }}>
                    Motion Design Studio
                </p>

                {/* Hero title */}
                <h1
                    ref={titleRef}
                    className="t-hero"
                    style={{
                        opacity: 0,
                        color: 'var(--off-white)',
                        display: 'block',
                    }}
                >
                    CINEMATION
                </h1>

                {/* Separator */}
                <div style={{
                    width: '1px',
                    height: '40px',
                    background: 'var(--champagne)',
                    margin: '2.5rem auto',
                    opacity: 0.5,
                }} aria-hidden="true" />

                {/* Tagline */}
                <p
                    ref={tagline1Ref}
                    style={{
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 300,
                        fontSize: 'clamp(1rem, 2.2vw, 1.6rem)',
                        fontStyle: 'italic',
                        color: 'var(--off-white)',
                        opacity: 0,
                        letterSpacing: '0.04em',
                        lineHeight: 1.4,
                    }}
                >
                    We don&apos;t cut footage.
                </p>
                <p
                    ref={tagline2Ref}
                    style={{
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 300,
                        fontSize: 'clamp(1rem, 2.2vw, 1.6rem)',
                        fontStyle: 'italic',
                        color: 'var(--champagne)',
                        opacity: 0,
                        letterSpacing: '0.04em',
                        lineHeight: 1.4,
                        marginTop: '0.3rem',
                    }}
                >
                    We craft emotion.
                </p>
            </div>

            {/* Scroll hint */}
            <div
                ref={scrollHintRef}
                style={{
                    position: 'absolute',
                    bottom: '2.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.6rem',
                    opacity: 0,
                }}
            >
                <span className="t-label" style={{ opacity: 0.5, fontSize: '0.6rem' }}>
                    SCROLL
                </span>
                <div style={{
                    width: '1px',
                    height: '40px',
                    background: 'var(--off-white)',
                    opacity: 0.3,
                    animation: 'scrollLine 2s ease-in-out infinite',
                }} />
            </div>

            <style>{`
        @keyframes scrollLine {
          0%, 100% { transform: scaleY(1); opacity: 0.3; }
          50%       { transform: scaleY(0.4); opacity: 0.1; }
        }
      `}</style>
        </section>
    );
}
