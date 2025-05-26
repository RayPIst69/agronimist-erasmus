let currentSlide = 0;
const slides = document.querySelector('.slides');
const slideCount = document.querySelectorAll('.slide').length;
const dotsContainer = document.querySelector('.dots');

// Add event listeners for buttons


// Create dots for navigation
for (let i = 0; i < slideCount; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');
dots[0].classList.add('active'); // Highlight first dot

// Next/previous slide functions
function nextSlide() {
  currentSlide = (currentSlide + 1) % slideCount;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slideCount) % slideCount;
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

// Update slider position and dots
function updateSlider() {
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

// Auto-slide every 5 seconds (optional)
let slideInterval = setInterval(nextSlide, 5000);

// Pause on hover (optional)
slides.parentElement.addEventListener('mouseenter', () => clearInterval(slideInterval));
slides.parentElement.addEventListener('mouseleave', () => {
  slideInterval = setInterval(nextSlide, 5000);
});

document.querySelector('.prev').addEventListener('click', prevSlide);
document.querySelector('.next').addEventListener('click', nextSlide);