'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import TransitionLink from './TransitionLink';

const ITEMS = [
    { label: 'Work', href: '/work' },
    { label: 'Process', href: '/process' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

interface MenuOverlayProps {
    onClose: () => void;
    currentPath?: string;
}

export default function MenuOverlay({ onClose, currentPath }: MenuOverlayProps) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [onClose]);

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
        exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    };

    const item = {
        hidden: { opacity: 0, y: 32, filter: 'blur(5px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
        exit: { opacity: 0, y: -22, filter: 'blur(4px)', transition: { duration: 0.35, ease: [0.4, 0, 1, 1] as const } },
    };

    return (
        <motion.div
            key="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] as const }}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'var(--black)',
                zIndex: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingLeft: '10vw',
                overflow: 'hidden',
            }}
            onClick={onClose}
        >
            {/* Subtle decorative line */}
            <div style={{
                position: 'absolute',
                top: 0, left: '55%',
                width: '1px', height: '100%',
                background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.12), transparent)',
                transform: 'rotate(6deg)',
                pointerEvents: 'none',
            }} aria-hidden="true" />

            <motion.ul
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
                onClick={e => e.stopPropagation()}
                style={{ listStyle: 'none', padding: 0 }}
            >
                {ITEMS.map(({ label, href }, index) => {
                    const isActive = currentPath === href;
                    return (
                        <motion.li key={label} variants={item}>
                            <TransitionLink
                                href={href}
                                onClick={onClose}
                                data-cursor="hover"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'baseline',
                                    gap: '1rem',
                                    fontFamily: 'var(--font-serif)',
                                    fontWeight: 300,
                                    fontSize: 'clamp(2.8rem, 7.5vw, 7rem)',
                                    letterSpacing: '0.04em',
                                    textTransform: 'uppercase',
                                    color: isActive ? 'var(--champagne)' : 'var(--off-white)',
                                    textDecoration: 'none',
                                    lineHeight: 1.1,
                                    transition: 'color 0.3s ease, letter-spacing 0.35s ease',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--champagne)';
                                    (e.currentTarget as HTMLAnchorElement).style.letterSpacing = '0.09em';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLAnchorElement).style.color = isActive ? 'var(--champagne)' : 'var(--off-white)';
                                    (e.currentTarget as HTMLAnchorElement).style.letterSpacing = '0.04em';
                                }}
                            >
                                {label}
                                {isActive && (
                                    <span style={{
                                        fontSize: '0.6rem',
                                        letterSpacing: '0.2em',
                                        color: 'var(--champagne)',
                                        fontFamily: 'var(--font-sans)',
                                        opacity: 0.7,
                                        verticalAlign: 'middle',
                                    }}>●</span>
                                )}
                            </TransitionLink>
                        </motion.li>
                    );
                })}
            </motion.ul>

            {/* Bottom corner label */}
            <div style={{
                position: 'absolute',
                bottom: '2.5rem',
                right: '3rem',
                fontSize: '0.6rem',
                letterSpacing: '0.22em',
                color: 'rgba(240,237,232,0.25)',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-sans)',
            }}>
                EST. 2024
            </div>
        </motion.div>
    );
}
