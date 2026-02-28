'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import CinematicLoadingScreen from '@/components/CinematicLoadingScreen';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import CustomCursor from '@/components/CustomCursor';
import FilmGrainOverlay from '@/components/FilmGrainOverlay';
import Navbar from '@/components/Navbar';
import PageTransitionOverlay from '@/components/PageTransitionOverlay';

import { useLoadingStore } from '@/store/loadingStore';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const { setFullyLoaded } = useLoadingStore();

    useEffect(() => {
        // Check if we've already loaded in this session
        const hasLoaded = sessionStorage.getItem('cinemation_loaded');
        if (hasLoaded) {
            setLoading(false);
            setFullyLoaded(true); // Signal immediate ready
        }
    }, [setFullyLoaded]);

    const handleLoadingComplete = () => {
        setLoading(false);
        sessionStorage.setItem('cinemation_loaded', 'true');
    };

    return (
        <>
            <AnimatePresence mode="wait" onExitComplete={() => setFullyLoaded(true)}>
                {loading && (
                    <CinematicLoadingScreen key="loader" onComplete={handleLoadingComplete} />
                )}
            </AnimatePresence>

            {/* Cinematic layer overrides */}
            <PageTransitionOverlay />

            {/* Fixed cinematic layers */}
            <FilmGrainOverlay />
            <CustomCursor />

            {/* Navigation */}
            <Navbar />

            {/* Content */}
            <SmoothScrollProvider>
                {children}
            </SmoothScrollProvider>
        </>
    );
}
