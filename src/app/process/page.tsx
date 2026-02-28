'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import AboutSection from '@/components/acts/AboutSection';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STAGES = [
    {
        num: '01',
        phase: 'Discovery',
        duration: '1–2 Weeks',
        desc: 'We immerse ourselves in your world. Brand identity, audience behavior, competitive landscape — we study what others miss.',
        deliverable: 'Creative Brief + Mood Architecture',
    },
    {
        num: '02',
        phase: 'Concept',
        duration: '1–2 Weeks',
        desc: 'Three cinematic directions, each with a distinct emotional temperature. No middle-ground pitches. Only distinct perspectives.',
        deliverable: 'Concept Decks + Motion References',
    },
    {
        num: '03',
        phase: 'Production',
        duration: '2–4 Weeks',
        desc: 'Frame-by-frame construction. Every cut is intentional, every transition earns its place. No filler, no excess.',
        deliverable: 'Rough Cut + Soundtrack Selection',
    },
    {
        num: '04',
        phase: 'Refinement',
        duration: '1 Week',
        desc: 'Two rounds of precision revisions. We iterate until the work says exactly what it needs to say — and nothing more.',
        deliverable: 'Final Master Files + Delivery Package',
    },
];

export default function ProcessPage() {
    const containerRef = useRef<HTMLElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);
    const stagesRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Hero entry
        if (heroContentRef.current) {
            gsap.fromTo(heroContentRef.current.children,
                { opacity: 0, y: 30, filter: 'blur(10px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.1 }
            );
        }

        // Stages scroll reveal
        if (stagesRef.current) {
            const stages = stagesRef.current.querySelectorAll('.process-stage');
            stages.forEach((stage, i) => {
                gsap.fromTo(stage,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: stage,
                            start: 'top 80%',
                        }
                    }
                );
            });
        }
    }, { scope: containerRef });

    return (
        <main ref={containerRef}>
            {/* Hero */}
            <section style={{
                minHeight: '65vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '20vh 10vw 6vh',
                background: 'var(--black)',
                position: 'relative',
                zIndex: 10,
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 30% 60%, rgba(201,169,110,0.05) 0%, transparent 65%)',
                    pointerEvents: 'none',
                }} />
                <div ref={heroContentRef}>
                    <p className="t-label" style={{ marginBottom: '1.5rem', opacity: 0 }}>How We Work</p>
                    <h1 className="t-title" style={{ color: 'var(--off-white)', lineHeight: 1, maxWidth: '700px', opacity: 0 }}>
                        Craft<br />
                        <em style={{ color: 'var(--champagne)', fontStyle: 'italic' }}>by Design.</em>
                    </h1>
                    <p className="t-body" style={{
                        marginTop: '2rem',
                        color: 'rgba(240,237,232,0.45)',
                        maxWidth: '480px',
                        lineHeight: 1.8,
                        opacity: 0,
                    }}>
                        Our process is cinematic by nature — deliberate pacing, purposeful restraint, and an obsession with emotional precision at every stage.
                    </p>
                </div>
            </section>

            {/* Stages */}
            <section ref={stagesRef} style={{
                background: 'var(--black)',
                padding: '6vh 10vw 12vh',
                borderTop: '1px solid rgba(240,237,232,0.06)',
            }}>
                {STAGES.map(({ num, phase, duration, desc, deliverable }, i) => (
                    <div
                        key={num}
                        className="process-stage"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '80px 1fr 1fr',
                            gap: '2rem 4rem',
                            padding: '4vh 0',
                            borderBottom: i < STAGES.length - 1 ? '1px solid rgba(240,237,232,0.05)' : 'none',
                            alignItems: 'start',
                            opacity: 0,
                        }}
                    >
                        <span className="t-label" style={{ color: 'var(--champagne)', opacity: 0.6, paddingTop: '0.3rem' }}>
                            {num}
                        </span>
                        <div>
                            <h2 style={{
                                fontFamily: 'var(--font-serif)',
                                fontWeight: 400,
                                fontSize: 'clamp(1.6rem, 3vw, 2.8rem)',
                                letterSpacing: '0.06em',
                                textTransform: 'uppercase',
                                color: 'var(--off-white)',
                                marginBottom: '1rem',
                            }}>
                                {phase}
                            </h2>
                            <p className="t-body" style={{ color: 'rgba(240,237,232,0.45)', lineHeight: 1.8 }}>
                                {desc}
                            </p>
                        </div>
                        <div style={{ paddingTop: '0.4rem' }}>
                            <p className="t-label" style={{ marginBottom: '0.6rem', opacity: 0.4 }}>Duration</p>
                            <p className="t-body" style={{ color: 'var(--off-white)', marginBottom: '1.5rem' }}>{duration}</p>
                            <p className="t-label" style={{ marginBottom: '0.6rem', opacity: 0.4 }}>Deliverable</p>
                            <p className="t-body" style={{ color: 'var(--champagne)', fontSize: '0.85rem' }}>{deliverable}</p>
                        </div>
                    </div>
                ))}
            </section>

            <AboutSection />
        </main>
    );
}
