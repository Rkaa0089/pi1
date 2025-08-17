 // Initialize snow immediately
        window.addEventListener('DOMContentLoaded', () => {
            initSnow();
        });

        // Snow particles
        function initSnow() {
            const canvas = document.getElementById('snow-canvas');
            const ctx = canvas.getContext('2d');
            
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            const particles = [];
            const particleCount = 100;

            class Particle {
                constructor() {
                    this.reset();
                }

                reset() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height - canvas.height;
                    this.size = Math.random() * 3 + 1;
                    this.speedY = Math.random() * 2 + 0.5;
                    this.speedX = (Math.random() - 0.5) * 0.5;
                    this.opacity = Math.random() * 0.5 + 0.5;
                }

                update() {
                    this.y += this.speedY;
                    this.x += this.speedX;
                    
                    if (this.y > canvas.height) {
                        this.reset();
                        this.y = -10;
                    }
                    
                    if (this.x > canvas.width || this.x < 0) {
                        this.x = Math.random() * canvas.width;
                    }
                }

                draw() {
                    ctx.save();
                    ctx.globalAlpha = this.opacity;
                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            }

            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });
                
                requestAnimationFrame(animate);
            }

            animate();
        }

        // Play button functionality
        const playButton = document.getElementById('play-button');
        const birthdayMessage = document.getElementById('birthday-message');
        const audioControls = document.getElementById('audio-controls');
        const audio = document.getElementById('birthday-song');
        const toggleAudioBtn = document.getElementById('toggle-audio');
        let audioPlaying = false;

        playButton.addEventListener('click', () => {
            playButton.style.display = 'none';
            birthdayMessage.classList.add('show');
            audioControls.classList.add('show');
            
            // Play audio
            audio.play().catch(e => {
                console.log('Audio play failed:', e);
            });
            audioPlaying = true;
            
            // Create fireworks
            createFireworks();
            
            // Create additional confetti
            createConfetti();
        });

        toggleAudioBtn.addEventListener('click', () => {
            if (audioPlaying) {
                audio.pause();
                toggleAudioBtn.textContent = '▶️';
                audioPlaying = false;
            } else {
                audio.play();
                toggleAudioBtn.textContent = '⏸️';
                audioPlaying = true;
            }
        });

        // Fireworks effect
        function createFireworks() {
            const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#FD79A8', '#FDCB6E'];
            
            setInterval(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * (window.innerHeight * 0.6); // Focus on upper portion
                
                for (let i = 0; i < 25; i++) {
                    const firework = document.createElement('div');
                    firework.className = 'firework';
                    firework.style.left = x + 'px';
                    firework.style.top = y + 'px';
                    firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    
                    const angle = (Math.PI * 2 * i) / 25;
                    const velocity = 40 + Math.random() * 40;
                    firework.style.setProperty('--x', Math.cos(angle) * velocity + 'px');
                    firework.style.setProperty('--y', Math.sin(angle) * velocity + 'px');
                    
                    document.body.appendChild(firework);
                    
                    setTimeout(() => firework.remove(), 1000);
                }
            }, 2000);
        }

        // Confetti effect
        function createConfetti() {
            const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'];
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = Math.random() * 100 + '%';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.animationDelay = Math.random() * 3 + 's';
                    confetti.style.animationDuration = (3 + Math.random() * 2) + 's';
                    
                    document.body.appendChild(confetti);
                    
                    setTimeout(() => confetti.remove(), 5000);
                }, i * 100);
            }
        }