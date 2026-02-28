'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LightLeakProps {
    trigger?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export default function LightLeak({ trigger, className = '', style }: LightLeakProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isAnimating = useRef(false);

    const play = () => {
        if (!ref.current || isAnimating.current) return;
        isAnimating.current = true;
        gsap.fromTo(
            ref.current,
            { x: '-110%', opacity: 0 },
            {
                x: '210%',
                opacity: 1,
                duration: 1.2,
                ease: 'power2.inOut',
                onComplete: () => { isAnimating.current = false; },
            }
        );
    };

    useEffect(() => {
        if (trigger) play();
    }, [trigger]);

    return (
        <div
            ref={ref}
            className={`light-leak ${className}`}
            style={style}
            aria-hidden="true"
        />
    );
}

// Imperative helper — import this to trigger a leak from anywhere
export function triggerLightLeak(container: HTMLElement | null) {
    if (!container) return;
    // Find first .light-leak child or create an ephemeral one
    let leak = container.querySelector<HTMLElement>('.light-leak');
    const created = !leak;
    if (created) {
        leak = document.createElement('div');
        leak.className = 'light-leak';
        container.appendChild(leak);
    }
    if (!leak) return;

    gsap.fromTo(
        leak,
        { x: '-110%', opacity: 0 },
        {
            x: '210%',
            opacity: 1,
            duration: 1.1,
            ease: 'power2.inOut',
            onComplete: () => { if (created) leak!.remove(); },
        }
    );
}
