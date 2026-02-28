'use client';

import { useEffect, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
    return useContext(LenisContext);
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Sync with GSAP ticker — only pass lenis.raf, do NOT pass GSAP time (it uses seconds)
        function onFrame(time: number) {
            lenis.raf(time * 1000);
        }
        gsap.ticker.add(onFrame);
        gsap.ticker.lagSmoothing(0);

        // Sync ScrollTrigger on every scroll event
        lenis.on('scroll', () => {
            ScrollTrigger.update();
        });

        return () => {
            lenis.destroy();
            gsap.ticker.remove(onFrame);
        };
    }, []);

    return (
        <LenisContext.Provider value={lenisRef.current}>
            {children}
        </LenisContext.Provider>
    );
}
