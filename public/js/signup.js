
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

    const passwordsMatch = passwordValidation(
        password.value.trim(),
        passwordToConfirm.value.trim()
    );
    const emailCorrect = emailValidation(email.value.trim());

    if (!(passwordsMatch && emailCorrect)) {
        return;
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
        fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify(bodyContent),
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

emailValidation = (email) => {
    console.log("email val:" + email);
    if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            String(email).toLowerCase()
        ) &&
        document.querySelector(".error-message-email")
    ) {
        document.querySelector("#email-signup").value = "";
        return false;
    } else if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            String(email).toLowerCase()
        )
    ) {
        console.log("email wrong");
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Your Email is not a valid format!";
        errorMessage.classList.add("error-message-email");
        errorMessage.classList.add("error-message");
        const formElements = document.querySelector(".submit-form");
        formElements.insertBefore(errorMessage, formElements.children[6]);
        document.querySelector("#email-signup").value = "";
        return false;
    } else return true;
};

passwordValidation = (password, passwordToConfirm) => {
    if (
        password !== passwordToConfirm &&
        document.querySelector(".error-message-password")
    ) {
        document.querySelector("#password-signup").value = "";
        document.querySelector("#confirm-password").value = "";
        return false;
    } else if (password !== passwordToConfirm) {
        const errorMessage = document.createElement("p");
        errorMessage.textContent =
            "Your Passwords Dont Match, Please try again!";
        console.log("pass no match");
        errorMessage.classList.add("error-message-password");
        errorMessage.classList.add("error-message");
        const formElements = document.querySelector(".submit-form");
        formElements.insertBefore(errorMessage, formElements.children[8]);
        document.querySelector("#password-signup").value = "";
        document.querySelector("#confirm-password").value = "";
        return false;
    } else return true;
};

