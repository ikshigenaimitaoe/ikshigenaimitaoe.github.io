const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const cardCol = document.querySelector('.card-col');
let currentIndex = 0;

// Function to determine how many cards to show based on screen width
function getCardsToShow() {
    if (window.innerWidth < 600) {
        return 1; // 1 card for screens smaller than 600px
    } else if (window.innerWidth < 850) {
        return 2; // 2 cards for screens between 600px and 850px
    }
    return 3; // Default to 3 cards
}

// Function to update the slider
function updateSlider() {
    const totalCards = document.querySelectorAll('.card').length;
    const cardsToShow = getCardsToShow(); // Determine how many cards to show
    const maxIndex = totalCards - cardsToShow; // Ensure we calculate the correct last card position

    // Ensure currentIndex doesn't go out of bounds
    currentIndex = Math.min(currentIndex, maxIndex);

    // Update the slider position
    const cardWidth = document.querySelector('.card').offsetWidth;
    const gap = 25; // Space between the cards (same as the CSS gap)
    const offset = currentIndex * (cardWidth + gap); // Calculate offset for sliding effect

    cardCol.style.transform = `translateX(-${offset}px)`;

    // Hide buttons when at the start or end
    prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
    nextButton.style.display = currentIndex >= maxIndex ? 'none' : 'block';
}

// Event listeners for button clicks
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

nextButton.addEventListener('click', () => {
    const totalCards = document.querySelectorAll('.card').length;
    const cardsToShow = getCardsToShow();
    const maxIndex = totalCards - cardsToShow;
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
    }
});

// Initial update
updateSlider();

// Optional: Update slider when resizing the window
window.addEventListener('resize', updateSlider);
