'use client';

import { useEffect, useRef } from 'react';

export default function FilmGrainOverlay() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const render = () => {
            const { width, height } = canvas;
            const imgData = ctx.createImageData(width, height);
            const buf = imgData.data;
            for (let i = 0; i < buf.length; i += 4) {
                const v = Math.random() * 255 | 0;
                buf[i] = v;
                buf[i + 1] = v;
                buf[i + 2] = v;
                buf[i + 3] = 255;
            }
            ctx.putImageData(imgData, 0, 0);
            rafRef.current = requestAnimationFrame(render);
        };
        rafRef.current = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <canvas
            id="film-grain"
            ref={canvasRef}
            aria-hidden="true"
        />
    );
}
