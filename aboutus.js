document.addEventListener("DOMContentLoaded", () => {
    const banner = document.querySelector('.welcome-banner');
    const popSoundEffect = new Audio("sounds/bubble-sound.mp3"); // For particle pop on click
    const textSoundEffect = new Audio("sounds/text-sound.mp3"); // For hover on text
    const scoreDisplay = document.createElement('div'); // Score display element

    // Preload the sound files for faster playback
    popSoundEffect.preload = 'auto';
    textSoundEffect.preload = 'auto';

    let poppedBubbles = 0; // Track the number of bubbles popped
    let gameUnlocked = false; // Easter egg state
    let totalPoppedBubbles = 0; // Total count for dynamic score

    // Set up score display
    scoreDisplay.classList.add('score-display');
    banner.appendChild(scoreDisplay); // Add score display to the banner
    updateScore(); // Initialize score display

    // Parallax effect with debouncing
    document.addEventListener("mousemove", debounce((e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;
        banner.style.transform = `translate(${x}px, ${y}px)`;
    }, 20));

    // Create particles
    function createParticles() {
        const particleContainer = document.getElementById('particles-js');
        for (let i = 0; i < 60; i++) {
            let particle = document.createElement('div');
            particle.classList.add('particle');

            let size = Math.random() * 12 + 8; // Random size for particles
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            particle.style.top = Math.random() * 100 + 'vh'; // Random position
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDuration = Math.random() * 12 + 6 + 's'; // Random animation duration
            particle.style.animationDelay = `${Math.random() * 5}s`;

            // Set a random background color from the beginning
            particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;

            // Pop particle on click and animate
            particle.addEventListener("click", function () {
                playSound(popSoundEffect); // Play sound effect on pop
                this.classList.add('popped'); // Add pop animation class
                poppedBubbles++; // Increment the popped bubbles count
                totalPoppedBubbles++; // Increment the total popped bubbles count
                this.style.pointerEvents = 'none'; // Disable further clicks on this bubble

                // Update the score
                updateScore();

                // Check if 20 bubbles have been popped to unlock the game
                if (poppedBubbles === 20 && !gameUnlocked) {
                    banner.classList.add('unlocked');
                    alert("Easter Egg Found: You've unlocked a secret mini-game!\nPop more bubbles to reveal the hidden message.");
                    gameUnlocked = true;

                    // Add visual feedback to the banner for the unlocked Easter egg
                    banner.classList.add('easter-egg-unlocked');
                }

                // Reset after pop animation
                setTimeout(() => {
                    this.remove(); // Remove particle from DOM after pop animation
                }, 500); // Remove after animation duration
            });

            particleContainer.appendChild(particle); // Add the particle to the container
        }
    }
    createParticles();

    // Play sound effect on hover (for text elements)
    document.querySelectorAll('.welcome-banner h1, .welcome-banner p').forEach(element => {
        element.addEventListener('mouseover', () => {
            playSound(textSoundEffect); // Play text hover sound
        });
    });

    // Helper function to play sound, ensuring it's triggered within user interactions
    function playSound(sound) {
        sound.currentTime = 0; // Reset the audio to the start
        sound.play().catch(err => console.log("Audio play blocked:", err)); // Error handling for sound
    }

    // Update score display and trigger pulse animation
    function updateScore() {
        scoreDisplay.innerText = `Bubbles Popped: ${totalPoppedBubbles}`;
        scoreDisplay.classList.add('pulse'); // Add pulse animation
        setTimeout(() => {
            scoreDisplay.classList.remove('pulse'); // Remove pulse animation after the effect
        }, 300); // Pulse duration
    }

    // Debounce function to optimize performance
    function debounce(func, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    }
});
