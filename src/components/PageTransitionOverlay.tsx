'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransitionStore } from '@/store/transitionStore';

export default function PageTransitionOverlay() {
    const { isTransitioning, endTransition } = useTransitionStore();
    const pathname = usePathname();

    // Whenever the pathname changes (route push is complete), open the shutter
    useEffect(() => {
        if (isTransitioning) {
            endTransition();
        }
    }, [pathname]);

    return (
        <AnimatePresence>
            {isTransitioning && (
                <motion.div
                    key="transition-shutter"
                    initial={{ y: '100%', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                    animate={{ y: '0%', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                    exit={{ y: '-100%', clipPath: 'polygon(0 15%, 100% 0%, 100% 100%, 0% 100%)' }}
                    transition={{
                        duration: 0.45,
                        ease: [0.76, 0, 0.24, 1], // cinematic slow-fast-slow ease
                    }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 99999, // Absolute top layer
                        background: '#040404', // Super dark "screen off" black
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'all' // Blocks clicks during transition
                    }}
                />
            )}
        </AnimatePresence>
    );
}
