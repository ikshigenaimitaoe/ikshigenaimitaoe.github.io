
window.addEventListener('load', function () {
    document.querySelector('.pre-loader').className += ' hidden';
});


let slideIndex = 1;
let slideInterval;

showSlides(slideIndex);
startAutoPlay();  // Start auto-play when the page loads

// Function to move to the next/previous slide
function plusSlides(n) {
  clearInterval(slideInterval); // Stop auto-play when manually navigating
  showSlides(slideIndex += n);
  startAutoPlay();  // Restart auto-play after manual control
}

// Function to jump to a specific slide using dots
function currentSlide(n) {
  clearInterval(slideInterval); // Stop auto-play when manually navigating
  showSlides(slideIndex = n);
  startAutoPlay();  // Restart auto-play after manual control
}

// Main function to display the correct slide and manage dots
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  // Wrap around slide index if it's out of bounds
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Remove "active" class from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Show the selected slide and highlight the correct dot
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Function to start auto-playing the slides every 2 seconds
function startAutoPlay() {
  slideInterval = setInterval(function () {
    plusSlides(1); // Automatically advance to the next slide
  }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

window.addEventListener('load', function () {
    document.querySelector('.pre-loader').className += ' hidden';
});