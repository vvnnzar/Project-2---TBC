const signupForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const firstName = document.querySelector('#firstName-signup').value.trim();
    const lastName = document.querySelector('#lastName-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const reconfirmPassword = document.querySelector('#reconfirmPassword-signup').value.trim();
    const termsConditions = document.querySelector('#termsConditions')
    

    if (password !== reconfirmPassword) {
        alert('Passwords do not match');
        return;
    }

    if (username && firstName && lastName && email && password && reconfirmPassword) {
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({ username, firstName, lastName, email, password, reconfirmPassword }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up')
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupForm);



// terms and condition and tutor check box