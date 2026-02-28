'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import { triggerLightLeak } from '@/components/LightLeak';
import { useLoadingStore } from '@/store/loadingStore';

gsap.registerPlugin(ScrollTrigger);

interface ProjectReelProps {
    hideHeader?: boolean;
}

export default function ProjectReel({ hideHeader = false }: ProjectReelProps) {
    const { isFullyLoaded } = useLoadingStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !isFullyLoaded) return;

        // Animate Header (if it exists)
        if (headerRef.current) {
            gsap.fromTo(headerRef.current.children,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.0,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: 'top 85%',
                    }
                }
            );
        }

        const items = containerRef.current.querySelectorAll<HTMLElement>('.reel-item');

        items.forEach((item) => {
            const video = item.querySelector<HTMLVideoElement>('video');
            const cat = item.querySelector<HTMLElement>('.reel-category');
            const desc = item.querySelector<HTMLElement>('.reel-desc');
            const titleText = item.querySelector<HTMLElement>('.reel-title-text');
            const num = item.querySelector<HTMLElement>('.reel-number');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    once: true,
                },
            });

            // Sequence: number → title → video fade up → meta
            tl
                .fromTo(num, { opacity: 0, x: -20 }, { opacity: 0.2, x: 0, duration: 0.5, ease: 'power2.out' })
                .fromTo(titleText,
                    { opacity: 0, filter: 'blur(8px)', y: 30, letterSpacing: '0.3em' },
                    { opacity: 1, filter: 'blur(0px)', y: 0, letterSpacing: '0.08em', duration: 1.0, ease: 'power3.out' },
                    '-=0.2'
                )
                .fromTo(video,
                    { opacity: 0, scale: 1.06 },
                    { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
                    '-=0.5'
                )
                .fromTo([cat, desc],
                    { opacity: 0, y: 16 },
                    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 },
                    '-=0.6'
                );

            // Parallax scale while scrolling through each item
            gsap.to(video, {
                scale: 1.08,
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                },
                ease: 'none',
            });
        });
    }, { scope: containerRef, dependencies: [isFullyLoaded] });

    return (
        <section
            id="work"
            ref={containerRef}
            style={{ background: 'var(--black)' }}
        >
            {/* Section header */}
            {!hideHeader && (
                <div ref={headerRef} style={{
                    padding: '10vh 10vw 4vh',
                    borderTop: '1px solid rgba(240,237,232,0.06)',
                }}>
                    <p className="t-label" style={{ marginBottom: '1rem', opacity: 0 }}>Selected Work</p>
                    <h2
                        className="t-title"
                        style={{ color: 'var(--off-white)', maxWidth: '600px', lineHeight: 1, opacity: 0 }}
                    >
                        Stories<br />That Move.
                    </h2>
                </div>
            )}

            {/* Project items */}
            {projects.map((project, i) => (
                <div
                    key={project.id}
                    className="reel-item"
                    style={{
                        position: 'relative',
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        borderTop: '1px solid rgba(240,237,232,0.04)',
                        overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => {
                        triggerLightLeak(e.currentTarget);
                        const grainEl = document.getElementById('film-grain') as HTMLCanvasElement;
                        if (grainEl) { grainEl.style.opacity = '0.065'; }
                    }}
                    onMouseLeave={() => {
                        const grainEl = document.getElementById('film-grain') as HTMLCanvasElement;
                        if (grainEl) { grainEl.style.opacity = '0.038'; }
                    }}
                    data-cursor="hover"
                    data-cursor-text="PLAY REEL"
                >
                    {/* Background video */}
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0,
                            filter: 'brightness(0.35) contrast(1.1)',
                            willChange: 'transform',
                        }}
                    >
                        <source src={project.videoSrc} type="video/mp4" />
                    </video>

                    {/* Dark overlay gradient */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(135deg, rgba(8,8,8,0.85) 30%, ${project.accentColor} 100%)`,
                        pointerEvents: 'none',
                    }} />

                    {/* Light leak placeholder */}
                    <div className="light-leak" aria-hidden="true" />

                    {/* Number */}
                    <div
                        className="reel-number"
                        style={{
                            position: 'absolute',
                            top: '3rem',
                            right: '3rem',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.65rem',
                            letterSpacing: '0.25em',
                            color: 'var(--champagne)',
                            opacity: 0,
                        }}
                    >
                        {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    </div>

                    {/* Title card */}
                    <div
                        className="reel-title-card"
                        style={{
                            position: 'relative',
                            zIndex: 2,
                            padding: '0 10vw',
                        }}
                    >
                        {/* Category */}
                        <p
                            className="t-label reel-category"
                            style={{ marginBottom: '1.5rem', opacity: 0 }}
                        >
                            {project.category} — {project.year}
                        </p>

                        {/* Main title */}
                        <h3
                            className="t-title reel-title-text"
                            style={{
                                color: 'var(--off-white)',
                                opacity: 0,
                                marginBottom: '2rem',
                            }}
                        >
                            {project.title}
                        </h3>

                        {/* Description */}
                        <p
                            className="t-body reel-desc"
                            style={{
                                color: 'rgba(240,237,232,0.55)',
                                maxWidth: '480px',
                                opacity: 0,
                            }}
                        >
                            {project.description}
                        </p>

                        {/* CTA */}
                        <div
                            style={{
                                marginTop: '2.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                opacity: 0,
                            }}
                            className="reel-desc"
                        >
                            <span
                                className="t-label"
                                style={{
                                    color: 'var(--champagne)',
                                    cursor: 'none',
                                    transition: 'letter-spacing 0.3s ease',
                                }}
                                data-cursor="hover"
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.letterSpacing = '0.28em'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.letterSpacing = '0.2em'; }}
                            >
                                View Project ›
                            </span>
                            <div style={{ flex: 1, height: '1px', background: 'var(--champagne)', opacity: 0.2, maxWidth: '120px' }} />
                        </div>
                    </div>

                    {/* Bottom subtitle strip */}
                    <div style={{
                        position: 'absolute',
                        bottom: '2.5rem',
                        left: '10vw',
                        right: '10vw',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '1px solid rgba(240,237,232,0.07)',
                        paddingTop: '1.2rem',
                        zIndex: 2,
                    }}>
                        <span className="t-label" style={{ opacity: 0.4 }}>{project.subtitle}</span>
                        <span className="t-label" style={{ opacity: 0.25 }}>CINEMATION</span>
                    </div>
                </div>
            ))}
        </section>
    );
}
