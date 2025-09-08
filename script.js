document.addEventListener('DOMContentLoaded', function() {
    const birthdayBtn = document.getElementById('birthdayBtn');
    const birthdayMessage = document.getElementById('birthdayMessage');
    const spanishMessage = document.getElementById('spanishMessage');
    const loveMessage = document.getElementById('loveMessage');
    const flowerContainer = document.getElementById('flowerContainer');
    const grassContainer = document.getElementById('grassContainer');

    birthdayBtn.addEventListener('click', function() {
        // Hide the button
        birthdayBtn.style.display = 'none';
        
        // Show the birthday message first
        birthdayMessage.classList.remove('hidden');
        
        // Show the grass container
        setTimeout(() => {
            grassContainer.classList.remove('hidden');
        }, 300);
        
        // Show the flowers after a short delay
        setTimeout(() => {
            flowerContainer.classList.remove('hidden');
        }, 500);
        
        // Show Spanish messages after flowers bloom
        setTimeout(() => {
            spanishMessage.classList.remove('hidden');
        }, 4000);
        
        setTimeout(() => {
            loveMessage.classList.remove('hidden');
        }, 4500);
        
        // Create confetti
        createConfetti();
        
        // Play a simple birthday tune (if audio is desired, uncomment below)
        // playBirthdayTune();
    });

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
