'use client';

import React from 'react';

export default function FilmLogo({ size = 20, color = 'currentColor' }: { size?: number, color?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
        >
            {/* Main Frame */}
            <rect
                x="2"
                y="5"
                width="20"
                height="14"
                rx="1.5"
                stroke={color}
                strokeWidth="1.2"
            />
            {/* Sprocket holes - top */}
            <rect x="5" y="7" width="2" height="2" rx="0.5" fill={color} />
            <rect x="11" y="7" width="2" height="2" rx="0.5" fill={color} />
            <rect x="17" y="7" width="2" height="2" rx="0.5" fill={color} />
            {/* Sprocket holes - bottom */}
            <rect x="5" y="15" width="2" height="2" rx="0.5" fill={color} />
            <rect x="11" y="15" width="2" height="2" rx="0.5" fill={color} />
            <rect x="17" y="15" width="2" height="2" rx="0.5" fill={color} />
            {/* Lens center dot */}
            <circle cx="12" cy="12" r="1.5" fill={color} opacity="0.5" />
        </svg>
    );
}
