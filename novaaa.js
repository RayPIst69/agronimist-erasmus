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
const commentBox = document.getElementById('comment');

commentBox.addEventListener('input', function () {
  const lines = commentBox.value.split('\n');
  if (lines.length > maxLines) {
    // Remove extra lines
    commentBox.value = lines.slice(0, maxLines).join('\n');
  }
});

function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function loadComments() {
  const comments = JSON.parse(localStorage.getItem('comments') || '[]');
  const myComments = JSON.parse(localStorage.getItem('myComments') || '[]');
  const commentsList = document.getElementById('commentsList');
  commentsList.innerHTML = '';
  comments.forEach(({id, name, comment, likes = 0, dislikes = 0, reports = 0}) => {
    const commentDiv = document.createElement('div');
    commentDiv.style.borderBottom = '1px solid #ccc';
    commentDiv.style.marginBottom = '10px';
    commentDiv.innerHTML = `<strong>${name}</strong><br>${comment}`;

    // Like button
    const likeBtn = document.createElement('button');
    likeBtn.textContent = `👍 ${likes}`;
    likeBtn.style.marginLeft = '10px';
    likeBtn.onclick = function() {
      updateCommentCount(id, 'likes');
    };
    commentDiv.appendChild(likeBtn);

    // Dislike button
    const dislikeBtn = document.createElement('button');
    dislikeBtn.textContent = `👎 ${dislikes}`;
    dislikeBtn.style.marginLeft = '5px';
    dislikeBtn.onclick = function() {
      updateCommentCount(id, 'dislikes');
    };
    commentDiv.appendChild(dislikeBtn);

    // Report button
    const reportBtn = document.createElement('button');
    reportBtn.textContent = `🚩 Report`;
    reportBtn.style.marginLeft = '5px';
    reportBtn.onclick = function() {
      updateCommentCount(id, 'reports');
      alert('Thank you for reporting. The comment will be reviewed.');
    };
    commentDiv.appendChild(reportBtn);

    // Delete button (if it's your comment)
    if (myComments.includes(id)) {
      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.style.marginLeft = '10px';
      delBtn.onclick = function() {
        deleteComment(id);
      };
      commentDiv.appendChild(delBtn);
    }

    commentsList.prepend(commentDiv);
  });
}



function deleteComment(id) {
  let comments = JSON.parse(localStorage.getItem('comments') || '[]');
  comments = comments.filter(c => c.id !== id);
  localStorage.setItem('comments', JSON.stringify(comments));
  // Remove from myComments as well
  let myComments = JSON.parse(localStorage.getItem('myComments') || '[]');
  myComments = myComments.filter(cid => cid !== id);
  localStorage.setItem('myComments', JSON.stringify(myComments));
  loadComments();
}

document.getElementById('commentForm').onsubmit = function(e) {
  e.preventDefault();
  const nameInput = document.getElementById('name');
  const name = nameInput.value.trim();
  const comment = document.getElementById('comment').value.trim();
  const errorElem = document.getElementById('nameError');

  // Check for minimum length and valid characters
  if (!name || name.length < 3) {
    errorElem.textContent = 'Username must be at least 3 characters.';
    nameInput.focus();
    return;
  }
  if (/[^a-zA-Z0-9_-]/.test(name)) {
    errorElem.textContent = 'Only letters, numbers, underscores and dashes are allowed.';
    nameInput.focus();
    return;
  }
  if (comment) {
    const id = generateId();
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    comments.push({id, name, comment});
    localStorage.setItem('comments', JSON.stringify(comments));
    // Track this comment as posted by this user
    const myComments = JSON.parse(localStorage.getItem('myComments') || '[]');
    myComments.push(id);
    localStorage.setItem('myComments', JSON.stringify(myComments));
    loadComments();
    this.reset();
    errorElem.textContent = '';
  }
};

document.getElementById('name').addEventListener('input', function(e) {
  const original = this.value;
  const filtered = original.replace(/[^a-zA-Z0-9_-]/g, '');
  this.value = filtered;
  const errorElem = document.getElementById('nameError');

  if (original !== filtered) {
    errorElem.textContent = 'Only letters, numbers, underscores and dashes are allowed.';
  } else if (filtered.length > 0 && filtered.length < 3) {
    errorElem.textContent = 'Username must be at least 3 characters.';
  } else {
    errorElem.textContent = '';
  }
});

document.getElementById('name').addEventListener('blur', function() {
  const hasInvalidChars = /[^a-zA-Z0-9_-]/.test(this.value);
  const errorElem = document.getElementById('nameError');
  
  if (hasInvalidChars) {
    errorElem.textContent = 'Only letters, numbers, underscores, and dashes are allowed.';
    this.classList.add('error-border');
  } else {
    errorElem.textContent = '';
    this.classList.remove('error-border');
  }
});

// Load comments on page load
window.addEventListener('DOMContentLoaded', loadComments);
