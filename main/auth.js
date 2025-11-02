/* ==============
    Login.js
================= */

init();

function init() {
    toggleAuthForm();
}

function toggleAuthForm(string = 'login') {
    const form = document.querySelector('div#auth>form');
    const button = form.elements['button'];
    const inputsNotInLogin = document.querySelectorAll('div#auth>form input:not(input[name="email"],input[name="password"]');
    const redirect = document.querySelector('div#auth>span#redirect');
    const title = document.querySelector('head>title');

    if (string === 'login') {
        title.innerText = 'Login';

        for (const input of inputsNotInLogin) {
            const label = input.previousElementSibling;
            input.classList.add('hide');
            label.classList.add('hide');
        }

        button.innerText = 'Login';

        redirect.innerText = 'I don\'t have an account';

        doLoginForm(form);

    } else if (string === 'signup') {
        title.innerText = 'Sign Up';

        for (const input of inputsNotInLogin) {
            const label = input.previousElementSibling;
            input.classList.remove('hide');
            label.classList.remove('hide');
        }

        button.innerText = 'Sign Up';

        redirect.innerText = 'I already have an account';

        doSignUpForm(form);
    }

    redirect.onclick = e => {
        if (string === 'login') {
            toggleAuthForm('signup');
        } else if (string === 'signup') {
            toggleAuthForm('login');
        }
    };
}

function doLoginForm(form) {
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

function doSignUpForm(form) {
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

