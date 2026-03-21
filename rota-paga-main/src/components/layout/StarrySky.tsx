import React, { useRef, useEffect } from 'react';

const StarrySky: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let stars: { x: number; y: number; radius: number; speed: number, alpha: number }[] = [];
        const numStars = 500;
        const warpSpeed = 0.5;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createStars = () => {
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                    speed: (Math.random() * 0.5 + 0.2) * warpSpeed,
                    alpha: Math.random() * 0.5 + 0.5,
                });
            }
        };

        const drawStars = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const star of stars) {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 224, ${star.alpha})`;
                ctx.fill();
            }
        };

        const updateStars = () => {
            for (const star of stars) {
                star.y += star.speed;
                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }
            }
        };

        let animationFrameId: number;
        const animate = () => {
            drawStars();
            updateStars();
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            setCanvasSize();
            createStars();
        };

        window.addEventListener('resize', handleResize);

        setCanvasSize();
        createStars();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas id="starfield" ref={canvasRef} />;
};

export default StarrySky;
