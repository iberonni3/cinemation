'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrambleText from '@/components/ScrambleText';

gsap.registerPlugin(useGSAP);

const INQUIRY_TYPES = ['Brand Film', 'Campaign', 'Editorial', 'Social Content', 'Other'];

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [focused, setFocused] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string>('');

    const containerRef = useRef<HTMLElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLFormElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        // Left column info staggers in
        if (leftColRef.current) {
            tl.fromTo(leftColRef.current.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
            );
        }

        // Right column form staggers in, simulating terminal load
        if (rightColRef.current) {
            tl.fromTo(rightColRef.current.children,
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
                "-=0.4"
            );
        }
    }, { scope: containerRef });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const fieldStyle = (name: string): React.CSSProperties => ({
        width: '100%',
        background: 'transparent',
        border: 'none',
        borderBottom: `1px solid ${focused === name ? 'var(--champagne)' : 'rgba(240,237,232,0.12)'}`,
        color: 'var(--off-white)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 300,
        fontSize: '0.95rem',
        letterSpacing: '0.04em',
        padding: '1rem 0',
        outline: 'none',
        transition: 'border-color 0.3s ease',
        cursor: 'none',
    });

    const labelStyle: React.CSSProperties = {
        fontFamily: 'var(--font-sans)',
        fontWeight: 400,
        fontSize: '0.6rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase' as const,
        color: 'var(--champagne)',
        opacity: 0.7,
        display: 'block',
        marginBottom: '0.2rem',
    };

    return (
        <main ref={containerRef}>
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
                {/* Radial accent */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 90% 10%, rgba(201,169,110,0.06) 0%, transparent 55%)',
                    pointerEvents: 'none',
                }} />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1.2fr',
                    gap: '6rem',
                    alignItems: 'start',
                    position: 'relative',
                    zIndex: 1,
                }}>
                    {/* Left — info */}
                    <div ref={leftColRef}>
                        <p className="t-label" style={{ marginBottom: '1.5rem', opacity: 0 }}>
                            <ScrambleText text="Start a Conversation" delay={400} />
                        </p>
                        <h1 className="t-title" style={{ color: 'var(--off-white)', lineHeight: 1, marginBottom: '3rem', opacity: 0 }}>
                            Begin<br />
                            <em style={{ color: 'var(--champagne)', fontStyle: 'italic' }}>Your Story.</em>
                        </h1>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.8rem',
                            opacity: 0,
                        }}>
                            {[
                                { label: 'Email', value: 'hello@cinemation.studio', href: 'mailto:hello@cinemation.studio' },
                                { label: 'New Business', value: 'projects@cinemation.studio', href: 'mailto:projects@cinemation.studio' },
                                { label: 'Based in', value: 'London · Dubai · Los Angeles', href: undefined },
                            ].map(({ label, value, href }) => (
                                <div key={label}>
                                    <p className="t-label" style={{ marginBottom: '0.3rem', opacity: 0.4 }}>
                                        <ScrambleText text={label} delay={600} />
                                    </p>
                                    {href ? (
                                        <a
                                            href={href}
                                            data-cursor="hover"
                                            className="t-body"
                                            style={{ color: 'var(--off-white)', textDecoration: 'none', transition: 'color 0.25s ease' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--champagne)'; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--off-white)'; }}
                                        >
                                            {value}
                                        </a>
                                    ) : (
                                        <p className="t-body" style={{ color: 'rgba(240,237,232,0.5)' }}>{value}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Divider */}
                        <div style={{ margin: '3rem 0', height: '1px', background: 'rgba(240,237,232,0.06)', opacity: 0 }} />

                        <p className="t-label" style={{ opacity: 0, fontSize: '0.6rem' }}>
                            <ScrambleText text="Response within 48 hours." delay={1000} /><br />
                            <ScrambleText text="All inquiries handled in confidence." delay={1200} />
                        </p>
                    </div>

                    {/* Right — form */}
                    <div>
                        {submitted ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '4rem 2rem',
                                border: '1px solid rgba(201,169,110,0.2)',
                            }}>
                                <p className="t-label" style={{ marginBottom: '1.5rem', color: 'var(--champagne)' }}>
                                    <ScrambleText text="Transmission Received" />
                                </p>
                                <h2 style={{
                                    fontFamily: 'var(--font-serif)',
                                    fontWeight: 300,
                                    fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                                    letterSpacing: '0.06em',
                                    textTransform: 'uppercase',
                                    color: 'var(--off-white)',
                                    lineHeight: 1.2,
                                    marginBottom: '1.5rem',
                                }}>
                                    We&apos;ll be<br />in touch.
                                </h2>
                                <p className="t-body" style={{ color: 'rgba(240,237,232,0.4)', fontSize: '0.85rem' }}>
                                    Expect a response within 48 hours.
                                </p>
                            </div>
                        ) : (
                            <form ref={rightColRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.4rem' }}>
                                {/* Name */}
                                <div style={{ opacity: 0 }}>
                                    <label style={labelStyle}>
                                        <ScrambleText text="Full Name" delay={800} />
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Your Name"
                                        style={fieldStyle('name')}
                                        onFocus={() => setFocused('name')}
                                        onBlur={() => setFocused(null)}
                                    />
                                </div>

                                {/* Email */}
                                <div style={{ opacity: 0 }}>
                                    <label style={labelStyle}>
                                        <ScrambleText text="Email Address" delay={900} />
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="your@email.com"
                                        style={fieldStyle('email')}
                                        onFocus={() => setFocused('email')}
                                        onBlur={() => setFocused(null)}
                                    />
                                </div>

                                {/* Inquiry type */}
                                <div style={{ opacity: 0 }}>
                                    <label style={labelStyle}>
                                        <ScrambleText text="Project Type" delay={1000} />
                                    </label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', paddingTop: '0.6rem' }}>
                                        {INQUIRY_TYPES.map(t => (
                                            <button
                                                key={t}
                                                type="button"
                                                data-cursor="hover"
                                                onClick={() => setSelectedType(t)}
                                                style={{
                                                    padding: '0.4rem 1rem',
                                                    border: `1px solid ${selectedType === t ? 'var(--champagne)' : 'rgba(240,237,232,0.12)'}`,
                                                    background: selectedType === t ? 'rgba(201,169,110,0.1)' : 'transparent',
                                                    color: selectedType === t ? 'var(--champagne)' : 'rgba(240,237,232,0.45)',
                                                    fontFamily: 'var(--font-sans)',
                                                    fontSize: '0.62rem',
                                                    letterSpacing: '0.16em',
                                                    textTransform: 'uppercase',
                                                    cursor: 'none',
                                                    transition: 'all 0.25s ease',
                                                }}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Message */}
                                <div style={{ opacity: 0 }}>
                                    <label style={labelStyle}>
                                        <ScrambleText text="Brief Message" delay={1100} />
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Tell us about your project, timeline, and vision..."
                                        style={{
                                            ...fieldStyle('message'),
                                            resize: 'none',
                                            lineHeight: 1.7,
                                        }}
                                        onFocus={() => setFocused('message')}
                                        onBlur={() => setFocused(null)}
                                    />
                                </div>

                                {/* Submit */}
                                <div style={{ opacity: 0 }}>
                                    <button
                                        type="submit"
                                        data-cursor="hover"
                                        style={{
                                            background: 'transparent',
                                            border: '1px solid rgba(201,169,110,0.5)',
                                            color: 'var(--champagne)',
                                            fontFamily: 'var(--font-sans)',
                                            fontWeight: 400,
                                            fontSize: '0.65rem',
                                            letterSpacing: '0.22em',
                                            textTransform: 'uppercase',
                                            padding: '1rem 2.4rem',
                                            cursor: 'none',
                                            transition: 'background 0.3s ease, color 0.3s ease',
                                        }}
                                        onMouseEnter={e => {
                                            (e.currentTarget as HTMLButtonElement).style.background = 'var(--champagne)';
                                            (e.currentTarget as HTMLButtonElement).style.color = 'var(--black)';
                                        }}
                                        onMouseLeave={e => {
                                            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                                            (e.currentTarget as HTMLButtonElement).style.color = 'var(--champagne)';
                                        }}
                                    >
                                        Send Inquiry
                                    </button>
                                    <p className="t-label" style={{ marginTop: '1rem', opacity: 0.25, fontSize: '0.58rem' }}>
                                        <ScrambleText text="We respond within 48 hours" delay={1300} />
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
