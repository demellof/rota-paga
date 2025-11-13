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

        class Comet {
            x: number;
            y: number;
            radius: number;
            speed: number;
            length: number;
            angle: number;

            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = 0; // Começa no topo
                this.radius = 2;
                this.speed = Math.random() * 3 + 2; // Velocidade alta
                this.length = Math.random() * 150 + 50; // Comprimento da cauda
                this.angle = Math.PI / 4; // Ângulo de 45 graus
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                const endX = this.x - this.length * Math.cos(this.angle);
                const endY = this.y - this.length * Math.sin(this.angle);

                // Cauda com gradiente
                const gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
                gradient.addColorStop(0, 'rgba(255, 165, 0, 0.8)'); // Laranja brilhante na cabeça
                gradient.addColorStop(1, 'rgba(255, 165, 0, 0)'); // Transparente no final da cauda

                ctx.lineTo(endX, endY);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = this.radius;
                ctx.stroke();
            }

            update() {
                this.x += this.speed * Math.cos(this.angle);
                this.y += this.speed * Math.sin(this.angle);

                // Se o cometa sair da tela, resete-o
                if (this.x > canvas.width || this.y > canvas.height) {
                    this.reset();
                    this.y = 0; // Garante que ele sempre comece de cima
                }
            }
        }

        const comets = [new Comet(), new Comet()];

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
            comets.forEach(comet => {
                comet.draw();
                comet.update();
            });
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
