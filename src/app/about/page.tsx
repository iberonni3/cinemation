'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const VALUES = [
    {
        title: 'Restraint as Power',
        body: 'We believe the most powerful edits are the ones you never notice. Silence, negative space, and controlled pacing — these are our primary instruments.',
    },
    {
        title: 'Emotion First',
        body: 'Every technical decision — a cut, a lens choice, a color grade — exists to serve a single emotional outcome. We ask "how should this feel?" before "how should this look?"',
    },
    {
        title: 'Permanent Work',
        body: 'We refuse to make content that expires. Every frame we deliver should be as powerful in five years as it is today. Trends are noise. Emotion is timeless.',
    },
];

export default function AboutPage() {
    const containerRef = useRef<HTMLElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);
    const sRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Hero Timeline
        const tl = gsap.timeline({ delay: 0.1 });
        if (heroContentRef.current) {
            tl.fromTo(heroContentRef.current.children,
                { opacity: 0, y: 30, filter: 'blur(10px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.15, ease: 'power3.out' }
            );
        }

        if (sRef.current) {
            tl.fromTo(sRef.current,
                { opacity: 0, x: 50, rotate: 10 },
                { opacity: 1, x: 0, rotate: 0, duration: 1.5, ease: 'power2.out' },
                "-=1"
            );
        }

        // Values Stagger
        if (valuesRef.current) {
            gsap.fromTo(valuesRef.current.children,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: valuesRef.current,
                        start: 'top 75%',
                    }
                }
            );
        }

        // Stats Stagger
        if (statsRef.current) {
            gsap.fromTo(statsRef.current.children,
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 85%',
                    }
                }
            );
        }

        // CTA
        if (ctaRef.current) {
            gsap.fromTo(ctaRef.current.children,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: ctaRef.current,
                        start: 'top 85%',
                    }
                }
            );
        }

    }, { scope: containerRef });

    return (
        <main ref={containerRef}>
            {/* Hero */}
            <section style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '12vh 10vw',
                background: 'var(--black)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 80% 40%, rgba(201,169,110,0.05) 0%, transparent 60%)',
                    pointerEvents: 'none',
                }} />

                <div ref={heroContentRef}>
                    <p className="t-label" style={{ marginBottom: '1.5rem', opacity: 0 }}>
                        The Studio
                    </p>

                    <h1 className="t-title" style={{
                        color: 'var(--off-white)',
                        lineHeight: 1,
                        maxWidth: '750px',
                        marginBottom: '3rem',
                        opacity: 0,
                    }}>
                        We Edit<br />
                        What You{' '}
                        <em style={{ color: 'var(--champagne)', fontStyle: 'italic' }}>Feel.</em>
                    </h1>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '2rem',
                        maxWidth: '780px',
                    }}>
                        <p className="t-body" style={{ color: 'rgba(240,237,232,0.5)', lineHeight: 1.9, opacity: 0 }}>
                            Cinemation is a motion design studio built on a single conviction: that moving image, when crafted with precision, can bypass logic and speak directly to feeling.
                        </p>
                        <p className="t-body" style={{ color: 'rgba(240,237,232,0.35)', lineHeight: 1.9, opacity: 0 }}>
                            We work with brands, agencies, and independent creators who understand that the difference between a good film and a great one is rarely in the footage — it&apos;s in the edit.
                        </p>
                    </div>
                </div>

                {/* Decorative number */}
                <div ref={sRef} style={{
                    position: 'absolute',
                    right: '8vw',
                    bottom: '8vh',
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(6rem, 15vw, 18rem)',
                    fontWeight: 300,
                    color: 'rgba(240,237,232,0.025)',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    opacity: 0,
                }}>
                    S
                </div>
            </section>

            {/* Values */}
            <section style={{
                background: 'var(--black)',
                padding: '8vh 10vw 12vh',
                borderTop: '1px solid rgba(240,237,232,0.06)',
            }}>
                <p className="t-label" style={{ marginBottom: '4vh', opacity: 0.5 }}>
                    What We Believe
                </p>

                <div ref={valuesRef} style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '4rem 3rem',
                }}>
                    {VALUES.map(({ title, body }, i) => (
                        <div key={title} style={{ opacity: 0 }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                marginBottom: '1.5rem',
                            }}>
                                <span className="t-label" style={{ color: 'var(--champagne)', opacity: 0.6 }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div style={{ flex: 1, height: '1px', background: 'rgba(201,169,110,0.15)' }} />
                            </div>
                            <h2 style={{
                                fontFamily: 'var(--font-serif)',
                                fontWeight: 400,
                                fontSize: 'clamp(1.2rem, 2vw, 1.7rem)',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                color: 'var(--off-white)',
                                marginBottom: '1rem',
                            }}>
                                {title}
                            </h2>
                            <p className="t-body" style={{ color: 'rgba(240,237,232,0.45)', lineHeight: 1.85 }}>
                                {body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats strip */}
            <section ref={statsRef} style={{
                background: 'var(--warm-gray)',
                padding: '5vh 10vw',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '2rem',
            }}>
                {[
                    { val: '120+', label: 'Projects Delivered' },
                    { val: '6', label: 'Years of Craft' },
                    { val: '40+', label: 'Global Clients' },
                    { val: '12', label: 'Awards' },
                ].map(({ val, label }) => (
                    <div key={label} style={{ textAlign: 'center', opacity: 0 }}>
                        <p style={{
                            fontFamily: 'var(--font-serif)',
                            fontWeight: 300,
                            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                            color: 'var(--champagne)',
                            letterSpacing: '0.04em',
                            lineHeight: 1,
                            marginBottom: '0.5rem',
                        }}>
                            {val}
                        </p>
                        <p className="t-label" style={{ opacity: 0.45 }}>{label}</p>
                    </div>
                ))}
            </section>

            {/* CTA */}
            <section ref={ctaRef} style={{
                background: 'var(--black)',
                padding: '10vh 10vw',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '2rem',
                borderTop: '1px solid rgba(240,237,232,0.06)',
            }}>
                <h2 style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 300,
                    fontSize: 'clamp(2rem, 4.5vw, 4.5rem)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--off-white)',
                    opacity: 0,
                }}>
                    Ready to<br />
                    <em style={{ color: 'var(--champagne)', fontStyle: 'italic' }}>Begin?</em>
                </h2>
                <div style={{ opacity: 0 }}>
                    <Link
                        href="/contact"
                        data-cursor="hover"
                        className="t-label"
                        style={{
                            display: 'inline-block',
                            padding: '1rem 2.4rem',
                            border: '1px solid rgba(201,169,110,0.5)',
                            color: 'var(--champagne)',
                            textDecoration: 'none',
                            letterSpacing: '0.2em',
                            transition: 'background 0.3s ease, color 0.3s ease',
                        }}
                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.currentTarget.style.background = 'var(--champagne)';
                            e.currentTarget.style.color = 'var(--black)';
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--champagne)';
                        }}
                    >
                        GET IN TOUCH
                    </Link>
                </div>
            </section>
        </main>
    );
}
