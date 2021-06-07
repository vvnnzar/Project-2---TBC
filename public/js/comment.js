const newComment = async (event) => {
    event.preventDefault();

    const questionId = window.location.pathname.split('/').pop();
    const commentText = document.querySelector('#comment-text').value.trim();

    if (commentText) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ 'question_id': questionId, 'comment_text': commentText }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to new comment');
        }
    }
};

document
    .querySelector('#comment-form')
    .addEventListener('submit', newComment);
