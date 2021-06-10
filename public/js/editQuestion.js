const updateButton = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#question-title').value.trim();
    const text = document.querySelector('#question-text').value.trim();
    const questionId = window.location.pathname.split('/').pop();


    if (title && text) {
        const response = await fetch('/api/questions/' + questionId,  {
            method: 'PUT',
            body: JSON.stringify({ title, text }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/question/' + questionId);
        } else {
            alert('Failed to update question');
        }
    }
};

const deleteButton = async () => {

    const questionId = window.location.pathname.split('/').pop();
    const response = await fetch('/api/questions/' + questionId, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to delete blog');
    }
};


document
    .querySelector('#update-question')
    .addEventListener('click', updateButton);

document
    .querySelector('#delete-question')
    .addEventListener('click', deleteButton);