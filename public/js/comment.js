const newComment = async (event) => {
    event.preventDefault();

    const questionId = window.location.pathname.split('/').pop();
    const commentText = document.querySelector('#comment-text').value;

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
            alert('Failed to load new comment');
        }
    }
};


const deleteComment = async (sender) => {

    const commentId = sender.toElement.dataset.id;

    const questionId = window.location.pathname.split('/').pop();

    const response = await fetch('/api/comments/' + commentId, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/question/' + questionId);
    } else {
        alert('Failed to delete comment');
    }
};

document
    .querySelector('#comment-form')
    .addEventListener('submit', newComment);

document
    .querySelector('.delete-comment')
    .addEventListener('click', deleteComment);
