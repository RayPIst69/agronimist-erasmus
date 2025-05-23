
const commentBox = document.getElementById('comment');
const maxLines = 25;

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
  const name = document.getElementById('name').value.trim();
  const comment = document.getElementById('comment').value.trim();
  if(name && comment) {
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
  }
};

// Load comments on page load
window.addEventListener('DOMContentLoaded', loadComments);
