'use client';

import { useState } from 'react';
import TransitionLink from './TransitionLink';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import MenuOverlay from './MenuOverlay';
import FilmLogo from './FilmLogo';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            <nav style={{
                position: 'fixed',
                top: 0, left: 0, right: 0,
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.8rem 3rem',
                mixBlendMode: 'difference',
            }}>
                {/* Wordmark → home */}
                <TransitionLink
                    href="/"
                    data-cursor="hover"
                    onClick={() => setOpen(false)}
                    style={{
                        color: 'var(--off-white)',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 400,
                        fontSize: '0.72rem',
                        letterSpacing: '0.3em',
                    }}
                >
                    CINEMATION
                </TransitionLink>

                {/* Menu toggle */}
                <button
                    onClick={() => setOpen(v => !v)}
                    data-cursor="hover"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--off-white)',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 400,
                        fontSize: '0.72rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        cursor: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                    }}
                >
                    {open ? 'CLOSE' : 'MENU'}
                    <span style={{
                        display: 'block',
                        width: '18px',
                        height: '1px',
                        background: 'currentColor',
                    }} />
                </button>
            </nav>

            <AnimatePresence>
                {open && <MenuOverlay onClose={() => setOpen(false)} currentPath={pathname} />}
            </AnimatePresence>
        </>
    );
}
