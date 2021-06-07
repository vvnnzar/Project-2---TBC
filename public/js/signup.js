const signupForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#username-signup");
    const firstName = document.querySelector("#firstName-signup");
    const lastName = document.querySelector("#lastName-signup");
    const email = document.querySelector("#email-signup");
    let password = document.querySelector("#password-signup");
    let passwordToConfirm = document.querySelector("#confirm-password");
    const signupContainter = document.querySelector(".signup-container");
    // const termsConditions = document.querySelector('#termsConditions')

    if (password.value.trim() !== passwordToConfirm.value.trim()) {
        if (document.querySelector(".error-message")) {
            document.querySelector("#password-signup").value = "";
            document.querySelector("#confirm-password").value = "";
            return;
        }
        const errorMessage = document.createElement("p");
        errorMessage.textContent =
            "Your Passwords Dont Match, Please try again!";
        errorMessage.classList.add("error-message");
        const formElements = document.querySelector(".submit-form");
        formElements.insertBefore(errorMessage, formElements.children[8]);
        document.querySelector("#password-signup").value = "";
        document.querySelector("#confirm-password").value = "";
        return;
    }
    if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            email.value.trim()
        )
    ) {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Your Email is not a valid format!";
        errorMessage.classList.add("error-message");
        const formElements = document.querySelector(".submit-form");
        formElements.insertBefore(errorMessage, formElements.children[6]);
    }

    if (
        username.value.trim() &&
        firstName.value.trim() &&
        lastName.value.trim() &&
        email.value.trim() &&
        password.value.trim()
    ) {
        const bodyContent = {
            username: username.value.trim(),
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim(),
            password: password.value.trim(),
            isTutor: isTutorValue(),
        };
        const response = fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify({ bodyContent }),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                console.log(res);
                if (res.ok) {
                    console.log(res.headers);
                    document.location.replace("/");
                } else {
                    alert("Failed to sign up");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
document.querySelector(".submit-form").addEventListener("submit", signupForm);

// // terms and condition and tutor check box
isTutorValue = () => {
    if (document.querySelector("#is-tutor:checked") === null) {
        return false;
    } else {
        return true;
    }
};
