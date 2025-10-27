/* ==============
    Login.js
================= */

init();

function init() {
    doLoginForm('#auth>form');
    // if user clicks "auth redirect" then redirects to signup/login
    
}

// this function should be able to change the elements inside the form
function toggleForm(text, form) {
}

function doLoginForm(formId) {
    const form = document.querySelector(formId);
    const email = form.elements['email'];
    const password = form.elements['password'];
    const button = form.elements['button'];
    /* const user = JSON.parse(localStorage.getItem("user")); */
    
    button.addEventListener('click', validateInputs);
    button.addEventListener('keydown', e => { if (e.key === 'Enter') return validateInputs});

    /* Redirects to user page if login is successful */
    function validateInputs(e) {
        e.preventDefault()

        if (email.value && password.value) {
            // window.location.href = "users.html";
            console.log("Login Successful")
        } else {
            doErrorBox("Invalid email or password", form);
        }
    }
}

function doSignUpForm(formId) {
    const form = document.querySelector(formId);
    const email = form.elements['email'];
    const password = form.elements['password'];
    const firstName = form.elements['first-name'];
    const lastName = form.elements['last-name'];
    const contact = form.elements['contact'];
    const address = form.elements['address'];
    const button = form.elements['button'];
    /* const user = JSON.parse(localStorage.getItem("user")); */
    
    button.addEventListener('click', validateInputs);
    button.addEventListener('keydown', e => { if (e.key === 'Enter') return validateInputs});

    /* Redirects to user page if login is successful */
    function validateInputs(e) {
        e.preventDefault()

        let messages = []

        /* email validation */
        const emailRegex = /\w+\@\w+\.\w+/  // someone@example.com
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/


        if (email.value === "" || email.value == null) {
            messages.push("Email is required")
        } else if (emailRegex.test(email.value) == false) {
            messages.push("Email should be formatted as \"someone@example.com\"")
        }

        /* password validation */
        if (password.value === "" || password.value === null) {
            messages.push("Password is required")
        } else if (password.value.length < 12) {
            messages.push("Create a password at least 12 characters")
        } else if (passwordRegex.test(password.value) == false) {
            messages.push("Password should have a combination of uppercase letters, lowercase letters, numbers, and symbols")
        }

        /* first name validation */
        if (firstName.value === "" || firstName.value === null) {
            messages.push("First name is required")
        }

        /* last name validation */
        if (lastName.value === "" || lastName.value === null) {
            messages.push("Last name is required")
        }

        /* contact validation */
        if (contact.value === "" || contact.value === null) {
            messages.push("Contact is required")
        }

        /* address validation */
        if (address.value === "" || address.value === null) {
            messages.push("Address is required")
        }

        if (messages) {
            doErrorBox(messages, form);
        } else {
            ; // verify UX
        }
    }
}

