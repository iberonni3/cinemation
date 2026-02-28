'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ProjectReel from '@/components/acts/ProjectReel';

gsap.registerPlugin(useGSAP);

export default function WorkPage() {
    const containerRef = useRef<HTMLElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (heroContentRef.current) {
            gsap.fromTo(heroContentRef.current.children,
                { opacity: 0, y: 30, filter: 'blur(10px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.1 }
            );
        }
    }, { scope: containerRef });

    return (
        <main ref={containerRef} style={{ paddingTop: '0' }}>
            {/* Page header */}
            <section style={{
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '20vh 10vw 5vh',
                background: 'var(--black)',
                borderBottom: '1px solid rgba(240,237,232,0.05)',
                overflow: 'hidden',
                position: 'relative',
            }}>
                {/* Decorative grain behind heading */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 70% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />
                <div ref={heroContentRef}>
                    <p className="t-label" style={{ marginBottom: '1.5rem', opacity: 0 }}>
                        Selected Work
                    </p>
                    <h1 className="t-title" style={{ color: 'var(--off-white)', lineHeight: 1, opacity: 0 }}>
                        Stories<br />
                        <em style={{ color: 'var(--champagne)', fontStyle: 'italic' }}>We&apos;ve Told.</em>
                    </h1>
                </div>
            </section>

            <ProjectReel hideHeader={true} />
        </main>
    );
}
