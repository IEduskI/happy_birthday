document.addEventListener('DOMContentLoaded', function() {
    const birthdayBtn = document.getElementById('birthdayBtn');
    const birthdayMessage = document.getElementById('birthdayMessage');
    const spanishMessage = document.getElementById('spanishMessage');
    const secondMessage = document.getElementById('secondMessage');
    const gardenContainer = document.getElementById('gardenContainer');
    const grassContainer = document.getElementById('grassContainer');

    birthdayBtn.addEventListener('click', function() {
        // Hide the button with fade effect
        birthdayBtn.style.transition = 'all 0.5s ease-out';
        birthdayBtn.style.opacity = '0';
        birthdayBtn.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            birthdayBtn.style.display = 'none';
        }, 500);
        
        // Show the birthday message first
        setTimeout(() => {
            birthdayMessage.classList.remove('hidden');
        }, 200);
        
        // Show the grass container
        setTimeout(() => {
            grassContainer.classList.remove('hidden');
        }, 800);
        
        // Show the garden with staggered flower blooming
        setTimeout(() => {
            gardenContainer.classList.remove('hidden');
            bloomGarden();
        }, 1200);
        
        // Show Spanish messages after flowers bloom
        setTimeout(() => {
            spanishMessage.classList.remove('hidden');
        }, 5000);
        
        setTimeout(() => {
            secondMessage.classList.remove('hidden');
        }, 5500);
        
        // Create confetti
        setTimeout(() => {
            createConfetti();
        }, 1500);
        
        // Add butterflies to the garden
        setTimeout(() => {
            createButterflies();
        }, 3000);
    });

    function bloomGarden() {
        const flowers = document.querySelectorAll('.single-flower');
        
        flowers.forEach((flower, index) => {
            const delay = parseFloat(flower.getAttribute('data-delay')) || 0;
            
            setTimeout(() => {
                // Animate stem growth
                const stem = flower.querySelector('.stem');
                stem.style.animation = `stemGrow 1.2s ease-out forwards`;
                
                // Animate leaf growth
                setTimeout(() => {
                    const leaves = flower.querySelectorAll('.leaf');
                    leaves.forEach(leaf => {
                        leaf.style.animation = `leafGrow 0.8s ease-out forwards`;
                    });
                }, 800);
                
                // Animate flower blooming
                setTimeout(() => {
                    const flowerHead = flower.querySelector('.flower-head');
                    flowerHead.style.animation = `flowerBloom 1.5s ease-out forwards`;
                    
                    // Add gentle sway animation after blooming
                    setTimeout(() => {
                        flower.style.animation = `gentleSway 4s ease-in-out infinite`;
                        flower.style.animationDelay = `${Math.random() * 2}s`;
                    }, 1500);
                }, 1200);
                
            }, delay * 1000);
        });
    }

    function createButterflies() {
        const colors = [
            ['#FF69B4', '#FFB6C1'], // Pink butterfly
            ['#9370DB', '#DDA0DD'], // Purple butterfly
            ['#87CEEB', '#B0E0E6'], // Blue butterfly
            ['#FFD700', '#FFF8DC'], // Yellow butterfly
        ];
        
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                createButterfly(colors[i % colors.length]);
            }, i * 2000);
        }
    }

    function createButterfly(colorPair) {
        const butterfly = document.createElement('div');
        butterfly.className = 'butterfly';
        butterfly.innerHTML = `
            <div class="wing left-wing" style="background: linear-gradient(45deg, ${colorPair[0]}, ${colorPair[1]})"></div>
            <div class="wing right-wing" style="background: linear-gradient(45deg, ${colorPair[0]}, ${colorPair[1]})"></div>
            <div class="butterfly-body"></div>
        `;
        
        // Random starting position
        butterfly.style.left = Math.random() * 20 + '%';
        butterfly.style.top = Math.random() * 30 + 20 + '%';
        
        document.body.appendChild(butterfly);
        
        // Animate butterfly flight
        animateButterflyFlight(butterfly);
        
        // Remove butterfly after animation
        setTimeout(() => {
            if (butterfly && butterfly.parentNode) {
                butterfly.parentNode.removeChild(butterfly);
            }
        }, 15000);
    }

    function animateButterflyFlight(butterfly) {
        const duration = 15000;
        const startTime = Date.now();
        const startX = parseFloat(butterfly.style.left);
        const startY = parseFloat(butterfly.style.top);
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                // Create a figure-8 flight pattern
                const x = startX + Math.sin(progress * Math.PI * 4) * 30;
                const y = startY + Math.sin(progress * Math.PI * 2) * 15 - progress * 20;
                
                butterfly.style.left = x + '%';
                butterfly.style.top = y + '%';
                butterfly.style.transform = `rotate(${Math.sin(progress * Math.PI * 8) * 15}deg)`;
                
                requestAnimationFrame(animate);
            }
        }
        
        animate();
    }

    function createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 3 + 's';
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                
                document.body.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti && confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 5000);
            }, i * 100);
        }
    }

    // Optional: Add sound effect
    function playBirthdayTune() {
        // Create a simple audio context for sound effects
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const notes = [261.63, 261.63, 293.66, 261.63, 349.23, 329.63]; // Happy Birthday notes (C C D C F E)
            
            notes.forEach((frequency, index) => {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.value = frequency;
                    oscillator.type = 'sine';
                    
                    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.4);
                }, index * 400);
            });
        } catch (error) {
            console.log('Audio not supported or blocked');
        }
    }

    // Add some sparkle effect to the background
    function createSparkles() {
        setInterval(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'fixed';
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            sparkle.style.fontSize = Math.random() * 20 + 10 + 'px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1';
            sparkle.style.animation = 'sparkle 2s ease-in-out';
            
            // Add sparkle animation
            sparkle.style.animation = 'sparkleFloat 3s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle && sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 3000);
        }, 1500);
    }

    // Start sparkle effect after a delay
    setTimeout(createSparkles, 2000);
});
