'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
    {
        num: '01',
        title: 'Contrast & Silence',
        body: 'We use negative space aggressively. Moments of pure black between sections let content breathe and emotions land.',
    },
    {
        num: '02',
        title: 'Controlled Pacing',
        body: 'No fast cuts. Every motion lives between 0.6–1.4 seconds. Luxury is restraint — never rush the audience.',
    },
    {
        num: '03',
        title: 'Depth via Light',
        body: 'Foreground sharp, background softly defocused. We simulate depth-of-field to shift focus with camera-like precision.',
    },
];

export default function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const items = containerRef.current.querySelectorAll<HTMLElement>('.pillar');
        items.forEach((el, i) => {
            gsap.fromTo(el,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%',
                        once: true,
                    },
                    delay: i * 0.12,
                }
            );
        });
        const shimmerText = containerRef.current.querySelector<HTMLElement>('.shimmer-text');
        if (shimmerText) {
            gsap.fromTo(shimmerText,
                { backgroundPosition: '100% 0' },
                {
                    backgroundPosition: '-100% 0',
                    duration: 2.5,
                    ease: 'power2.inOut',
                    scrollTrigger: {
                        trigger: shimmerText,
                        start: 'top 85%',
                    }
                }
            );
        }
    }, []);

    return (
        <section id="about" ref={containerRef} style={{
            background: 'var(--black)',
            padding: '12vh 10vw',
            borderTop: '1px solid rgba(240,237,232,0.06)',
        }}>
            {/* Header */}
            <div style={{ marginBottom: '8vh' }}>
                <p className="t-label" style={{ marginBottom: '1rem' }}>Process</p>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <h2
                        className="t-title"
                        style={{
                            color: 'transparent',
                            maxWidth: '520px',
                            lineHeight: 1.05,
                            WebkitTextStroke: '1px rgba(240,237,232,0.15)',
                            position: 'relative',
                            zIndex: 1,
                        }}
                    >
                        How We<br />
                        <em style={{ fontStyle: 'italic', WebkitTextStroke: '1px rgba(201,169,110,0.3)' }}>Think.</em>
                    </h2>
                    <h2
                        className="t-title shimmer-text"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            color: 'transparent',
                            maxWidth: '520px',
                            lineHeight: 1.05,
                            background: 'linear-gradient(120deg, transparent 0%, transparent 40%, rgba(201,169,110,0.8) 50%, rgba(240,237,232,1) 55%, rgba(201,169,110,0.8) 60%, transparent 70%, transparent 100%)',
                            backgroundSize: '300% 100%',
                            backgroundPosition: '100% 0',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            zIndex: 2,
                            pointerEvents: 'none',
                        }}
                    >
                        How We<br />
                        <em style={{ fontStyle: 'italic' }}>Think.</em>
                    </h2>
                </div>
            </div>

            {/* Three pillars */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '4rem 3rem',
            }}>
                {PILLARS.map(({ num, title, body }) => (
                    <div key={num} className="pillar" style={{ opacity: 0 }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '1rem',
                            marginBottom: '1.5rem',
                        }}>
                            <span className="t-label" style={{ color: 'var(--champagne)', opacity: 0.7 }}>{num}</span>
                            <div style={{ flex: 1, height: '1px', background: 'var(--champagne)', opacity: 0.15 }} />
                        </div>
                        <h3 style={{
                            fontFamily: 'var(--font-serif)',
                            fontWeight: 400,
                            fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)',
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            color: 'var(--off-white)',
                            marginBottom: '1rem',
                        }}>
                            {title}
                        </h3>
                        <p className="t-body" style={{ color: 'rgba(240,237,232,0.5)', lineHeight: 1.8 }}>
                            {body}
                        </p>
                    </div>
                ))}
            </div>

            {/* Contact CTA */}
            <div id="contact" style={{
                marginTop: '10vh',
                paddingTop: '6vh',
                borderTop: '1px solid rgba(240,237,232,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '2rem',
            }}>
                <div>
                    <p className="t-label" style={{ marginBottom: '1rem' }}>Ready to collaborate?</p>
                    <h2 style={{
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 300,
                        fontSize: 'clamp(2rem, 5vw, 5rem)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: 'var(--off-white)',
                        lineHeight: 1,
                    }}>
                        Begin Your<br />
                        <em style={{ color: 'var(--champagne)', fontStyle: 'italic' }}>Story.</em>
                    </h2>
                </div>
                <div>
                    <a
                        href="mailto:hello@cinemation.studio"
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
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLAnchorElement).style.background = 'var(--champagne)';
                            (e.currentTarget as HTMLAnchorElement).style.color = 'var(--black)';
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                            (e.currentTarget as HTMLAnchorElement).style.color = 'var(--champagne)';
                        }}
                    >
                        GET IN TOUCH
                    </a>
                    <p className="t-label" style={{
                        marginTop: '1rem',
                        opacity: 0.3,
                        fontSize: '0.6rem',
                    }}>
                        hello@cinemation.studio
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div style={{
                marginTop: '6vh',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(240,237,232,0.04)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
            }}>
                <span className="t-label" style={{ opacity: 0.2, fontSize: '0.6rem' }}>
                    © 2024 CINEMATION. All rights reserved.
                </span>
                <span className="t-label" style={{ opacity: 0.2, fontSize: '0.6rem' }}>
                    Motion Design · Brand Films · Campaigns
                </span>
            </div>
        </section>
    );
}
