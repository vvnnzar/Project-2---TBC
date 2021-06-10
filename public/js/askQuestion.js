const askQuestionForm = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#question-title').value.trim();
    const text = document.querySelector('#question-text').value.trim();

    if (title && text) {
        const response = await fetch('/api/questions', {
            method: 'POST',
            body: JSON.stringify({ title, text }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to new question');
        }
    }
};


document
    .querySelector('#ask-question-form')
    .addEventListener('click', askQuestionForm);

