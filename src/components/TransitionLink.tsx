'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTransitionStore } from '@/store/transitionStore';

interface TransitionLinkProps extends React.ComponentProps<typeof Link> {
    children: ReactNode;
    href: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function TransitionLink({ children, href, onClick, ...props }: TransitionLinkProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { startTransition } = useTransitionStore();

    const handleTransition = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Run optional prop click handler first
        if (onClick) onClick(e);

        // If it's an external link or modifier key was pressed, let browser handle it natively
        if (href.startsWith('http') || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
            return;
        }

        e.preventDefault();

        // If we are already on this page, do nothing
        if (pathname === href) return;

        // Triggers the cinematic black shutter overlay to close
        startTransition();

        // Wait for the shutter animation to finish entering (450ms) before pushing the route
        setTimeout(() => {
            router.push(href);
        }, 450);
    };

    return (
        <Link href={href} onClick={handleTransition} {...props}>
            {children}
        </Link>
    );
}
