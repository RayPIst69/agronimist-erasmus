let currentSlide = 0;
const slides = document.querySelector('.slides');
const slideCount = document.querySelectorAll('.slide').length;
const dotsContainer = document.querySelector('.dots');

// Create dots for navigation
for (let i = 0; i < slideCount; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');
dots[0].classList.add('active');

// Navigation functions
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

function updateSlider() {
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

// Add event listeners for buttons
document.querySelector('.prev').addEventListener('click', prevSlide);
document.querySelector('.next').addEventListener('click', nextSlide);

// Auto-slide and hover pause
let slideInterval = setInterval(nextSlide, 5000);
slides.parentElement.addEventListener('mouseenter', () => clearInterval(slideInterval));
slides.parentElement.addEventListener('mouseleave', () => {
  slideInterval = setInterval(nextSlide, 5000);
});