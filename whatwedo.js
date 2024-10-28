// script.js

// Set the target date and time for the event
// const targetDate = new Date("2024-12-31T23:59:59").getTime();

// Function to calculate and update the countdown timer
function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;

    if (timeRemaining >= 0) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    } else {
        // Optionally, display a message when the countdown reaches zero
        document.querySelector(".countdown").innerHTML = "<p>Event Started!</p>";
    }
}

// Update countdown every 1 second
setInterval(updateCountdown, 1000);

// Function to show event details
function showEventDetails(eventId) {
    // Hide all galleries first
    document.querySelectorAll('.gallery_1').forEach(gallery => {
        gallery.style.display = 'none';
    });

    // Show the selected gallery based on eventId
    const gallery = document.querySelector(`.gallery_1[unique-script-id="${eventId}"]`);
    if (gallery) {
        gallery.style.display = 'block';
    }
}
